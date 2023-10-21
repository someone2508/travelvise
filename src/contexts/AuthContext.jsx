import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const USERS = [
  {
    name: "swapnil",
    email: "swapnil@swapnil.com",
    password: "swapnil",
    avatar: "https://i.pravatar.cc/100?u=zz",
  },
];

let initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    const foundUser = USERS.find(
      (e) => e.email === email && e.password === password
    );
    if (foundUser) dispatch({ type: "login", payload: foundUser });
    console.log(foundUser);
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ login, logout, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
