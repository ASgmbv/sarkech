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
			type: "Root",
			props: initialElementProps["Root"] || {},
		},
	},
};

export const componentsSlice = createSlice({
	name: "components",
	initialState,
	reducers: {
		select: (state, action: PayloadAction<string>) => {
			state.selectedId = action.payload;
		},
		unselect: (state) => {
			state.selectedId = null;
		},
		addElement: {
			reducer: (
				state,
				action: PayloadAction<{
					elementId: string;
					parentId: string;
					type: IComponentType;
					props?: any;
				}>
			) => {
				const { elementId, parentId, type, props } = action.payload;

				const component: IComponent = {
					id: elementId,
					type,
					parentId,
					childrenIds: [],
					props: props ||
						initialElementProps[type] || {
							className: [],
						},
				};

				state.components[elementId] = component;
				const parent = state.components[parentId];

				// Delete 'AddComponent' component after adding a new
				// component in empty 'Box' or 'Section' component
				if (
					(parent.type === "Box" || parent.type === "Section") &&
					parent.childrenIds.length === 1 &&
					state.components[parent.childrenIds[0]].type === "AddComponent"
				) {
					componentsSlice.caseReducers.removeElement(
						state,
						componentsSliceActions.removeElement({
							elementId: parent.childrenIds[0],
						})
					);
				}

				// Add 'AddComponent' component in 'Box' or 'Section' component
				// when adding these components
				if (type === "Box" || type === "Section") {
					componentsSlice.caseReducers.addElement(
						state,
						componentsSliceActions.addElement({
							type: "AddComponent",
							parentId: elementId,
						})
					);
				}

				// handle cases when adding to different position
				state.components[parentId].childrenIds.push(elementId);

				if (type !== "AddComponent") {
					state.selectedId = elementId;
				}
			},
			prepare: ({
				parentId,
				type,
				elementId,
				props,
			}: {
				parentId: string;
				type: IComponentType;
				elementId?: string;
				props?: any;
			}) => ({
				payload: {
					elementId: elementId || type + "-" + nanoid(5),
					parentId,
					type,
					props,
				},
			}),
		},
		removeElement: (
			state,
			action: PayloadAction<{
				elementId: string;
			}>
		) => {
			const deleteRecursively = (id: string) => {
				const element = state.components[id];

				// remove element from parent
				state.components[element.parentId].childrenIds = state.components[
					element.parentId
				].childrenIds.filter((i) => i !== element.id);

				// remove children of elements
				element.childrenIds.forEach((childId) => {
					deleteRecursively(childId);
				});

				// remove element
				delete state.components[element.id];
			};

			const elementId = action.payload.elementId;

			const element = state.components[elementId];
			const parent = state.components[element.parentId];

			deleteRecursively(element.id);

			// Add 'AddComponent' component if after the deletion
			// parent 'Box' or 'Section' becomes empty
			if (
				element.type !== "AddComponent" &&
				(parent.type === "Section" || parent.type === "Box") &&
				parent.childrenIds.length === 0
			) {
				componentsSlice.caseReducers.addElement(
					state,
					componentsSliceActions.addElement({
						parentId: parent.id,
						type: "AddComponent",
					})
				);
			}
		},
	},
});

export const componentsSliceActions = componentsSlice.actions;
