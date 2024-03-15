import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useForm } from "../hooks";
import { useEffect, useState } from "react";
import { fileUpload } from "../helpers/fileUpload";
import { uploadNewItem } from "../helpers/uploadNewItem";
// import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

export const Admin = () => {
    const [formValues, setFormValues] = useState({ Producto: "", Cantidad: "", Imagen: "" });
    const [events, setEvents] = useState({
        successUpload: false,
        loading: false,
        error: ''
    })

    useEffect(() => {
        const values = Object.values(formValues)

        values.forEach((value) => {
            value !== '' ? setEvents((prevEvents) => ({ ...prevEvents, successUpload: false })) : ''
        })

    }, [formValues])

    const { handleInputChange } = useForm();

    const onFileInputChange = ({ target }) => {
        const imageFile = target.files[0];
        console.log(imageFile);
        setFormValues({ ...formValues, Imagen: imageFile })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Imagen') return;
        setFormValues({ ...formValues, [name]: value });
        handleInputChange(e.target);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEvents((prevEvents) => ({
            ...prevEvents,
            loading: true,
        }));

        const { Producto, Cantidad, Imagen } = formValues;

        const url = await fileUpload(Imagen);

        if (url) {
            setEvents((prevEvents) => ({
                ...prevEvents,
                successUpload: true,
            }));

            setFormValues({
                Producto: '',
                Cantidad: '',
                Imagen: '',
            })

            const data = {
                Producto,
                Cantidad,
                Imagen: url,
            }

            const response = await uploadNewItem(data);
            // El loading es false recién cuando la información se carga a google sheets y además se maneja el caso en que la imagen se carga a cloudinary pero hay un error en la conexión con google sheets.
            if (response.ok) {
                setEvents((prevEvents) => ({
                    ...prevEvents,
                    loading: false
                }))
            } else {
                setEvents((prevEvents) => ({
                    ...prevEvents,
                    loading: false,
                    error: 'No se pudo cargar la imagen. Intente de nuevo (recargue la página) o contacte a soporte'
                }));
            }

        } else {
            setEvents((prevEvents) => ({
                ...prevEvents,
                loading: false,
                error: 'No se pudo cargar la imagen. Intente de nuevo (recargue la página) o contacte a soporte'
            }));
        }
    }

    const isFormValid = formValues.Producto && formValues.Cantidad && formValues.Imagen;
    return (
        <>
            {
                events.loading
                    ? 
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </div>
                    : 
                    events.error == '' ?
                        <>
                            <Typography variant="h3">Ingresar un nuevo producto</Typography>
                            <form onSubmit={handleSubmit}>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <TextField label="Producto" name="Producto" onChange={onChange} value={formValues.Producto}></TextField>
                                    <TextField label="Cantidad" type="number" name="Cantidad" onChange={onChange} value={formValues.Cantidad} />
                                    <input type="file" onChange={onFileInputChange} name="Imagen" />
                                </Box>
                                <Button type="submit" variant="contained" disabled={!isFormValid}> Cargar Producto </Button>
                            </form>
                        </>
                        : 
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        {events.error}
                        </div>
            }

            {
                events.successUpload ? <Typography variant="h3">Información cargada con éxito</Typography> : ''
            }

        </>
    )
}
