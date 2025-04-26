import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import HabitForm from "./HabitForm";
import HabitTabs from "./HabitTabs";
import HabitGrid from "./HabitGrid";
import Notifications from "./Notifications";
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

        <HabitForm
          newHabit={newHabit}
          setNewHabit={setNewHabit}
          addHabit={addHabit}
        />

        <HabitTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

        <HabitGrid
          habits={filteredHabits}
          toggleComplete={toggleComplete}
          deleteHabit={deleteHabit}
        />

        <Notifications notifications={notifications} />
      </div>
    </div>
  );
}
