import { gql } from "apollo-server";

export default gql`
    type editResult{
        ok: Boolean!
        id: Int
        error: String
    }
    type Mutation {
        editComment(id: Int!, payload: String!): editResult!
    }
`;