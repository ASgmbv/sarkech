import { Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
    <Box
      as='aside'
      width='310px'
      borderRight='1px solid'
      borderColor='gray.200'
      shadow='sm'
    >
      <Flex
        height='48px'
        px='4'
        shadow='sm'
        alignItems='center'
        borderBottom='1px solid'
        borderColor='gray.200'
      >
        <Text
          fontWeight='medium'
          letterSpacing='wide'
        >
          Elements
        </Text>
      </Flex>
    </Box>
  )
}

export default Sidebar;