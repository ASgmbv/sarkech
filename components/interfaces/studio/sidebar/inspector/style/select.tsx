import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react"
import { FC, useState } from "react"
import { useSelect } from 'downshift'
import { FiX } from "react-icons/fi";
import { IconType } from "react-icons";

const StyleSelect: FC<{
  items: any[];
  icon: IconType;
  label: string;
}> = ({ items, icon, label }) => {
  const [selectedItem, setSelectedItem] = useState<string[] | null | undefined>(null)
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    // itemToString,
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
  })

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
            leftIcon={<Icon as={icon} boxSize='4' color='gray.400' />}
            rightIcon={
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
                  e.stopPropagation();
                }}
              />
            }
          >
            <Text as='span' flex='1' textAlign='start'>
              {selectedItem ? (
                <>
                  <Text as='span'>{selectedItem[0]}</Text>
                  <Text as='span' color='gray.400'>{` ` + selectedItem[1]}</Text>
                </>
              ) : (
                <Text as='span'>--</Text>
              )}
            </Text>
          </Button>
          <Box
            as='ul'
            {...getMenuProps()}
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
                >
                  <Text as='span' color='black'>{size[0]}</Text>
                  <Text as='span' color='gray.400'>{size[1]}</Text>
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