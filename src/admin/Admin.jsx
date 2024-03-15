import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "../hooks";
import { useState } from "react";
import { fileUpload } from "../helpers/fileUpload";
// import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';

export const Admin = () => {
    const [formValues, setFormValues] = useState({ Producto: "", Cantidad: "", Imagen: "" });

    const { handleInputChange } = useForm();

    const onFileInputChange = ({ target }) => {
        const imageFile = target.files[0];
        console.log(imageFile);
        setFormValues({...formValues, Imagen: imageFile})
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'Imagen') return;
        setFormValues({ ...formValues, [name]: value });

        handleInputChange(e.target);
        console.log({ formValues });
    }

    const handleSubmit = async ( e ) => {
        e.preventDefault();

        const { Producto, Cantidad, Imagen } = formValues;
        // console.log({ formValues });
        const url = await fileUpload( Imagen );

        if (url) {
            console.log('EXISTE URL');
        }
        console.log({ url });
    }

    const isFormValid = formValues.Producto && formValues.Cantidad && formValues.Imagen;
    return (
        <>
            <Typography variant="h3">Ingresar un nuevo producto</Typography>
            <form onSubmit={ handleSubmit }>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField label="Producto" name="Producto" onChange={onChange} ></TextField>
                    <TextField label="Cantidad" type="number" name="Cantidad" onChange={onChange} />
                    <input type="file" onChange={onFileInputChange} name="Imagen"/>
                </Box>
                <Button type="submit" variant="contained" disabled={!isFormValid}> Cargar Producto </Button>
            </form>
        </>
    )
}
