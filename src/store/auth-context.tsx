import { createContext, PropsWithChildren, useEffect, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email: string, password: string) => {}
});

export const AuthContextProvider = (props: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const onLoginHandler = (email: string, password: string) => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const onLogoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: onLogoutHandler, onLogin: onLoginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
