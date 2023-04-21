import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/wagtail/": {
      schema: "http://127.0.0.1:8000/graphql/",
      preset: "client",
      documents: ["lib/**/*.ts"],
    },
    "./src/gql/keeper/": {
      schema: "http://127.0.0.1:8080/graphql/",
      preset: "client",
      documents: ["pages/keeper/*.tsx"]
    }
  },
};

export default config;
