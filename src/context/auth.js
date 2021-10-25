import React from 'react';
import { createContext, useContext, useState } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios'

const AuthContext = createContext();

export function useAuth() {
    const auth = useContext(AuthContext);
    if (!auth) throw new Error('You forgot AuthProvider!');
    return auth;
}


export async function registerD(data) {
    const newUser = await axios.post(`${process.env.REACT_APP_HEROKU_ROOT}/api/v1/users/create/`, {
      email: data.email,
      username: data.username,
      password: data.password,
      first_name: data.firstName,
      last_name: data.lastName,
      
  
  
    });
    return newUser.data;
  }


export function AuthProvider(props) {

    const [state, setState] = useState({
        tokens: null,
        user: null,
        login,
        logout,
    });

    async function login(email, password) {

      

        const response = await axios.post(`${process.env.REACT_APP_HEROKU_ROOT}/api/token/`, { email, password });

        const decodedAccess = jwt.decode(response.data.access);

        const newState = {
            tokens: response.data,
            user: {
                username: decodedAccess.username,
                email: decodedAccess.email,
                id: decodedAccess.user_id
            },
        }

        setState(prevState => ({ ...prevState, ...newState }));
    }

    function logout() {
        const newState = {
            tokens: null,
            user: null,
        }
        setState(prevState => ({ ...prevState, ...newState }));
    }

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    );
}