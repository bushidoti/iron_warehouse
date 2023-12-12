import {createContext} from "react";

type SetValueBool = (_value: boolean) => void;
type SetValueNumber = (_value: number) => void;
type SetValueString = (_value: string) => void;
type SetValueAny = (_value: (oldArray: any) => any[]) => void;

type ContextType = {
  isLogged: boolean;
  loadingAjax: boolean;
  department: string;
  fullName: string;
  currentProductFactor: number;
  currentProductCheck: number;
  currentProperty: number;
  currentPropertyFactor: number;
  currentProduct: number;
  currentProductDoc: string;
  currentPropertyForm: string;
  compressed: string;
  currentPropertyTable: string;
  propertyTab: string;
  permission: string[];
  listPropertyFactor: any[];
  propertyCapsule: any[];
  setLogged: SetValueBool;
  setLoadingAjax: SetValueBool;
  setCurrentProduct: SetValueNumber;
  setCurrentProductFactor: SetValueNumber;
  setCurrentProperty: SetValueNumber;
  setCurrentProductCheck: SetValueNumber;
  setCurrentPropertyFactor: SetValueNumber;
  setCurrentProductDoc: SetValueString;
  setCurrentPropertyTable: SetValueString;
  setPropertyCapsule: SetValueAny;
  setCurrentPropertyForm: SetValueString;
  setPropertyTab: SetValueString;
};

export const Context = createContext<ContextType>({
    setLogged: () => {},
    setCurrentPropertyForm: () => {},
    setCurrentProductDoc: () => {},
    setCurrentProperty: () => {},
    setLoadingAjax: () => {},
    setCurrentPropertyTable: () => {},
    setCurrentProduct: () => {},
    setCurrentProductCheck: () => {},
    setCurrentProductFactor: () => {},
    setCurrentPropertyFactor: () => {},
    setPropertyCapsule: () => {},
    setPropertyTab: () => {},
    isLogged: false,
    loadingAjax: false,
    department: '',
    currentPropertyTable: '',
    currentProductDoc: '',
    propertyTab: '',
    currentPropertyForm: '',
    currentProductFactor: 0,
    currentPropertyFactor: 0,
    currentProperty: 0,
    currentProductCheck: 0,
    compressed: '',
    currentProduct: 0,
    fullName: '',
    permission: [],
    propertyCapsule: [],
    listPropertyFactor: [],
})