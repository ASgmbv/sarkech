import { Box, Button, Flex, HStack, Icon, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { MdRedo, MdUndo } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ActionCreators } from "redux-undo";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppSelector } from "redux/hooks";
import CodePanel from "./code-panel";

const Header: FC = () => {
  const dispatch = useDispatch();
  const history = useAppSelector((state) => ({
    hasPastHistory: state.components.past.length !== 0,
    hasFutureHistory: state.components.future.length !== 0,
  }));

  return (
    <Flex
      height={12}
      maxHeight={12}
      py='2'
      px='6'
      alignItems='center'
      borderBottom={'1px solid'}
      borderColor='gray.200'
    >
      <Box flex='1'></Box>
      <HStack
        spacing={2}
        mr='4'
      >
        <IconButton
          aria-label="Undo"
          variant='ghost'
          size='sm'
          icon={
            <Icon
              as={MdUndo}
              boxSize='5'
            />
          }
          onClick={() => {
            dispatch(ActionCreators.undo());
          }}
          disabled={!history.hasPastHistory}
        />

        <IconButton
          aria-label="Redo"
          variant='ghost'
          size='sm'
          icon={
            <Icon
              as={MdRedo}
              boxSize='5'
            />
          }
          onClick={() => {
            dispatch(ActionCreators.redo());
          }}
          disabled={!history.hasFutureHistory}
        />
      </HStack>
      <Button
        colorScheme='purple'
        size='sm'
        onClick={() => {
          dispatch(editorSliceActions.openCodePanelModal())
        }}
      >
        Code
      </Button>
      <CodePanel />
    </Flex>
  )
}

export default Header;