const express = require("express");
const router = express.Router();

const test = require('../models/test');

router.get('/',async (req,res) => {
    try {
        const test = await test.findAll({
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