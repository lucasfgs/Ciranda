const INITIAL_STATE = {
  produtos: [],
  valorTotal: 0,
  quantidadeTotal: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CARREGAR':
      return {
        ...state,
        produtos: action.produtos,
      };
    case 'ALTERAR_TOTAL':
      return {
        ...state,
        valorTotal: action.valorTotal,
        quantidadeTotal: action.quantidadeTotal,
      };
    case 'ALTERAR_QUANTIDADE_PRODUTO':
      return {
        ...state,
        produtos: state.produtos,
      };
    case 'RESETAR':
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default user;
