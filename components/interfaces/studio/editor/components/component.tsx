import { FC } from "react";
import { useAppSelector } from "redux/hooks";
import { IComponentType } from "types";
import AddComponent from "./add-component";
import PrimitiveComponent from "./primitive-component";

export const mapComponentToHTMLElement: {
  [key in IComponentType]: keyof HTMLElementTagNameMap | FC<any>;
} = {
  Root: "body",
  Section: "section",
  Box: "div",
  Paragraph: "p",
  AddComponent: AddComponent
};

type Props = {
  id: string;
}

const Component: FC<Props> = ({
  id
}) => {
  const component = useAppSelector(
    (state) => state.components.present.components[id]
  );

  console.log(component)

  switch (component.type) {
    case "AddComponent": {
      return <AddComponent id={id} />;
    }
    case "Box":
    case "Section": {
      return <PrimitiveComponent id={id} />;
    }
    default:
      return null;
  }
}

export default Component;