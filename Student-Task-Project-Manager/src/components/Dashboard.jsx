import StatCard from "./StatCard";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

function DashBoard(props) {
  return (
    <main>
      <div className="stats-container">
        <StatCard
          title="Total-Tasks"
          value={props.tasks.length}
        />

        <StatCard
          title="Completed"
          value={
            props.tasks.filter(
              (task) => task.status === "Completed"
            ).length
          }
        />

        <StatCard
          title="Pending"
          value={
            props.tasks.filter(
              (task) => task.status === "Pending"
            ).length
          }
        />
      </div>

      <AddTask onAddTask={props.onAddTask} />

      <h2>Recent Tasks</h2>

      <div className="tasks-container">
        {props.tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.topic}
            description={task.description}
            status={task.status}
            onToggle={() => props.onToggleTask(task.id)}
            onDelete={() => props.onDeleteTask(task.id)}
          />
        ))}
      </div>
    </main>
  );
}

export default DashBoard;