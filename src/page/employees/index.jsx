import { Route, Routes } from "react-router-dom";
import AddEdit from "./addEdit";
import List from "./list";

export const Employee = () => {
  return (
    <>
      <Routes>
        <Route path="list" element={<List />} />
        <Route path="add" element={<AddEdit />} />
        <Route path="edit/:id" element={<AddEdit />} />
      </Routes>
    </>
  );
};
