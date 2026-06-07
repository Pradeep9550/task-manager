import { useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { changePassword } from "../../features/auth/authThunk";

const ChangePasswordModal = ({ onClose }) => {
  const dispatch = useDispatch();

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
          <input
            type="password"
            placeholder="Current Password"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                oldPassword: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                newPassword: e.target.value,
              })
            }
            className="w-full border rounded-xl px-4 py-3"
          />

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
