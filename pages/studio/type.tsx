import { ReactElement } from "react";
import Editor from "~components/interfaces/studio/editor";
import Header from "~components/interfaces/studio/studio-header";
import Sidebar from "~components/interfaces/studio/sidebar";
import { Box, Flex } from "@chakra-ui/react";
import BaseLayout from "~components/layouts/base-layout";

function TypePage() {
  return (
    <Flex>
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

TypePage.getLayout = (page: ReactElement) => (
  <BaseLayout
    title="type"
  >
    {page}
  </BaseLayout>
)

export default TypePage;