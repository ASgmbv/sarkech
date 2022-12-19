import { FC, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Box,
  Text,
  Flex,
  Button,
  AspectRatio,
  SimpleGrid,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { editorSliceActions } from "redux/editor/editor.slice";
import { selectTemplatesModal } from "redux/editor/editor.selectors";
import { templates } from 'data'
import { componentsSliceActions } from "redux/components/components.slice";

const categories = [
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

const TemplatesModal: FC<{ sectionId?: string }> = ({ sectionId }) => {
  const isOpen = useAppSelector(selectTemplatesModal)
  const dispatch = useAppDispatch();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const rootChildren = useAppSelector(
    (state) => state.components.present.components["root"].childrenIds
  );

  const index = sectionId ? rootChildren.indexOf(sectionId) : undefined;

  const onClose = () => {
    dispatch(editorSliceActions.closeTemplatesModal())
  }

  const onCategoryClick = (category: string) => {
    setActiveCategory(category)
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="none"
      size='6xl'
    >
      <ModalOverlay bg='blackAlpha.400' />
      <ModalContent>
        <ModalBody p='0'>
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
              fontSize='13px'
              color='blackAlpha.700'
            >
              Choose a template
            </Text>
          </Box>
          <Flex height='70vh'>
            <Box
              width='250px'
              maxWidth='250px'
              borderRight='1px solid'
              borderColor='gray.200'
              overflow='auto'
              p='2'
            >
              <Box>
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <Box key={category}>
                      <Button
                        variant='ghost'
                        width='fit-content'
                        fontSize='15px'
                        height='9'
                        color={isActive ? '#7e22ce' : '#64748b'}
                        onClick={() => onCategoryClick(category)}
                      >
                        {category}
                      </Button>
                    </Box>
                  )
                })}
              </Box>
            </Box>
            <Box p='4' width='full'>
              <SimpleGrid
                width='full'
                columns={4}
                spacing={10}
              >
                {
                  templates.map((template) => (
                    <Button
                      key={template.name}
                      variant='unstyled'
                      onClick={() => {
                        dispatch(
                          componentsSliceActions.addTemplate({
                            template,
                            index
                          })
                        )
                        dispatch(
                          editorSliceActions.closeTemplatesModal()
                        )
                      }}
                    >
                      <AspectRatio
                        ratio={4 / 3}
                        bg='gray.100'
                        width='full'
                        rounded='md'
                      >
                        <Box>
                          {template.name}
                        </Box>
                      </AspectRatio>
                    </Button>
                  ))
                }
              </SimpleGrid>
            </Box>
          </Flex>
        </ModalBody>

      </ModalContent>
    </Modal>
  )
}

export default TemplatesModal;