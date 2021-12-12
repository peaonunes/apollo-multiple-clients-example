import React from "react";
import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";

const defaultClient = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

ReactDOM.render(
  <ApolloProvider client={defaultClient}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
