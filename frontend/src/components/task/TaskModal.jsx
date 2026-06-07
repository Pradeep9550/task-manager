const TaskModal = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">
          Task Details
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">
              Title
            </h3>

            <p>{task.title}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Description
            </h3>

            <p>{task.description}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Status
            </h3>

            <p>{task.status}</p>
          </div>

          <div>
            <h3 className="font-semibold">
              Created Date
            </h3>

            <p>
              {new Date(
                task.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-black text-white px-5 py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskModal;