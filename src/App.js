import React, { Component } from "react";
import { Query } from "react-apollo";

import ApolloClient from "apollo-boost";

import gql from "graphql-tag";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <p className="App-intro">
            Two Apollo clients consuming two different GraphQL APIs. First using
            context client, second using props client.
          </p>
          <div className="App-container">
            <div className="App-container-item" key="1">
              <QueryDefaultClient />
            </div>
            <div className="App-container-item" key="2">
              <QueryOverridingClient />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const storeQuery = gql`
  query {
    stores {
      edges {
        name
        id
      }
      totalCount
    }
  }
`;

const QueryDefaultClient = () => {
  return (
    <Query query={storeQuery}>
      {({ error, loading, data }) => {
        if (error) return "Error!";
        if (loading) return "Loading!";

        if (data) {
          const stores = data.stores;
          return (
            <ul>
              <h3>Default client providing stores</h3>
              <p>{`${stores.totalCount} stores!`}</p>
              {stores.edges.map(store => {
                return (
                  <li key={`${store.name}-${store.id}`}>{`Name: ${
                    store.name
                  } - Id: ${store.id}`}</li>
                );
              })}
            </ul>
          );
        }
      }}
    </Query>
  );
};

const cityQuery = gql`
  query {
    cities {
      edges {
        name
        id
      }
      totalCount
    }
  }
`;

const customClient = new ApolloClient({
  uri: "http://localhost:3002/graphql"
});

const QueryOverridingClient = () => {
  return (
    <Query query={cityQuery} client={customClient}>
      {({ error, loading, data }) => {
        if (error) return "Error!";
        if (loading) return "Loading!";

        if (data) {
          const cities = data.cities;
          return (
            <ul>
              <h3>Overriding client through props providing cities</h3>
              <p>{`${cities.totalCount} cities!`}</p>
              {cities.edges.map(city => {
                return (
                  <li key={`${city.name}-${city.id}`}>{`Name: ${
                    city.name
                  } - Id: ${city.id}`}</li>
                );
              })}
            </ul>
          );
        }
      }}
    </Query>
  );
};

export default App;
