import { gql } from "apollo-server";

export default gql`
    type Query {
        seeCoffee(id: Int!): Coffee
    }
`;