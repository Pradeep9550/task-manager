import { Trash2, Pencil, CheckCircle } from "lucide-react";

const TaskCard = ({ task, onDelete, onEdit, onToggle }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="flex justify-between">
        <h3 className="font-semibold text-lg">{task.title}</h3>

        <span
          className={`text-xs px-3 py-1 rounded-full ${
            task.status === "COMPLETED"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="mt-3 text-gray-500">{task.description}</p>

      <div className="flex gap-3 mt-5">
        <button onClick={() => onToggle(task._id)} className="text-green-600">
          <CheckCircle size={18} />
        </button>

        <button onClick={() => onEdit(task)} className="text-blue-600">
          <Pencil size={18} />
        </button>

        <button
          onClick={() => {
            const confirmed = window.confirm("Delete this task?");

            if (confirmed) {
              onDelete(task._id);
            }
          }}
          className="text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
