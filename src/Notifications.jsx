import { motion } from "framer-motion";

export default function Notifications({ notifications }) {
  return (
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
  );
}
