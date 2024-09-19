import Image from "next/image";
import { TaskManagerComponent } from "@/components/taskmanager/task-manager";

export default function Home() {
  return (
    <div>
      <TaskManagerComponent />
    </div>
  );
}
