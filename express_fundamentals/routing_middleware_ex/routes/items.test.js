process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");


let cheetos = {
    name : "cheetos",
    price : 1.75
}

beforeEach(function() {
    items.push(cheetos)
});

afterEach(function() {
    items.length = 0;
});

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ items : [cheetos]})
    })
})

describe("GET /items/:name", () => {
    test("Get item by name", async () => {
      const res = await request(app).get(`/items/${cheetos.name}`);
      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual(cheetos)
    })
    test("Responds with 404 for invalid item", async () => {
      const res = await request(app).get(`/items/icecube`);
      expect(res.statusCode).toBe(404)
      expect(res.body).toEqual({error : "Item not found"})
    })
})

describe("POST /items", () => {
    test("Creating a item", async () => {
      const res = await request(app).post("/items").send({ name: "pringles", price : 1.50 });
      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ added : { name: "pringles", price : 1.50 } });
    })
    test("Responds with 400 if name is missing", async () => {
      const res = await request(app).post("/items").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toEqual({error : "Data is required"})
    })
})

describe("/PATCH /items/:name", () => {
    test("Updating a item's name", async () => {
      const res = await request(app).patch(`/items/${cheetos.name}`).send({ name: "Monster", price : 1.75 });
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ updated : { name: "Monster", price : 1.75 } });
    })
    test("Responds with 404 for invalid name", async () => {
      const res = await request(app).patch(`/items/Piggles`).send({ name: "Monster" });
      expect(res.statusCode).toBe(404);
    })
})

describe("/DELETE /items/:name", () => {
    test("Deleting a items", async () => {
      const res = await request(app).delete(`/items/${cheetos.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Responds with 404 for deleting invalid item", async () => {
      const res = await request(app).delete(`/items/hamface`);
      expect(res.statusCode).toBe(404);
    })
})
  