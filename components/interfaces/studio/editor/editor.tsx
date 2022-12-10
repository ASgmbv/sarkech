import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { createElement, FC, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { selectEditorResizing, selectEditorSize } from "redux/editor/editor.selectors";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import Canvas from "./canvas";
import TemplatesModal from "../templates";
import { componentsSliceActions } from "redux/components/components.slice";
import { FiMonitor, FiSmartphone, FiTablet } from "react-icons/fi";

const MAX_WIDTH = 1280;
const MIN_WIDTH = 356;
const HANDLE_WIDTH = 17;
const GAP = 36;

const Editor: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const editorSize = useAppSelector(selectEditorSize);
  const resizing = useAppSelector(selectEditorResizing);

  const [maxWidth, setMaxWidth] = useState(0);

  useEffect(() => {
    if (resizing) {
      document.body.style.cursor = 'ew-resize';
    } else {
      document.body.style.cursor = 'auto';
    }
  }, [resizing]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      const maxWidth = Math.round(width < (MAX_WIDTH + 2 * GAP) ? width - GAP * 2 : MAX_WIDTH);

      dispatch(editorSliceActions.setEditorSize({
        width: maxWidth,
        height,
      }));

      setMaxWidth(maxWidth);
    }
  }, [dispatch]);

  useEffect(() => {
    function onMouseUp(event: MouseEvent) {
      event.preventDefault();

      dispatch(editorSliceActions.setEditorResizing(null));
    }

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();

      if (resizing) {
        let width: number;

        if (resizing.side === "left") {
          width = Math.round(
            resizing.startWidth - (event.clientX as number - resizing.startX) * 2
          );
        }
        else {
          width = Math.round(
            resizing.startWidth + (event.clientX as number - resizing.startX) * 2
          );
        }

        const newWidth = Math.min(
          Math.max(MIN_WIDTH, width),
          maxWidth
        );

        dispatch(editorSliceActions.setEditorSize({
          width: newWidth
        }));
      }
    }

    if (resizing) {
      window.addEventListener("mouseup", onMouseUp as any);
      window.addEventListener("mousemove", onMouseMove as any);

      return () => {
        window.removeEventListener("mouseup", onMouseUp as any);
        window.removeEventListener("mousemove", onMouseMove as any);
      };
    }

  }, [resizing, maxWidth, dispatch,]);

  const onLeftMouseDown = (event: MouseEvent<Element>) => {
    if (containerRef.current) {
      dispatch(editorSliceActions.setEditorResizing({
        side: 'left',
        startX: event.clientX,
        startWidth: editorSize.width,
      }));
    }
  }

  const onRightMouseDown = (event: MouseEvent<Element>) => {
    if (containerRef.current) {
      dispatch(editorSliceActions.setEditorResizing({
        side: 'right',
        startX: event.clientX,
        startWidth: editorSize.width,
      }));
    }
  }

  const handleEditorClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(componentsSliceActions.unselect());
    }
  };

  return (
    <Flex
      onClick={handleEditorClick}
      flexDirection='column'
      alignItems='center'
      // 48px is header height
      // 40px is inspector height
      height={'calc(100vh - 48px - 40px)'}
      bg='#eee'
    >
      <Box
        fontSize='xs'
        py='3'
      >
        <Device
          height={editorSize.height}
          width={editorSize.width}
        />
      </Box>

      <Box
        ref={containerRef}
        onClick={handleEditorClick}
        width='full'
        flex={1}
        pb='24px'
      >
        {editorSize.width > 0 ? (
          <Flex
            bg='white'
            mx='auto'
            height='full'
            shadow='sm'
            border='1px solid'
            borderColor='gray.200'
            style={{ width: editorSize.width }}
          >
            <ResizeHandle onMouseDown={onLeftMouseDown} />
            <Box flex={1} height='full'>
              <Canvas />
            </Box>
            <ResizeHandle onMouseDown={onRightMouseDown} />
          </Flex>
        ) : null}
      </Box>
      <TemplatesModal />
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
      bg='#f3f4f6'
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

const Device: FC<{
  width: number;
  height: number;
}> = ({ width, height }) => {

  let icon = FiMonitor;

  if (width < 425) {
    icon = FiSmartphone;
  }
  else if (width < 768) {
    icon = FiTablet;
  }

  return (
    <Flex alignItems='center'>
      <Text as='span' minW='75px'>
        {`${width} × ${height}`}
      </Text>
      <Icon
        as={icon}
        boxSize='4'
      />
    </Flex>
  )
}

export default Editor;