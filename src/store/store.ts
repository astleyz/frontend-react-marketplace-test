import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import rootSaga from './rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';

const saga = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development'
    ? composeEnhancers(applyMiddleware(saga))
    : applyMiddleware(saga)
);

saga.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>;
export default store;
