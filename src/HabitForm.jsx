export default function HabitForm({ newHabit, setNewHabit, addHabit }) {
  return (
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
  );
}
