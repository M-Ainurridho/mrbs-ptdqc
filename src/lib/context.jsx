/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const LoginContext = createContext(false);
export const UserContext = createContext(null);
// export const AlertContext = createContext(false);


const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// export const AlertProvider = ({ children }) => {
//   const [alert, setAlert] = useState(false);

//   return (
//     <AlertContext.Provider value={{ alert, setAlert }}>
//       {children}
//     </AlertContext.Provider>
//   );
// };

export default LoginProvider;
