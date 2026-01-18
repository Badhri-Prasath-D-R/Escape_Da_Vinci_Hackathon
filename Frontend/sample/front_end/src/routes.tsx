import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import FakeNews from "./components/pages/FakeNews";
import RealNews from "./components/pages/RealNews";
import ChatbotPage from "./components/pages/ChatbotPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fake-news" element={<FakeNews />} />
      <Route path="/real-news" element={<RealNews />} />
      <Route path="/chatbot" element={<ChatbotPage />} />

      {/* Fallback */}
      <Route
        path="*"
        element={<h2 style={{ padding: "20px" }}>Page Not Found</h2>}
      />
    </Routes>
  );
};

export default AppRoutes;
