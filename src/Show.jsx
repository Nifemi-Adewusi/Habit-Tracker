import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import soundNotification from "./sound/notification.mp3";

export default function HabitList() {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState({ name: "", time: "" });
  const [notifications, setNotifications] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");

  const notificationSound = new Audio(soundNotification);

  const filteredHabits = habits.filter((habit) => {
    if (selectedTab === "all") return true;
    if (selectedTab === "completed") return habit.completed;
    if (selectedTab === "pending") return !habit.completed;
    return true;
  });

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      const dueHabits = habits.filter(
        (habit) => habit.time === currentTime && !habit.completed
      );

      if (dueHabits.length > 0) {
        const newNotifications = dueHabits.map((habit) => ({
          id: Date.now() + Math.random(),
          message: `Time for: ${habit.name}`,
          habitId: habit.id,
        }));

        setNotifications((prev) => [...prev, ...newNotifications]);

        notificationSound.play().catch((e) => {
          console.log("Sound play was blocked:", e);
        });

        if (Notification.permission === "granted") {
          dueHabits.forEach((habit) => {
            new Notification("Habitize Reminder 🌸", {
              body: `Let's go: ${habit.name}!`,
              icon: "/api/placeholder/64/64",
            });
          });
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [habits]);

  const addHabit = () => {
    if (!newHabit.name.trim() || !newHabit.time.trim()) {
      alert("Please fill out both the habit name and time.");
      return;
    }

    const habit = {
      id: Date.now(),
      name: newHabit.name,
      time: newHabit.time,
      completed: false,
    };

    // Using the functional update pattern to ensure we're working with the latest state
    setHabits((prevHabits) => [...prevHabits, habit]);
    setNewHabit({ name: "", time: "" });
  };

  const toggleComplete = (id) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-pink-600 text-center mb-8"
        >
          🌸 Your Daily Habits 🌸
        </motion.h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Habit Name"
            value={newHabit.name}
            onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <input
            type="time"
            value={newHabit.time}
            onChange={(e) => setNewHabit({ ...newHabit, time: e.target.value })}
            className="w-full px-4 py-2 border rounded-md mb-2"
          />
          <button
            onClick={addHabit}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md"
          >
            Add Habit
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setSelectedTab("all")}
            className={`px-4 py-2 rounded-md ${
              selectedTab === "all"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab("pending")}
            className={`px-4 py-2 rounded-md mx-2 ${
              selectedTab === "pending"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedTab("completed")}
            className={`px-4 py-2 rounded-md ${
              selectedTab === "completed"
                ? "bg-pink-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Completed
          </button>
        </div>

        {filteredHabits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHabits.map((habit) => (
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
                  <span className="text-sm text-gray-500 mt-2">
                    🕒 {habit.time}
                  </span>
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
        )}

        <div className="mt-10">
          {notifications.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-4 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded shadow"
            >
              {note.message}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
