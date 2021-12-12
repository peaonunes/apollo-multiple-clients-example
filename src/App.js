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
query GetExchangeRates {
  rates(currency: "USD") {
    currency
    rate
  }
}
`

const QueryDefaultClient = () => {
  return (
    <Query query={storeQuery}>
      {({ error, loading, data }) => {
        if (error) return "Error!";
        if (loading) return "Loading!";
      
        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>
              {currency}: {rate}
            </p>
          </div>
        ));
      }}
    </Query>
  );
};

const dogsQuery = gql`
query GetDogs {
  dogs {
    id
    breed
  }
}
`;

const customClient = new ApolloClient({
  uri: "https://71z1g.sse.codesandbox.io/"
});

const QueryOverridingClient = () => {
  const onDogSelected = () => console.log('Dog selected')
  return (
    <Query query={dogsQuery} client={customClient}>
      {({ error, loading, data }) => {
        if (error) return "Error!";
        if (error) {
          console.log('error: ', error)
        }
        if (loading) return "Loading!";

        return (
          <select name="dog" onChange={() => onDogSelected()}>
            {data.dogs.map(dog => (
              <option key={dog.id} value={dog.breed}>
                {dog.breed}
              </option>
            ))}
          </select>
        );
      }}
    </Query>
  );
};

export default App;
