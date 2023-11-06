import {createContext} from "react";

type SetValueBool = (_value: boolean) => void;
type SetValueNumber = (_value: number) => void;
type SetValueString = (_value: string) => void;

type ContextType = {
  isLogged: boolean;
  department: string;
  fullName: string;
  currentProductFactor: number;
  currentProductCheck: number;
  currentProduct: number;
  compressed: string;
  permission: string[];
  setLogged: SetValueBool;
  setCurrentProduct: SetValueNumber;
  setCurrentProductFactor: SetValueNumber;
  setCurrentProductCheck: SetValueNumber;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    setCurrentProduct: () => {},
    setCurrentProductCheck: () => {},
    setCurrentProductFactor: () => {},
    isLogged: false,
    department: '',
    currentProductFactor: 0,
    currentProductCheck: 0,
    compressed: '',
    currentProduct: 0,
    fullName: '',
    permission: [],
})