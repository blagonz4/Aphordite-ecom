const express = require("express");
const router = express.Router();

const Model = require('../models/Models');
router.post('/',async (req,res)=>{
    let {id,name} = req.body;
    try{
        let newModel = await Model.create({
            id,
            name
        },{
            fields: ["id","name"]
        });
        if(newModel){
            res.json({
                result: 'ok',
                data: newModel
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
        let models = await Model.findAll({
            atributes: ['id','name'],
            where:{
                id
            }
        });
        if(models.length > 0) {
            models.forEach(async (model) => {
                await model.update({
                    name: name ? name : model.name
                });
            });
            res.json({
                result: 'ok',
                data:models,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
                data:models,
                message: `cant update. Error ${error}`
            });
        }
    } catch(error){
        res.json({
            result: 'failed',
            message: `cant update. Error ${error}`
        });
    }
});


router.delete('/:id',async (req,res) => {
    const { id } = req.params;
    try{
        let deleteModel = Model.destroy({
            where: {
                id: id
            }
        });
        if (deleteModel){
            res.json({
                result: 'ok',
                data:Model,
                message: `delete success`
            });
        }
    } 
    catch (error){
        res.json({
            result: 'failed',
            message: `delete failed. Error ${error}`
        });
    }
});

router.get('/',async (req,res) => {
    try {
        const Models = await Model.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:Models,
            message: "query list Sizes successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list Models failed, Error ${error}`
        });
    }

});


module.exports = router;