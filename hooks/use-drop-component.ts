import { useMemo } from "react";
import { useDrop } from "react-dnd";
import {
	makeSelectAllParents,
	selectComponent,
} from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import type { IComponent, IComponentType } from "../types";

const getAcceptTypes = (types: IComponentType[]) => {
	return [...types, ...types.map((type) => `drag_${type}`)];
};

export const useDropComponent = ({
	componentId,
	isAfter,
}: {
	componentId: string;
	isAfter: boolean;
}) => {
	const dispatch = useAppDispatch();

	const component = useAppSelector((state) =>
		selectComponent(state, componentId)
	);

	// 'Section' component does not let to drop other components
	const acceptedTypes =
		component.type === "Section"
			? ["drag_Section"]
			: getAcceptTypes(["Box", "Paragraph"]);

	const selectAllParents = useMemo(makeSelectAllParents, []);

	const parentIds = useAppSelector((state) =>
		selectAllParents(state, componentId)
	);

	const [{ isOver, isOverShallow }, drop] = useDrop<
		IComponent,
		any,
		{ isOver: boolean; isOverShallow: boolean }
	>(
		() => ({
			accept: acceptedTypes,
			collect: (monitor) => ({
				isOverShallow: monitor.isOver({
					shallow: true,
				}),
				isOver: monitor.isOver(),
			}),
			drop: (item, monitor) => {
				if (!monitor.isOver()) {
					return;
				}

				const dndType = monitor.getItemType();

				/**
				 * Handle drag of elements
				 */
				if (
					typeof dndType === "string" &&
					dndType.substring(0, 4) === "drag"
				) {
					/**
					 * Do not let parent drag to its children
					 */
					if (item.id && parentIds.includes(item.id)) {
						return;
					}

					dispatch(
						componentsSliceActions.moveComponent({
							componentId: item.id,
							oldParentId: item.parentId,
							targetComponentId: component.id,
							newParentId:
								component.type === "Section" &&
								dndType !== "drag_Section"
									? component.id
									: component.parentId,
							isAfter,
						})
					);

					return;
				}

				/**
				 * Handle new elements
				 */
				dispatch(
					componentsSliceActions.addComponent({
						type: item.type,
						parentId: component.parentId,
						props: item.props,
					})
				);
			},
		}),
		[component, parentIds, isAfter]
	);

	return { isOver, isOverShallow, drop };
};
