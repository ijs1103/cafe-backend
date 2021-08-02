import client from "../../client";

export default {
    Mutation: {
        createCoffee: async(_, {name}) => 
            client.Coffee.create({
                data: {
                    name
                }
            })
    }
    
};