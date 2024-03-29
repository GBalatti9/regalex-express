import { Box, Button, Card, CardContent, CircularProgress, TextField, Typography } from "@mui/material";
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
        console.log('estoy aca');
        const imageFile = target.files[0];
        console.log(imageFile);
        setFormValues({ ...formValues, Imagen: imageFile })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        console.log({ name, value });
        // if (name === 'Imagen') return;
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            {
                events.loading
                    ? 
                    <div>
                        <CircularProgress />
                    </div>
                    : 
                    events.error == '' ?
                        <>
                            <Typography variant="h4" sx={{ marginBottom: '10px' }}>Ingresar un nuevo producto</Typography>
                            <form onSubmit={handleSubmit}>
                                <Card>
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <TextField label="Producto" name="Producto" onChange={onChange} value={formValues.Producto} sx={{ marginBottom: '10px' }}></TextField>
                                        <TextField label="Cantidad" type="number" name="Cantidad" onChange={onChange} value={formValues.Cantidad} sx={{ marginBottom: '10px' }}/>
                                        <input type="file" onChange={onFileInputChange} name="Imagen"/>
                                    </CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit" variant="contained" disabled={!isFormValid} sx={{ marginBottom: '10px', display: 'flex'}}> Cargar Producto </Button>
                                    </Box>
                                </Card>
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

        </div>
    )
}
