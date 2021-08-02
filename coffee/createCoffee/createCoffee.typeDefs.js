import { gql } from "apollo-server";

export default gql`
    type Mutation {
        createCoffee(name: String!): Coffee
    }
`;