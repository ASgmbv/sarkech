import { Box, Button, Input, Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { selectSelectedComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const InspectorClassesPanel: FC = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<{ newClass: string }>()
  const component = useAppSelector(selectSelectedComponent);

  if (!component) return null;

  const onSubmit = (data: {
    newClass: string;
  }) => {
    dispatch(componentsSliceActions.addClasses({
      componentId: component.id,
      classes: [data.newClass]
    }))

    reset()
  }

  return (
    <Box py='4'>
      <Box mb='4'>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('newClass', { required: true })}
            size='sm'
            placeholder='Add new class...'
            fontSize='xs'
            bg='#F9FAFB'
            rounded='md'
            _focus={{
              bg: 'white'
            }}
          />
          <Button
            type='submit'
            hidden
          >
            Add
          </Button>
        </form>
      </Box>
      <Box>
        <Wrap spacing='3'>
          {component.props.className
            ?.split(' ')
            .filter(Boolean)
            .map((c) => (
              <WrapItem key={c}>
                <Tag
                  size='sm'
                  colorScheme='facebook'
                  variant='solid'
                  rounded='xl'
                  minHeight='6'
                  paddingInlineStart='3'
                  paddingInlineEnd='3'
                >
                  <TagLabel mb='-2px'>{c}</TagLabel>
                  <TagCloseButton
                    boxSize='4'
                    sx={{ svg: { boxSize: 4 } }}
                    onClick={() => {
                      dispatch(componentsSliceActions.removeClasses({
                        componentId: component.id,
                        classes: [c]
                      }))
                    }}
                  />
                </Tag>
              </WrapItem>
            ))}
        </Wrap>
      </Box>
    </Box>
  )
}

export default InspectorClassesPanel