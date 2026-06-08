import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { changePassword } from "../../features/auth/authThunk";
import { Eye, EyeOff } from "lucide-react";

const ChangePasswordModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(changePassword(formData));

    if (changePassword.fulfilled.match(result)) {
      toast.success("Password Changed Successfully");

      onClose();
    } else {
      toast.error(result.payload?.message || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Current Password"
              value={formData.oldPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  oldPassword: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3 pr-12"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
            >
              Update
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border py-3 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
