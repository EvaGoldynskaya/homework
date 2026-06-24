// src/features/ui/uiSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  selectedCategory: string | null; // null = "все категории"
}

const initialState: UIState = {
  selectedCategory: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setCategory } = uiSlice.actions;
export default uiSlice.reducer;