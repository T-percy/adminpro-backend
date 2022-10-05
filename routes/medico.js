/* 
    Path: /api/medico 
*/

const {Router} = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

const {getMedicos, createMedico, updateMedico, deleteMedico} = require('../controllers/medico');

const router = Router();

router.get('/', getMedicos);

router.post('/', 
    [
        validarJWT,
        check('name', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos,
    ], 
    createMedico);

router.put('/:id', 
    [
        
    ], 
    updateMedico);

router.delete('/:id', 
    [
        
    ], 
    deleteMedico);

module.exports = router;