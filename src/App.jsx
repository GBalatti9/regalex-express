import { useEffect, useState } from 'react';
import { SelectGift, UserDataForm } from './components';
import { useForm, useFetch } from './hooks';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

export const App = () => {
  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const { userData, handleInputChange } = useForm();

  const { data } = useFetch( formSubmitted, userData );

  const { palette } = useTheme();

  return (
    <Box sx={{ backgroundColor: palette.yellow.main, minHeight: '100vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
    <Typography variant='h1' sx={{ textAlign: 'center', fontSize: '4rem', fontWeight: 'bold' }}>Regalex</Typography>
    {
      data.formCompleted 
      ? <Typography> Ya completaste el cuestionario </Typography>
      : (data?.info.length === 0 && !data.isLoading)
      ? <UserDataForm 
          userData          = { userData } 
          handleInputChange = { handleInputChange }
          setFormSubmitted  = { setFormSubmitted }/>
      : data.isLoading 
      ? <CircularProgress style={{ marginTop: '20px' }}/>
      : <SelectGift
          userData          = { userData } 
          data              = { data }
          handleInputChange = { handleInputChange } />
    }
    </Box>
  )
}