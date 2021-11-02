import { gql } from "apollo-server";

export default gql`
    type CoffeeShopPhoto {
        id:     Int
        url:    String
        shop:   CoffeeShop
    }
    type CoffeeShop {
        id:         Int
        name:       String
        address:    String
        user:       User
        photos:     [CoffeeShopPhoto]
        categories: [Category]
        isLiked: Boolean
        likes: Int
        comments: [Comment]
        commentNumber: Int!
        createdAt: String!
        updatedAt: String!
    }
    type Category {
        id:     Int
        name:   String
        slug:   String
        shops:  [CoffeeShop]
        totalShops: Int
    }
    type Query {
        dummy: String
    }
`;