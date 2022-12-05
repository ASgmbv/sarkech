import { Box, Flex } from "@chakra-ui/react";
import { FC } from "react"

const Header: FC = () => {
  return (
    <Flex
      height={12}
      maxHeight={12}
      px='4'
      py='2'
      alignItems='center'
      borderBottom={'1px solid'}
      borderColor='gray.200'
    >
      Header
    </Flex>
  )
}

export default Header;