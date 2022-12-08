import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { AppPropsWithLayout } from 'types/next';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'utils/theme/theme';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </Provider>
  )
}
