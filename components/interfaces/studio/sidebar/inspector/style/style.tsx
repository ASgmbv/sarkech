import { FC } from "react";
import { Box } from "@chakra-ui/react";
import ContentControl from "./controls/content";
import ScreenControl from "./controls/screen";
import TextControl from "./controls/text";

const InspectorStylePanel: FC = () => {
  return (
    <Box>
      <ScreenControl />
      <ContentControl />
      <TextControl />
    </Box>
  )
}

export default InspectorStylePanel;