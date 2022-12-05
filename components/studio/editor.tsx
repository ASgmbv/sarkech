import { FC } from "react";
import Link from 'next/link';

const Editor: FC = () => {
  return (
    <>
      Editor
      <Link
        href="/studio/type"
      >
        anchor
      </Link>
    </>
  )
}

export default Editor;