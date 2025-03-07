import { formatDate } from "@/utils/functions";
import { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaRegLightbulb } from "react-icons/fa";
import Modal from "../Modal";
import EditTask from "../forms/tasks/EditTask";
import { useDeleteData } from "@/hooks/fetchData";
import { deleteTask } from "@/api/tasksApi";
import { toast } from "react-toastify";
import { handleApiError } from "@/utils/handleErrors";

const TaskCard = ({ task, dragHandleProps, sendMessage }) => {
  const { mutate, isPending } = useDeleteData("deleteTask", deleteTask);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen2, setModalOpen2] = useState(false);

  const handleDelete = () => {
    mutate(task.id, {
      onSuccess: () => {
        toast("Task deleted successfully", { type: "success" });
        sendMessage("task_deleted" + new Date());
        setModalOpen2(false);
      },
      onError: (error) => {
        handleApiError(error);
      },
    });
  };

  return (
    <div
      className="p-4 border border-gray-200 rounded-lg shadow-md flex justify-between items-center"
      style={{ borderLeft: `4px solid #41e5f7` }}
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
        <button
          className="bg-green-600 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center gap-1"
          onClick={() => setModalOpen2(true)}
        >
          <FaEye /> View
        </button>
        <button
          className="bg-blue-600 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center gap-1"
          onClick={() => setModalOpen(true)}
        >
          <FaEdit /> Edit
        </button>
        {/* <button className="bg-red-800 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center">
            <FaTrash /> Delete
          </button> */}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <EditTask
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          assigned_user={task.assigned_user?.id || null}
          closeModal={() => setModalOpen(false)}
          sendMessage={sendMessage}
        />
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={() => setModalOpen2(false)}>
        <div className="flex flex-col gap-4">
          <div>
            <div className="font-bold">Title</div>
            {task.title}
          </div>

          <div>
            <div className="font-bold">Description</div>
            {task.description}
          </div>
          <div>
            <div className="font-bold">Assignation</div>
            <div className="italic">
              {task.assigned_user?.name ?? "Not assigned"}
            </div>
          </div>
          <button
            className="bg-red-600 px-2 py-1 text-white rounded-sm cursor-pointer flex items-center gap-1 mx-auto"
            onClick={handleDelete}
            disabled={isPending}
          >
            <FaTrash /> Supprimer
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default TaskCard;
