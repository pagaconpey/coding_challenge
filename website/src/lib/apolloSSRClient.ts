// lib/apolloSSRClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function createApolloSSRClient() {
    return new ApolloClient({
        ssrMode: true,
        link: new HttpLink({
            uri: process.env.NEXT_PUBLIC_DYNAMO_DB_API_URL,
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_DYNAMO_DB_API_KEY!,
            },
        }),
        cache: new InMemoryCache(),
    });
}
