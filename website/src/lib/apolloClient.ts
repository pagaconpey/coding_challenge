// lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: createHttpLink({
        uri: "https://fdg37dqijzb5bik5ci7ll4w7la.appsync-api.us-east-2.amazonaws.com/graphql",
        headers: {
            "x-api-key": "da2-xx22kxmcg5bcxhi74rauausswa",
        },
    }),
    cache: new InMemoryCache(),
});

export default client;
