import { FC, ReactNode, useContext, useEffect } from "react";
import { useFrame } from "react-frame-component";
import { selectEditorResizing } from "redux/editor/editor.selectors";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { DndContext } from "react-dnd";

const Frame: FC<{
  children: any;
}> = ({
  children
}) => {
    const dispatch = useAppDispatch();
    const {
      document: frameDocument,
      window: frameWindow
    } = useFrame();
    const resizing = useAppSelector(selectEditorResizing);
    const { dragDropManager } = useContext(DndContext);

    useEffect(() => {
      function onMouseUp(e: any) {
        e.preventDefault();

        dispatch(editorSliceActions.setEditorResizing(null));
      }

      if (resizing) {
        frameDocument?.addEventListener("mouseup", onMouseUp);

        return () => {
          frameDocument?.removeEventListener("mouseup", onMouseUp);
        };
      }

    }, [dispatch, frameDocument, resizing])

    useEffect(() => {
      //@ts-ignore
      dragDropManager?.getBackend().addEventListeners(frameWindow);
    }, [dragDropManager, frameWindow]);

    return children;
  }

export default Frame;