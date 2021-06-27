import * as path from "path";

export class FileUpload {

    public static fileUpload = async (file: any, imagePath) => {
        const ext = path.extname(file.name);
        const fileName = `${new Date().valueOf()}${ext}`;
        const uploadsDir = path.resolve(`${__dirname}/../`, imagePath);
        const tempFileName = `${uploadsDir}/${fileName}`;
        await file.mv(tempFileName);
        return `${fileName}`;
    }
}
