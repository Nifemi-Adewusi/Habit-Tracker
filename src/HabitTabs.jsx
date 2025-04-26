export default function HabitTabs({ selectedTab, setSelectedTab }) {
  return (
    <div className="flex justify-center mb-6">
      <button
        onClick={() => setSelectedTab("all")}
        className={`px-4 py-2 rounded-md cursor-pointer ${
          selectedTab === "all"
            ? "bg-pink-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setSelectedTab("pending")}
        className={`px-4 py-2 rounded-md mx-2 cursor-pointer ${
          selectedTab === "pending"
            ? "bg-pink-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setSelectedTab("completed")}
        className={`px-4 py-2 rounded-md cursor-pointer ${
          selectedTab === "completed"
            ? "bg-pink-500 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        Completed
      </button>
    </div>
  );
}
