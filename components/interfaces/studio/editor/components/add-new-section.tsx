import { FC } from "react";
import { BsPlusCircle } from "react-icons/bs";

const AddNewSection: FC = () => {
  return (
    <div
      className="p-6"
    >
      <div
        className="mx-auto p-6 max-w-3xl border-2 border-dashed flex items-center justify-center"
      >
        <button
          aria-label="Add New Section"
        >
          <BsPlusCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export default AddNewSection;