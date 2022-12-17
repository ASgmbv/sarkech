import { FC, useEffect, useState } from "react";
import IFrame from "react-frame-component";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import AddNewSection from "./components/add-section";
import Component from "./components/component";
import Frame from "./frame";

const initialContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
      <div></div>
    </body>
  </html>
`;

const Canvas: FC = () => {
  const components = useAppSelector(
    (state) => state.components.present.components
  );

  const newSectionPositions = useAppSelector(
    (state) => state.editor.newSectionPositions
  );

  /**
   * This is needed to escape bug with
   * Frame component, otherwise the content
   * is not loaded
   */
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  if (!show) return <></>

  return (
    <IFrame
      initialContent={initialContent}
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Frame>
        <div className='p-[1px]'>
          {
            components.root.childrenIds.map((id: string) => {
              if (newSectionPositions.includes(id)) {
                return (
                  <>
                    <AddNewSection key={id} sectionId={id} />
                    <Component key={id} id={id} />
                  </>
                );
              }

              return (<Component key={id} id={id} />)
            })
          }

          <AddNewSection />
        </div>
      </Frame>
    </IFrame>
  )
}

export default Canvas;