import { Box, Flex, HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { MdRedo, MdUndo } from "react-icons/md";

const Header: FC = () => {
  return (
    <Flex
      height={12}
      maxHeight={12}
      py='2'
      px='6'
      alignItems='center'
      borderBottom={'1px solid'}
      borderColor='gray.200'
    >
      <Box flex='1'></Box>
      <HStack
        spacing={2}
      >
        <Tooltip
          label="Undo"
        >
          <IconButton
            aria-label="Undo"
            variant='ghost'
            size='sm'
            icon={
              <Icon
                as={
                  MdUndo
                }
                boxSize='5'
              />
            }
          />
        </Tooltip>

        <Tooltip
          label='Redo'
        >
          <IconButton
            aria-label="Redo"
            variant='ghost'
            size='sm'
            icon={
              <Icon
                as={
                  MdRedo
                }
                boxSize='5'
              />
            }
          />
        </Tooltip>
      </HStack>
    </Flex>
  )
}

export default Header;