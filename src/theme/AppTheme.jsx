

import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { AppRouter } from '../router/AppRouter';

export const AppTheme = ({ children }) => {
    
    return (
    <ThemeProvider theme={ theme }>
        <CssBaseline />

        {/* { children } */}
        <AppRouter />

    </ThemeProvider>
    )

}
