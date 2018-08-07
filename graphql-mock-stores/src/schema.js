// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

// graphql-tools combines a schema string with resolvers.
import { makeExecutableSchema } from "graphql-tools";
import { data } from "./data.js";

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    stores: StoreList!
  }
  type StoreList {
    # A list of edges
    edges: [Store!]
    # Identifies the total count of items in the list
    totalCount: Int!
  }

  type Store {
    id: ID!
    name: String!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    stores: () => {
      return {
        edges: data,
        totalCount: data.length
      };
    }
  }
};

// Required: Export the GraphQL.js schema object as "schema"
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
export function context(headers, secrets) {
  return {
    headers,
    secrets
  };
}

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
