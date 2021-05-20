const express = require("express");
const router = express.Router();

const ProductDetail = require('../models/ProductDetails');
const Size = require ('../models/Sizes');

router.post('/',async (req,res)=>{
    let {id,
        product_id,
        price,
        cost,
        color,
        gender,
        size_id,
        image_id,
        quanity} = req.body;
    try{
        let newProductDetail = await Product.create({
            id,
            product_id,
            price,
            cost,
            color,
            gender,
            size_id,
            image_id,
            quanity
        },{
            fields: ["id",
                    "product_id",
                    "price",
                    "cost",
                    "color",
                    "gender",
                    "size_id",
                    "image_id",
                    "quanity"]
        });
        if(newProductDetail){
            res.json({
                result: 'ok',
                data: newProductDetail
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
    const { product_id,
            price,
            cost,
            color,
            gender,
            size_id,
            image_id,
            quanity} = req.body;
    try{
        let productdetails = await ProductDetail.findAll({
            atributes: ['id',
                        'product_id',
                        'price',
                        'cost',
                        'color',
                        'gender',
                        'size_id',
                        'image_id',
                        'quanity'],
            where:{
                id
            }
        });
        if(productdetails.length > 0) {
            productdetails.forEach(async (productdetail) => {
                await productdetails.update({
                    product_id : product_id ? product_id : productdetail.product_id,
                    price: price ? price : productdetail.price,
                    cost: cost ? cost : productdetail.cost,
                    color: color ? color : productdetail.color,
                    gender : gender ? gender : productdetail.gender,
                    size_id : size_id ? size_id : productdetail.size_id,
                    image_id : image_id ? image_id : productdetail.image_id,
                    quanity : quanity ? quanity : productdetail.quanity
                });
            });
            res.json({
                result: 'ok',
                data:ProductDetail,
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
        let deleteProductDetail = deleteProductDetail.destroy({
            where: {
                id: id
            }
        });
        if (deleteProductDetail){
            res.json({
                result: 'ok',
                data:ProductDetail,
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
        const ProductDetails = await ProductDetail.findAll({
            attributes: ['id',
                        'product_id',
                        'price',
                        'cost',
                        'color',
                        'gender',
                        'size_id',
                        'image_id',
                        'quanity'],
            include:[{
                    model: Size,
                    as: 'size', 
                    require:false
                }]
        });
        res.json({
            result: 'oke',
            data:ProductDetails,
            message: "query list Product Details successfully"
        });
    } catch (error){
        res.json({
            result: 'failed',
            message: `query list Product Details failed, Error ${error}`
        });
    }

});


module.exports = router;