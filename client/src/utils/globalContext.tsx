import { createContext, useContext } from "react";

//global state para manejar el tipo de usuario ---
export type GlobalContent = {
  userName: any;
  setUserName: (user: any) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  userName: {},
  setUserName: () => {}
});
export const useGlobalContext = () => useContext(MyGlobalContext);
