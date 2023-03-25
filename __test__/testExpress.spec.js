const app = require("../src/server/server");

describe("POST /add", () => {
  it("should create a traval record", async () => {
    const res = await request(app).post("/add").send({
      imgs: [],
      weathers: [],
      place: "new york",
      countryName: "US",
      date: "2020-03-03",
      userResponse: "lorem",
    });
    //expect(res.statusCode).toBe(201);
    expect(res.body.place).toBe("new york");
  });
});
