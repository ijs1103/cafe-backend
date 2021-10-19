import { gql } from "apollo-server";

export default gql`
    type socialSignUpResult{
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        socialSignUp(username: String!, email: String!, provider: String!): socialSignUpResult!
    }
`;