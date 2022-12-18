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
import { VscGripper } from "react-icons/vsc";
import { IComponent } from "types";
import { useDragSection } from "hooks/use-drag-section";

const PrimitiveComponent: FC<{
  id: string;
}> = ({ id }) => {
  const dispatch = useAppDispatch();
  const component = useAppSelector((state) => selectComponent(state, id))
  const { type, props } = component;

  const selectedId = useAppSelector(selectSelectedId);

  const ref = useRef<any>();

  const { ref: sectionRef, isAfter } = useDragSection();

  const { drop, isOverShallow, isOver } = useDropComponent({
    componentId: id,
    isAfter: isAfter ?? true
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
      component={component}
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
        isOver && component.type === 'Section' && isAfter !== null && isAfter && 'shadow-[#3f87ff_0px_-2px_0px_0px_inset]',
        isOver && component.type === 'Section' && isAfter !== null && !isAfter && 'shadow-[#3f87ff_0px_2px_0px_0px_inset]',
      ),
      onClick: (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(componentsSliceActions.select(id));
      },
      ref: drop(drag(component.type === 'Section' ? sectionRef : ref))
    },

    // if the component is not container type ('Box' or 'Section') 
    // children comes from props, otherwise it comes from childrenIds
    props.children || children
  )
}

const EditSection: FC<{
  isFirst: boolean;
  component: IComponent;
}> = ({ isFirst, component }) => {
  const dispatch = useAppDispatch()

  const onDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      componentsSliceActions.removeComponent({
        componentId: component.id
      })
    );
  }

  const onAddSection: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      editorSliceActions.addNewSectionPosition(component.id)
    );
  }

  const [, drag, preview] = useDrag(() => ({
    type: "drag_Section",
    item: component
  }));

  useEffect(() => {
    const img = new Image();
    img.src = '/images/box.svg';

    preview(img, {
      offsetX: 0,
      offsetY: 0,
    });
  }, [preview])

  return (
    <div
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
      <button
        ref={drag}
        className='bg-gray-200 p-1'
      >
        <VscGripper />
      </button>
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