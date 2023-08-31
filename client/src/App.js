import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Register from './pages/Auth/Register';
import Face from "./pages/Auth/Face";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/face" element={<Face />} />
      </Routes>
    </>
  );
}

export default App;
