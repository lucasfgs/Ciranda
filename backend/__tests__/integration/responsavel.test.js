const request = require("supertest");
const server = require("../../src");

const { Responsavel } = require("../../src/models");

describe("Responsavel", () => {
  it("should create a reponsible for the child", async () => {
    const response = await request(server).post("/responsaveis").send({
      nome: "Lucas",
      email: "lucaslindo",
      senha: "123",
      saldo: 0,
    });

    expect(response.status).toBe(200);
    expect(res.body).toHaveProperty("post");
  });
});
