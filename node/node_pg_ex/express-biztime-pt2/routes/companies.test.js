process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

let testCompanies;

beforeEach(async function() {
    let results = await db.query(`
        INSERT INTO companies (code, name, description)
        VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
               ('ibm', 'IBM', 'Big blue.')
        RETURNING code, name`);
    testCompanies = results.rows;
});


describe("GET /companies", function() {
    test("Gets a list of all comapnies", async function() {
        const response = await request(app).get('/companies')
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({companies:testCompanies});
    });
});

describe("GET /companies/:code", function() {
    test("Gets a single company", async function() {
        const response = await request(app).get(`/companies/${testCompanies[0].code}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body.company.name).toEqual('Apple Computer')
    })

    test("Responds with 404 if can't find company", async function() {
        const response = await request(app).get(`/companies/asdf`);
        expect(response.statusCode).toEqual(404)
    })
})

describe("POST /companies", function() {
    test("Create a new company", async function() {
        const response = await request(app)
            .post(`/companies`)
            .send({
                code : 'sb',
                name: 'Springboard',
                description: 'Coding bootcamp'
            })
        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            company : {
                code : 'sb',
                name: 'Springboard',
                description: 'Coding bootcamp'
            }
        })
    })
});

describe("PUT /companies/:code", function() {
    test("Update name and description of a company", async function() {
        const response = await request(app)
            .put(`/companies/${testCompanies[0].code}`)
            .send({
                name : 'Apple Inc',
                description : "sells macs"
            });
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            company : {
                code : 'apple',
                name : 'Apple Inc',
                description : 'sells macs'
            }
        })
    });

    test("Responds with 404 if can't find company", async function() {
        const response = await request(app).put(`/companies/asdfasdf`);
        expect(response.statusCode).toEqual(404)
    });
});


describe("DELETE /companies/:code", function() {
    test("Delete a single company", async function() {
        const response = await request(app).delete(`/companies/${testCompanies[0].code}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            status : "Deleted"
        })
    })

    test("Respond with 404 if can't find company", async function() {
        const response = await request(app).delete(`/companies/asdf`)
        expect(response.statusCode).toEqual(404)
    })
})


afterEach(async function() {
    await db.query('DELETE FROM companies');
});

afterAll(async function() {
    // close db connection
    await db.end();
  });
  