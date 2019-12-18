// @ts-check

import { ApolloServer, gql } from 'apollo-server';

// gql tag parses the template string into a GraphQL Schema
const typeDefs = gql`
    schema {
        query: Query
        # mutation: mutation
        # subscription: Subscription
    }
    type Query {
        greeting: String
    }
`;
// console.log(typeDefs);

const resolvers = {
    Query: {
        greeting: () => 'Hello GraphQL world!'
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 9000 })
    .then((serverInfo) => console.log(`Server running at ${serverInfo.url}`));
    // .then(({ url }) => console.log(`Server running at ${url}`));
