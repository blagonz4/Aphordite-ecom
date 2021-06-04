const express = require("express");
const router = express.Router();

const Product = require('../models/Products');
const Brand = require ('../models/Brands');
const Model = require ('../models/Models');
const Collection = require ('../models/Collections');
const ProductDetail = require ('../models/ProductDetails');

router.post('/',async (req,res)=>{
    let {id,
        name,
        brand_id,
        model_id,
        collection_id,
        description} = req.body;
    try{
        let newProduct = await Product.create({
            id,
            name,
            brand_id,
            model_id,
            collection_id,
            description
        },{
            fields: ["id",
                    "name",
                    "brand_id",
                    "model_id",
                    "collection_id",
                    "description"]
        });
        if(newProduct){
            res.json({
                result: 'ok',
                data: newProduct
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
    const { name,
            brand_id,
            model_id,
            collection_id,
            description} = req.body;
    try{
        let products = await Product.findAll({
            atributes: ['id',
                        'name',
                        'brand_id',
                        'model_id',
                        'collection_id',
                        'description'],
            where:{
                id
            }
        });
        if(products.length > 0) {
            products.forEach(async (product) => {
                await products.update({
                    name: name ? name : product.name,
                    brand_id : brand_id ? brand_id : product.brand_id,
                    model_id: model_id ? model_id : product.model_id,
                    collection_id: collection_id ? collection_id : product.collection_id,
                    description: description ? description : product.description,
                });
            });
            res.json({
                result: 'ok',
                data:Product,
                message: "okela"
            })
        } else {
            res.json({
                result: 'failed',
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
        let deleteProduct = Product.destroy({
            where: {
                id: id
            }
        });
        if (deleteProduct){
            res.json({
                result: 'ok',
                data:Product,
                message: `delete ${Product.id} success`
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
        const Products = await Product.findAll({
            attributes: ['id',
                        'name',
                        'description'],
            include:[
                {
                    model: Brand,
                    as: 'brand', 
                    require:false},
                {
                    model: Model,
                    as: 'model', 
                    require:false},
                {
                    model: Collection,
                    as: 'collection', 
                    require:false},
                {
                    model: ProductDetail,
                    as: 'productdetails', 
                    require:false  
                }]
        });
        res.json({
            result: 'oke',
            data:Products,
            message: "query list Products successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list Products failed, Error ${error}`
        });
    }

});

router.get('/:id',async (req,res) => {
    const {id} = req.params;
    try {
        const Products = await Product.findOne({
            attributes: ['id'],
            where:{
                id
            },
            include:[
                {
                    model: Brand,
                    as: 'brand', 
                    require:false},
                {
                    model: Model,
                    as: 'model', 
                    require:false},
                {
                    model: Collection,
                    as: 'collection', 
                    require:false},
                {
                    model: ProductDetail,
                    as: 'productdetails', 
                    require:false  
                }]
        });
        res.json({
            result: 'oke',
            data:Product,
            message: "query list Products successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list Products failed, Error ${error}`
        });
    }

});



module.exports = router;