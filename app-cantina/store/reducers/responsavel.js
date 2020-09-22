const INITIAL_STATE = {
  id: '',
  nome: '',
  cpf: '',
  email: '',
  senha: '',
  saldo: 0,
  telefone: '',
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.id,
        nome: action.nome,
        cpf: action.cpf,
        email: action.email,
        senha: action.senha,
        saldo: action.saldo,
        telefone: action.telefone,
      };
    case 'SALDO':
      return {
        ...state,
        saldo: action.saldo,
      };
    default:
      return state;
  }
};

export default user;
