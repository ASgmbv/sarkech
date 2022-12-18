import { useRef } from "react";
import { useDragLayer } from "react-dnd";

export const useDragSection = () => {
	const ref = useRef<any>();

	const { isAfter } = useDragLayer((monitor) => {
		const dragCoord = monitor.getClientOffset();
		const elCoord = ref.current?.getBoundingClientRect();

		if (dragCoord && elCoord) {
			const { top, bottom } = elCoord;
			const yMiddle = Math.round((top + bottom) / 2);

			return {
				isAfter: dragCoord.y > yMiddle,
			};
		}

		return {
			isAfter: null,
		};
	});

	return {
		ref,
		isAfter,
	};
};
