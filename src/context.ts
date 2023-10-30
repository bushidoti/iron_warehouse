import {createContext} from "react";

export const Context = createContext({
    setLogged: (_value: boolean) => {
    },
    isLogged: false,
    department: '',
    fullName: '',
    permission: {},
})