import { Box, Stack, Text } from "@chakra-ui/react"
import { FC } from "react"
import { FiCircle, FiSun } from "react-icons/fi"
import StyleSelect from "../select"

const StylesControl: FC = () => {
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
        Styles
      </Text>
      <Stack
        ml='4'
        fontSize='xs'
        spacing='3'
      >
        <StyleSelect
          items={boxShadowOptions}
          icon={FiSun}
          label="Shadow"
          classGroupId="shadow"
          prefix="shadow"
        />
        <StyleSelect
          items={borderRadiusOptions}
          icon={FiCircle}
          label="Radius"
          classGroupId="rounded"
          prefix="rounded"
        />
      </Stack>
    </Box>
  )
}

const boxShadowOptions = [
  ['sm'],
  ['default'],
  ['md'],
  ['lg'],
  ['xl'],
  ['2xl'],
  ['inner'],
  ['none'],
]

const borderRadiusOptions = [
  ['none'],
  ['sm'],
  ['default'],
  ['md'],
  ['lg'],
  ['xl'],
  ['2xl'],
  ['3xl'],
  ['full']
]

export default StylesControl