import { gql } from "apollo-server";

export default gql`
    type Like {
        id: Int!
        shop: CoffeeShop
        user: User
        createdAt: String!
        updatedAt: String!
    }
`;
