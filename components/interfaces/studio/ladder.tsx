import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { FC, Fragment, useMemo } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { makeSelectAllParents, selectComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Ladder: FC = () => {
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
        <SelectedComponentLadder
          id={selectedId}
        />
      ) : null}
    </Box>
  )
}

const SelectedComponentLadder: FC<{
  id: string;
}> = ({ id }) => {
  const selectAllParents = useMemo(makeSelectAllParents, [])

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
          {/* <LadderItem id={id} /> */}
          {index !== parentIds.length - 1 ? <Icon as={BsArrowRightShort} /> : null}
        </Fragment>
      )}
    </Flex>
  )
}

const LadderItem: FC<{
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

export default Ladder;