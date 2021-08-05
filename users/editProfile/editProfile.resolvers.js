import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";
import {GraphQLUpload} from "graphql-upload";

export default {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectedResolver(async(_,{
            username,
            email,
            name,
            password,
            location,
            avatarURL,
            githubUsername},{loggedInUser}) => {
                let url = null;
                if (avatarURL) {
                    const { filename, createReadStream } = await avatarURL;
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                    readStream.pipe(writeStream);
                    url = `http://localhost:4000/static/${newFilename}`;
                }

                let hashedPw = null;
                if(password){
                    hashedPw = await bcrypt.hash(password, 10);
                }
                const updateUser = await client.user.update({
                    where:{
                        id: loggedInUser.id,
                    },
                    data:{
                        username,
                        email,
                        name,
                        ...(hashedPw && {password: hashedPw}),
                        location,
                        ...(url && {avatarURL: url}),
                        githubUsername,
                    },
                });
                if (updateUser.id){
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        error: "could not update profile",
                    };
                }

        }),
    }
};