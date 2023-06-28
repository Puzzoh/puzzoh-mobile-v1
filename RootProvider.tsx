import awsconfig from "./src/aws-exports";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import Amplify, { Auth } from "aws-amplify";
import { SafeAreaView, StyleSheet } from "react-native";

Amplify.configure(awsconfig);

const httpLink = createHttpLink({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const currUser = await Auth.currentAuthenticatedUser();
    const accessToken = currUser.signInUserSession.accessToken.jwtToken;
    // console.log(accessToken);
    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
        "X-API-KEY": awsconfig.aws_appsync_apiKey,
      },
    };
  } catch (error) {
    console.log("Error fetching tokens:", error);
    return {
      headers: {
        ...headers,
        "X-API-KEY": awsconfig.aws_appsync_apiKey,
      },
    };
  }
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]), //authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const RootProvider = ({ children }) => {
  return (
    <SafeAreaView style={rootStyles.app}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SafeAreaView>
  );
};

const rootStyles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
});

export default RootProvider;
