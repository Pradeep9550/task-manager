import {
  LayoutDashboard,
  CheckSquare,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white border-r border-slate-200">

      <div className="h-20 flex items-center px-8 border-b border-slate-100">

        <div className="h-12 w-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold">
          T
        </div>

        <div className="ml-3">
          <h1 className="font-bold text-2xl text-slate-800">
            TaskFlow
          </h1>

          <p className="text-xs text-slate-500">
            Task Manager
          </p>
        </div>

      </div>

      <nav className="p-4 space-y-2">

        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-100"
                    : "hover:bg-slate-100 text-slate-700"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
};

export default Sidebar;