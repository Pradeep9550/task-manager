import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/layout/Navbar";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../features/tasks/taskThunk";

import {
  setSearch,
  setStatus,
} from "../features/tasks/taskSlice";

import {
  selectTasks,
  selectTaskFilters,
} from "../features/tasks/taskSelectors";

const Tasks = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);

  const filters =
    useSelector(selectTaskFilters);

  const [showModal, setShowModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
    });

  useEffect(() => {
    dispatch(
      getTasks({
        search: filters.search,
        status: filters.status,
      })
    );
  }, [
    dispatch,
    filters.search,
    filters.status,
  ]);

  const refreshTasks = () => {
    dispatch(
      getTasks({
        search: filters.search,
        status: filters.status,
      })
    );
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return toast.error(
        "Title is required"
      );
    }

    if (!selectedTask) {
      const result =
        await dispatch(
          createTask(formData)
        );

      if (
        createTask.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Task Created"
        );
      }
    } else {
      const result =
        await dispatch(
          updateTask({
            taskId:
              selectedTask._id,
            taskData:
              formData,
          })
        );

      if (
        updateTask.fulfilled.match(
          result
        )
      ) {
        toast.success(
          "Task Updated"
        );
      }
    }

    setShowModal(false);

    setSelectedTask(null);

    setFormData({
      title: "",
      description: "",
    });

    refreshTasks();
  };

  const handleDelete =
    async (taskId) => {
      if (
        !window.confirm(
          "Delete this task?"
        )
      )
        return;

      await dispatch(
        deleteTask(taskId)
      );

      toast.success(
        "Task Deleted"
      );

      refreshTasks();
    };

  const handleToggle =
    async (taskId) => {
      await dispatch(
        toggleTask(taskId)
      );

      toast.success(
        "Status Updated"
      );

      refreshTasks();
    };

  return (
    <MainLayout>
      <Navbar
        search={
          filters.search
        }
        setSearch={(value) =>
          dispatch(
            setSearch(value)
          )
        }
        status={
          filters.status
        }
        setStatus={(value) =>
          dispatch(
            setStatus(value)
          )
        }
      />

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-3xl font-bold">
              All Tasks
            </h1>

            <p className="text-slate-500 mt-1">
              Manage your tasks
            </p>

          </div>

          <button
            onClick={() => {
              setSelectedTask(
                null
              );

              setFormData({
                title: "",
                description:
                  "",
              });

              setShowModal(
                true
              );
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
          >
            <Plus size={18} />
            Create Task
          </button>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition border border-slate-100"
            >

              <div className="flex justify-between items-start">

                <h3 className="font-bold text-xl">
                  {task.title}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.status ===
                    "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.status}
                </span>

              </div>

              <p className="text-slate-500 mt-4 min-h-[60px]">
                {
                  task.description
                }
              </p>

              <div className="text-sm text-slate-400 mt-3">
                {new Date(
                  task.createdAt
                ).toLocaleDateString()}
              </div>

              <div className="flex justify-end gap-3 mt-6">

                <button
                  onClick={() => {
                    setSelectedTask(
                      task
                    );

                    setFormData({
                      title:
                        task.title,
                      description:
                        task.description,
                    });

                    setShowModal(
                      true
                    );
                  }}
                  className="h-10 w-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() =>
                    handleToggle(
                      task._id
                    )
                  }
                  className="h-10 w-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"
                >
                  <CheckCircle
                    size={18}
                  />
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      task._id
                    )
                  }
                  className="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-3xl p-6 w-full max-w-lg">

            <h2 className="text-2xl font-bold mb-5">
              {selectedTask
                ? "Edit Task"
                : "Create Task"}
            </h2>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-4"
            >

              <input
                value={
                  formData.title
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target
                        .value,
                  })
                }
                placeholder="Task Title"
                className="w-full border rounded-xl px-4 py-3"
              />

              <textarea
                rows="4"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target
                        .value,
                  })
                }
                placeholder="Task Description"
                className="w-full border rounded-xl px-4 py-3"
              />

              <div className="flex gap-3">

                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="flex-1 border py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </MainLayout>
  );
};

export default Tasks;