import { gql } from "apollo-server";

export default gql`
    type Query {
        seeMyLikes(userId: Int!):[Like]
    }
`;