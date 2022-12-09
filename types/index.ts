export type IComponentType =
	| "root"
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
