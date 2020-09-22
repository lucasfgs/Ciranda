export const login = (id, nome, email, senha, cpf, telefone, saldo) => ({
  type: 'LOGIN',
  id,
  email,
  senha,
  nome,
  cpf,
  telefone,
  saldo,
});

export const atualizarSaldo = (saldo) => ({
  type: 'SALDO',
  saldo,
});
