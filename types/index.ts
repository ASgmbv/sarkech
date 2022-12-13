export type IComponentType =
	| "Root"
	| "Box"
	| "Section"
	| "Paragraph"
	| "AddComponent";

export type IProps = {
	className?: string;
	tempClassName?: string;
	[key: string]: any;
};

export type IComponent = {
	id: string;
	parentId: string;
	childrenIds: string[];
	type: IComponentType;
	props: IProps;
};

export type Screen = "base" | "sm" | "md" | "lg";
