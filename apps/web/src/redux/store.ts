import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createIdbStorage from '@piotr-cz/redux-persist-idb-storage';

import auth from './reducers/auth';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: createIdbStorage({ name: 'nx-chat-app' }),
  blacklist: ['auth'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({ auth })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
