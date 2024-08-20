import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getPersistConfig } from 'redux-deep-persist';

import authReducer from './authReducer';

const rootReducer = combineReducers({
  authReducer,
});

const persistConfig = getPersistConfig({
  key: 'root',
  storage, // whatever storage you use
  whitelist: [
    'authReducer.login.currentUser',
    'authReducer.login.isLogged',
  ],
  rootReducer, // your root reducer must be also passed here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
