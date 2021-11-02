import { gql } from "apollo-server";

export default gql`
    type Query {
        seeComments(offset: Int, limit: Int, shopId: Int!):[Comment]
    }
`;