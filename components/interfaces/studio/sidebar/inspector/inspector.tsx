import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { FC } from "react"
import { IComponent } from "types"
import InspectorClassesPanel from "./classes";
import InspectorStylePanel from "./style";

type Props = {
  component: IComponent;
}

const Inspector: FC<Props> = ({ component }) => {

  return (
    <Box px='4'>
      <Tabs variant='sidebar'>
        <TabList>
          <Tab>Style</Tab>
          <Tab>Classes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <InspectorStylePanel />
          </TabPanel>
          <TabPanel>
            <InspectorClassesPanel
              component={component}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default Inspector