import { configureStore } from '@reduxjs/toolkit';
import { mainReducer } from '../Reducers/Reducers'
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import storage from 'redux-persist-indexeddb-storage';

const persistConfig = {
  key: 'argon',
  storage: storage('myDB'),
  stateReconciler: autoMergeLevel1,
  blacklist: [
    "loading",
    "loginError",
    "signUpError",
    "forgotSuccess",
    "forgotError",
    "resetSuccess",
    "resetError",
    "resetToken",
  ],
  rootReducer: mainReducer
}

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: { mainReducer: persistedReducer },
});


export const persistor = persistStore(store);