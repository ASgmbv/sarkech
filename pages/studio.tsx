import { ReactElement } from "react";
import StudioLayout from "~components/layouts/studio-layout";
import Editor from "~components/interfaces/studio/editor";
import Header from "~components/interfaces/studio/studio-header";
import Sidebar from "~components/interfaces/studio/sidebar";
import { Box, Flex } from "@chakra-ui/react";

import Link from 'next/link';

function StudioPage() {
  return (
    <Flex>
      <Sidebar />
      <Box flex={1}>
        <Header />
        <Link
          href='/studio/type'
        >
          link
        </Link>
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