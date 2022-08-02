const multer = require('multer');
const path = require('path');
const createError = require('http-errors');


const singleUpload = (sub_foler,mimetype,max_size,error_msg) => {
    const storage = multer.diskStorage({
        destination: (req,file,cb) => {
            const folder = path.join(__dirname, `../Public/uploads/${sub_foler}`);
            cb(null,folder);
        },
        filename: (req,file,cb) => {
            const ext = path.extname(file.originalname);
            const fileName = file.originalname
                                    .replace(ext, "")
                                    .toLowerCase()
                                    .split(" ")
                                    .join("-") + "-" + Date.now() + ext;
            cb(null,fileName);
        }
    });
    const upload = multer({
        storage: storage,
        limits: max_size,
        fileFilter: (req,file,cb) => {
            if(mimetype.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb(createError(error_msg));
            }
        }
    });

    return upload;
}

module.exports = {
    singleUpload
}