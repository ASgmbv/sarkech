import { FC, PropsWithChildren } from "react";
import Head from 'next/head';

type Props = {
  title: string;
}

const BaseLayout: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      {children}
    </>
  )
}

export default BaseLayout;