const request = require("supertest");
const server = require("../../src");

const { Responsavel } = require("../../src/models");

describe("Responsavel - /responsaveis", () => {
  let responsavel;
  beforeAll(async () => {
    responsavel = await Responsavel.create({
      nome: "test",
      email: "test@test.com",
      senha: "123",
      saldo: 0,
    });
  });

  it("should create a reponsible", async () => {
    const response = await request(server)
      .post("/responsaveis")
      .send({
        nome: "Lucas",
        email: "lucaslindo",
        senha: "123",
        saldo: 0,
      })
      .expect(201)
      .expect("Content-Type", /json/);
  });

  it("should return all reponsible", async () => {
    await request(server)
      .get(`/responsaveis`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should return a specific responsible", async () => {
    await request(server)
      .get(`/responsaveis/${responsavel.id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body.email).toBe(responsavel.email);
      });
  });

  it("should update a responsible data", async () => {
    await request(server)
      .put(`/responsaveis`)
      .send({
        id: responsavel.id,
        nome: "test2",
        email: responsavel.email,
        senha: responsavel.senha,
        saldo: responsavel.saldo,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body[0]).toBe(1);
      });
  });

  it("should delete a specific responsible", async () => {
    await request(server).delete(`/responsaveis/${responsavel.id}`).expect(200);
  });
});
