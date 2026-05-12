import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./page/Login";
import Form from "./page/Form";
import Home from "./page/Home";
import Profile from "./page/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
