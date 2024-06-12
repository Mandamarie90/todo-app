import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, createTheme, mergeThemeOverrides,Button, virtualColor} from '@mantine/core';
import { SettingsProvider } from './Context/Settings';
import '@mantine/core/styles.css';

// const  theme={
//   colors: {
//     'ocean-blue': ['#7AD1DD', '#5FCCDB', '#44CADC', '#2AC9DE', '#1AC2D9', '#11B7CD', '#09ADC3', '#0E99AC', '#128797', '#147885'],
//     'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
//   },
// }

const theme = createTheme({
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
     <MantineProvider theme={theme} withGlobalStyles={false} withNormalizeCSS={false}>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </MantineProvider>
   </React.StrictMode> 
);
