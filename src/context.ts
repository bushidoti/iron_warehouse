import {createContext} from "react";

type SetValue = (_value: boolean) => void;

type ContextType = {
  isLogged: boolean;
  department: string;
  fullName: string;
  compressed: string;
  permission: string[];
  setLogged: SetValue;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    isLogged: false,
    department: '',
    compressed: '',
    fullName: '',
    permission: [],
})