import { gql } from "apollo-server";

export default gql`
    type Mutation {
        createCoffeeShop(
            name:       String!
            address: String
            url: Upload
            categoryName: String!): MutationResponse!
    }
    
`;