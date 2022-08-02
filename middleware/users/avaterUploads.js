const {singleUpload} = require('../../utilities/singleUpload');

const avatarUpload = (req,res,next) => {
    const upload = singleUpload(
        "avater",
        ["image/png", "image/jpg", "image/jpeg"],
        10000000000,
        "Upload .jpg/.png/.jpeg file with 1MB size"
        );
        
    upload.any()(req,res, (err) => {
        if(err){
            console.log(err.message);
            res.status(500).json({
                errors: {
                    avatar: {
                        msg: err.message,
                    }
                }
            })
        }else{
            next();
        }
    })
}

module.exports = {
    avatarUpload,
}