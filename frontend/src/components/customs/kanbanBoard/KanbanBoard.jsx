import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import TaskCard from "../tasks/TaskCard";
import KanbanColumn from "./KanbanColumn";
import { PlusCircle } from "lucide-react";
import Modal from "../Modal";
import { useState } from "react";
import Newtask from "../forms/tasks/NewTask";

const KanbanBoard = ({ tasks }) => {
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
    console.log("yes");

    // const { source, destination, draggableId } = result;
    // const newStatus = destination.droppableId;
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
                <KanbanColumn status={status} color={color}>
                  <hr />
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={"drag" + task.id}
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
                  <hr />
                  <button
                    onClick={() => handleModalOpen(status)}
                    className="bg-gray-200 px-6 py-2 rounded-lg cursor-pointer mt-2 mx-auto text-sm text-center flex justify-center items-center"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    New task
                  </button>
                  <Modal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                  >
                    <Newtask
                      closeModal={() => setModalOpen(false)}
                      status={equivalent[activeStatus]}
                    />
                  </Modal>
                </KanbanColumn>
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
