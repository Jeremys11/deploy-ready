import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainPage from "@/pages/MainPage";
import Admin from "@/pages/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {/* Navigation Bar */}
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">XLSX Manager</h1>
              <div className="flex gap-2">
                <Link to="/">
                  <Button variant="ghost">Data View</Button>
                </Link>
                <Link to="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
