export type IComponentType =
	| "Root"
	| "Box"
	| "Section"
	| "Paragraph"
	| "AddComponent";

export type IProps = {
	className?: string;
	[key: string]: any;
};

export type IComponent = {
	id: string;
	parentId: string;
	childrenIds: string[];
	type: IComponentType;
	props: IProps;
};
