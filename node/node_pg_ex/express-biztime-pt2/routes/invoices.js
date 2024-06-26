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

        const invoice = results.rows[0];

        const compQ = await db.query('SELECT * FROM companies WHERE code=$1',[invoice.comp_code]);

        invoice.company = compQ.rows[0];
        
        return res.json({invoice:invoice})

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
        return next(e)ss
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const{id} = req.params;
        const{amt,paid} = req.body;
        const paidDate = (paid === 'true') ? new Date() : null ;
        const results = await db.query(
            'UPDATE invoices SET amt = $1, paid =$2 , paid_date = $3 WHERE id = $4 RETURNING id, comp_code, amt, paid, add_date, paid_date',[amt,paid,paidDate,id]
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



module.exports = router;
 