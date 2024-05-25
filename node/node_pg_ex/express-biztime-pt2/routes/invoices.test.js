process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");


let invoice;
let testCompany;

beforeEach(async function() {
    let compQ = await db.query(`INSERT INTO companies (code,name,description)
    VALUES ('sb', 'Springboard', 'Coding bootcamp.')
    RETURNING *`)

    testCompany = compQ.rows[0];
    
    let invoiceQ = await db.query(`INSERT INTO invoices (comp_Code, amt, paid, paid_date)
    VALUES ('sb', 100, false, null)
    RETURNING *`)

    invoice = invoiceQ.rows[0];

    invoice.company = testCompany

});

describe("GET /invoices", function () {
    test('Get list of all invoices', async function() {
        const response = await request(app).get(`/invoices`)
        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            invoices : [{
                id : invoice.id,
                comp_code : invoice.comp_code
            }]
        })
    })
})

describe("GET /invoices/:id", function() {
    test('Get a single invoice', async function() {
        const response = await request(app).get(`/invoices/${invoice.id}`)

        expect(response.statusCode).toEqual(200);
        expect(response.body.invoice.company).toEqual(testCompany)
    });

    test("Respond with 404 if can't find invoice", async function() {
        const response = await request(app).get('/invoices/0');
        expect(response.statusCode).toEqual(404)
    })
})

describe("POST /invoices", function() {
    test('Create a new invoice', async function() {
        const response = await request(app)
        .post('/invoices')
        .send({
            comp_code : 'sb',
            amt : 300
        });
        expect(response.statusCode).toEqual(201);
        expect(response.body.invoice.amt).toEqual(300);
    });
});

describe("PUT /invoices/:id", function() {
    test('Update amt of a single invoice', async function() {
        const response = await request(app)
        .put(`/invoices/${invoice.id}`)
        .send({
            amt : 12
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body.invoice.amt).toEqual(12);
    })

    test("Responds with 404 if can't find invoice", async function() {
        const response = await request(app).put('/invoices/0');
        expect(response.statusCode).toEqual(404);
    });
});

describe("DELETE /invoices/:id", function() {
    test("Delete a single invoice", async function() {
        const response = await request(app).delete(`/invoices/${invoice.id}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            status : 'Deleted'
        });
    });

    test("Respond with 404 if can't find invoice", async function() {
        const response = await request(app).delete('/invoices/0');
        expect(response.statusCode).toEqual(404);
    })
});

describe("GET /invoices/companies/:code", function() {
    test("Get all the invoices of a company", async function() {
        const response = await request(app)
        .get(`/invoices/companies/${testCompany.code}`);
        let testC = testCompany
        testC.invoices = [invoice]
        expect(response.statusCode).toEqual(200);
        expect(response.body.company.invoices.length).toEqual(1)
    })
})


afterEach(async function() {
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM invoices');
});




afterAll(async function() {
    // close db connection
    await db.end();
  });
  

