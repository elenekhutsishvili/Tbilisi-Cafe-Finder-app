import { Routes, Route } from "react-router";
import "./App.css";

import Home from "./pages/Home";
import Cafe from "./pages/Cafe";
import CafeDetails from "./pages/CafeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Preference from "./pages/Preference";
import Profile from "./pages/Profile";
import MapPage from "./pages/Map";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cafe" element={<Cafe />} />
      <Route path="/cafe-details" element={<CafeDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/preference" element={<Preference />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;