const express = require("express");
const router = express.Router();

const Size = require('../models/Sizes');
router.post('/',async (req,res)=>{
    let {id,name} = req.body;
    try{
        let newSize = await Size.create({
            id,
            name
        },{
            fields: ["id","name"]
        });
        if(newSize){
            res.json({
                result: 'ok',
                data: newSize
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
        let sizes = await Size.findAll({
            atributes: ['id','name'],
            where:{
                id
            }
        });
        if(sizes.length > 0) {
            sizes.forEach(async (size) => {
                await size.update({
                    name: name ? name : size.name
                });
            });
            res.json({
                result: 'ok',
                data:Size,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
                data:Size,
                message: `cant update. Error ${error}`
            });
        }
    } catch(error){
        res.json({
            result: 'failed',
            data:Size,
            message: `cant update. Error ${error}`
        });
    }
});


router.delete('/:id',async (req,res) => {
    const { id } = req.params;
    try{
        let deleteSize = Size.destroy({
            where: {
                id: id
            }
        });
        if (deleteSize){
            res.json({
                result: 'ok',
                data:Size,
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
        const Sizes = await Size.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:Sizes,
            message: "query list Sizes successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list Sizes failed, Error ${error}`
        });
    }

});


module.exports = router;