/*disable no-unused-vars*/
import { motion } from "framer-motion";

export default function HabitGrid({ habits, toggleComplete, deleteHabit }) {
  return habits.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {habits.map((habit) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-6 rounded-2xl shadow-xl border-2 ${
            habit.completed
              ? "bg-green-100 border-green-300"
              : "bg-white border-pink-200"
          } hover:scale-105 hover:shadow-2xl transition duration-300`}
        >
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-gray-700">
              {habit.name}
            </span>
            <span className="text-sm text-gray-500 mt-2">🕒 {habit.time}</span>
            {habit.completed && (
              <span className="mt-3 text-green-600 font-medium">
                ✅ Completed!
              </span>
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => toggleComplete(habit.id)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                {habit.completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500 mt-10">
      No habits yet... let's build something beautiful! 🌻
    </p>
  );
}
