import { FC } from "react";
import { Box } from "@chakra-ui/react";
import ContentControl from "./controls/content";
import ScreenControl from "./controls/screen";
import TextControl from "./controls/text";
import StylesControl from "./controls/styles";
import LayoutControl from "./controls/layout";
import WidthControl from "./controls/width";

const InspectorStylePanel: FC = () => {
  return (
    <Box>
      <ScreenControl />
      <ContentControl />
      <LayoutControl />
      <TextControl />
      <StylesControl />
      <WidthControl />
    </Box>
  )
}

export default InspectorStylePanel;