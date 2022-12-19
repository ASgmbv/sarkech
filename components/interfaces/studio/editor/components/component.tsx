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
  AddComponent: AddComponent,
  H1: 'h1',
  H2: 'h2',
  H3: 'h3',
  H4: 'h4',
  H5: 'h5',
  H6: 'h6',
  Span: 'span'
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

  switch (component.type) {
    case "AddComponent": {
      return <AddComponent id={id} />;
    }
    case "Box":
    case "Section":
    case "Paragraph":
    case "H1":
    case "H2":
    case "H3":
    case "H4":
    case "H5":
    case "H6":
    case "Span": {
      return <PrimitiveComponent id={id} />;
    }
    default:
      return null;
  }
}

export default Component;