import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./page/Form";
import Home from "./page/Home";
import Profile from "./page/Profile";
import { Employee } from "./page/employees";
import Login from "./page/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("userToken") ? (
            <Navigate to="/Home" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Form"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/*"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
