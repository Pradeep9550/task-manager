const EmptyState = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>

      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
};

export default EmptyState;
