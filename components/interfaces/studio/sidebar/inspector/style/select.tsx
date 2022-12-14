import { FC } from "react"
import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react"
import { useSelect } from 'downshift'
import { FiX } from "react-icons/fi";
import { IconType } from "react-icons";
import { selectClassValue, selectSelectedId } from "redux/components/components.selectors";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { componentsSliceActions } from "redux/components/components.slice";
// import { usePopper } from "react-popper";

const StyleSelect: FC<{
  items: any[][];
  icon?: IconType;
  label: string;
  classGroupId: string;
  prefix?: string;
}> = ({ items, icon, label, classGroupId, prefix }) => {
  // const [referenceElement, setReferenceElement] = useState();
  // const [popperElement, setPopperElement] = useState();
  // const { styles, attributes } = usePopper(referenceElement, popperElement);

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
  } = useAppSelector((state) => selectClassValue(state, {
    classGroupId,
    componentId: selectedId,
    prefix
  }))

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

  let displayText = <Text as='span' color='gray.400'>--</Text>

  if (classValue) {
    const itemValue = items.find((i) => i[0] === classValue)

    if (itemValue) {
      displayText = <>
        <Text as='span'>{itemValue[0]}</Text>
        {itemValue[1] && (<Text as='span' color='gray.400'>{` ` + itemValue[1]}</Text>)}
      </>
    } else {
      displayText = <Text as='span' color='gray.400'>{classValue}</Text>
    }
  }

  return (
    <Flex alignItems='center'>
      <Box width='24'>
        <Text as='label' {...getLabelProps()}>
          {label}
        </Text>
      </Box>
      <Box flex='1'>
        <Box position='relative'>
          <Button
            {...getToggleButtonProps()}
            // ref={setReferenceElement as any}
            bg='white'
            variant='unstyled'
            fontSize='xs'
            fontWeight='normal'
            paddingLeft='2'
            paddingRight='2'
            height='8'
            border='1px solid'
            borderColor='gray.200'
            _hover={{
              borderColor: 'gray.300',
              svg: { opacity: 1, }
            }}
            _focus={{
              borderColor: 'gray.300'
            }}
            width='full'
            rounded='sm'
            display='inline-flex'
            leftIcon={icon ? (<Icon as={icon} boxSize='4' color='gray.400' />) : null}
            rightIcon={
              screenValue ? (
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
              ) : null
            }
          >
            <Text as='span' flex='1' textAlign='start'>
              {displayText}
            </Text>
          </Button>
          <Box
            as='ul'
            {...getMenuProps()}
            // {...attributes.popper}
            // ref={setPopperElement as any}
            // style={styles.popper}
            position='absolute'
            width='full'
            padding='0'
            bg='white'
            maxHeight='60'
            overflowY='auto'
            rounded='sm'
            zIndex='1'
            shadow={isOpen ? 'sm' : undefined}
            borderX={isOpen ? '1px solid' : undefined}
            borderBottom={isOpen ? '1px solid' : undefined}
            borderColor={isOpen ? 'gray.200' : undefined}
          >
            {isOpen && (
              items.map((size, index) => (
                <Flex
                  as='li'
                  key={`${size[0]} ${index}`}
                  {...getItemProps({ item: size, index })}
                  py='2'
                  px='3'
                  alignItems='center'
                  justifyContent='space-between'
                  fontSize='xs'
                  fontWeight={classValue === size[0] ? 'semibold' : undefined}
                  onMouseEnter={() => {
                    let className: string;

                    if (prefix) {
                      if (size[0] === 'default')
                        className = prefix;
                      else
                        className = prefix + '-' + size[0];
                    } else
                      className = size[0]

                    onMouseEnter(className)
                  }}
                  onMouseLeave={onMouseLeave}
                  onClick={onSelect}
                  bg={highlightedIndex === index ? 'gray.100' : undefined}
                >
                  <Text as='span' color='black'>{size[0]}</Text>
                  {size[1] && (<Text as='span' color='gray.400'>{size[1]}</Text>)}
                </Flex>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default StyleSelect;