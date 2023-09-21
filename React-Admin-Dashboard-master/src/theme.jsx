import { deepOrange, grey } from "@mui/material/colors";

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary:  '#e6cc9f',
          divider:  '#e4b95b',
          text: {
            primary: '#0d0c0c',
            secondary:'#9e6e4c',
          },
          background: {
            default: '#f9f2e7',
            paper:'#F4E9DA',
          },
        }
      : {
          // palette values for dark mode
          primary:  '#e6cc9f',
          divider:  '#e6cc9f',
         
          text: {
            primary: '#fff',
            secondary:'#e4b95b',
          },

        }),
        primary: {
        
        
          main: '#e6cc9f',
          dark:'#0d0c0c',
          darker:  '#b58867',
          
        },
  },
});
