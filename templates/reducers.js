
import _ from 'lodash';
import { combineReducers } from 'redux';

const reducers = {
  reducerReplacer
};

const reducerContainers = {};
_.forEach(Object.keys(reducers), key => {
  let initialState = {};
  _.forEach(Object.keys(reducers[key]), (reducerKey) => {
    initialState = {
      ...initialState,
      ...reducers[key][reducerKey]()
    };
  });
  reducerContainers[key] = (state = initialState, action = {}) => {
    return reducers[key][action.type] ?
      reducers[key][action.type](state, action) :
      state;
  };
});


const reducer = combineReducers({
  ...reducerContainers
});

export default reducer;
