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

export const carregarProdutos = (produtos) => ({
  type: 'CARREGAR',
  produtos,
});

export const alterarTotal = (valorTotal, quantidadeTotal) => {
  return {
    type: 'ALTERAR_TOTAL',
    valorTotal,
    quantidadeTotal,
  };
};

export const alterarQuantidadeProduto = (produto) => ({
  type: 'ALTERAR_QUANTIDADE_PRODUTO',
  produto,
});

export const resetar = () => ({
  type: 'RESETAR',
});
