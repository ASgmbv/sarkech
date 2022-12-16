import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/hooks";
import { getResponsiveClassValue } from "utils/helpers";

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

export const makeSelectClassValue = () => {
	const selectClassValue = createSelector(
		[
			(state: RootState) => state.components.present.screen,
			(state: RootState, componentId: string) =>
				state.components.present.components[componentId],
			(state: RootState, componentId: string, classGroupId?: string) =>
				classGroupId,
			(
				state: RootState,
				componentId: string,
				classGroupId?: string,
				prefix?: string
			) => prefix,
		],
		(screen, component, classGroupId, prefix) => {
			if (!classGroupId) {
				return {
					value: undefined,
					screenValue: undefined,
				};
			}

			const className =
				component.props.tempClassName ?? component.props.className;

			const { base, lg, md, sm } = getResponsiveClassValue({
				className,
				classGroupId,
				prefix,
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
		}
	);

	return selectClassValue;
};

export const selectSpacingValue = (
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

	const mt = getResponsiveClassValue({
		className,
		prefix: prefix + "t",
		classGroupId: classGroupId + "t",
	});

	const mr = getResponsiveClassValue({
		className,
		prefix: prefix + "r",
		classGroupId: classGroupId + "r",
	});

	const mb = getResponsiveClassValue({
		className,
		prefix: prefix + "b",
		classGroupId: classGroupId + "b",
	});

	const ml = getResponsiveClassValue({
		className,
		prefix: prefix + "l",
		classGroupId: classGroupId + "l",
	});

	const mx = getResponsiveClassValue({
		className,
		prefix: prefix + "x",
		classGroupId: classGroupId + "x",
	});

	const my = getResponsiveClassValue({
		className,
		prefix: prefix + "y",
		classGroupId: classGroupId + "y",
	});

	const m = getResponsiveClassValue({
		className,
		prefix,
		classGroupId,
	});

	const topbase = mt.base || my.base || m.base;
	const topsm = mt.sm || my.sm || m.sm;
	const topmd = mt.md || my.md || m.md;
	const toplg = mt.lg || my.lg || m.lg;

	let top: string | undefined;

	if (screen === "base") {
		top = topbase;
	} else if (screen === "sm") {
		top = topsm || topbase;
	} else if (screen === "md") {
		top = topmd || topsm || topbase;
	} else if (screen === "lg") {
		top = toplg || topmd || topsm || topbase;
	}

	const bottombase = mb.base || my.base || m.base;
	const bottomsm = mb.sm || my.sm || m.sm;
	const bottommd = mb.md || my.md || m.md;
	const bottomlg = mb.lg || my.lg || m.lg;

	let bottom: string | undefined;

	if (screen === "base") {
		bottom = bottombase;
	} else if (screen === "sm") {
		bottom = bottomsm || bottombase;
	} else if (screen === "md") {
		bottom = bottommd || bottomsm || bottombase;
	} else if (screen === "lg") {
		bottom = bottomlg || bottommd || bottomsm || bottombase;
	}

	const leftbase = ml.base || mx.base || m.base;
	const leftsm = ml.sm || mx.sm || m.sm;
	const leftmd = ml.md || mx.md || m.md;
	const leftlg = ml.lg || mx.lg || m.lg;

	let left: string | undefined;

	if (screen === "base") {
		left = leftbase;
	} else if (screen === "sm") {
		left = leftsm || leftbase;
	} else if (screen === "md") {
		left = leftmd || leftsm || leftbase;
	} else if (screen === "lg") {
		left = leftlg || leftmd || leftsm || leftbase;
	}

	const rightbase = mr.base || mx.base || m.base;
	const rightsm = mr.sm || mx.sm || m.sm;
	const rightmd = mr.md || mx.md || m.md;
	const rightlg = mr.lg || mx.lg || m.lg;

	let right: string | undefined;

	if (screen === "base") {
		right = rightbase;
	} else if (screen === "sm") {
		right = rightsm || rightbase;
	} else if (screen === "md") {
		right = rightmd || rightsm || rightbase;
	} else if (screen === "lg") {
		right = rightlg || rightmd || rightsm || rightbase;
	}

	return {
		top,
		bottom,
		left,
		right,
	};
};
