import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';

import reducer from './src/reducers';

const serializer = ({ getState, dispatch }) => (next) => (action) => {
  // Every action, serialize! This is async, so this might fuck up. WHO KNOWS.

  const returnValue = next(action);
  AsyncStorage.setItem('AppData', JSON.stringify(getState()));
  return returnValue;
};

export default function configureStore() {
  const middleware = [
    thunk,
    serializer,
  ];
  const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
  const store = createStoreWithMiddleware(reducer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./src/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
