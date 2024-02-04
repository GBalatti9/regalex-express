import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useState } from 'react'

export const UserDataForm = ({ userData, handleInputChange, setFormSubmitted }) => {
    const [ disabled, setDisabled ] = useState(true);

    useEffect(() => {
        const entries = Object.entries(userData);
        console.log(userData);
        const allValuesPresent = entries.every(([key, value ]) => value.trim() !== '' && value.trim().length > 2);
        if (allValuesPresent) {
            setDisabled( false );
        }

    }, [ userData ])

    const handleSubmit = ( e ) => {
        e.preventDefault();
        setFormSubmitted(true);
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', marginTop: '25px' }}>
                <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Nombre completo"
                        name="fullName"
                        variant="outlined"
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Mail"
                        name="email"
                        type="email"
                        variant="outlined"
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Número de teléfono"
                        name="wapp"
                        type="number"
                        variant="outlined"
                        onChange={(e) => handleInputChange(e.target)}
                    />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }} disabled={ disabled }>
                    Elegir regalo
                </Button>
                </form>
            </Paper>
            </Container>
    )
}

{/* <form onSubmit={ handleSubmit }>
<div>
    <label htmlFor="fullName">Nombre completo </label>
    <input type="text" name="fullName" onChange={ (e) => handleInputChange(e.target) }/>
</div>
<div>
    <label htmlFor="email">Mail </label>
    <input type="email" name="email" onChange={ (e) => handleInputChange(e.target) } />
</div>
<div>
    <label htmlFor="wapp">Número de teléfono </label>
    <input type="numer" name="wapp" onChange={ (e) => handleInputChange(e.target) }/>
</div>
<button type="submit">Elegir regalo</button>
</form> */}
