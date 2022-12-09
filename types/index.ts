export type IComponentType =
	| "Root"
	| "Box"
	| "Section"
	| "Paragraph"
	| "AddComponent";

export type IComponent = {
	id: string;
	parentId: string;
	childrenIds: string[];
	type: IComponentType;
	props: Record<string, any>;
};
