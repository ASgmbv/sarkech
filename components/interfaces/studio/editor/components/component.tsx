import { createElement, FC } from "react";
import { selectComponent, selectSelectedId } from "redux/components/components.selectors";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { IComponentType } from "types";
import cn from "clsx";
import { componentsSliceActions } from "redux/components/components.slice";
import { useDropElement } from "hooks/use-drop-component";

export const mapComponentToHTMLElement: {
  [key in IComponentType]: keyof HTMLElementTagNameMap;
} = {
  root: "div",
  Section: "section",
  Box: "div",
};

const Component: FC<{
  id: string;
}> = ({
  id
}) => {
    const dispatch = useAppDispatch();
    const component = useAppSelector((state) => selectComponent(state, id))
    const { type, props } = component;

    const selectedId = useAppSelector(selectSelectedId);

    const { drop, isOver } = useDropElement({
      parentId: component.parentId
    });

    const children = [
      ...component.childrenIds.map((id: string) => {
        return <Component key={id} id={id} />;
      }),
    ];

    return (
      <>
        {
          createElement(
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
              ref: drop,
            },
            children
          )
        }
      </>
    )
  }

export default Component;