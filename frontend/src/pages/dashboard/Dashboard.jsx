import { getAllTasks } from "@/api/tasksApi";
import KanbanBoard from "@/components/customs/kanbanBoard/KanbanBoard";
import { useFetchData } from "@/hooks/fetchData";
import useWebSocket from "@/hooks/useWebSocket";

const Dashboard = () => {
  const { socket, message, connected, sendMessage } = useWebSocket(
    "ws://localhost:8000/ws/tasks/"
  ); // URL de votre WebSocket

  const { data, isPending, isError } = useFetchData("getAllTasks", getAllTasks);

  if (isError) return <div>Error loading tasks</div>;
  if (isPending) return <div>Loading...</div>;
  return <KanbanBoard tasks={data} />;
};
export default Dashboard;
