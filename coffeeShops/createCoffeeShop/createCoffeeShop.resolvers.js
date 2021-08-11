import client from "../../client";
import { createWriteStream } from "fs";
import { protectedResolver } from "../../users/users.utils";

export default {
    Mutation: {
        createCoffeeShop: protectedResolver(async(_,{name,latitude,longitude,url,categoryName,slug},{loggedInUser}) => {
            // connectOrCreate는 사실상 외래키 속성도 동시에 create 하려고 사용하는것
            // connectOrCreate의 where 조건절에는 필드가 하나만 있어야 한다
            try {
                let categoryObj = {
                    where: { name: categoryName },
                    create: { name: categoryName, slug },
                };
                let newUrl = null;
                if (url){
                    const { filename, createReadStream } = await url;
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
                    readStream.pipe(writeStream);
                    newUrl = `http://localhost:4000/static/${newFilename}`;
                }
                                
                let photoObj = {
                    where: { url: newUrl },
                    create: { url: newUrl },
                };
    
                let shop = await client.coffeeShop.create({
                    data: {
                        name,
                        ...(latitude&&{latitude}),
                        ...(longitude&&{longitude}),
                        user: {
                            connect:{
                                id: loggedInUser.id
                            }
                        },
                        photos: {
                            connectOrCreate: photoObj
                        },
                        categories: {
                            connectOrCreate: categoryObj
                        }
                    }
                });
                return shop;
            } catch (error) {
                console.log(error);
            }
        })
    }
};