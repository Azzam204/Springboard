const express = require('express');
const ExpressError = require('./expressError')
const {mean,median,mode,strToArr} = require('./funcs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function(req, res,next){
    try {
        const nums = req.query.nums;
        const arr = strToArr(nums)
        if (arr.length < 1) throw new ExpressError('nums are required',400)

        if (!Array.isArray(strToArr(nums))) throw new ExpressError(`${strToArr(nums)} is not a number`,400)

        return res.send({
            response : {
                operation : 'mean',
                value : mean(arr)
            }
        })
    }
    catch (e) {
        next(e)
    }
})
app.get('/median', function(req, res,next){
    try {
        const nums = req.query.nums;
        const arr = strToArr(nums)
        if (arr.length < 1) throw new ExpressError('nums are required',400)

        if (!Array.isArray(strToArr(nums))) throw new ExpressError(`${strToArr(nums)} is not a number`,400)

        return res.send({
            response : {
                operation : 'median',
                value : median(arr)
            }
        })
    }
    catch (e) {
        next(e)
    }
})
app.get('/mode', function(req, res,next){
    try {
        const nums = req.query.nums;
        const arr = strToArr(nums)
        if (arr.length < 1) throw new ExpressError('nums are required',400)

        if (!Array.isArray(strToArr(nums))) throw new ExpressError(`${strToArr(nums)} is not a number`,400)

        return res.send({
            response : {
                operation : 'mode',
                value : mode(arr)
            }
        })
    }
    catch (e) {
        next(e)
    }
})

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.msg;

  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function() {
    console.log('Server started on port 3000.');
  });