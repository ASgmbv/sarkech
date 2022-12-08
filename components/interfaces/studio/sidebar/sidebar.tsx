import { Box, Flex, Icon, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { BsGrid } from "react-icons/bs";
import { selectSelectedComponent } from "redux/components/components.selectors";
import { useAppSelector } from "redux/hooks";
import ComponentsPanel from "./components";

const Sidebar: FC = () => {
  const component = useAppSelector(selectSelectedComponent);

  return (
    <Box
      as='aside'
      width='310px'
      borderRight='1px solid'
      borderColor='gray.200'
      shadow='sm'
    >
      <Flex
        height='48px'
        shadow='sm'
        alignItems='center'
        borderBottom='1px solid'
        borderColor='gray.200'
        justifyContent='space-between'
        align='center'
        px='4'
      >
        <Text
          fontWeight='medium'
          letterSpacing='wide'
        >
          {component ? component.type : "Components"}
        </Text>

        <Tooltip
          label="Components"
          openDelay={2000}
        >
          <IconButton
            aria-label="Components"
            variant='ghost'
            icon={<Icon as={BsGrid} />}
            size='sm'
          />
        </Tooltip>
      </Flex>
      <Box p='4'>
        {component ? "" : <ComponentsPanel />}
      </Box>
    </Box>
  )
}

export default Sidebar;