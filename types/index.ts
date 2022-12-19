export type IComponentType =
	| "Root"
	| "Box"
	| "Section"
	| "Paragraph"
	| "AddComponent"
	| "Span"
	| "H1"
	| "H2"
	| "H3"
	| "H4"
	| "H5"
	| "H6";

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

export type ITemplate = {
	id: string;
	parentId: string;
	components: {
		[key: string]: IComponent;
	};
};

export type Screen = "base" | "sm" | "md" | "lg";
