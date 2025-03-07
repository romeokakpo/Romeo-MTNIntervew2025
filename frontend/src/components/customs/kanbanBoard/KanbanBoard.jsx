import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import TaskCard from "../tasks/TaskCard";
import { PlusCircle } from "lucide-react";
import Modal from "../Modal";
import { useState } from "react";
import Newtask from "../forms/tasks/NewTask";
import { useMutation } from "@tanstack/react-query";
import { updateTask } from "@/api/tasksApi";
import { toast } from "react-toastify";

const KanbanBoard = ({ tasks, sendMessage }) => {
  const { mutate } = useMutation({
    mutationKey: ["updateTaskStatus"],
    mutationFn: (values) => updateTask(values.id, { ...values }),
  });

  const columns = {
    Pending: {
      tasks: tasks.filter((task) => task.status === "PENDING"),
      color: "#DAA520",
    },
    "In Progress": {
      tasks: tasks.filter((task) => task.status === "IN_PROGRESS"),
      color: "#6495ED",
    },
    Completed: {
      tasks: tasks.filter((task) => task.status === "COMPLETED"),
      color: "#4CAF50",
    },
  };
  const equivalent = {
    Pending: "PENDING",
    "In Progress": "IN_PROGRESS",
    Completed: "COMPLETED",
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState("Pending");

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source: _s, destination, draggableId } = result;
    const newStatus = equivalent[destination.droppableId];
    const task = tasks.find((v) => v.id == Number(draggableId));
    mutate(
      {
        ...task,
        assigned_user: task.assigned_user?.id || task.assigned_user,
        status: newStatus,
      },
      {
        onSuccess: () => {
          toast("Status updated successfully", { type: "success" });
          sendMessage("status_updated" + new Date().toISOString());
        },
      }
    );
  };

  const handleModalOpen = (status) => {
    setModalOpen(true);
    setActiveStatus(status);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col sm:flex-row w-full gap-4">
        {Object.entries(columns).map(([status, { tasks, color }]) => (
          <Droppable droppableId={status} key={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-full sm:w-1/3 pb-4 bg-gray-100 rounded-lg"
              >
                <h2
                  className="text-center text-white font-semibold uppercase p-2 rounded-t-lg "
                  style={{ backgroundColor: color }}
                >
                  {status}
                </h2>
                <hr />
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id + ""}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-white mt-2 rounded shadow mx-4"
                      >
                        <TaskCard
                          task={task}
                          dragHandleProps={provided.dragHandleProps}
                          sendMessage={sendMessage}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {tasks.length === 0 && (
                  <p className="text-sm text-gray-400 text-center my-2">
                    No task
                  </p>
                )}
                <hr className="mt-2" />
                <button
                  onClick={() => handleModalOpen(status)}
                  className="bg-gray-200 px-6 py-2 rounded-lg cursor-pointer mt-2 mx-auto text-sm text-center flex justify-center items-center"
                >
                  <PlusCircle size={16} className="mr-2" />
                  New task
                </button>
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
                  <Newtask
                    closeModal={() => setModalOpen(false)}
                    status={equivalent[activeStatus]}
                  />
                </Modal>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
