import { gql } from "apollo-server";

export default gql`
    type Coffee {
        id: Int!
        name: String!
        createdAt: String!
        updatedAt: String!
    }
    
`;