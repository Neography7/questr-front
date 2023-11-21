import { BrowserRouter } from "react-router-dom";
import { store } from './app/store'
import { Provider } from 'react-redux'
import { ApolloProvider } from "@apollo/client";
import client from "./libs/apollo";
import AuthProvider from "./context/AuthContext";
import { Router } from "./routes";

export default function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AuthProvider>
              <Router />
          </AuthProvider>
        </ApolloProvider>
      </Provider>
    </BrowserRouter>
  );
}