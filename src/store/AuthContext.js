import React, { createContext, useEffect, useReducer } from "react";
import Axios from "apis/axiosConfig";

export const AuthContext = createContext();

function AuthContextProvider(props) {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.clear();
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
        Axios.defaults.headers.common.Authorization = `${action.payload.token}`;
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        };
      case "LOGOUT":
        localStorage.clear();
        delete Axios.defaults.headers.common.Authorization;
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: JSON.parse(user),
          token: JSON.parse(token),
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
