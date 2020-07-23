const request = require("supertest");
const server = require("../../src");

const { Responsavel, Alunos } = require("../../src/models");

describe("Alunos - /alunos", () => {
  let responsavel;
  let aluno;
  beforeAll(async () => {
    responsavel = await Responsavel.create({
      nome: "test",
      email: "test123@test.com",
      senha: "123",
      saldo: 0,
    });

    aluno = await Alunos.create({
      nome: "aluno",
      id_responsavel: responsavel.id,
    });
  });

  it("should create a student", async () => {
    await request(server)
      .post("/alunos")
      .send({
        nome: "Lucas",
        id_responsavel: responsavel.id,
      })
      .expect(201)
      .expect("Content-Type", /json/);
  });

  it("should return all students", async () => {
    await request(server)
      .get(`/alunos`)
      .expect(200)
      .expect("Content-Type", /json/);
  });

  it("should return a specific student", async () => {
    await request(server)
      .get(`/alunos/${aluno.id}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body.id).toBe(aluno.id);
      });
  });

  it("should update a student data", async () => {
    await request(server)
      .put(`/alunos`)
      .send({
        id: aluno.id,
        nome: "test",
        id_responsavel: aluno.id_responsavel,
      })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        expect(response.body[0]).toBe(1);
      });
  });

  it("should delete a specific student", async () => {
    await request(server).delete(`/alunos/${aluno.id}`).expect(200);
  });
});
