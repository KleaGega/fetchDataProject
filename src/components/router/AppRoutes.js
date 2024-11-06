import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ToDoList from '../ToDo/Reducer';
import Project from '../api/Project';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/list" element={<ToDoList/>} />
      <Route path="/project" element={<Project/>} />
    </Routes>
  );
};

export default AppRoutes;
