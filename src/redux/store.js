import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productRedux';
import userReducer from './userRedux';
import userListReducer from './userListRedux';
import orderReducer from './orderRedux';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};
const productPersistConfig = {
  key: 'item1',
  version: 1,
  storage
};
const userListPersistConfig = {
  key: 'users',
  version: 1,
  storage
};
const orderPersistConfig = {
  key: 'order',
  version: 1,
  storage
};
// const rootReducer = combineReducers({
//   user: userReducer,

// });
const persistedReducer = persistReducer(persistConfig, userReducer);
const productPersisteReducer = persistReducer(productPersistConfig, productReducer);
const userListPersisteReducer = persistReducer(userListPersistConfig, userListReducer);
const orderPersisteReducer = persistReducer(orderPersistConfig, orderReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    product: productPersisteReducer,
    userList: userListPersisteReducer,
    order: orderPersisteReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export let persistor = persistStore(store);
