import React, {useEffect, useState} from 'react';
import './App.css';
import LayoutForm from "./components/layout/layout";
import {Loading} from "./components/loading/loading";
import {Context} from "./context";
import Login from "./components/login/login";
import {Route, Routes, useNavigate} from "react-router-dom";
import Url from "./components/api-configue";
import axios from "axios";
import Compressor from "compressorjs";
import {Banner} from "./components/layout/banner";

declare global {
    interface Window {
        MozWebSocket: any;
        ws: any;
        send: any;
    }
}
function App() {
    const [loading, setLoading] = useState(true)
    const [isLogged, setLogged] = useState(false)
    const navigate = useNavigate();
    const [currentProduct, setCurrentProduct] = useState<number>(0)
    const [permission, setPermission] = useState<[]>([]);
    const [fullName, setFullName] = useState('');
    const [department, setDepartment] = useState('');
    const [compress, setCompress] = useState('');
    const [currentProductFactor, setCurrentProductFactor] = useState<number>(0)
    const [currentProductCheck, setCurrentProductCheck] = useState<number>(0)
    const [currentProductDoc, setCurrentProductDoc] = useState<string>('');
    const [listPropertyFactor, setListPropertyFactor] = useState<any>([]);
    const [compressed, setCompressed] = useState('');
    const [currentPropertyForm, setCurrentPropertyForm] = useState<string>('');
    const [propertyCapsule, setPropertyCapsule] = useState<any>([]);
    const [propertyTab, setPropertyTab] = useState<string>('ثبت اولیه / خرید');
    const [loadingAjax, setLoadingAjax] = useState(false)
    const [currentProperty, setCurrentProperty] = useState<number>(0)
    const [currentPropertyTable, setCurrentPropertyTable] = useState<string>('');
    const [currentPropertyFactor, setCurrentPropertyFactor] = useState<number>(0)


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

    const fetchData = async () => {
        setLoading(true)
        await axios.get(`${Url}/api/factor_property/?fields=code,jsonData`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            return response
        }).then(async data => {
            setListPropertyFactor(data.data)
        }).catch((error) => {
            if (error.request.status === 403) {
                navigate('/')
            }
        }).finally(() => setLoading(false)
        )
    }

    useEffect(() => {
                if (isLogged) {
                    void fetchData()
                }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isLogged])

    useEffect(() => {
        if (isLogged) {
            (async () => {
                await axios.get(`${Url}/permission`, {
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
                await axios.get(`${Url}/name`, {
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
                await axios.get(`${Url}/department`, {
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


      if (document.readyState === "complete") {
        const wsImpl = window.WebSocket || window.MozWebSocket;

        window.ws = new wsImpl('ws://localhost:8181/');

        window.ws.onmessage = function (e: { data: any; }) {
            if (typeof e.data === "string") {
                //IF Received Data is String
            } else if (e.data instanceof ArrayBuffer) {
                //IF Received Data is ArrayBuffer
            } else if (e.data instanceof Blob) {
                const f = e.data;
                const reader = new FileReader();
                reader.onload = function (e) {

                    // @ts-ignore
                    setScan(e.target.result.replace('data:application/octet-stream;base64,', 'data:image/jpg;base64,'))
                    // @ts-ignore
                    setCompress(e.target.result.replace('data:application/octet-stream;base64,', ''))
                }
                reader.readAsDataURL(f);
            }
        };
    }

    const imageContent = atob(compress);
    const buffer = new ArrayBuffer(imageContent.length);
    const view = new Uint8Array(buffer);
    for (let n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n);
    }
    const type = 'image/jpeg';
    const blob = new Blob([buffer], {type});
    const file = new File([blob], 'we', {lastModified: new Date().getTime(), type});


    new Compressor(file, {
        quality: 0.8,

        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        success(result) {

            // The third parameter is required for server
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = function () {
                const base64data = reader.result;
                // @ts-ignore
                setCompressed(base64data);
            }
            // Send the compressed image file to server with XMLHttpRequest.

        },
        error() {
        },
    });


  return (
        <>
          {loading ?
            <Loading/>
                :
               <Context.Provider value={{
                    setLogged,
                    isLogged,
                    currentProduct,
                    setCurrentProduct,
                    fullName,
                    currentProductDoc,
                    listPropertyFactor,
                    setPropertyTab,
                    propertyTab,
                    setCurrentPropertyFactor,
                    currentPropertyFactor,
                    setCurrentProductDoc,
                    setCurrentProperty,
                    currentProperty,
                    currentProductFactor,
                    setCurrentPropertyTable,
                    currentPropertyTable,
                    currentProductCheck,
                    setPropertyCapsule,
                    propertyCapsule,
                    currentPropertyForm,
                    loadingAjax,
                    setLoadingAjax,
                    setCurrentPropertyForm,
                    setCurrentProductFactor,
                    setCurrentProductCheck,
                    department,
                    compressed,
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
