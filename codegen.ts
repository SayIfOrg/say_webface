import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  documents: ["lib/**/*.ts"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./src/gql/wagtail/": {
      schema: "http://127.0.0.1:8000/graphql/",
      preset: "client",
    },
  },
};

export default config;
