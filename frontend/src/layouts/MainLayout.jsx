import Sidebar from "../components/layout/Sidebar";

const MainLayout = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex-1 overflow-hidden">
        {children}
      </div>

    </div>
  );
};

export default MainLayout;