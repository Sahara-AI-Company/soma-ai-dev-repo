import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Publication Types
interface PublicationState {
    publicationId : number | null;
    selectedPublicationDomain: string | null;
    selectedPublicationName: string | null;
    selectedPublicationPlan: string | null,
}

// Initial Publication Values
const initialState: PublicationState = {
    publicationId : null,
    selectedPublicationDomain: null,
    selectedPublicationName: null,
    selectedPublicationPlan: null,
}

// User Slice Functions
const createPublicationSlice = createSlice({
    name: 'createpublication',
    initialState,
    reducers: { 
        clearPublication: (state) => {
            return initialState;
          },
        createPublication: <K extends keyof PublicationState>(
            state: PublicationState,
            action: PayloadAction<{ field: K; value: PublicationState[K] }>
          ) => {
            const { field, value } = action.payload;
            state[field] = value;
          },
    } 
})

// Exporting Functions
export const { clearPublication, createPublication } = createPublicationSlice.actions;
export default createPublicationSlice.reducer; 