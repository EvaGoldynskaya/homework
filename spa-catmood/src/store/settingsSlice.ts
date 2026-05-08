import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
}

// Загрузка настроек темы
const loadFromLocalStorage = (): SettingsState => {
  const saved = localStorage.getItem('appSettings');
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    theme: 'dark',
  };
};

const initialState: SettingsState = loadFromLocalStorage();

// Слайс состояния настроек
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      localStorage.setItem('appSettings', JSON.stringify(state));
    },
  },
});

export const { setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;