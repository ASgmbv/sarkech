import { Box, Text, Textarea } from "@chakra-ui/react"
import { FC } from "react"
import { selectSelectedComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const textComponents = [
  "Span",
  "Paragraph",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "Button",
]

const imageComponents = [
  'Image'
]

const contentComponents = [
  ...textComponents,
  ...imageComponents,
]

const ContentControl: FC = () => {
  const component = useAppSelector(selectSelectedComponent);

  if (!component) return null;

  if (!contentComponents.includes(component.type)) return null;

  return (
    <Box
      py='4'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      <TextEdit />
    </Box>
  )
}

const TextEdit: FC = () => {
  const dispatch = useAppDispatch()
  const component = useAppSelector(selectSelectedComponent);

  if (!component) return null;

  if (!textComponents.includes(component.type)) return null;

  return (
    <Box>
      <Textarea
        placeholder="Edit text"
        rows={5}
        size='sm'
        fontSize='xs'
        bg='#F9FAFB'
        rounded='md'
        _focus={{
          bg: 'white'
        }}
        onChange={(e) => {
          dispatch(
            componentsSliceActions.setProps({
              componentId: component.id,
              props: {
                children: e.target.value || "",
              },
            })
          );
        }}
        value={component.props.children || ''}
      />
    </Box>
  );
};

export default ContentControl;