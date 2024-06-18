import { createTheme } from '@mui/material/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

const jss = create({ plugins: [...[], rtl()] });

const theme = createTheme({
  direction: 'rtl', 
  typography: {
    fontFamily: 'Arial, sans-serif', 
  },
});

export { theme, jss };
