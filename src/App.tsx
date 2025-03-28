import { Navigate, Route, Routes } from "react-router-dom";
import Workspace from "./pages/Workspace";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/workspace" replace />} />
      <Route path="/workspace" element={<Workspace />} />
    </Routes>
  );
}
