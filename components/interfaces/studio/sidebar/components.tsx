import { Box, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { BsJustifyLeft, BsSquareFill } from "react-icons/bs";
import { BiGridHorizontal } from "react-icons/bi";
import { useDrag, } from "react-dnd";
import { IconType } from "react-icons/lib";
import { IComponentType } from "types";
import { FiArrowRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { editorSliceActions } from "redux/editor/editor.slice";
import { selectVariant } from "redux/editor/editor.selectors";

const components: ({
  category: 'single';
  component: {
    name: string;
    icon: IconType;
    type: IComponentType;
    previewImage: string;
  }
} | {
  category: 'variable';
  component: {
    name: string;
    icon: IconType;
  }
})[] = [
    {
      category: 'single',
      component: {
        name: "Box",
        type: "Box",
        icon: BsSquareFill,
        previewImage: '/images/box.svg'
      }
    },
    {
      category: 'variable',
      component: {
        name: "Text",
        icon: BsJustifyLeft
      }
    }
  ];

const ComponentsPanel: FC = () => {
  const dispatch = useAppDispatch();
  const variant = useAppSelector(selectVariant);

  return (
    <Box
      padding='4'
      onMouseLeave={() => {
        dispatch(editorSliceActions.setVariant(null))
      }}
    >
      <Box>
        <Text
          fontSize='sm'
          fontWeight='medium'
          mb='4'
        >
          Primitives
        </Text>
        <Stack>
          {components.map(({
            category,
            component,
          }) => {

            if (category === 'single') {
              return (
                <SingleComponent
                  key={component.name}
                  name={component.name}
                  type={component.type}
                  icon={component.icon}
                  previewImage={component.previewImage}
                />
              )
            }

            return (
              <VariableComponent
                key={component.name}
                name={component.name}
                icon={component.icon}
              />
            )
          })}
        </Stack>
      </Box>
      {variant ? (
        <Box
          position='absolute'
          left='309px'
          width='250px'
          bottom='0'
          top='48px'
          maxWidth='250px'
          borderX='1px solid'
          borderColor='gray.200'
          padding='4'
          overflow='auto'
          bg='white'
          onMouseLeave={() => {
            dispatch(editorSliceActions.setVariant(null))
          }}
        >
          Popover
        </Box>
      ) : null}
    </Box>
  )
}

const SingleComponent: FC<{
  name: string;
  icon: IconType;
  type: IComponentType;
  previewImage: string;
}> = ({
  name,
  icon,
  type,
  previewImage,
}) => {
    const dispatch = useAppDispatch();

    const [, drag, preview] = useDrag(() => ({
      type,
      item: { type },
    }));

    useEffect(() => {
      const img = new Image();
      img.src = previewImage;

      preview(img, {
        offsetX: 0,
        offsetY: 0,
      });
    }, [preview, previewImage]);

    return (
      <Flex
        ref={drag}
        alignItems='center'
        padding='2'
        rounded='md'
        cursor='grab'
        transition='background-color 0.2s'
        _hover={{
          bg: 'gray.100',
        }}
        onMouseEnter={() => {
          dispatch(editorSliceActions.setVariant(null))
        }}
      >
        <Center
          shadow='lg'
          border='1px solid'
          borderColor='blackAlpha.100'
          rounded='md'
          p='2'
        >
          <Icon
            as={icon}
            color='gray.500'
          />
        </Center>

        <Box
          flex='1'
          px='3'
          fontSize='xs'
          fontWeight='semibold'
        >
          {name}
        </Box>

        <Icon
          as={BiGridHorizontal}
        />
      </Flex>
    );
  };

const VariableComponent: FC<{
  name: string;
  icon: IconType;
}> = ({
  name,
  icon,
}) => {
    const dispatch = useAppDispatch();

    return (
      <Flex
        alignItems='center'
        rounded='md'
        padding='2'
        transition='background-color 0.2s'
        _hover={{
          bg: 'gray.100'
        }}
        onMouseEnter={() => {
          console.log('here')
          dispatch(editorSliceActions.setVariant(name))
        }}
      >
        <Center
          shadow='lg'
          border='1px solid'
          borderColor='blackAlpha.100'
          rounded='md'
          p='2'
        >
          <Icon
            as={icon}
            color='gray.500'
          />
        </Center>

        <Box
          flex='1'
          px='3'
          fontSize='xs'
          fontWeight='semibold'
        >
          {name}
        </Box>

        <Icon
          as={FiArrowRight}
        />
      </Flex>
    )
  }

export default ComponentsPanel;