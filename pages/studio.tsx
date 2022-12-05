import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";
import Editor from "~components/interfaces/studio/editor";
import Header from "~components/layouts/header/header";
import Sidebar from "~components/interfaces/studio/sidebar";
import { Box, Flex } from "@chakra-ui/react";

function StudioPage() {
  return (
    <StudioLayout>
      <Flex>
        <Sidebar />
        <Box flex={1}>
          <Header />
          <Box as='main'>
            <Editor />
          </Box>
        </Box>
      </Flex>
    </StudioLayout>
  );
}

StudioPage.getLayout = (page: ReactElement) => (
  <StudioLayout>
    {page}
  </StudioLayout>
)

export default StudioPage;