import client from "../../client";

export default {
    Query: {
        seeCoffee: async(_, {id}) =>
            client.Coffee.findUnique({
                where: {
                    id
                }
            })
    }
    
};