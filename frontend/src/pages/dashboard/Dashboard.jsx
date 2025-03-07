import { getAllTasks } from "@/api/tasksApi";
import KanbanBoard from "@/components/customs/kanbanBoard/KanbanBoard";
import { useFetchData } from "@/hooks/fetchData";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { socket, message, connected, sendMessage } = useWebSocket(
    process.env.REACT_APP_WS_URL
  );

  const queryClient = useQueryClient();
  const { data, isPending, isError } = useFetchData("getAllTasks", getAllTasks);

  useEffect(() => {
    if (message) {
      console.log("invalidate");

      queryClient.invalidateQueries("getAllTasks");
    }
  }, [message, queryClient]);

  if (isError) return <div>Error loading tasks</div>;
  if (isPending) return <div className="text-white">Loading...</div>;
  return (
    <KanbanBoard tasks={data} message={message} sendMessage={sendMessage} />
  );
};
export default Dashboard;
