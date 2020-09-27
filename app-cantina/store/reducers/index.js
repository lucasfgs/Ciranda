import { combineReducers } from 'redux';
import responsavel from './responsavel';
import carrinho from './carrinho';

const reducers = combineReducers({
  responsavel,
  carrinho,
});

export default reducers;
