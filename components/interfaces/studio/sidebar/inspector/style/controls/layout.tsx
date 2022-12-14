import { FC } from "react";
import { Box, Stack, Text } from "@chakra-ui/react"
import StyleSelect from "../select";
import { FiHexagon } from "react-icons/fi";

const LayoutControl: FC = () => {
  return (
    <Box
      py='5'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      <Text
        fontSize='13px'
        fontWeight='medium'
        mb='3'
      >
        Layout
      </Text>
      <Stack
        ml='4'
        fontSize='xs'
        spacing='3'
      >
        <StyleSelect
          items={displayOptions}
          icon={FiHexagon}
          label="Display"
          classGroupId="display"
          prefix=""
        />
      </Stack>
    </Box>
  )
}

const displayOptions = [
  ['block'],
  ['inline-block'],
  ['inline'],
  ['flex'],
  ['inline-flex'],
  ['grid'],
  ['hidden'],
]

export default LayoutControl