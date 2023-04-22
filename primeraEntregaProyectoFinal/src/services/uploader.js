import multer from "multer";
import __dirname from "../utils.js"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, `${__dirname}/public`)
    },
    filename: function (req, file, cb) {

        cd(null, `${Date.now()}-${file.originalname}`)
    }
})

export const uploader = multer({ storage })
