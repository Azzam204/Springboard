process.env.NODE_ENV = "test";


const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

let testBook;

beforeEach(async function() {
    testBook = await Book.create(
        {
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2017
          }
    );
});

describe("GET /books", function() {
    test("Gets a list of all books", async function() {
        const response = await request(app).get('/books');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({books: [testBook] });
    });
});

describe("GET /book/:id", function() {
    test("Gets a single book", async function() {
        const response = await request(app).get(`/books/${testBook.isbn}`);
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({book: testBook});
    });

    test("Responds with 404 if book cannot be fount", async function() {
        const response = await request(app).get('/book/3843');

        expect(response.statusCode).toEqual(404);
    });
});

describe("POST /books", function() {
    test('Add a new book', async function() {
        const response = await request(app)
        .post('/books')
        .send(
            {
                "isbn": "06911457788",
                "amazon_url": "http://a.co/eobPtX3",
                "author": "Matthew Lame",
                "language": "english",
                "pages": 266,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2024
              }
        );

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({
            book : {
                "isbn": "06911457788",
                "amazon_url": "http://a.co/eobPtX3",
                "author": "Matthew Lame",
                "language": "english",
                "pages": 266,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2024
              }
        })
    });

    test("Responds with 400 if data invalid", async function() {
        const response =await request(app)
        .post('/books')
        .send({});

        expect(response.statusCode).toEqual(400);
    });
});


describe("PUT /books/:isbn", function() {
    test('Update a book', async function() {
        const response = await request(app)
        .put(`/books/${testBook.isbn}`)
        .send(
            {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX3",
                "author": "Matthew Lame",
                "language": "french",
                "pages": 266,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2024
              }
        );

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            book : {
                "isbn": "0691161518",
                "amazon_url": "http://a.co/eobPtX3",
                "author": "Matthew Lame",
                "language": "french",
                "pages": 266,
                "publisher": "Princeton University Press",
                "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
                "year": 2024
              }
        })
    });

    test("Responds with 400 if data invalid", async function() {
        const response = await request(app)
        .put(`/books/${testBook.isbn}`)
        .send({});

        expect(response.statusCode).toEqual(400);
    });

    test("Responds with 404 if isbn can't be found", async function() {
        const response = await request(app)
        .put(`/book/3409857`)
        .send({});

        expect(response.statusCode).toEqual(404);
    })
});

describe("DELETE /books/:isbn", function() {
    test("Delete a book", async function() {
        const response = await request(app)
        .delete(`/books/${testBook.isbn}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({ message: "Book deleted" });
    })

    test("Responds with 404 if isbn can't be found", async function() {
        const response = await request(app)
        .delete(`/books/1324513414536`);

        expect(response.statusCode).toEqual(404);
    })
})


afterEach(async function() {
    await db.query('DELETE FROM books');
});

afterAll(async function() {
    await db.end();
  });
  