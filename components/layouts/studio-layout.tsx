import { FC, PropsWithChildren } from "react";
import Head from 'next/head';
import Header from "~components/ui/header";

type Props = {
}

const StudioLayout: FC<PropsWithChildren<Props>> = ({
  children
}) => {
  return (
    <>
      <Head>
        <title>
          Studio | Sarkech
        </title>
      </Head>
      <div>
        <main>
          <Header />
          {children}
        </main>
      </div>
    </>
  )
}

export default StudioLayout;