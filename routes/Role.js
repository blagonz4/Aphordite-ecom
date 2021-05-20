const express = require("express");
const router = express.Router();

const Role = require('../models/Role');
router.post('/',async (req,res)=>{
    let {id,name} = req.body;
    try{
        let newRole = await Role.create({
            id,
            name
        },{
            fields: ["id","name"]
        });
        if(newRole){
            res.json({
                result: 'ok',
                data: newRole
            })
        } else {
            res.json({
                result:'failed', 
                data:{},
                message: `Insert failed`
            });
        }
    }catch(error){
        res.json({
            result:'failed',
            data:{},
            message: `Insert failed. Error: ${error}`
        });
    }
});

router.put('/:id',async (req,res) =>{
    const {id} = req.params;
    const {name} = req.body;
    try{
        let role = await Role.findAll({
            atributes: ['id','name'],
            where:{
                id
            }
        });
        if(role.length > 0) {
            role.forEach(async (role) => {
                await role.update({
                    name: name ? name : role.name
                });
            });
            res.json({
                result: 'ok',
                data:role,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
                data:role,
                message: `cant update. Error ${error}`
            });
        }
    } catch(error){
        res.json({
            result: 'failed',
            data:role,
            message: `cant update. Error ${error}`
        });
    }
});


router.delete('/:id',async (req,res) => {
    const { id } = req.params;
    try{
        let deleteRole = Role.destroy({
            where: {
                id: id
            }
        });
        if (deleteRole){
            res.json({
                result: 'ok',
                data:role,
                message: `delete success`
            });
        }
    } 
    catch (error){
        res.json({
            result: 'failed',
            data:role,
            message: `delete failed. Error ${error}`
        });
    }
});

router.get('/',async (req,res) => {
    try {
        const roles = await Role.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:roles,
            message: "query list Role successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            data:roles,
            message: `query list Role failed, Error ${error}`
        });
    }

});


module.exports = router;