import { gql } from "apollo-server";

export default gql`
    type Query {
        seeLikeShops(UserId: Int): [CoffeeShop]
    }
`;