import client from "../../client";
import { handleFile } from "../../coffeeShops/coffeeShops.utils";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
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
                    url = handleFile(avatarURL, loggedInUser.id);
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
                        error: "프로필을 업데이트 할 수 없습니다.",
                    };
                }

        }),
    }
};