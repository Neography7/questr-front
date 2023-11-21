import { ReactNode, createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthService from "../app/services/auth.service";
import { setAuth } from '../app/slices/auth';
import { useDispatch } from 'react-redux';
import { Spinner } from "flowbite-react";
import { Dispatch } from "@reduxjs/toolkit";

export const AuthContext = createContext({ });

const AuthProvider = ({ children }: { children: ReactNode }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const authenticated = useSelector((state: any) => state.auth.authenticated);

  useEffect(() => {

    const token = localStorage.getItem("token") ?? '';
    
    const getUser = async (token: string, dispatch: Dispatch) => {

      if (token && !authenticated) {
    
        setIsLoading(true)
        
        const { error, data } = await AuthService.validateToken(token);
        
        if (error) {
          localStorage.removeItem('token');
          setIsLoading(false);
          return;
        }

        dispatch(setAuth({
          authenticated: true,
          token: data.validateToken.token,
          user: {
            id: data.validateToken.userID,
            username: data.validateToken.username,
            nickname: data.validateToken.nickname,
            email: data.validateToken.email,
            avatar: data.validateToken.avatar,
          }
        }));

        setIsLoading(false);

        return;

      } else {

        setIsLoading(false);

      }

    }

    getUser(token, dispatch);
    
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ isLoading }}>
      {isLoading ? <>
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-75 z-50">
          <div className="text-center">
            <Spinner size="xl" aria-label="Center-aligned spinner" />
          </div>
        </div>
      </> : children }
    </AuthContext.Provider>
  );
};

export default AuthProvider;