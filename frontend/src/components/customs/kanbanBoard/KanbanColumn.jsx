import TaskCard from "../tasks/TaskCard";

const KanbanColumn = ({ status, color, children }) => {
  return (
    <div>
      <h2
        className="text-center text-white font-semibold uppercase p-2 rounded-t-lg "
        style={{ backgroundColor: color }}
      >
        {status}
      </h2>
      {children}
    </div>
  );
};

export default KanbanColumn;
