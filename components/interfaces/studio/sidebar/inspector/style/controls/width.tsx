import { FC } from "react"
import { Box, Stack, Text } from "@chakra-ui/react"
import StyleSelect from "../select"

const WidthControl: FC = () => {
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
          items={widthOptions}
          label="Width"
          classGroupId="w"
          prefix=""
        />
      </Stack>
    </Box>
  )
}

const widthOptions = [
  ['w-0', '0px'],
  ['w-px', '1px'],
  ['w-0.5', '2px'],
  ['w-1', '4px'],
  ['w-1.5', '6px'],
  ['w-2', '8px'],
  ['w-2.5', '10px'],
  ['w-3', '12px'],
  ['w-3.5', '14px'],
  ['w-4', '16px'],
  ['w-5', '20px'],
  ['w-6', '24px'],
  ['w-7', '28px'],
  ['w-8', '32px'],
  ['w-9', '36px'],
  ['w-10', '40px'],
  ['w-11', '44px'],
  ['w-12', '48px'],
  ['w-14', '56px'],
  ['w-16', '64px'],
  ['w-20', '80px'],
  ['w-24', '96px'],
  ['w-28', '112px'],
  ['w-32', '128px'],
  ['w-36', '144px'],
  ['w-40', '160px'],
  ['w-44', '176px'],
  ['w-48', '192px'],
  ['w-52', '208px'],
  ['w-56', '224px'],
  ['w-60', '240px'],
  ['w-64', '256px'],
  ['w-72', '288px'],
  ['w-80', '320px'],
  ['w-96', '384px'],
  ['w-auto', 'auto'],
  ['w-1/2', '50%'],
  ['w-1/3', '33.3%'],
  ['w-2/3', '66.6%'],
  ['w-1/4', '25%'],
  ['w-2/4', '50%'],
  ['w-3/4', '75%'],
  ['w-1/5', '20%'],
  ['w-2/5', '40%'],
  ['w-3/5', '60%'],
  ['w-4/5', '80%'],
  ['w-1/6', '16.6%'],
  ['w-2/6', '33.3%'],
  ['w-3/6', '50%'],
  ['w-4/6', '66.6%'],
  ['w-5/6', '83.3%'],
  ['w-1/12', '8.3%'],
  ['w-2/12', '16.6%'],
  ['w-3/12', '25%'],
  ['w-4/12', '33.3%'],
  ['w-5/12', '41.6%'],
  ['w-6/12', '50%'],
  ['w-7/12', '58.3%'],
  ['w-8/12', '66.6%'],
  ['w-9/12', '75%'],
  ['w-10/12', '83.3%'],
  ['w-11/12', '91.6%'],
  ['w-full', '100%'],
  ['w-screen', '100vw'],
  ['w-min', 'min-content'],
  ['w-max', 'max-content'],
  ['w-fit', 'fit-content'],
]

export default WidthControl