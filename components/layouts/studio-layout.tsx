import { FC, PropsWithChildren } from "react";
import BaseLayout from "./base-layout";

type Props = {
}

const StudioLayout: FC<PropsWithChildren<Props>> = ({
  children
}) => {
  return (
    <BaseLayout
      title="Studio | Sarkech"
    >
      {children}
    </BaseLayout>
  )
}

export default StudioLayout;