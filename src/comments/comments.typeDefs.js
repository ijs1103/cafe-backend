import { gql } from "apollo-server";

export default gql`
    type Comment {
        id: Int!
        user: User!
        photo: CoffeeShop!
        payload: String!
        isMine: Boolean!
        createdAt: String!
        updatedAt: String!
    }
`;
