import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";
import Editor from "~components/interfaces/studio/editor/editor";
import Header from "~components/interfaces/studio/studio-header";
import Sidebar from "~components/interfaces/studio/sidebar/sidebar";
import { Box, Flex } from "@chakra-ui/react";
import Inspector from "~components/interfaces/studio/inspector";

function StudioPage() {
  return (
    <Flex>
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box as='main'>
          <Editor />
          <Inspector />
        </Box>
      </Box>
    </Flex>
  );
}

StudioPage.getLayout = (page: ReactElement) => (
  <StudioLayout>
    {page}
  </StudioLayout>
)

export default StudioPage;