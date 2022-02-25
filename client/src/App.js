//Libraries/////////////////////////////////////////////////////
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import Splash from "./components/Splash";

//Components///////////////////////////////////////////////////
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import Splash from "./components/Splash";
import Listings from "./components/Listings";

//Apollo///////////////////////////////////////////////////////
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

//APP/////////////////////////////////////////////////////////////

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="root">
          <Nav />
          <Splash/>
          <Listings />
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
