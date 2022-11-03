import { createContext, useContext } from "react";

//global state para manejar el tipo de usuario ---
export type GlobalContent = {
  userTypeState: string;
  setUserTypeState: (c: string) => void;
  user: any;
  setUser: (user: any) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userTypeState: "", // set a default value
  setUserTypeState: () => {},
  user: {},
  setUser: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
