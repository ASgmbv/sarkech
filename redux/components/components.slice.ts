import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComponent, IComponentType } from "types";
import { nanoid } from "nanoid";

const initialElementProps: {
	[key in IComponentType]?: object;
} = {
	Section: {
		className: "p-2",
	},
};

const initialState: {
	selectedId: string | null;
	components: {
		[id: string]: IComponent;
	};
} = {
	selectedId: null,
	components: {
		root: {
			id: "root",
			parentId: "root",
			childrenIds: [],
			type: "root",
			props: initialElementProps["root"] || {},
		},
	},
};

export const componentsSlice = createSlice({
	name: "components",
	initialState,
	reducers: {
		addElement: {
			reducer: (
				state,
				action: PayloadAction<{
					elementId: string;
					parentId: string;
					type: IComponentType;
					index: number;
					props?: any;
				}>
			) => {
				const { elementId, parentId, type, index, props } = action.payload;

				const component: IComponent = {
					id: elementId,
					parentId: parentId,
					childrenIds: [],
					type,
					props: props ||
						initialElementProps[type] || {
							className: [],
						},
				};

				state.components[elementId] = component;

				state.components[parentId].childrenIds.push(elementId);

				// const parent = state.components[parentId];

				// if (
				// 	(parent.type === "Box" || parent.type === "Section") &&
				// 	parent.children.length === 1 &&
				// 	state.components[parent.children[0]].type === "AddElement"
				// ) {
				// 	componentsSlice.caseReducers.removeElement(
				// 		state,
				// 		componentsSliceActions.removeElement({
				// 			elementId: parent.children[0],
				// 		})
				// 	);
				// }

				// if (type === "Section" || type === "Box") {
				// 	componentsSlice.caseReducers.addElement(
				// 		state,
				// 		componentsSliceActions.addElement({
				// 			type: "AddElement",
				// 			parentId: elementId,
				// 		})
				// 	);
				// }

				// if (index === -1) {
				// 	state.components[parentId].children.push(elementId);
				// } else {
				// 	state.components[parentId].children.splice(index, 0, elementId);
				// }

				// if (type !== "AddElement") {
				// 	state.selectedId = elementId;
				// }

				state.selectedId = elementId;

				// handle new box
			},
			prepare: ({
				parentId,
				type,
				elementId,
				index,
				props,
			}: {
				parentId: string;
				type: IComponentType;
				elementId?: string;
				index?: number;
				props?: any;
			}) => ({
				payload: {
					elementId: elementId || type + "-" + nanoid(5),
					parentId,
					type,
					index: index ?? -1,
					props,
				},
			}),
		},
	},
});

export const componentsSliceActions = componentsSlice.actions;
