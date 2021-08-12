import { gql } from "apollo-server";

export default gql`
    
    type editCoffeeShopResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        editCoffeeShop(
            id: Int!
            category: String
            newShopName: String
            latitude: String
            longitude: String
            url: Upload            
        ): editCoffeeShopResult!
    }
`;