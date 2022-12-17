import { Box, Flex, Text } from "@chakra-ui/react"
import { FC, useMemo, useState } from "react"
import { shallowEqual } from "react-redux";
import { selectSelectedId, makeSelectSpacingValue } from "redux/components/components.selectors";
import { useAppSelector } from "redux/hooks";
import StyleSelect from "../select"

type SpacingChangeModes = "none" | "vertical" | "horizontal" | "all";

const onHorizontalClick = (prev: SpacingChangeModes) => {
  if (prev === "horizontal") return "none";
  else if (prev === "vertical") return "all";
  else if (prev === "all") return "vertical";
  else return "horizontal";
};

const onVerticalClick = (prev: SpacingChangeModes) => {
  if (prev === "vertical") return "none";
  else if (prev === "horizontal") return "all";
  else if (prev === "all") return "horizontal";
  else return "vertical";
};

const MarginControl: FC = () => {
  const [mode, setMode] = useState<SpacingChangeModes>("none");
  const selectedId = useAppSelector(selectSelectedId)!

  const selectSpacingValue = useMemo(makeSelectSpacingValue, [])

  const { bottom, left, right, top } = useAppSelector(
    (state) => selectSpacingValue(state, selectedId, 'm', 'm'),
    shallowEqual
  )

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
        Margin
      </Text>
      <Box>
        <Box
          maxWidth='110px'
          mx='auto'
        >
          <StyleSelect
            prefix={
              mode === "all" ? "m" : mode === "vertical" ? "my" : "mt"
            }
            items={marginOptions}
            showBorder={false}
            showReset={false}
            value={top}
            defaultVal="0"
          />
        </Box>

        <Flex
          alignItems='center'
          my='4'
        >
          <Box flex='1'>
            <StyleSelect
              prefix={
                mode === "all" ? "m" : mode === "horizontal" ? "mx" : "ml"
              }
              items={marginOptions}
              showBorder={false}
              showReset={false}
              value={left}
              defaultVal="0"
            />
          </Box>

          <Box
            position='relative'
            boxSize='5'
          >
            <Box
              as='button'
              bg={
                (mode === "horizontal" || mode === "all") ?
                  'blackAlpha.600' :
                  'blackAlpha.400'
              }
              position='absolute'
              height='2px'
              insetX='0'
              top='calc(50% - 1px)'
              onClick={() => {
                setMode(onHorizontalClick);
              }}
            >
            </Box>
            <Box
              as='button'
              bg={
                (mode === "vertical" || mode === "all") ?
                  'blackAlpha.600' :
                  'blackAlpha.400'
              }
              position='absolute'
              width='2px'
              insetY='0'
              right='calc(50% - 1px)'
              onClick={() => {
                setMode(onVerticalClick);
              }}
            >
            </Box>
          </Box>

          <Box flex='1'>
            <StyleSelect
              prefix={
                mode === "all" ? "m" : mode === "horizontal" ? "mx" : "mr"
              }
              items={marginOptions}
              showBorder={false}
              showReset={false}
              value={right}
              defaultVal="0"
            />
          </Box>
        </Flex>

        <Box
          maxWidth='110px'
          mx='auto'
        >
          <StyleSelect
            prefix={
              mode === "all" ? "m" : mode === "vertical" ? "my" : "mb"
            }
            items={marginOptions}
            showBorder={false}
            showReset={false}
            value={bottom}
            defaultVal="0"
          />
        </Box>
      </Box>
    </Box>
  )
}

const marginOptions = [
  ["0", "0px"],
  ["px", "1px"],
  ["0.5", "2px"],
  ["1", "4px"],
  ["1.5", "6px"],
  ["2", "8px"],
  ["2.5", "10px"],
  ["3", "12px"],
  ["3.5", "14px"],
  ["4", "16px"],
  ["5", "20px"],
  ["6", "24px"],
  ["7", "28px"],
  ["8", "32px"],
  ["9", "36px"],
  ["10", "40px"],
  ["11", "44px"],
  ["12", "48px"],
  ["14", "56px"],
  ["16", "64px"],
  ["20", "80px"],
  ["24", "96px"],
  ["28", "112px"],
  ["32", "128px"],
  ["36", "144px"],
  ["40", "160x"],
  ["44", "176px"],
  ["48", "192px"],
  ["52", "208px"],
  ["56", "224px"],
  ["60", "240px"],
  ["64", "256px"],
  ["72", "288px"],
  ["80", "320px"],
  ["96", "384px"],
  ['auto', 'auto']
]

export default MarginControl