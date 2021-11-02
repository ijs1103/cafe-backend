import { gql } from "apollo-server";

export default gql`
    type CreateCommentResult {
        ok: Boolean!
        id: Int
        error: String
    }
    type Mutation {
        createComment(shopId: Int!, payload: String!): CreateCommentResult!
    }
`;