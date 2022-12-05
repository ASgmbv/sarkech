import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";
import Editor from "~components/studio/editor";
import Header from "~components/header";
import Sidebar from "~components/studio/sidebar";

function StudioPage() {
  return (
    <StudioLayout>
      <div
        className='flex'
      >
        <Sidebar />
        <div
          className='flex-1'
        >
          <Header />
          <main>
            <Editor />
          </main>
        </div>
      </div>
    </StudioLayout>
  );
}

// StudioPage.getLayout = (page: ReactElement) => (
//   <StudioLayout>
//     {page}
//   </StudioLayout>
// )

export default StudioPage;