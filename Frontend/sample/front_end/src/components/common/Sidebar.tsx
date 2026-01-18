import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-800 min-h-screen p-4">
      <h2 className="text-white text-lg font-bold mb-6">CrisisTruth AI</h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              : "flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/fake-news"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              : "flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg"
          }
        >
          🚫 Fake News
        </NavLink>

        <NavLink
          to="/real-news"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              : "flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg"
          }
        >
          ✅ Real News
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            isActive
              ? "flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              : "flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-700 rounded-lg"
          }
        >
          🤖 Chatbot
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
