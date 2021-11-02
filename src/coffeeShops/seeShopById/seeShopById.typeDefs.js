import { gql } from "apollo-server";

export default gql`
    type Query {
        seeShopById(UserId: Int!):[CoffeeShop]
    }
`;