import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";

function TypePage() {
  return (
    <div>
      Type Page
    </div>
  );
}

TypePage.getLayout = (page: ReactElement) => (
  <StudioLayout>
    {page}
  </StudioLayout>
)

export default TypePage;