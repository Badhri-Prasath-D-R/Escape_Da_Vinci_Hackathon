import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Footer from "./components/common/Footer";
import AppRoutes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <Navbar />

        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Page Content */}
          <main className="flex-1 p-6">
            <AppRoutes />
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
