import { ChevronDown } from "lucide-react";
import { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  logoutUser,
} from "../../features/auth/authThunk";

import ChangePasswordModal from "../auth/ChangePasswordModal";

const Navbar = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.auth.user
  );

  const [open, setOpen] =
    useState(false);

  const [
    showPasswordModal,
    setShowPasswordModal,
  ] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <>
      <header className="h-20 bg-white px-8 flex justify-between items-center shadow-sm sticky top-0 z-40">

        {/* Left Side */}

        <div className="flex gap-4">

          {search !== undefined && (
            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search tasks..."
              className="w-80 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {status !== undefined && (
            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">
                All Tasks
              </option>

              <option value="PENDING">
                Pending
              </option>

              <option value="COMPLETED">
                Completed
              </option>

            </select>
          )}

        </div>

        {/* Right Side */}

        <div className="relative">

          <button
            onClick={() =>
              setOpen(!open)
            }
            className="flex items-center gap-3"
          >

            <div className="h-11 w-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg">

              {user?.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div className="text-left">

              <h3 className="font-semibold text-slate-800">
                {user?.name}
              </h3>

            </div>

            <ChevronDown
              size={18}
            />

          </button>

          {open && (
            <div className="absolute right-0 top-14 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden w-56">

              <button
                onClick={() => {
                  setShowPasswordModal(
                    true
                  );

                  setOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-slate-100 transition"
              >
                Change Password
              </button>

              <button
                onClick={
                  handleLogout
                }
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 transition"
              >
                Logout
              </button>

            </div>
          )}

        </div>

      </header>

      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() =>
            setShowPasswordModal(
              false
            )
          }
        />
      )}
    </>
  );
};

export default Navbar;