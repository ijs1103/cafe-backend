import { gql } from "apollo-server";

export default gql`
    type Query {
        searchShops(offset: Int!, limit: Int!, keyword: String!): [CoffeeShop]
    }
`;