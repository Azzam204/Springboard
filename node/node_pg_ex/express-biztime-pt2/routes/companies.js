const express = require("express");
const slugify = require("slugify")
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");


router.get('/', async (req,res,next) => {
    try {
        const results =  await db.query('SELECT code, name FROM companies');
        return res.json({companies: results.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/:code', async (req, res, next) => {
    try {
        const compQ = await db.query(
            'SELECT * FROM companies WHERE code = $1',[req.params.code]
        )

        if (compQ.rows.length === 0) throw new ExpressError('Company cannot be found',404)

        const invoiceQ = await db.query(
            'SELECT * FROM invoices WHERE comp_code= $1',[req.params.code]
        )

        const industryQ = await db.query(
            `SELECT industries.industry FROM companies
            JOIN comp_industry
            ON companies.code = comp_industry.comp_code
            JOIN industries
            ON comp_industry.industry_code = industries.code
            WHERE companies.code = $1;`,[req.params.code]
        )

        console.log()

        const company = compQ.rows[0];
        company.invoices = invoiceQ.rows
        company.industries = industryQ.rows.map((industry) => industry.industry)

        return res.json({company : company})

    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const code = slugify(name,{replacement: '' , lower:true});
        const results = await db.query(
            'INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description',[code, name, description]
        );

        return res.status(201).json({company: results.rows[0]})

    } catch (e) {
        return next(e)
    }
})

router.put('/:code', async (req, res, next) => {
    try {
        const{code} = req.params;
        const{name, description} = req.body;
        const results = await db.query(
            'UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description',[name, description, code]
        )

        if (results.rows.length === 0) throw new ExpressError('company cannot be found',404)

        return res.json({company: results.rows[0]})

    } catch (e) {
        return next(e)
    }
})

router.delete('/:code', async (req, res, next) => {
    try {
        const{code} = req.params;
        const results = await db.query(
            'DELETE FROM companies WHERE code=$1 RETURNING code, name', [code]
        )

        if (results.rows.length === 0) throw new ExpressError('Company cannot be found',404)

        return res.json({status: 'Deleted'})

    } catch (e) {
        return next(e)
    }
})

module.exports = router;