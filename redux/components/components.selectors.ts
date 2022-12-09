import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/hooks";

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
	(state: RootState, elementId: string) => elementId,
	(components, elementId) => {
		return components[elementId];
	}
);

export const selectAllParents = createSelector(
	(state: RootState) => state.components.present.components,
	(state: RootState, elementId: string) => elementId,
	(components, elementId) => {
		const parentIds: string[] = [];

		let element = components[elementId];

		parentIds.push(elementId);

		while (element.id !== "root") {
			parentIds.unshift(element.parentId);
			element = components[element.parentId];
		}

		return parentIds;
	}
);
