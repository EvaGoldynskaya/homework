import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//Тип действий с котом
export type InteractionType = 'pet' | 'play' | 'feed' | 'scold';

// Тип взаимодействия с котом с доп.информацией
export interface CatInteraction {
  type: InteractionType;
  moodDelta: number;
  createdAt: string;
}

// Тип для удобства хранения статистики по коту
export interface CatStats {
  petCount: number;
  playCount: number;
  feedCount: number;
  scoldCount: number;
  positiveCount: number;
  negativeCount: number;
  total: number;
  lastInteraction: string | null;
}

// Кот
export interface Cat {
  id: string;
  name: string;
  sex: string;
  birthDate: string;
  mood: number;
  photo: string;
  interactions: CatInteraction[];
  todayActions: string;
}

interface CatState {
  cats: Cat[];
}

// Массив взаимодействий с котом
export const interactionMoodDelta: Record<InteractionType, number> = {
  pet: 15,
  play: 20,
  feed: 10,
  scold: -25,
};

// Функция для расчета статистики по коту
export const getCatStats = (cat: Cat): CatStats => {
  //
  const initial: CatStats = {
    petCount: 0,
    playCount: 0,
    feedCount: 0,
    scoldCount: 0,
    positiveCount: 0,
    negativeCount: 0,
    total: cat.interactions.length,
    lastInteraction: null,
  };

  if (cat.interactions.length === 0) {
    return initial;
  }

  //
  const stats = cat.interactions.reduce((acc, interaction) => {
    if (interaction.type === 'pet') acc.petCount += 1;
    else if (interaction.type === 'play') acc.playCount += 1;
    else if (interaction.type === 'feed') acc.feedCount += 1;
    else if (interaction.type === 'scold') acc.scoldCount += 1;
    else if (interaction.type === 'scold') acc.scoldCount += 1;
    
    if (interaction.moodDelta > 0) acc.positiveCount += 1;
    else if (interaction.moodDelta < 0) acc.negativeCount += 1;
    return acc;
  }, initial);

  stats.lastInteraction = cat.interactions[cat.interactions.length - 1].createdAt;
  return stats;
};

// Выполнение взаимодействия с котом (добавление в массив взаимодействий)
const addInteraction = (cat: Cat, type: InteractionType): void => {
  const moodDelta = interactionMoodDelta[type];
  cat.interactions.push({
    type,
    moodDelta,
    createdAt: new Date().toISOString(),
  });
  cat.mood = Math.max(0, Math.min(100, cat.mood + moodDelta));
};

// Состояние котов
const initialState: CatState = {
  cats: [
    {
      id: '1',
      name: 'Джося',
      sex: 'female',
      birthDate: '2024-05-25',
      mood: 75,
      photo: '/images/cat1.jpg',
      interactions: [],
      todayActions: '',
    },
    {
      id: '2',
      name: 'Джотаро',
      sex: 'male',
      birthDate: '2024-05-25',
      mood: 50,
      photo: '/images/cat2.jpg',
      interactions: [],
      todayActions: '',
    },
  ],
};

// Слайс для состояния котов
const catSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setTodayActions: (state, action: PayloadAction<{ id: string; value: string }>) => {
      const cat = state.cats.find((item) => item.id === action.payload.id);
      if (cat) {
        cat.todayActions = action.payload.value;
      }
    },
    petCat: (state, action: PayloadAction<string>) => {
      const cat = state.cats.find((item) => item.id === action.payload);
      if (cat) addInteraction(cat, 'pet');
    },
    playWithCat: (state, action: PayloadAction<string>) => {
      const cat = state.cats.find((item) => item.id === action.payload);
      if (cat) addInteraction(cat, 'play');
    },
    feedCat: (state, action: PayloadAction<string>) => {
      const cat = state.cats.find((item) => item.id === action.payload);
      if (cat) addInteraction(cat, 'feed');
    },
    scoldCat: (state, action: PayloadAction<string>) => {
      const cat = state.cats.find((item) => item.id === action.payload);
      if (cat) addInteraction(cat, 'scold');
    },
  },
});

export const { setTodayActions, petCat, playWithCat, feedCat, scoldCat } = catSlice.actions;

export default catSlice.reducer;