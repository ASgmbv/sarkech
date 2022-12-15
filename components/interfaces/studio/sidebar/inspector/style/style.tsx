import { FC } from "react";
import { Box } from "@chakra-ui/react";
import ContentControl from "./controls/content";
import ScreenControl from "./controls/screen";
import TextControl from "./controls/text";
import StylesControl from "./controls/styles";
import LayoutControl from "./controls/layout";
import WidthControl from "./controls/width";
import HeightControl from "./controls/height";
import PaddingControl from "./controls/padding";
import MarginControl from "./controls/margin";

const InspectorStylePanel: FC = () => {
  return (
    <Box>
      <ScreenControl />
      <ContentControl />
      <LayoutControl />
      <StylesControl />
      <TextControl />
      <PaddingControl />
      <MarginControl />
      <WidthControl />
      <HeightControl />
    </Box>
  )
}

export default InspectorStylePanel;