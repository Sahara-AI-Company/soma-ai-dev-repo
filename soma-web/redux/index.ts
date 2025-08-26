import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import userReducer from './user-store/userSlice';
import createPublicationReducer from './create-publication-store/createPublicationSlice';
import userPublicationsReducer from './user-store/userPublicationsSlice';

// 1. Combine reducers if you have more than one
const rootReducer = combineReducers({
    user: userReducer,
    createPublication: createPublicationReducer,
    userPublications: userPublicationsReducer,
    // add other reducers here
});

// Safe storage for Next.js (avoid SSR localStorage access)
const createNoopStorage = () => {
	    return {
	        getItem(_key: string) {
	            return Promise.resolve(null);
	        },
	        setItem(_key: string, value: unknown) {
	            return Promise.resolve(value as string);
	        },
	        removeItem(_key: string) {
	            return Promise.resolve();
	        },
	    };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// 2. Set up persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'createPublication', 'userPublications'], // only persist the user, createPublication, and userPublications slices
};

// 3. Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
    reducer: persistedReducer,
    // add middleware if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // redux-persist uses non-serializable values
        }),
});

// 5. Create persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 