import {createContext} from "react";

type SetValueBool = (_value: boolean) => void;
type SetValueNumber = (_value: number) => void;

type ContextType = {
  isLogged: boolean;
  department: string;
  fullName: string;
  currentProduct: number;
  compressed: string;
  permission: string[];
  setLogged: SetValueBool;
  setCurrentProduct: SetValueNumber;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    setCurrentProduct: () => {},
    isLogged: false,
    department: '',
    compressed: '',
    currentProduct: 0,
    fullName: '',
    permission: [],
})