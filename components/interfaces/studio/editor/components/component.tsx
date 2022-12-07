import { createElement, FC } from "react";
import { selectComponent, selectSelectedId } from "redux/components/components.selectors";
import { useAppSelector } from "redux/hooks";
import { IComponentType } from "types";
import cn from "clsx";

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
    const component = useAppSelector((state) => selectComponent(state, id))
    const { type, props } = component;

    const selectedId = useAppSelector(selectSelectedId);

    return (
      <>
        {
          createElement(
            mapComponentToHTMLElement[type],
            {
              ...props, className: cn(
                props.className,
                selectedId === id && "outline outline-1 outline-[#3f87ff]",
              )
            }
          )
        }
      </>
    )
  }

export default Component;