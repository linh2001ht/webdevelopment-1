import { createContext, useContext, useState } from "react";

const info = {
  username: null
}
export const UserContext = createContext(info);

export const ProvideAuth = ({ children }) => {
    const auth = useProvideAuth();
    return (
      <UserContext.Provider value={auth}>
        {children}
      </UserContext.Provider>
    );
  }

export const useAuth = () => {
    return useContext(UserContext);
  }
  
const fakeAuth = {
isAuthenticated: false,
signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
},
signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
}
};

export const useProvideAuth = () => {
  const [username, setUsername] = useState(null);

  const signin = cb => {
      return fakeAuth.signin(() => {
      setUsername(username);
      cb();
      });
  };

  const signout = cb => {
      return fakeAuth.signout(() => {
      setUsername(null);
      cb();
      });
  };

return {
    username,
    signin,
    signout
};
}
