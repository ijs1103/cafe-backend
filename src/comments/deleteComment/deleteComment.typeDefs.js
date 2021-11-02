import { gql } from "apollo-server";

export default gql`
    type deleteResult{
        id: Int
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteComment(id: Int!): deleteResult!
    }
`;