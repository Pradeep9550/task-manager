import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/layout/Navbar";

import { getTasks } from "../features/tasks/taskThunk";
import { selectTasks } from "../features/tasks/taskSelectors";

const Dashboard = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(selectTasks);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  return (
    <MainLayout>
      <Navbar />

      <div className="p-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white p-8 mb-8">
          <h1 className="text-3xl font-bold">
            Welcome , {user?.name || "User"}
          </h1>

          <p className="mt-3 text-blue-100">
            Manage your daily tasks efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-slate-500">Total Tasks</p>

            <h2 className="text-5xl font-bold mt-4">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-slate-500">Pending Tasks</p>

            <h2 className="text-5xl font-bold text-orange-500 mt-4">
              {pendingTasks}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <p className="text-slate-500">Completed Tasks</p>

            <h2 className="text-5xl font-bold text-green-600 mt-4">
              {completedTasks}
            </h2>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;