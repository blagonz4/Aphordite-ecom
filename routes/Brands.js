
const express = require("express");
const router = express.Router();

const Brand = require('../models/Brands');
router.post('/',async (req,res)=>{
    let {id,name} = req.body;
    try{
        let newBrand = await Brand.create({
            id,
            name
        },{
            fields: ["id","name"]
        });
        if(newBrand){
            res.json({
                result: 'ok',
                data: newBrand
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
        let brands = await Brand.findAll({
            atributes: ['id','name'],
            where:{
                id
            }
        });
        if(brands.length > 0) {
            brands.forEach(async (brand) => {
                await size.update({
                    name: name ? name : brand.name
                });
            });
            res.json({
                result: 'ok',
                data:brands,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
                data:brands,
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
        let deleteBrand = Brand.destroy({
            where: {
                id: id
            }
        });
        if (deleteBrand){
            res.json({
                result: 'ok',
                data:Brand,
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
        const Brands = await Brand.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:Brands,
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