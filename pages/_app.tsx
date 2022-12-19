import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { AppPropsWithLayout } from 'types/next';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'utils/theme/theme';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          {getLayout(<Component {...pageProps} />)}
          <Analytics />
        </DndProvider>
      </ChakraProvider>
    </Provider>
  )
}
