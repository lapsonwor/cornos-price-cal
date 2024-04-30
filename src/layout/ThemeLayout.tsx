"use client";
import { FC } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { createTheme } from '@mui/material/styles';

const ThemeLayout: FC<any> = ({ children }) => {
    const themeObj =
        createTheme({
            breakpoints: {
                values: {
                    "xs": 0,
                    "sm": 374,
                    "md": 764,
                    "lg": 1116,
                    "xl": 1281
                },
            },
        });
    return (
        <ThemeProvider theme={themeObj}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeLayout;