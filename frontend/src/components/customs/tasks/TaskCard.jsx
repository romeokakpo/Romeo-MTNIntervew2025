const TaskCard = ({ task }) => {
  <div className="p-4 border border-gray-200 rounded-lg shadow-md">
    <h3>{task.title}</h3>
    <p>{task.status}</p>
  </div>;
};

export default TaskCard;
