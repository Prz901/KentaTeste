import { useState } from "react";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { HomePage } from "./pages/homePage";
import { FormNew } from "./pages/form/new";
import { FormEdit } from "./pages/form/edit";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/new" element={<FormNew />} />
        <Route exact path="/edit" element={<FormEdit />} />
      </Routes>
    </BrowserRouter>
  );
};
