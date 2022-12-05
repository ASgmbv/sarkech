import { FC, PropsWithChildren } from "react";
import Head from 'next/head';

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
      {children}
    </>
  )
}

export default StudioLayout;