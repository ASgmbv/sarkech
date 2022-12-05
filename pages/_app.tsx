import '../styles/globals.css'
import { Provider } from "react-redux";
import { store } from '../redux/store';
import { AppPropsWithLayout } from 'types/next';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    getLayout(
      <Provider
        store={
          store
        }
      >
        <Component {...pageProps} />
      </Provider>
    )
  )
}
