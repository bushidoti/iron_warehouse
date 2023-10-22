import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LayoutForm from "./components/layout/layout";

function App() {
  return (
    <Routes>
        <Route path={'*'} element={<LayoutForm/>}>

        </Route>
    </Routes>
  );
}

export default App;
