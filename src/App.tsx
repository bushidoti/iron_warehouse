import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import LayoutForm from "./components/layout/layout";
import {Loading} from "./components/loading/loading";

function App() {
    const [loading, setLoading] = useState(true)

       useEffect(() => {
        if (document.readyState === "complete") {
            setTimeout(() => setLoading(false), 3000)
        }
    }, [])

  return (
        <>
          {loading ?

            <Loading/>

                :

            <Routes>
                <Route path={'*'} element={<LayoutForm/>}>

                </Route>
            </Routes>
          }
        </>
  );
}

export default App;
