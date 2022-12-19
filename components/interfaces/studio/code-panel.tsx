/* eslint-disable react/jsx-key */
import { Box, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Text } from "@chakra-ui/react"
import { FC, useEffect, useState } from "react"
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks"
import { generateCode } from "utils/generate-code";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodePanel: FC = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector((state) => state.editor.showCodePanel);

  const components = useAppSelector(
    (state) => state.components.present.components
  );

  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    const getCode = async () => {
      const code = await generateCode(components);
      console.log({ code });
      setCode(code);
    };

    getCode();
  }, [components]);

  return (
    <Modal
      isOpen={showModal}
      isCentered
      motionPreset="none"
      size='6xl'
      onClose={() => {
        dispatch(editorSliceActions.closeCodePanelModal())
      }}
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
          <Box
            height='70vh'
            bg='red.100'
            minHeight='full'
            overflow='auto'
            padding='2'
            backgroundColor='#011627'
          >
            <Highlight
              {...defaultProps}
              code={code || "// Formatting code… Please wait"}
              language="jsx"
              theme={theme}
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={style}>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CodePanel