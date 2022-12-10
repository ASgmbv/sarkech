import { Box } from "@chakra-ui/react";
import { FC } from "react";
import ContentControl from "./controls/content";
import DisplayControl from "./controls/screen";

const InspectorStylePanel: FC = () => {
  return (
    <Box>
      <DisplayControl />
      <ContentControl />
    </Box>
  )
}

export default InspectorStylePanel;