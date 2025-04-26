// import { useState, useEffect } from "react";
// import {
//   Bell,
//   CheckCircle,
//   PlusCircle,
//   Clock,
//   Calendar,
//   Trash2,
//   ChevronDown,
//   X,
// } from "lucide-react";

// export default function HabitTracker() {
//   const [habits, setHabits] = useState(() => {
//     const savedHabits = localStorage.getItem("habits");
//     return savedHabits
//       ? JSON.parse(savedHabits)
//       : [
//           {
//             id: 1,
//             name: "Morning meditation",
//             time: "07:00",
//             completed: false,
//             color: "bg-indigo-500",
//           },
//           {
//             id: 2,
//             name: "Read for 30 minutes",
//             time: "12:30",
//             completed: true,
//             color: "bg-emerald-500",
//           },
//           {
//             id: 3,
//             name: "Evening workout",
//             time: "18:00",
//             completed: false,
//             color: "bg-amber-500",
//           },
//         ];
//   });

//   const [newHabit, setNewHabit] = useState({
//     name: "",
//     time: "08:00",
//     color: "bg-indigo-500",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("all");
//   const [notifications, setNotifications] = useState([]);

//   // Save habits to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("habits", JSON.stringify(habits));
//   }, [habits]);

//   // Handle notifications (simulated)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date();
//       const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
//         now.getMinutes()
//       ).padStart(2, "0")}`;

//       const dueHabits = habits.filter(
//         (habit) => !habit.completed && habit.time === currentTime
//       );

//       if (dueHabits.length > 0) {
//         const newNotifications = dueHabits.map((habit) => ({
//           id: Date.now() + Math.random(),
//           message: `Time for: ${habit.name}`,
//           habitId: habit.id,
//         }));

//         setNotifications((prev) => [...prev, ...newNotifications]);

//         // Show browser notification if supported
//         if (Notification.permission === "granted") {
//           dueHabits.forEach((habit) => {
//             new Notification("Habitize Reminder", {
//               body: `Time to ${habit.name}!`,
//               icon: "/api/placeholder/64/64",
//             });
//           });
//         }
//       }
//     }, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, [habits]);

//   const addHabit = () => {
//     if (newHabit.name.trim() === "") return;

//     const habit = {
//       id: Date.now(),
//       name: newHabit.name,
//       time: newHabit.time,
//       completed: false,
//       color: newHabit.color,
//     };

//     setHabits([...habits, habit]);
//     setNewHabit({ name: "", time: "08:00", color: "bg-indigo-500" });
//     setShowForm(false);
//   };

//   const toggleComplete = (id) => {
//     setHabits(
//       habits.map((habit) =>
//         habit.id === id ? { ...habit, completed: !habit.completed } : habit
//       )
//     );
//   };

//   const deleteHabit = (id) => {
//     setHabits(habits.filter((habit) => habit.id !== id));
//   };

//   const dismissNotification = (id) => {
//     setNotifications(
//       notifications.filter((notification) => notification.id !== id)
//     );
//   };

//   const colorOptions = [
//     { value: "bg-indigo-500", label: "Indigo" },
//     { value: "bg-emerald-500", label: "Emerald" },
//     { value: "bg-amber-500", label: "Amber" },
//     { value: "bg-rose-500", label: "Rose" },
//     { value: "bg-violet-500", label: "Violet" },
//     { value: "bg-cyan-500", label: "Cyan" },
//   ];

//   const filteredHabits =
//     selectedTab === "all"
//       ? habits
//       : selectedTab === "completed"
//       ? habits.filter((h) => h.completed)
//       : habits.filter((h) => !h.completed);

//   // Request notification permission on mount
//   useEffect(() => {
//     if (
//       Notification.permission !== "granted" &&
//       Notification.permission !== "denied"
//     ) {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto p-4">
//           <div className="flex justify-between items-center">
//             <div className="flex items-center space-x-2">
//               <CheckCircle className="text-indigo-500" size={28} />
//               <h1 className="text-2xl font-bold text-gray-800">Habitize</h1>
//             </div>
//             <button
//               onClick={() => setShowForm(true)}
//               className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors"
//             >
//               <PlusCircle size={20} />
//               <span>New Habit</span>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-grow max-w-4xl w-full mx-auto p-4">
//         {/* Notification area */}
//         {notifications.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center">
//               <Bell size={18} className="mr-2" />
//               Reminders
//             </h2>
//             <div className="space-y-2">
//               {notifications.map((notification) => (
//                 <div
//                   key={notification.id}
//                   className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center border-l-4 border-indigo-500"
//                 >
//                   <div className="flex items-center">
//                     <Bell size={18} className="text-indigo-500 mr-2" />
//                     <p>{notification.message}</p>
//                   </div>
//                   <button
//                     onClick={() => dismissNotification(notification.id)}
//                     className="text-gray-400 hover:text-gray-600"
//                   >
//                     <X size={18} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Tabs */}
//         <div className="flex border-b mb-6">
//           <button
//             className={`px-4 py-2 font-medium ${
//               selectedTab === "all"
//                 ? "text-indigo-600 border-b-2 border-indigo-500"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setSelectedTab("all")}
//           >
//             All Habits
//           </button>
//           <button
//             className={`px-4 py-2 font-medium ${
//               selectedTab === "pending"
//                 ? "text-indigo-600 border-b-2 border-indigo-500"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setSelectedTab("pending")}
//           >
//             Pending
//           </button>
//           <button
//             className={`px-4 py-2 font-medium ${
//               selectedTab === "completed"
//                 ? "text-indigo-600 border-b-2 border-indigo-500"
//                 : "text-gray-500"
//             }`}
//             onClick={() => setSelectedTab("completed")}
//           >
//             Completed
//           </button>
//         </div>

//         {/* Habit list */}
//         <div className="space-y-4">
//           {filteredHabits.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="bg-gray-100 inline-flex rounded-full p-4 mb-4">
//                 <Calendar size={32} className="text-gray-400" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-700">
//                 No habits to show
//               </h3>
//               <p className="text-gray-500 mt-1">
//                 {selectedTab === "all"
//                   ? "Add your first habit to get started!"
//                   : selectedTab === "completed"
//                   ? "You haven't completed any habits yet."
//                   : "You don't have any pending habits."}
//               </p>
//             </div>
//           ) : (
//             filteredHabits.map((habit) => (
//               <div
//                 key={habit.id}
//                 className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center"
//               >
//                 <button
//                   onClick={() => toggleComplete(habit.id)}
//                   className={`w-6 h-6 rounded-full flex-shrink-0 mr-4 ${
//                     habit.completed
//                       ? "bg-emerald-500 text-white"
//                       : "border-2 border-gray-300"
//                   } flex items-center justify-center`}
//                 >
//                   {habit.completed && <CheckCircle size={16} />}
//                 </button>

//                 <div className="flex-grow">
//                   <h3
//                     className={`font-medium text-gray-800 ${
//                       habit.completed ? "line-through text-gray-500" : ""
//                     }`}
//                   >
//                     {habit.name}
//                   </h3>
//                   <div className="flex items-center mt-1 text-sm text-gray-500">
//                     <Clock size={14} className="mr-1" />
//                     <span>{habit.time}</span>
//                   </div>
//                 </div>

//                 <div
//                   className={`w-3 h-3 rounded-full mr-3 ${habit.color}`}
//                 ></div>

//                 <button
//                   onClick={() => deleteHabit(habit.id)}
//                   className="text-gray-400 hover:text-red-500 p-1"
//                 >
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </main>

//       {/* Add habit modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold text-gray-800">Add New Habit</h2>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Habit Name
//                 </label>
//                 <input
//                   type="text"
//                   value={newHabit.name}
//                   onChange={(e) =>
//                     setNewHabit({ ...newHabit, name: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="e.g., Drink water"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Reminder Time
//                 </label>
//                 <input
//                   type="time"
//                   value={newHabit.time}
//                   onChange={(e) =>
//                     setNewHabit({ ...newHabit, time: e.target.value })
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Color
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {colorOptions.map((color) => (
//                     <button
//                       key={color.value}
//                       onClick={() =>
//                         setNewHabit({ ...newHabit, color: color.value })
//                       }
//                       className={`w-8 h-8 rounded-full ${color.value} ${
//                         newHabit.color === color.value
//                           ? "ring-2 ring-offset-2 ring-gray-400"
//                           : ""
//                       }`}
//                       aria-label={color.label}
//                     ></button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="mt-6 flex justify-end gap-2">
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={addHabit}
//                 className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
//               >
//                 Add Habit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <footer className="bg-white border-t border-gray-200 py-4">
//         <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
//           Habitize - Build better habits, one day at a time
//         </div>
//       </footer>
//     </div>
//
