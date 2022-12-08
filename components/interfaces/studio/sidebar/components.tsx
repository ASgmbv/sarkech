import { Box, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import boxPreview from 'public/images/box.svg';
import { BsSquareFill } from "react-icons/bs";
import { BiGridHorizontal } from "react-icons/bi";
import { useDraggable } from '@dnd-kit/core';

const ComponentsPanel: FC = () => {
  return (
    <Box>
      <Text
        fontSize='sm'
        fontWeight='medium'
        mb='4'
      >
        Primitives
      </Text>
      <Stack>
        <BoxComponent />
      </Stack>
    </Box>
  )
}

const BoxComponent: FC = () => {
  // const [, drag, preview] = useDrag<{ type: string }, any, string>(() => ({
  //   type: "Box",
  //   item: { type: "Box" },
  // }));

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  useEffect(() => {
    const img = new Image();
    img.src = boxPreview;

    // preview(img, {
    //   offsetX: 0,
    //   offsetY: 0,
    // });
  }, []);

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      alignItems='center'
      padding='2'
      rounded='md'
      cursor='grab'
      transition='background-color 0.2s'
      _hover={{
        bg: 'gray.100',
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
          as={BsSquareFill}
          color='gray.500'
        />
      </Center>

      <Box
        flex='1'
        px='3'
        fontSize='xs'
        fontWeight='semibold'
      >
        Box
      </Box>

      <Icon
        as={BiGridHorizontal}
      />

    </Flex>
  );
};

export default ComponentsPanel;