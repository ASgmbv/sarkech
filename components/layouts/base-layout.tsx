import { FC, PropsWithChildren, useState } from "react";
import Head from 'next/head';
import { Box } from "@chakra-ui/react";

type Props = {
  title: string;
}

const BaseLayout: FC<PropsWithChildren<Props>> = ({
  title,
  children,
}) => {
  const [s, setS] = useState(false);

  return (
    <>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <Box>
        <button
          onClick={
            () =>
              setS(!s)
          }
        >
          button
        </button>
        {
          s ? "true" : "false"
        }
        {children}
      </Box>
    </>
  )
}

export default BaseLayout;