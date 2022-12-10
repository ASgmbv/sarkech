import { Box, Button, Icon, IconButton, Stack } from "@chakra-ui/react"
import { FC, Fragment, useState } from "react"
import { IconType } from "react-icons";
import { BsArrowRightShort } from "react-icons/bs";
import { FiMonitor, FiSmartphone, FiSquare, FiTablet } from "react-icons/fi";
import { selectScreen } from "redux/editor/editor.selectors";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { Screen } from "types";

const screens: {
  [k in Screen]: {
    icon: IconType;
    desc: string;
    name: string;
  };
} = {
  base: {
    icon: FiSquare,
    desc: "Base",
    name: "Default",
  },
  sm: {
    icon: FiSmartphone,
    desc: ">640px",
    name: "Mobile",
  },
  md: {
    desc: ">768px",
    icon: FiTablet,
    name: "Tablet",
  },
  lg: {
    desc: ">1024px",
    icon: FiMonitor,
    name: "Monitor",
  },
};

const ScreenControl: FC = () => {
  const dispatch = useAppDispatch()
  const [isOpen, setOpen] = useState(false)
  const currentScreen = useAppSelector(selectScreen);

  return (
    <Box
      py='2'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      {isOpen ? (
        <Stack
          direction='row'
          alignItems='center'
          spacing='2'
        >
          {(Object.keys(screens) as Screen[]).map(
            (screen, idx, arr) => (
              <Fragment key={screen}>
                <IconButton
                  aria-label=""
                  icon={
                    <Icon
                      as={screens[screen].icon}
                      color={screen === currentScreen ? 'blue.400' : undefined}
                      boxSize='4'
                    />
                  }
                  onClick={() => {
                    dispatch(editorSliceActions.changeScreen(screen))
                    setOpen(false)
                  }}
                  size='xs'
                  variant='ghost'
                />
                {idx !== arr.length - 1 && (
                  <Icon as={BsArrowRightShort} />
                )}
              </Fragment>
            )
          )}
        </Stack>
      ) : (
        <Button
          size='xs'
          variant='ghost'
          onClick={() => setOpen(true)}
          leftIcon={
            <Icon
              as={screens[currentScreen].icon}
              boxSize='4'
            />
          }
          fontWeight='normal'
          fontSize='xs'
        >
          {`${screens[currentScreen].name} (${screens[currentScreen].desc})`}
        </Button>
      )}
    </Box>
  )
}

export default ScreenControl