import { FC } from "react"
import { Box, Flex, Text, Icon, Button, usePopper, useMergeRefs } from "@chakra-ui/react"
import { useSelect } from 'downshift'
import { FiX } from "react-icons/fi";
import { IconType } from "react-icons";
import { selectClassValue, selectSelectedId } from "redux/components/components.selectors";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { componentsSliceActions } from "redux/components/components.slice";

type Props = {
  items: any[][];
  icon?: IconType;
  label?: string;
  prefix?: string;
  classGroupId?: string;
  value?: string | null;
  showBorder?: boolean;
  showReset?: boolean;
  defaultVal?: string;
  isColorSelect?: boolean;
}

const StyleSelect: FC<Props> = ({
  items,
  icon,
  label,
  classGroupId,
  prefix,
  showBorder = true,
  showReset = true,
  isColorSelect = false,
  value,
  defaultVal
}) => {
  const dispatch = useAppDispatch()

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    closeMenu,
  } = useSelect({ items })

  const selectedId = useAppSelector(selectSelectedId)!

  const {
    value: classValue,
    screenValue
  } = useAppSelector((state) => {
    return classGroupId ? selectClassValue(state, {
      classGroupId,
      componentId: selectedId,
      prefix
    }) : ({
      value: undefined,
      screenValue: undefined
    })
  })

  const onSelect = () => {
    dispatch(
      componentsSliceActions.keepCurrentClassName({
        componentId: selectedId
      })
    )

    closeMenu()
  }

  const onMouseEnter = (newClass: string) => {
    dispatch(
      componentsSliceActions.addResponsiveClass({
        componentId: selectedId,
        newClass
      })
    )
  }

  const onMouseLeave = () => {
    dispatch(
      componentsSliceActions.returnPreviousClassName({
        componentId: selectedId
      })
    )
  }

  const onXCLick = (className: string) => {
    dispatch(
      componentsSliceActions.removeResponsiveClass({
        componentId: selectedId,
        classToRemove: className
      })
    )
  }

  // ------------------------------------------------

  /**
   * use value depending of classGroupId
   */

  const val = (classGroupId === undefined ? value : classValue) || defaultVal;

  let displayText = <Text as='span' color='gray.400'>--</Text>

  if (val) {
    const itemValue = items.find((i) => i[0] === val)

    if (itemValue) {
      displayText = <>
        <Text as='span'>{itemValue[0]}</Text>
        {itemValue[1] && (<Text as='span' color='gray.400'>{` ` + itemValue[1]}</Text>)}
      </>
    } else {
      displayText = <Text as='span' color='gray.400'>{val}</Text>
    }
  }

  const { popperRef, referenceRef } = usePopper({
    offset: [0, 0],
    matchWidth: !isColorSelect
  })

  const buttonRefs = useMergeRefs(referenceRef, getToggleButtonProps().ref)
  const listRefs = useMergeRefs(popperRef, getMenuProps().ref)

  return (
    <Flex alignItems='center'>
      {label ? (
        <Box width='24'>
          <Text as='label' {...getLabelProps()}>
            {label}
          </Text>
        </Box>
      ) : null}

      <Box flex='1'>
        <Button
          {...getToggleButtonProps()}
          ref={buttonRefs}
          bg='white'
          variant='unstyled'
          fontSize='xs'
          fontWeight='normal'
          paddingLeft='2'
          paddingRight='2'
          height='8'
          border={showBorder ? '1px solid' : undefined}
          borderColor='gray.200'
          _hover={{
            border: '1px solid',
            borderColor: 'gray.300',
            svg: { opacity: 1, }
          }}
          _focus={{
            border: '1px solid',
            borderColor: 'gray.300'
          }}
          width='full'
          rounded='sm'
          display='inline-flex'
          leftIcon={
            icon ?
              <Icon as={icon} boxSize='4' color='gray.400' />
              :
              <Box boxSize='4'></Box>
          }
          rightIcon={
            (showReset && screenValue) ? (
              <Icon
                as={FiX}
                opacity='0'
                aria-label=""
                rounded='full'
                boxSize='4'
                padding='2px'
                transition='all 0.3s'
                color='gray.500'
                _hover={{ bg: 'gray.200' }}
                _active={{ bg: 'gray.300' }}
                onClick={(e) => {
                  e.stopPropagation()

                  let className: string;

                  if (prefix) {
                    if (screenValue === 'default')
                      className = prefix;
                    else
                      className = prefix + '-' + screenValue;
                  } else
                    className = screenValue

                  onXCLick(className)
                }}
              />
            ) : <Box boxSize='4'></Box>
          }
        >
          <Text
            as='span'
            flex='1'
            textAlign={icon ? 'start' : 'center'}
          >
            {displayText}
          </Text>
        </Button>
        <Box
          as='ul'
          {...getMenuProps()}
          ref={listRefs}
          padding='0'
          bg='white'
          maxHeight='60'
          overflowY='auto'
          rounded='sm'
          zIndex='100'
          shadow={isOpen ? 'sm' : undefined}
          border={isOpen ? '1px solid' : undefined}
          borderColor={isOpen ? 'gray.200' : undefined}
        >
          {isOpen && (
            items.map((item, index) => (
              <Flex
                as='li'
                key={`${item[0]} ${index}`}
                {...getItemProps({
                  item,
                  index
                })}
                py='2'
                px='3'
                alignItems='center'
                justifyContent='space-between'
                fontSize='xs'
                fontWeight={val === item[0] ? 'semibold' : undefined}
                onMouseEnter={() => {
                  let className: string;

                  if (prefix) {
                    if (item[0] === 'default')
                      className = prefix;
                    else
                      className = prefix + '-' + item[0];
                  } else
                    className = item[0]

                  onMouseEnter(className)
                }}
                onMouseLeave={onMouseLeave}
                onClick={onSelect}
                bg={highlightedIndex === index ? 'gray.100' : undefined}
              >
                <Text as='span' color='black'>{item[0]}</Text>
                {item[1] && (<Text as='span' color='gray.400'>{item[1]}</Text>)}
              </Flex>
            ))
          )}
        </Box>
      </Box>
    </Flex>
  )
}

export default StyleSelect;