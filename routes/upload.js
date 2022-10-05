/* 
    Path: /api/upload 
*/
const {Router} = require('express');
const fileUploadExpress = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const {fileUpload, returnImage} = require('../controllers/upload');

const router = Router();

router.use(fileUploadExpress());

router.put('/:tipo/:id', 
    [
        validarJWT
    ], 
    fileUpload);

router.get('/:tipo/:foto', 
    [
        validarJWT
    ], 
    returnImage);

module.exports = router;