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

//Components///////////////////////////////////////////////////
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Listings from "./components/Listings";
import Splash from "./components/Splash";
import Users from "./components/Users";
import Dashboard from "./components/Dashboard";
import AddListing from "./components/AddListing";

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
          <Switch>
            <Route exact path="/">
              <Splash />
              <Listings />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/addListing">
              <AddListing />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
