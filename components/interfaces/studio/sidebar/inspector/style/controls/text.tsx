import { Box, Stack, Text, } from "@chakra-ui/react"
import { FC } from "react"
import {
  BiFontSize,
  BiFont,
  BiMoveVertical,
  BiAlignLeft,
} from "react-icons/bi";
import StyleSelect from "../select";
import { getClassGroupId } from "tailwind-merge";

const TextControl: FC = () => {
  console.log(getClassGroupId('p-2'));

  return (
    <Box
      py='4'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      <Text
        fontSize='13px'
        fontWeight='medium'
        mb='3'
      >
        Text
      </Text>
      <Stack
        ml='4'
        fontSize='xs'
        spacing='3'
      >
        <StyleSelect
          items={fontSizeOptions}
          icon={BiFontSize}
          label="Size"
        />
        <StyleSelect
          items={lineHeightOptions}
          icon={BiMoveVertical}
          label="Height"
        />
        <StyleSelect
          items={fontWeightOptions}
          icon={BiFont}
          label="Weight"
        />
        <StyleSelect
          items={textAlignOptions}
          icon={BiAlignLeft}
          label="Align"
        />
      </Stack>
    </Box>
  )
}

const fontSizeOptions = [
  ['xs', '12px'],
  ['sm', '14px'],
  ['base', '16px'],
  ['lg', '18px'],
  ['xl', '20px'],
  ['2xl', '24px'],
  ['3xl', '30px'],
  ['4xl', '36px'],
  ['5xl', '48px'],
  ['6xl', '60px'],
  ['7xl', '72px'],
  ['8xl', '96px'],
  ['9xl', '128px'],
]

const lineHeightOptions = [
  ['none', "1"],
  ['tight', '1.25'],
  ['snug', '1.375'],
  ['normal', '1.5'],
  ['relaxed', '1.625'],
  ['loose', '2'],
  ['3', '12px'],
  ['4', '16px'],
  ['5', '20px'],
  ['6', '24px'],
  ['7', '28px'],
  ['8', '32px'],
  ['9', '36px'],
  ['10', '40px'],
]

const fontWeightOptions = [
  ['thin', '100'],
  ['extralight', '200'],
  ['light', '300'],
  ['normal', '400'],
  ['medium', '500'],
  ['semibold', '600'],
  ['bold', '700'],
  ['extrabold', '800'],
  ['black', '900']
]

const textAlignOptions = [
  ['left'],
  ['center'],
  ['right'],
  ['justify'],
  ['start'],
  ['end'],
]

export default TextControl