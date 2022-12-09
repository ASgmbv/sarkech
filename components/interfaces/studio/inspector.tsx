import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FC, Fragment } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { selectAllParents, selectComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Inspector: FC = () => {
  const selectedId = useAppSelector(
    (state) => state.components.present.selectedId
  )

  return (
    <Box
      borderTop='1px solid'
      borderColor='gray.200'
      height='40px'
      px='4'
    >
      {selectedId ? (
        <SelectedComponentInspector
          id={selectedId}
        />
      ) : null}
    </Box>
  )
}

const SelectedComponentInspector: FC<{
  id: string;
}> = ({ id }) => {
  const parentIds = useAppSelector(
    (state) => selectAllParents(state, id)
  )

  return (
    <Flex
      alignItems='center'
      height='full'
    >
      {parentIds.map((id, index) =>
        <Fragment
          key={id}
        >
          <InspectorItem id={id} />
          {index !== parentIds.length - 1 ? <Icon as={BsArrowRightShort} /> : null}
        </Fragment>
      )}
    </Flex>
  )
}

const InspectorItem: FC<{
  id: string;
}> = ({ id }) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector(
    state => selectComponent(state, id)
  )

  return (
    <Button
      size='sm'
      variant='ghost'
      onClick={() => {
        dispatch(componentsSliceActions.select(id))
      }}
    >
      {component.type}
    </Button>
  )
}

export default Inspector;