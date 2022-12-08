import { Box, Center, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";
// import boxPreview from 'public/images/box.svg';
import { BsSquareFill } from "react-icons/bs";
import { BiGridHorizontal } from "react-icons/bi";
import { useDrag } from "react-dnd";

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
        <Card />
      </Stack>
    </Box>
  )
}

const Card: FC = () => {
  const [, dragRef] = useDrag(
    () => ({
      type: "CARD",
    }),
    []
  )

  return (
    <div
      ref={dragRef}
    >
      Card
    </div>
  )
}

// const BoxComponent: FC = () => {
//   const [, drag] = useDrag(() => ({
//     type: "Box",
//     item: { type: "Box" },
//   }));

//   // useEffect(() => {
//   //   const img = new Image();
//   //   img.src = boxPreview;

//   //   // preview(img, {
//   //   //   offsetX: 0,
//   //   //   offsetY: 0,
//   //   // });
//   // }, []);

//   return (
//     <Flex
//       ref={drag}
//       alignItems='center'
//       padding='2'
//       rounded='md'
//       cursor='grab'
//       transition='background-color 0.2s'
//       _hover={{
//         bg: 'gray.100',
//       }}
//     >
//       <Center
//         shadow='lg'
//         border='1px solid'
//         borderColor='blackAlpha.100'
//         rounded='md'
//         p='2'
//       >
//         <Icon
//           as={BsSquareFill}
//           color='gray.500'
//         />
//       </Center>

//       <Box
//         flex='1'
//         px='3'
//         fontSize='xs'
//         fontWeight='semibold'
//       >
//         Box
//       </Box>

//       <Icon
//         as={BiGridHorizontal}
//       />
//     </Flex>
//   );
// };

export default ComponentsPanel;