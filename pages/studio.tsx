import { ReactElement } from "react";
import StudioLayout from "~layouts/studio-layout";
import Editor from "~components/interfaces/studio/editor";

function StudioPage() {
  return (
    <Editor />
  );
}

StudioPage.getLayout = (page: ReactElement) => (
  <StudioLayout>
    {page}
  </StudioLayout>
)

export default StudioPage;