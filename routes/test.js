const express = require("express");
const router = express.Router();

const Test = require('../models/test');

router.get('/',async (req,res) => {
    try {
        const test = await Test.findAll({
            attributes: ['id','name'],
        });
        res.json({
            result: 'oke',
            data:test,
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