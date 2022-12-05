import { FC, PropsWithChildren, useState } from "react";
import Head from 'next/head';

type Props = {
}

const StudioLayout: FC<PropsWithChildren<Props>> = ({
  children
}) => {
  const [selected, setSelected] = useState(false);

  return (
    <>
      <Head>
        <title>
          Studio | Sarkech
        </title>
      </Head>
      <div>
        {children}
        <div
          className=' text-xl'
        >
          Here {selected ? "true" : "false"}
          <button
            onClick={
              () => {
                setSelected(!selected);
              }
            }
          >
            button
          </button>
        </div>
      </div>
    </>
  )
}

export default StudioLayout;