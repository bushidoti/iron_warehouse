import {createContext} from "react";

type SetValue = (_value: boolean) => void;

type ContextType = {
  isLogged: boolean;
  department: string;
  fullName: string;
  permission: string[];
  setLogged: SetValue;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    isLogged: false,
    department: '',
    fullName: '',
    permission: [],
})