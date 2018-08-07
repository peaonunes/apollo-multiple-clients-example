# apollo-multiple-clients-example

Runnable example showing that is possible to override client via props.

Project connects to two different clients running on localhost 3001 and 3002.

## Installing

```
cd graphql-mock-cities && yarn install && cd ../graphql-mock-stores && yarn install & cd .. & yarn install
```

## Runnning

```
// First mock
cd graphql-mock-cities && yarn start

// Second mock
cd graphql-mock-stores && yarn start

// Project
yarn start
```

You can use `yarn` or `npm` if you prefer.

Access: http://localhots:3000 to see the result!

![alt text](https://media.giphy.com/media/fLyBfKE6A4KKV9gQpa/giphy.gif "apollo two clients")

### /graphql-mock-cities

Graphql Mock project running on localhost:3002/graphql.
Return list of cities.

### /graphql-mock-stores

Graphql Mock project running on localhost:3001/graphql.
Return list of stores.
