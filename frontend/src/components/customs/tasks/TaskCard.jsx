import { formatDate, getRandomColor } from "@/utils/functions";
import { FaEye, FaEdit, FaTrash, FaRegLightbulb } from "react-icons/fa";

const TaskCard = ({ task, dragHandleProps }) => {
  return (
    <div
      className="p-4 border border-gray-200 rounded-lg shadow-md flex justify-between items-center"
      style={{ borderLeft: `4px solid ${getRandomColor()}` }}
      {...dragHandleProps}
    >
      <div className="flex flex-col">
        <h3 className="flex place-items-center gap-2 mb-2">
          <FaRegLightbulb /> {task.title}
        </h3>
        <span className="text-sm">Created: {formatDate(task.created_at)}</span>
        {task.assigned_user ? (
          <span className="text-sm">Assigned to:{task.assigned_user.name}</span>
        ) : (
          <span className="text-xs text-gray-400 italic">Not assigned</span>
        )}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <button className="bg-green-600 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center">
          <FaEye /> View
        </button>
        <button className="bg-blue-600 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center">
          <FaEdit /> Edit
        </button>
        {/* <button className="bg-red-800 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center">
            <FaTrash /> Delete
          </button> */}
      </div>
    </div>
  );
};

export default TaskCard;
