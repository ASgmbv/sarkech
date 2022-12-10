import { Box, Button, Input, Tag, TagCloseButton, TagLabel, Wrap, WrapItem } from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch } from "redux/hooks";
import { IComponent } from "types";

type Props = {
  component: IComponent;
}

const InspectorClassesPanel: FC<Props> = ({ component }) => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, reset } = useForm<{ newClass: string }>()

  const onSubmit = (data: {
    newClass: string;
  }) => {
    dispatch(componentsSliceActions.addClasses({
      elementId: component.id,
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
        <Wrap>
          {component.props.className?.split(' ')
            .map((c) => (
              <WrapItem key={c}>
                <Tag>
                  <TagLabel>{c}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      dispatch(componentsSliceActions.removeClasses({
                        elementId: component.id,
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