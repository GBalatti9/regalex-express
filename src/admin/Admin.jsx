import { Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useForm } from "../hooks";
import { useEffect, useState } from "react";
import { fileUpload } from "../helpers/fileUpload";
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
        const imageFile = target.files;
        console.log(imageFile);
        setFormValues({ ...formValues, Imagen: imageFile })
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Imagen') return;
        setFormValues({ ...formValues, [name]: value });

        handleInputChange(e.target);
        console.log({ formValues });
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
                loading: false,
                successUpload: true,
            }));

            setFormValues({
                Producto: '',
                Cantidad: '',
                Imagen: '',
            })

        } else {
            setEvents((prevEvents) => ({
                ...prevEvents,
                loading: false,
                error: 'No se pudo cargar la imagen. Intente de nuevo o contacte a soporte'
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
