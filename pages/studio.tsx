import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";
import Editor from "~components/interfaces/studio/editor/editor";
import Header from "~components/interfaces/studio/studio-header";
import Sidebar from "~components/interfaces/studio/sidebar";
import { Box, Flex } from "@chakra-ui/react";

function StudioPage() {
  return (
    <Flex
      bg='#f8f9fa'
    >
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Box as='main'>
          <Editor />
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