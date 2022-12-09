import { useDrop } from "react-dnd";
import { selectComponent } from "redux/components/components.selectors";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import type { IComponentType } from "../types";

export const useDropElement = ({ elementId }: { elementId: string }) => {
	const dispatch = useAppDispatch();

	const component = useAppSelector((state) =>
		selectComponent(state, elementId)
	);

	const parent = useAppSelector((state) =>
		selectComponent(state, component.parentId)
	);

	// 'Section' component does not let to drop other components
	const acceptedTypes =
		component.type === "Section" ? [] : ["Box", "Paragraph"];

	const [{ isOver }, drop] = useDrop<
		{ type: IComponentType },
		any,
		{ isOver: boolean }
	>(
		() => ({
			accept: acceptedTypes,
			collect: (monitor) => ({
				isOver: monitor.isOver({
					shallow: true,
				}),
			}),
			drop: (item, monitor) => {
				if (!monitor.isOver()) {
					return;
				}

				dispatch(
					componentsSliceActions.addElement({
						type: item.type,
						parentId: component.parentId,
					})
				);
			},
		}),
		[component]
	);

	return { isOver, drop };
};
