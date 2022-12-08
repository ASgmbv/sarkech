import { FC, ReactNode, useEffect } from "react";
import { useFrame } from "react-frame-component";
import { selectEditorResizing } from "redux/editor/editor.selectors";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const Frame: FC<{
  children: ReactNode;
}> = ({
  children
}) => {
    const dispatch = useAppDispatch();
    const { document: frameDocument } = useFrame();
    const resizing = useAppSelector(selectEditorResizing);

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

    return (
      <>
        {children}
      </>
    )
  }

export default Frame;