export type IComponentType = "root" | "Box" | "Section";

export type IComponent = {
	id: string;
	parentId: string;
	childrenIds: string[];
	type: IComponentType;
	props: object;
};
