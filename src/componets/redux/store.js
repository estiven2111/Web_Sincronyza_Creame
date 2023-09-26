import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query/react";
import {actividadesSlice} from "./reducer/reducer.slice"

// Configuración del store
export const store = configureStore({
  reducer: {
    actividadesSlice:actividadesSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Configuración de los oyentes de la tienda
setupListeners(store.dispatch);
