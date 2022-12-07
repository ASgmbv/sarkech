import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Flex,
  Stack,
  Button,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { editorSliceActions } from "redux/editor/editor.slice";
import { selectTemplatesModal } from "redux/editor/editor.selectors";

const categories = [
  "Basic",
  "Pricing",
  "Testimonials",
  "Team",
  "Services",
  "Portfolio",
  "Hero",
  "Header",
  "Footer",
  "Features",
  "FAQ",
  "Contact",
  "Clients",
  "About",
  "Call to action",
]

const TemplatesModal: FC = () => {
  const isOpen = useAppSelector(selectTemplatesModal)
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const onClose = () => {
    dispatch(editorSliceActions.closeTemplatesModal())
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="none"
      size='6xl'
    >
      <ModalOverlay
        bg='blackAlpha.400'
      />
      <ModalContent>
        <ModalBody
          p='0'
        >
          <Box
            p='4'
            borderBottom='1px solid'
            borderColor='blackAlpha.300'
          >
            <Text
              fontWeight='bold'
              fontSize='lg'
            >
              Templates
            </Text>
            <Text
              fontSize='xs'
              color='blackAlpha.800'
            >
              Choose a template
            </Text>
          </Box>
          <Flex
            height='60vh'
          >
            <Box
              width='250px'
              maxWidth='250px'
              borderRight='1px solid'
              borderColor='gray.200'
              p='4'
              overflow='auto'
            >
              <Stack>
                {
                  categories.map((category) => (
                    <Button
                      key={category}
                      variant='ghost'
                      width='fit-content'
                      color={
                        activeCategory === category
                          ?
                          'purple.600'
                          :
                          undefined
                      }
                      onClick={
                        () => {
                          setActiveCategory(category)
                        }
                      }

                    >
                      {
                        category
                      }
                    </Button>
                  ))
                }
              </Stack>
            </Box>
            <Box></Box>
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}

export default TemplatesModal;