import { useDrop } from "react-dnd";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch } from "redux/hooks";
import type { IComponentType } from "../types";

export const useDropElement = ({ parentId }: { parentId: string }) => {
	const dispatch = useAppDispatch();

	const [{ isOver }, drop] = useDrop<
		{
			type: IComponentType;
		},
		any,
		{
			isOver: boolean;
		}
	>(
		() => ({
			accept: ["Box"],
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
						parentId,
					})
				);
			},
		}),
		[parentId]
	);

	return { isOver, drop };
};
