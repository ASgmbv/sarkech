import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComponent, IComponentType } from "types";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";

const initialProps: {
	[key in IComponentType]?: object;
} = {
	Section: {
		className: "p-2",
	},
	Box: {
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
			props: initialProps["Root"] || {},
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
		addComponent: {
			reducer: (
				state,
				action: PayloadAction<{
					componentId: string;
					parentId: string;
					type: IComponentType;
					props?: any;
				}>
			) => {
				const { componentId, parentId, type, props } = action.payload;

				const component: IComponent = {
					id: componentId,
					type,
					parentId,
					childrenIds: [],
					props: props ||
						initialProps[type] || {
							className: [],
						},
				};

				state.components[componentId] = component;
				const parent = state.components[parentId];

				// Delete 'AddComponent' component after adding a new
				// component in empty 'Box' or 'Section' component
				if (
					(parent.type === "Box" || parent.type === "Section") &&
					parent.childrenIds.length === 1 &&
					state.components[parent.childrenIds[0]].type === "AddComponent"
				) {
					componentsSlice.caseReducers.removeComponent(
						state,
						componentsSliceActions.removeComponent({
							componentId: parent.childrenIds[0],
						})
					);
				}

				// Add 'AddComponent' component in 'Box' or 'Section' component
				// when adding these components
				if (type === "Box" || type === "Section") {
					componentsSlice.caseReducers.addComponent(
						state,
						componentsSliceActions.addComponent({
							type: "AddComponent",
							parentId: componentId,
						})
					);
				}

				// handle cases when adding to different position
				state.components[parentId].childrenIds.push(componentId);

				if (type !== "AddComponent") {
					state.selectedId = componentId;
				}
			},
			prepare: ({
				parentId,
				type,
				componentId,
				props,
			}: {
				parentId: string;
				type: IComponentType;
				componentId?: string;
				props?: any;
			}) => ({
				payload: {
					componentId: componentId || type + "-" + nanoid(5),
					parentId,
					type,
					props,
				},
			}),
		},
		removeComponent: (
			state,
			action: PayloadAction<{
				componentId: string;
			}>
		) => {
			const deleteRecursively = (id: string) => {
				const component = state.components[id];

				// remove component from parent
				state.components[component.parentId].childrenIds = state.components[
					component.parentId
				].childrenIds.filter((i) => i !== component.id);

				// remove children of components
				component.childrenIds.forEach((childId) => {
					deleteRecursively(childId);
				});

				// remove component
				delete state.components[component.id];
			};

			const componentId = action.payload.componentId;

			const component = state.components[componentId];
			const parent = state.components[component.parentId];

			deleteRecursively(component.id);

			// Add 'AddComponent' component if after the deletion
			// parent 'Box' or 'Section' becomes empty
			if (
				component.type !== "AddComponent" &&
				(parent.type === "Section" || parent.type === "Box") &&
				parent.childrenIds.length === 0
			) {
				componentsSlice.caseReducers.addComponent(
					state,
					componentsSliceActions.addComponent({
						parentId: parent.id,
						type: "AddComponent",
					})
				);
			}
		},
		addClasses: (
			state,
			action: PayloadAction<{
				componentId: string;
				classes: string[];
			}>
		) => {
			const { componentId, classes } = action.payload;
			const component = state.components[componentId];
			const className = component.props.className;

			component.props.tempClassName = className;

			component.props.className = twMerge(
				component.props.className,
				classes
			);
		},
		removeClasses: (
			state,
			action: PayloadAction<{
				componentId: string;
				classes: string[];
			}>
		) => {
			const { componentId, classes } = action.payload;
			const component = state.components[componentId];

			component.props.className =
				component.props.className
					?.split(" ")
					.filter((c: string) => !classes.includes(c))
					.join(" ") ||
				// when you remove last class set className field to undefined
				undefined;
		},
		setProps: (
			state,
			action: PayloadAction<{
				componentId: string;
				props: {
					[key: string]: any;
				};
			}>
		) => {
			const { componentId, props } = action.payload;
			const component = state.components[componentId];

			component.props = {
				...component.props,
				...props,
			};
		},
		setTempClassName: (
			state,
			action: PayloadAction<{
				componentId: string;
			}>
		) => {
			const component = state.components[action.payload.componentId];
			const tempClassName = component.props.tempClassName;
			if (tempClassName) component.props.className = tempClassName;

			component.props.tempClassName = undefined;
		},
		removeTempClassName: (
			state,
			action: PayloadAction<{
				componentId: string;
			}>
		) => {
			const component = state.components[action.payload.componentId];
			component.props.tempClassName = undefined;
		},
	},
});

export const componentsSliceActions = componentsSlice.actions;
