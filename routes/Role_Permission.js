const express = require("express");
const router = express.Router();

const Role_Permission = require('../models/Role_Permission');
router.post('/',async (req,res)=>{
    let {id,role_id,name} = req.body;
    try{
    let newRolePermission = await Role_Permission.create({
            id,
            role_id,
            name
        },{
            fields:["id","role_id","name"]
        });
        if(newRole_Permission){
            res.json({
                result: 'ok',
                data: newRolePermission
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
    res.json({
        data:"Astralose"
    });
});

module.exports = router;