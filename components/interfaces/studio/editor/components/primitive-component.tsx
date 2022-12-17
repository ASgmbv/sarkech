import { createElement, FC, MouseEventHandler, useEffect, useRef } from "react";
import { selectComponent, selectSelectedId } from "redux/components/components.selectors";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { componentsSliceActions } from "redux/components/components.slice";
import { useDropComponent } from "hooks/use-drop-component";
import { useDrag } from "react-dnd";
import Component, { mapComponentToHTMLElement } from "./component";
import cn from "clsx";
import { BsPlus, BsX } from "react-icons/bs";
import { editorSliceActions } from "redux/editor/editor.slice";

const PrimitiveComponent: FC<{
  id: string;
}> = ({ id }) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector((state) => selectComponent(state, id))
  const { type, props } = component;

  const selectedId = useAppSelector(selectSelectedId);

  const ref = useRef<any>();

  const { drop, isOverShallow, isOver } = useDropComponent({
    componentId: id
  });

  const [, drag, preview] = useDrag(() => ({
    type: `drag_${component.type}`,
    item: component
  }))

  const rootChildrenIds = useAppSelector(
    (state) => state.components.present.components["root"].childrenIds
  );

  const children = [
    ...component.childrenIds.map((id: string) => {
      return <Component key={id} id={id} />;
    }),
    <EditSection
      key={'edit-component'}
      isFirst={rootChildrenIds.indexOf(component.id) === 0}
      componentId={component.id}
    />
  ]

  useEffect(() => {
    const img = new Image();
    img.src = '/images/box.svg';

    preview(img, {
      offsetX: 0,
      offsetY: 0,
    });
  }, [preview])

  return createElement(
    mapComponentToHTMLElement[type],
    {
      // ...props,
      className: cn(
        props.className,
        (selectedId === id || isOver) && "outline outline-1 outline-[#3f87ff]",
        isOverShallow && 'bg-blue-50',
        "hover:outline hover:outline-1 hover:outline-[#3f87ff]",
        component.type === "Section" && "hover:relative group",
      ),
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(componentsSliceActions.select(id));
      },
      ref: drop(drag(ref))
    },

    // if the component is not container type ('Box' or 'Section') 
    // children comes from props, otherwise it comes from childrenIds
    props.children || children
  )
}

const EditSection: FC<{
  isFirst: boolean;
  componentId: string;
}> = ({ isFirst, componentId }) => {
  const dispatch = useAppDispatch()

  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      componentsSliceActions.removeComponent({
        componentId
      })
    );
  }

  const onAddSection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      editorSliceActions.addNewSectionPosition(componentId)
    );
  }

  return (
    <div
      // ref={drag}
      className={cn(
        "text-base font-normal text-black tracking-normal",
        "absolute left-1/2 -translate-x-1/2 hidden group-hover:block",
        isFirst ? "top-0" : "-translate-y-full top-[1px]"
      )}
    >
      <button
        className='bg-gray-200 p-1'
        onClick={onAddSection}
      >
        <BsPlus />
      </button>
      {/* <button className={buttonClassName}>
        <VscGripper />
      </button> */}
      <button
        className='bg-gray-200 p-1'
        onClick={onDelete}
      >
        <BsX />
      </button>

    </div>
  )
}

export default PrimitiveComponent