import * as path from 'path';

export class FileUpload {

    public static fileUploading = async (file: any) => {
        const ext = path.extname(file.name);
        const fileName = `${new Date().valueOf()}${ext}`;
        const uploadsDir = path.resolve(`${__dirname}/../`, 'images');
        const tempFileName = `${uploadsDir}/${fileName}`;
        await file.mv(tempFileName);
        return `${fileName}`;
    }
}
