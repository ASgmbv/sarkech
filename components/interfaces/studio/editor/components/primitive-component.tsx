import { createElement, FC, ReactNode, useEffect, useRef } from "react";
import { selectComponent, selectSelectedId } from "redux/components/components.selectors";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { componentsSliceActions } from "redux/components/components.slice";
import { useDropElement } from "hooks/use-drop-component";
import { useDrag } from "react-dnd";
import Component, { mapComponentToHTMLElement } from "./component";
import cn from "clsx";

const PrimitiveComponent: FC<{
  id: string;
}> = ({
  id
}) => {
    const dispatch = useAppDispatch();
    const component = useAppSelector((state) => selectComponent(state, id))
    const { type, props } = component;

    const selectedId = useAppSelector(selectSelectedId);

    const ref = useRef<any>();

    const { drop, isOver } = useDropElement({
      elementId: id
    });

    const [, drag, preview] = useDrag(() => ({
      type: `drag_${component.id}`
    }))

    // useEffect(() => {
    //   const img = new Image();

    //   if (element.type === "Box") {
    //     img.src = boxPreview;
    //   }

    //   preview(img, {
    //     offsetX: 0,
    //     offsetY: 0,
    //   });
    // }, [preview, element.type]);

    const children = [
      ...component.childrenIds.map((id: string) => {
        return <Component key={id} id={id} />;
      }),
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
        ...props,
        className: cn(
          props.className,
          selectedId === id && "outline outline-1 outline-[#3f87ff]",
          isOver && 'bg-blue-50',
          "hover:outline hover:outline-1 hover:outline-[#3f87ff] transition-shadow duration-200",
        ),
        onClick: (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();

          dispatch(componentsSliceActions.select(id));
        },
        ref: drop(drag(ref))
      },
      children
    )
  }

export default PrimitiveComponent