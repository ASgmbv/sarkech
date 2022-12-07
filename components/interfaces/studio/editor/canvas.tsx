import { FC, useEffect, useState } from "react";
import Frame from "react-frame-component";
import { useAppSelector } from "redux/hooks";
import AddNewSection from "./components/add-new-section";
import Component from "./components/component";

const initialContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {
              boxShadow: {
                box: "#3f87ff 0px 0px 0px 1px inset",
                boxBottom: "#3f87ff 0px -3px 0px 0px inset",
                boxUpper: "#3f87ff 0px 3px 0px 0px inset"
              }
            }
          }
        }
      </script>
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
    <Frame
      initialContent={initialContent}
      style={{
        width: '100%',
      }}
    >
      <div>
        {components.root.childrenIds.map((id: string) => {
          // return <Component key={id} />;
          return <div key={id}>{id}</div>
        })}

        <AddNewSection />
      </div>
    </Frame>
  )
}



export default Canvas;