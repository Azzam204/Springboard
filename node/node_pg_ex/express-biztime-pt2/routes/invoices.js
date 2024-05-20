const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");


router.get('/', async (req,res,next) => {
    try {
        const results =  await db.query('SELECT id, comp_code FROM invoices');
        return res.json({invoices: results.rows})
    } catch (e) {
        return next(e)
    }
})

router.get('/:id', async (req,res,next) => {
    try {
        const results = await db.query('SELECT * FROM invoices WHERE id = $1', [req.params.id]);

        if (results.rows.length === 0) throw new ExpressError('Invoice cannot be found',404);

        const compQ = await db.query('SELECT * FROM companies WHERE code=$1',[results.rows[0].comp_code])

        const {id,amt,paid,add_date,paid_date} = results.rows[0];

        return res.json({invoice: {id,amt,paid,add_date,paid_date,company:compQ.rows[0]}});

    } catch (e) {
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {comp_code, amt} = req.body;
        const results = await db.query(
            'INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date',[comp_code, amt]
        );

        return res.status(201).json({invoice: results.rows[0]})

    } catch (e) {
        return next(e)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const{id} = req.params;
        const{amt} = req.body;
        const results = await db.query(
            'UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING id, comp_code, amt, paid, add_date, paid_date',[amt, id]
        )

        if (results.rows.length === 0) throw new ExpressError('Invoice cannot be found',404)

        return res.json({invoice: results.rows[0]})

    } catch (e) {
        return next(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const{id} = req.params;
        const results = await db.query(
            'DELETE FROM invoices WHERE id=$1 RETURNING id', [id]
        )

        if (results.rows.length === 0) throw new ExpressError('Invoice cannot be found',404)

        return res.json({status: 'Deleted'})

    } catch (e) {
        return next(e)
    }
})

router.get('/companies/:code', async (req, res, next) => {
    try {
        const compQ = await db.query(
            'SELECT * FROM companies WHERE code = $1',[req.params.code]
        )

        if (compQ.rows.length === 0) throw new ExpressError('Company cannot be found',404)

        const invoiceQ = await db.query(
            'SELECT * FROM invoices WHERE comp_code= $1',[req.params.code]
        )

        const {code,name,description} = compQ.rows[0]

        return res.json({company: {code, name, description, invoices :invoiceQ.rows} })

    } catch (e) {
        return next(e)
    }
})

module.exports = router;
 