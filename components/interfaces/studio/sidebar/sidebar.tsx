import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BsGrid } from "react-icons/bs";
import { selectSelectedComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ComponentsPanel from "./components";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
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

        <IconButton
          aria-label="Components"
          variant='ghost'
          icon={<Icon as={BsGrid} />}
          size='sm'
          onClick={() => {
            dispatch(componentsSliceActions.unselect())
          }}
        />
      </Flex>
      <Box>
        {component ? "" : <ComponentsPanel />}
      </Box>
    </Box>
  )
}

export default Sidebar;