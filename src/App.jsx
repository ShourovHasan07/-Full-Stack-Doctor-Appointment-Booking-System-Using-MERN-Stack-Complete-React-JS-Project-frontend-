import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyApointment from "./pages/MyApointment";
import Apontment from "./pages/Apontment ";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className=" mx-4 sm:mx-[10%]">

    <NavBar/>
    
    <div className="w-full h-0.5 bg-gray-300 my-4"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appontments" element={<MyApointment />} />
        <Route path="/appointment/:docId" element={<Apontment />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;