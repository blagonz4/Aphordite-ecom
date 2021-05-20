const express = require("express");
const router = express.Router();

const Collection = require('../models/Collections');
router.post('/',async (req,res)=>{
    let {id,name} = req.body;
    try{
        let newCollection = await Collection.create({
            id,
            name
        },{
            fields: ["id","name"]
        });
        if(newCollection){
            res.json({
                result: 'ok',
                data: newCollection
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
        let collections = await Collection.findAll({
            atributes: ['id','name'],
            where:{
                id
            }
        });
        if(collections.length > 0) {
            collections.forEach(async (collection) => {
                await collection.update({
                    name: name ? name : collection.name
                });
            });
            res.json({
                result: 'ok',
                data:collections,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
                data:{},
                message: `cant update 1. Error ${error}`
            });
        }
    } catch(error){
        res.json({
            result: 'failed',
            message: `cant update 2. Error ${error}`
        });
    }
});


router.delete('/:id',async (req,res) => {
    const { id } = req.params;
    try{
        let deleteCollection = Collection.destroy({
            where: {
                id: id
            }
        });
        if (deleteCollection){
            res.json({
                result: 'ok',
                data:Collection,
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
        const collections = await Collection.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:collections,
            message: "query list collections successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list collections failed, Error ${error}`
        });
    }

});


module.exports = router;