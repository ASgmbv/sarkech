import { useDropComponent } from "hooks/use-drop-component";
import { FC } from "react"
import { BsPlus } from "react-icons/bs";
import { componentsSliceActions } from "redux/components/components.slice";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import cn from 'clsx';
import { selectComponent } from "redux/components/components.selectors";

type Props = {
  id: string;
}

const AddComponent: FC<Props> = ({
  id
}) => {
  const dispatch = useAppDispatch()

  const component = useAppSelector(
    (state) => selectComponent(state, id)
  )

  const { drop, isOverShallow } = useDropComponent({
    componentId: id,
    isAfter: true,
  })

  return (
    <div
      ref={drop}
      className={cn(
        "flex justify-center items-center border border-dashed border-gray-300 p-1 w-full",
        isOverShallow && "bg-orange-50",
      )}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          dispatch(componentsSliceActions.unselect())
        }}
      >
        <BsPlus className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  )
}

export default AddComponent;