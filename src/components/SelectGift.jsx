import { useEffect, useState } from "react";

import { fetchToSheets } from '../helpers/fetchToSheets';
import { Button, Card, CardContent, CardMedia, Checkbox, CircularProgress, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";

export const SelectGift = ({ userData, data, handleInputChange }) => {
    const [ filterElements, setFilterElements ] = useState([]);
    const [ answerSent, setAnswerSent ] = useState({
        isLoading: false,
        state: false
    });

    const [ noSelect, setNoSelect ] = useState(true);
    const toggleSelect = () => {
        setNoSelect(false);
    }

    useEffect(() => {

        setFilterElements(data.info);

    }, [ data.info ])

    const handleCheckboxChange = ( e, element ) => {
        console.log({e}, {element});
        console.log('se cliqueo');
        const updatedElements = data.info.map((el) => ({
            ...el,
            isSelected: el.nombre === element.nombre,
        }));
        console.log({updatedElements});
        // console.log({updatedElements});
        handleInputChange(e.target);

        setFilterElements(updatedElements);

    }
    
    const handleSubmit = async ( e ) => {
        e.preventDefault();
        
        setAnswerSent(( prevAnswerSent ) => ({
            ...prevAnswerSent,
            isLoading: true,
        }))
        
        const info = await fetchToSheets(userData);
        console.log({info});
        localStorage.removeItem('info');
        setAnswerSent(( prevAnswerSent ) => ({
            ...prevAnswerSent,
            isLoading: false,
            state: true
        }))
    }

    const HoverCard = styled(Card)({
        height: '100%',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
        '&:hover': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
        }
    })

    return (
        <Container component="main" maxWidth="lg" sx={{ marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {
                data.isLoading
                    ? <Typography variant="h5">Cargando...</Typography>
                    : !answerSent.state && !answerSent.isLoading
                        ? data.formCompleted
                        ? <Typography variant="h5">Solo se puede completar una vez el formulario. Gracias</Typography>
                        : (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    {filterElements.map((element, i) => (
                                        <Grid item key={i} xs={12} sm={6} md={3}>
                                            <label htmlFor={element.nombre}>
                                                <HoverCard onClick={ toggleSelect }>
                                                    <CardContent>
                                                        <Typography variant="h6" component="div">
                                                            {element.nombre}
                                                        </Typography>
                                                        <CardMedia
                                                            component="img"
                                                            alt={element.nombre}
                                                            // height="140"
                                                            image={`/regalex-claudio/${element.imagen}`}
                                                        />
                                                        <Checkbox
                                                            id={element.nombre}
                                                            name={element.nombre}
                                                            checked={element.isSelected || false}
                                                            onChange={(e) => handleCheckboxChange(e, element)}
                                                            // style={{ display: 'none' }} // Oculta el checkbox
                                                        />
                                                    </CardContent>
                                                </HoverCard>
                                            </label>
                                        </Grid>
                                    ))}
                                </Grid>
                                <Button variant="contained" color="primary" type="submit" style={{ margin: '20px' }} disabled={noSelect}  >
                                    Elegir
                                </Button>
                            </form>
                        )
                        : 
                        !answerSent.isLoading && answerSent.state 
                        ? <Typography> Gracias por responder </Typography>
                        : <CircularProgress style={{ marginTop: '20px' }} />
            }
        </Container>

    )
}


{/* <> 
{
    data.isLoading
        ? <h2>Cargando...</h2>
        : data.formCompleted ? <h2>Solo se puede completar una vez el formulario. Gracias </h2> :
        <form onSubmit={ handleSubmit }>
        {
            filterElements.map((element, i) => (
                <div key={ element + i }>
                    {}
                    <label htmlFor={ element.nombre }> { element.nombre } </label>
                    <div>
                        <img src={ `/regalex-claudio/${element.imagen}` } alt={element.nombre} />
                    </div>
                    <input 
                        type = "checkbox" 
                        name = { element.nombre } 
                        checked = { element.isSelected || false }
                        onChange = {(e) => handleCheckboxChange(e, element)} />
                </div>
        ))}
        <button>Elegir</button>
        </form>
}
</> */}