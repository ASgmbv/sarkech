import { Box, Flex, Icon, IconButton, Text, } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { BsGrid } from "react-icons/bs";
import { selectSelectedComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import ComponentsPanel from "./components";
import Inspector from "./inspector/inspector";
import { BiDuplicate } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const Sidebar: FC = () => {
  const dispatch = useAppDispatch();
  const component = useAppSelector(
    selectSelectedComponent,
    (oldValue, newValue) => oldValue?.type === newValue?.type
  );

  return (
    <Flex
      as='aside'
      flexDir='column'
      width='310px'
      borderRight='1px solid'
      borderColor='gray.200'
      shadow='sm'
      height='calc(100vh)'
      maxHeight='calc(100vh)'
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

      <Box
        flex='1'
        overflow='auto'
      >
        {component ? <Inspector /> : <ComponentsPanel />}
      </Box>

      {component ? <Utils componentId={component.id} /> : null}

    </Flex>
  )
}

const Utils: FC<{ componentId: string }> = ({ componentId }) => {
  const dispatch = useAppDispatch();

  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      componentsSliceActions.removeComponent({
        componentId
      })
    );
  }

  const onDuplicate: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(
      componentsSliceActions.duplicateComponent({
        componentId
      })
    );
  }

  return (
    <Flex
      alignItems='center'
      height='54px'
      borderTop='1px solid'
      borderColor='gray.200'
      px='4'
      justifyContent='end'
    >
      <IconButton
        aria-label="Delete"
        onClick={onDelete}
        icon={
          <Icon
            as={AiOutlineDelete}
            boxSize='4'
          />
        }
        variant='ghost'
        size='sm'
        mr='2'
      />

      <IconButton
        aria-label="Duplicate"
        onClick={onDuplicate}
        icon={
          <Icon
            as={BiDuplicate}
            boxSize='4'
          />
        }
        variant='ghost'
        size='sm'
      />

    </Flex>
  )
}

export default Sidebar;