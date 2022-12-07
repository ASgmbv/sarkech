import { Box, Flex } from "@chakra-ui/react";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { FC, MouseEvent, MouseEventHandler, useRef, useState } from "react";

const MAX_WIDTH = 1280;
const MIN_WIDTH = 356;
const HANDLE_WIDTH = 17;
const GAP = 24;

const Editor: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [resizing, setResizing] = useState<{
    side: 'left' | 'right',
    startX: number;
    startWidth: number;
  } | null>(null);

  const [editorSize, setEditorSize] = useState({
    width: 0,
    height: 0,
  });

  const [maxWidth, setMaxWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    if (resizing) {
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [resizing]);

  useIsomorphicLayoutEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      const maxWidth = Math.round(width < (MAX_WIDTH + 2 * GAP) ? width - GAP * 2 : MAX_WIDTH);

      console.log(width, maxWidth)

      setEditorSize({
        width: maxWidth,
        height,
      });

      setMaxWidth(maxWidth);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    function onMouseUp(event: MouseEventInit) {
      setResizing(null);
    }

    const onMouseMove = (event: MouseEventInit) => {
      if (resizing && event.clientX) {
        let width: number;

        if (resizing.side === "left") {
          width = Math.round(
            resizing.startWidth - (event.clientX - resizing.startX) * 2
          );
        }
        else {
          width = Math.round(
            resizing.startWidth + (event.clientX - resizing.startX) * 2
          );
        }

        const newWidth = Math.min(
          Math.max(MIN_WIDTH, width),
          maxWidth
        );

        setEditorSize((prev) => ({
          ...prev,
          width: newWidth,
        }));
      }
    }

    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [
    resizing,
    maxWidth
  ]);

  const onLeftMouseDown = (event: MouseEvent<Element>) => {
    if (containerRef.current) {
      setResizing({
        side: 'left',
        startX: event.clientX,
        startWidth: editorSize.width,
      });
    }
  }

  const onRightMouseDown = (event: MouseEvent<Element>) => {
    if (containerRef.current) {
      setResizing({
        side: 'right',
        startX: event.clientX,
        startWidth: editorSize.width,
      });
    }
  }

  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      // 48px is header height
      height={'calc(100vh - 48px)'}
    >
      <Box
        fontSize='sm'
        py='3'
      >
        {`${editorSize.width} × ${editorSize.height}`}
      </Box>

      <Box
        ref={containerRef}
        width='full'
        flex={1}
        pb='24px'
      >
        <Flex
          bg='green.200'
          mx='auto'
          height='full'
          style={{
            width: editorSize.width,
          }}
        >
          <ResizeHandle
            onMouseDown={onLeftMouseDown}
          />
          <Box
            flex={1}
          >
            Editor
          </Box>
          <ResizeHandle
            onMouseDown={onRightMouseDown}
          />
        </Flex>
      </Box>

    </Flex>
  )
}

const ResizeHandle: FC<{
  onMouseDown: MouseEventHandler<HTMLDivElement>;
}> = ({ onMouseDown }) => {

  return (
    <Flex
      onMouseDown={onMouseDown}
      alignItems='center'
      justifyContent='center'
      color='gray.400'
      bg='gray.100'
      userSelect='none'
      transitionDuration='150'
      transitionProperty='color'
      cursor='ew-resize'
      _hover={{
        color: 'gray.700'
      }}
      width={HANDLE_WIDTH + 'px'}
    >
      <svg
        viewBox="0 0 6 16"
        width={6}
        height={16}
        fill="none"
        stroke="currentColor"
      >
        <path d="M 0.5 0 V 16 M 5.5 0 V 16" />
      </svg>
    </Flex>
  );
};

export default Editor;