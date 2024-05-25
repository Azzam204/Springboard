const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req,res,next) => {
    try {
        const results =  await db.query(`SELECT industries.code, industries.industry, ARRAY_AGG(companies.code) AS company_codes FROM companies
        JOIN comp_industry
        ON companies.code = comp_industry.comp_code
        FULL JOIN industries
        ON comp_industry.industry_code = industries.code
        GROUP BY industries.code, industries.industry;`);
        return res.json({industries: results.rows})
    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {code, industry} = req.body;
        const results = await db.query(
            'INSERT INTO industries (code, industry) VALUES ($1, $2) RETURNING *',[code, industry]
        );

        return res.status(201).json({industry: results.rows[0]})

    } catch (e) {
        return next(e)
    }
})

router.post('/:code', async(req,res,next) => {
    try {
        const industry_code = req.params.code;
        const {comp_code} = req.body;
        const results = await db.query(
            `INSERT INTO comp_industry (comp_code,industry_code) VALUES ($1,$2)
            RETURNING *`, [comp_code,industry_code]
        )

        return res.status(201).json({association : results.rows[0]})

    } catch (e) {
        next(e)
    }
});

module.exports = router;