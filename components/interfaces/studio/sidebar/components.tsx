import { Box, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { createElement, FC, useEffect } from "react";
import { BsJustifyLeft, BsSquareFill } from "react-icons/bs";
import { BiGridHorizontal } from "react-icons/bi";
import { useDrag, } from "react-dnd";
import { IconType } from "react-icons/lib";
import { IComponentType } from "types";
import { FiArrowRight } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { editorSliceActions } from "redux/editor/editor.slice";
import { selectVariant } from "redux/editor/editor.selectors";
import { mapComponentToHTMLElement } from "../editor/components/component";

type SingleComponent = {
  category: 'single';
  component: {
    name: string;
    icon: IconType;
    type: IComponentType;
    previewImage: string;
  }
}

type Variant = {
  name: string;
  type: IComponentType;
  props: Record<string, any>;
  previewImage: string;
}

type MultipleComponent = {
  category: 'variable';
  component: {
    name: string;
    icon: IconType;
    variants: Variant[]
  }
}

const components: (SingleComponent | MultipleComponent)[] = [
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
      icon: BsJustifyLeft,
      variants: [
        {
          name: "Paragraph",
          type: "Paragraph",
          previewImage: '/images/box.svg',
          props: {
            className: ''
          }
        }
      ]
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
          <Variants
            title={variant}
          />
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
        _hover={{ bg: 'gray.100' }}
        onMouseEnter={() => {
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

const Variants: FC<{
  title: string;
}> = ({
  title
}) => {
    const component = components.find((i) =>
      i.category === 'variable' && i.component.name === title
    );

    if (!component) return null;

    return (
      <Box>
        <Text
          fontSize='13px'
          color='gray.500'
          mb='3'
        >
          {title}
        </Text>
        <Stack>
          {(component as MultipleComponent).component.variants.map(
            (variant) => (
              <Variant
                key={variant.type}
                type={variant.type}
                name={variant.name}
                props={variant.props}
                previewImage={variant.previewImage}
              />
            )
          )}
        </Stack>
      </Box>
    )
  }

const Variant: FC<{
  type: IComponentType;
  name: string;
  props: Record<string, any>;
  previewImage: string;
}> = ({
  type,
  name,
  props,
  previewImage,
}) => {
    const dispatch = useAppDispatch();

    const [{ isDragging }, drag, preview] = useDrag(() => ({
      type,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }));

    useEffect(() => {
      const img = new Image();
      img.src = previewImage;

      preview(img, {
        offsetX: 0,
        offsetY: 0,
      });
    }, [preview, type, previewImage]);

    useEffect(() => {
      if (isDragging) {
        dispatch(editorSliceActions.setVariant(null))
      }
    }, [isDragging, dispatch])

    return (
      <Flex
        ref={drag}
        padding='2'
        bg='gray.100'
        rounded='md'
        alignItems='center'
        justifyContent='center'
        position='relative'
        cursor='grab'
        _hover={{
          shadow: 'md'
        }}
      >
        <Box
          position='absolute'
          top='0'
          left='0'
          width='full'
          height='full'
        ></Box>

        {createElement(
          mapComponentToHTMLElement[type],
          { ...props },
          name
        )}
      </Flex>
    )
  }

export default ComponentsPanel;