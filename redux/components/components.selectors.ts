import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/hooks";
import { getClassGroupId } from "tailwind-merge";
import { retrieveClassValue, splitModifiers } from "utils/helpers";

export const selectSelectedId = (state: RootState) => {
	return state.components.present.selectedId;
};

export const selectSelectedComponent = (state: RootState) => {
	const id = state.components.present.selectedId;
	if (!id) return null;
	return state.components.present.components[id];
};

export const selectScreen = (state: RootState) => {
	return state.components.present.screen;
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

export const selectClassValue = (
	state: RootState,
	{
		componentId,
		classGroupId,
		prefix,
	}: {
		componentId: string;
		classGroupId: string;
		prefix?: string;
	}
) => {
	const component = state.components.present.components[componentId];
	const className = component.props.tempClassName ?? component.props.className;
	const screen = state.components.present.screen;

	let base: string | undefined;
	let sm: string | undefined;
	let md: string | undefined;
	let lg: string | undefined;

	className?.split(" ").forEach((c) => {
		const { baseClassName, modifiers } = splitModifiers(c);

		if (
			getClassGroupId(baseClassName) === classGroupId &&
			(modifiers.length === 0 ||
				(modifiers.length === 1 &&
					(modifiers[0] === "sm:" ||
						modifiers[0] === "md:" ||
						modifiers[0] === "lg:")))
		) {
			const classValue = retrieveClassValue({
				baseClassName,
				prefix,
			});

			if (modifiers.length === 0) {
				base = classValue;
			} else if (modifiers[0] === "sm:") {
				sm = classValue;
			} else if (modifiers[0] === "md:") {
				md = classValue;
			} else if (modifiers[0] === "lg:") {
				lg = classValue;
			}
		}
	});

	let value: string | undefined;

	if (screen === "base") {
		value = base;
	} else if (screen === "sm") {
		value = sm || base;
	} else if (screen === "md") {
		value = md || sm || base;
	} else if (screen === "lg") {
		value = lg || md || sm || base;
	}

	return {
		value,
		screenValue:
			screen === "base"
				? base
				: screen === "sm"
				? sm
				: screen === "md"
				? md
				: lg,
	};
};
