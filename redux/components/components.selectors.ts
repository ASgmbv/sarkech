import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/hooks";
import { getClassGroupId } from "tailwind-merge";

export const selectSelectedId = (state: RootState) => {
	return state.components.present.selectedId;
};

export const selectSelectedComponent = (state: RootState) => {
	const id = state.components.present.selectedId;
	if (!id) return null;
	return state.components.present.components[id];
};

export const selectComponent = createSelector(
	(state: RootState) => state.components.present.components,
	(state: RootState, componentId: string) => componentId,
	(components, componentId) => {
		return components[componentId];
	}
);

export const selectAllParents = createSelector(
	(state: RootState) => state.components.present.components,
	(state: RootState, componentId: string) => componentId,
	(components, componentId) => {
		const parentIds: string[] = [];

		let component = components[componentId];

		parentIds.push(componentId);

		while (component.id !== "root") {
			parentIds.unshift(component.parentId);
			component = components[component.parentId];
		}

		return parentIds;
	}
);

export const selectClass = (
	state: RootState,
	{ componentId, classGroupId }: { componentId: string; classGroupId: string }
) => {
	const component = state.components.present.components[componentId];
	const className = component.props.className;

	// className?.split(' ').forEach((c) => {
	//   if ()
	// })
};
