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
  currentProductDoc: string;
  compressed: string;
  permission: string[];
  setLogged: SetValueBool;
  setCurrentProduct: SetValueNumber;
  setCurrentProductFactor: SetValueNumber;
  setCurrentProductCheck: SetValueNumber;
  setCurrentProductDoc: SetValueString;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    setCurrentProductDoc: () => {},
    setCurrentProduct: () => {},
    setCurrentProductCheck: () => {},
    setCurrentProductFactor: () => {},
    isLogged: false,
    department: '',
    currentProductDoc: '',
    currentProductFactor: 0,
    currentProductCheck: 0,
    compressed: '',
    currentProduct: 0,
    fullName: '',
    permission: [],
})