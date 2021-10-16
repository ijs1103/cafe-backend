import AWS from "aws-sdk";
AWS.config.update({
    credentials:{
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});
export const uploadPhoto = async (file, id, folderName) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${folderName}/${id}-${Date.now()}-${filename}`;
    console.log(objectName);
    const { Location } = await new AWS.S3().upload({
        Bucket: "cafephotouploadssibal",
        Key: objectName,
        ACL: "public-read",
        Body: readStream,
        region: "ap-northeast-2"
    }).promise();
    
    return Location;
}