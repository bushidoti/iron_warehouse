import React, {useEffect, useState} from 'react';
import './App.css';
import LayoutForm from "./components/layout/layout";
import {Loading} from "./components/loading/loading";
import {Banner} from "./components/layout/banner";
import {Context} from "./context";
import Login from "./components/login/login";
import {Route, Routes, useNavigate} from "react-router-dom";
import Url from "./components/api-configue";
import axios from "axios";

function App() {
    const [loading, setLoading] = useState(true)
    const [isLogged, setLogged] = useState(false)
    const navigate = useNavigate();
    const [permission, setPermission] = useState<object>({});
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');

    useEffect(() => {
        if (document.readyState === "complete") {
            setTimeout(() => setLoading(false), 3000)
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setLogged(true);
        } else {
            navigate('/login');
        }
    }, [isLogged, navigate]);

    useEffect(() => {
        if (isLogged) {
            (async () => {
                await axios.get(`${Url}/permission/`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                }).then(response => {
                    return response
                }).then(async data => {
                    setPermission(data.data.content)
                })
            })().then(
                async () => {
                await axios.get(`${Url}/name/`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                }).then(response => {
                    return response
                }).then(async data => {
                    setFullName(data.data.content)
                })
            }
            ).then(
                 async () => {
                await axios.get(`${Url}/department/`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }
                }).then(response => {
                    return response
                }).then(async data => {
                    setDepartment(data.data.content)
                })
            }
            )
        }
    }, [isLogged]);


  return (
        <>
          {loading ?
            <Loading/>
                :
               <Context.Provider value={{
                    setLogged,
                    isLogged,
                    fullName,
                    department,
                    permission
                }}>
                {isLogged ?
                    <>
                        <Banner/>
                        <Routes>
                            <Route path={'*'} element={<LayoutForm/>}>

                            </Route>
                        </Routes>
                    </>
                    :
                    <Routes>
                        <Route path={'/'}>
                            <Route path={'/login'} element={<Login/>}/>
                        </Route>
                    </Routes>
                }
               </Context.Provider>
          }
        </>
  );
}

export default App;
