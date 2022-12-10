import { FC, useState } from "react";
import { BsFolder, BsPlusCircle, BsX } from "react-icons/bs";
import { componentsSliceActions } from "redux/components/components.slice";
import { editorSliceActions } from "redux/editor/editor.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";

const AddNewSection: FC = () => {
  const dispatch = useAppDispatch();
  const [sections, setSections] = useState(false);

  return (
    <div className={"mx-auto px-4 my-6 max-w-3xl"}>
      <div className={"border-2 border-dashed px-4 py-6 bg-white"}>
        {sections ? (
          <div className={"flex justify-end"}>
            <button
              className={"self-end"}
              aria-label="Close 'select section structure'"
              onClick={() => {
                setSections(false);
              }}
            >
              <BsX className={"w-5 h-5 text-gray-500"} />
            </button>
          </div>
        ) : null}
        {sections ? (
          <div className={"flex flex-col items-center"}>
            <div className={"text-sm mb-4"}>
              Select section structure
            </div>
            <div className={"flex flex-wrap gap-5 justify-center"}>
              {[1, 2, 3, 4].map((i) => (
                <Section
                  key={`section-${i}`}
                  count={i}
                  hideSections={() => {
                    setSections(false);
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              className={"w-5 h-5 mr-4"}
              aria-label="Add New Section"
              onClick={() => {
                setSections(true);
              }}
            >
              <BsPlusCircle className={"w-full h-full"} />
            </button>
            <button
              className={"w-5 h-5"}
              aria-label="Add New Section"
              onClick={() => {
                dispatch(editorSliceActions.openTemplatesModal())
              }}
            >
              <BsFolder className={"w-full h-full"} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Section: FC<{
  count: number;
  sectionId?: string;
  hideSections: () => void;
}> = ({ count, sectionId, hideSections }) => {
  const dispatch = useAppDispatch();
  const rootChildren = useAppSelector(
    (state) => state.components.present.components["root"].childrenIds
  );

  return (
    <button
      className={"flex space-x-1 w-[80px] h-10 group"}
      onClick={() => {
        dispatch(
          componentsSliceActions.addComponent({
            parentId: "root",
            type: "Section",
          })
        );
        hideSections();
      }}
    >
      {[...new Array(count)].map((_, j) => (
        <div
          key={`square-${j}`}
          className={
            "bg-gray-200 flex-1 rounded-sm h-full group-hover:bg-gray-300"
          }
        ></div>
      ))}
    </button>
  );
};

export default AddNewSection;