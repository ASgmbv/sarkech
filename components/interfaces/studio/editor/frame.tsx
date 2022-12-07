import { FC, ReactNode, useEffect } from "react";
import { useFrame } from "react-frame-component";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch } from "redux/hooks";

const Frame: FC<{
  children: ReactNode;
}> = ({
  children
}) => {
    const dispatch = useAppDispatch();
    const { document: frameDocument } = useFrame();

    useEffect(() => {
      function onMouseUp(e: any) {
        e.preventDefault();

        dispatch(editorSliceActions.setEditorResizing(null));
      }

      frameDocument?.addEventListener("mouseup", onMouseUp);

      return () => {
        frameDocument?.removeEventListener("mouseup", onMouseUp);
      };

    }, [dispatch, frameDocument])

    return (
      <>
        {children}
      </>
    )
  }

export default Frame;