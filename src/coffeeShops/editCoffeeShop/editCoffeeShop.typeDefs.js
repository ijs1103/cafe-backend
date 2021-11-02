import { gql } from "apollo-server";

export default gql`
    type Mutation {
        editCoffeeShop(
            id: Int!
            category: String
            newShopName: String
            address: String
            url: Upload            
        ): MutationResponse!
    }
`;