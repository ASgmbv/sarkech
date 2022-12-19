import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComponent, IComponentType, IProps, ITemplate } from "types";
import { twMerge } from "tailwind-merge";
import { nanoid } from "nanoid";
import { Screen } from "types";

const initialProps: {
	[key in IComponentType]?: IProps;
} = {
	Section: {
		className: "p-2",
	},
	Box: {
		className: "p-2",
	},
	Paragraph: {
		children: "Paragraph",
	},
	H1: {
		className: "text-3xl font-normal leading-normal mt-0 mb-2",
		children: "Heading 1",
	},
	H2: {
		className: "text-2xl font-normal leading-normal mt-0 mb-2",
		children: "Heading 2",
	},
	H3: {
		className: "text-xl font-normal leading-normal mt-0 mb-2",
		children: "Heading 3",
	},
	H4: {
		className: "text-lg font-normal leading-normal mt-0 mb-2",
		children: "Heading 4",
	},
	H5: {
		className: "text-md font-normal leading-normal mt-0 mb-2",
		children: "Heading 5",
	},
	H6: {
		className: "text-sm font-normal leading-normal mt-0 mb-2",
		children: "Heading 6",
	},
	Span: {
		className: "text-sm",
		children: "Span",
	},
	Button: {
		children: "Button",
		className: "bg-blue-500 text-white font-bold py-2 px-4 rounded",
	},
};

const initialState: {
	selectedId: string | null;
	screen: Screen;
	components: {
		[id: string]: IComponent;
	};
} = {
	selectedId: null,
	screen: "base",
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
		changeScreen: (state, action: PayloadAction<Screen>) => {
			state.screen = action.payload;
		},
		addComponent: {
			reducer: (
				state,
				action: PayloadAction<{
					componentId: string;
					parentId: string;
					type: IComponentType;
					props?: any;
					index: number;
				}>
			) => {
				const { componentId, parentId, type, props, index } =
					action.payload;

				const component: IComponent = {
					id: componentId,
					type,
					parentId,
					childrenIds: [],
					props: {
						// className: "",
						...(props ? props : initialProps[type]),
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
				if (index === -1) {
					state.components[parentId].childrenIds.push(componentId);
				} else {
					state.components[parentId].childrenIds.splice(
						index,
						0,
						componentId
					);
				}

				if (type !== "AddComponent") {
					state.selectedId = componentId;
				}
			},
			prepare: ({
				parentId,
				type,
				componentId,
				props,
				index,
			}: {
				parentId: string;
				type: IComponentType;
				componentId?: string;
				props?: any;
				index?: number;
			}) => ({
				payload: {
					componentId: componentId || type + "-" + nanoid(5),
					parentId,
					type,
					props,
					index: index ?? -1,
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

			state.selectedId = null;

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
		duplicateComponent: {
			reducer: (
				state,
				action: PayloadAction<{
					componentId: string;
					newElementId: string;
					parentId?: string;
				}>
			) => {
				const { componentId, newElementId, parentId } = action.payload;
				const component = state.components[componentId];

				// duplicate itself
				const index =
					state.components[component.parentId].childrenIds.indexOf(
						componentId
					);

				componentsSlice.caseReducers.addComponent(
					state,
					componentsSliceActions.addComponent({
						type: component.type,
						parentId: parentId || component.parentId,
						componentId: newElementId,
						props: component.props,
						index,
					})
				);

				// duplicate children
				component.childrenIds.forEach((child) => {
					componentsSlice.caseReducers.duplicateComponent(
						state,
						componentsSliceActions.duplicateComponent({
							componentId: child,
							parentId: newElementId,
						})
					);
				});
			},
			prepare: ({
				componentId,
				parentId,
			}: {
				componentId: string;
				parentId?: string;
			}) => {
				return {
					payload: {
						newElementId: componentId.split("-")[0] + "-" + nanoid(),
						componentId,
						parentId,
					},
				};
			},
		},
		moveComponent: (
			state,
			action: PayloadAction<{
				componentId: string;
				oldParentId: string;
				newParentId: string;
				targetComponentId: string;
				isAfter: boolean;
			}>
		) => {
			const {
				componentId,
				oldParentId,
				newParentId,
				targetComponentId,
				isAfter,
			} = action.payload;

			const newParent = state.components[newParentId];
			const oldParent = state.components[oldParentId];

			if (
				(newParent.type === "Section" || newParent.type === "Box") &&
				newParent.childrenIds.length === 1 &&
				state.components[newParent.childrenIds[0]].type === "AddComponent"
			) {
				componentsSlice.caseReducers.removeComponent(
					state,
					componentsSliceActions.removeComponent({
						componentId: newParent.childrenIds[0],
					})
				);
			}

			state.components[oldParentId].childrenIds = state.components[
				oldParentId
			].childrenIds.filter((id) => id !== componentId);

			const index =
				state.components[newParentId].childrenIds.indexOf(
					targetComponentId
				);

			state.components[newParentId].childrenIds.splice(
				isAfter ? index + 1 : index,
				0,
				componentId
			);

			state.components[componentId].parentId = newParentId;

			if (
				(oldParent.type === "Section" || oldParent.type === "Box") &&
				oldParent.childrenIds.length === 0
			) {
				componentsSlice.caseReducers.addComponent(
					state,
					componentsSliceActions.addComponent({
						parentId: oldParentId,
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

			component.props.className = component.props.className
				?.split(" ")
				.filter((c: string) => !classes.includes(c))
				.join(" ");
		},
		addTemplate: {
			reducer: (
				state,
				action: PayloadAction<{
					template: ITemplate;
					index: number;
				}>
			) => {
				const { template, index } = action.payload;

				if (index === -1) {
					state.components["root"].childrenIds.push(template.id);
				} else {
					state.components["root"].childrenIds.splice(
						index,
						0,
						template.id
					);
				}

				Object.assign(state.components, template.components);
			},
			prepare: ({
				template,
				index,
			}: {
				template: ITemplate;
				index?: number;
			}) => {
				let str = JSON.stringify(template);
				const components = template.components;

				for (const id in components) {
					const newId = components[id].type + "-" + nanoid();
					str = str.replaceAll(id, newId);
				}

				return {
					payload: {
						template: JSON.parse(str),
						index: index ?? -1,
					},
				};
			},
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
		addResponsiveClass: (
			state,
			action: PayloadAction<{
				componentId: string;
				newClass: string;
			}>
		) => {
			const componentId = action.payload.componentId;
			const component = state.components[componentId];
			const screen = state.screen;

			component.props.tempClassName = component.props.className;

			let resultClass = action.payload.newClass;

			if (screen !== "base") {
				resultClass = screen + ":" + resultClass;
			}

			component.props.className = twMerge(
				component.props.className,
				resultClass
			);
		},
		removeResponsiveClass: (
			state,
			action: PayloadAction<{
				componentId: string;
				classToRemove: string;
			}>
		) => {
			const { componentId, classToRemove } = action.payload;
			const component = state.components[componentId];
			const screen = state.screen;

			let resultClass = classToRemove;

			if (screen !== "base") {
				resultClass = screen + ":" + resultClass;
			}

			component.props.className = component.props.className
				?.split(" ")
				.filter((c: string) => c !== resultClass)
				.join(" ");
		},
		returnPreviousClassName: (
			state,
			action: PayloadAction<{
				componentId: string;
			}>
		) => {
			const component = state.components[action.payload.componentId];
			const tempClassName = component.props.tempClassName;
			component.props.className = tempClassName;

			component.props.tempClassName = undefined;
		},
		keepCurrentClassName: (
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
