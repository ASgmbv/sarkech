import { FC } from "react"
import { Box, Stack, Text } from "@chakra-ui/react"
import StyleSelect from "../select"

const HeightControl: FC = () => {
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
        Height
      </Text>
      <Stack
        ml='4'
        fontSize='xs'
        spacing='3'
      >
        <StyleSelect
          items={heightOptions}
          label="Width"
          classGroupId="h"
          prefix="h"
        />
        <StyleSelect
          items={maxHeightOpptions}
          label="Max"
          classGroupId="max-h"
          prefix="max-h"
        />
        <StyleSelect
          items={minHeightOptions}
          label="Min"
          classGroupId="min-h"
          prefix="min-h"
        />
      </Stack>
    </Box>
  )
}

const heightOptions = [
  ['0', '0px'],
  ['px', '1px'],
  ['0.5', '2px'],
  ['1', '4px'],
  ['1.5', '6px'],
  ['2', '8px'],
  ['2.5', '10px'],
  ['3', '12px'],
  ['3.5', '14px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
  ['11', '44px'],
  ['12', '48px'],
  ['14', '56px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['28', '112px'],
  ['32', '128px'],
  ['36', '144px'],
  ['40', '160px'],
  ['44', '176px'],
  ['48', '192px'],
  ['52', '208px'],
  ['56', '224px'],
  ['60', '240px'],
  ['64', '256px'],
  ['72', '288px'],
  ['80', '320px'],
  ['96', '384px'],
  ['auto', 'auto'],
  ['1/2', '50%'],
  ['1/3', '33.3%'],
  ['2/3', '66.6%'],
  ['1/4', '25%'],
  ['2/4', '50%'],
  ['3/4', '75%'],
  ['1/5', '20%'],
  ['2/5', '40%'],
  ['3/5', '60%'],
  ['4/5', '80%'],
  ['1/6', '16.6%'],
  ['2/6', '33.3%'],
  ['3/6', '50%'],
  ['4/6', '66.6%'],
  ['5/6', '83.3%'],
  ['1/12', '8.3%'],
  ['2/12', '16.6%'],
  ['3/12', '25%'],
  ['4/12', '33.3%'],
  ['5/12', '41.6%'],
  ['6/12', '50%'],
  ['7/12', '58.3%'],
  ['8/12', '66.6%'],
  ['9/12', '75%'],
  ['10/12', '83.3%'],
  ['11/12', '91.6%'],
  ['full', '100%'],
  ['screen', '100vw'],
  ['min', 'min-content'],
  ['max', 'max-content'],
  ['fit', 'fit-content'],
]

const maxHeightOpptions = [
  ['0', '0px;'],
  ['px', '1px;'],
  ['0.5', '2px'],
  ['1', '4px'],
  ['1.5', '6px'],
  ['2', '8px'],
  ['2.5', '10px'],
  ['3', '12px'],
  ['3.5', '14px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
  ['11', '44px'],
  ['12', '48px'],
  ['14', '56px'],
  ['16', '64px'],
  ['20', '80px'],
  ['24', '96px'],
  ['28', '112px'],
  ['32', '128px'],
  ['36', '144px'],
  ['40', '160px'],
  ['44', '176px'],
  ['48', '192px'],
  ['52', '208px'],
  ['56', '224px'],
  ['60', '240px'],
  ['64', '256px'],
  ['72', '288px'],
  ['80', '320px'],
  ['96', '384px'],
  ['full', '100%;'],
  ['screen', '100vh;'],
  ['min', 'min-content;'],
  ['max', 'max-content;'],
  ['fit', 'fit-content;'],
]

const minHeightOptions = [
  ['0', '0px'],
  ['full', '100%'],
  ['screen', '100vh'],
  ['min', 'min-content'],
  ['max', 'max-content'],
  ['fit', 'fit-content'],
]

export default HeightControl