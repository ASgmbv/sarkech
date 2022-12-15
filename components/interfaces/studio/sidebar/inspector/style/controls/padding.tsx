import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { FC } from "react"
import StyleSelect from "../select"

const PaddingControl: FC = () => {
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
        Padding
      </Text>
      <Box>
        <Box
          maxWidth='110px'
          mx='auto'
        >
          <StyleSelect
            classGroupId="p"
            items={paddingOptions}
            showBorder={false}
          />
        </Box>

        <Flex
          alignItems='center'
          my='4'
        >
          <Box flex='1'>
            <StyleSelect
              classGroupId="p"
              items={paddingOptions}
              showBorder={false}
            />
          </Box>

          <Box
            position='relative'
            boxSize='5'
          >
            <Box
              as='button'
              bg='blackAlpha.400'
              position='absolute'
              height='2px'
              insetX='0'
              top='calc(50% - 1px)'
            >
            </Box>
            <Box
              as='button'
              bg='blackAlpha.400'
              position='absolute'
              width='2px'
              insetY='0'
              right='calc(50% - 1px)'
            >
            </Box>
          </Box>

          <Box flex='1'>
            <StyleSelect
              classGroupId="p"
              items={paddingOptions}
              showBorder={false}
            />
          </Box>

        </Flex>

        <Box
          maxWidth='110px'
          mx='auto'
        >
          <StyleSelect
            classGroupId="p"
            items={paddingOptions}
            showBorder={false}
          />
        </Box>
      </Box>
    </Box>
  )
}

const paddingOptions = [
  []
]

export default PaddingControl