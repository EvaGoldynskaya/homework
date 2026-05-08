import { store } from '../store/store';
import { 
  Cat, 
  getCatStats,
  setTodayActions,
  petCat, 
  playWithCat, 
  feedCat,
  scoldCat,
} from '../store/catSlice';

// Цвет настроения
const getMoodColor = (mood: number): string => {
  if (mood >= 60) return '#88db8b'; // зеленый
  if (mood >= 40) return '#eece6f'; // желтый
  return '#f16f66'; // красный
};

//Текстовое описание настроения
const getMoodText = (mood: number): string => {
  if (mood >= 80) return 'Отличное';
  if (mood >= 60) return 'Хорошее';
  if (mood >= 40) return 'Нормальное';
  if (mood >= 20) return 'Плохое';
  return 'Ужасное';
};

// Иконка пола кота
const getSexIcon = (sex: string): string => {
  return sex === 'male' ? '♂️' : '♀️';
};

// Рендер страницы с котами
export function renderCats(): void {
  console.log("renderCats")
  const content = document.getElementById('app');
  if (!content) return;

  const state = store.getState();
  const cats = state.cats.cats;
  
  content.innerHTML = `
    <div class="page cats-page">
      <h1 class="page-title">Мои коты</h1>
      <div class="cats-list">
        ${cats.map(cat => renderCatCard(cat)).join('')}
      </div>
    </div>
  `;
  
  addCatCardHandlers();
}

// Рендер карточки кота
function renderCatCard(cat: Cat): string {
  console.log("renderCatCard")
  const moodColor = getMoodColor(cat.mood);
  const stats = getCatStats(cat);
  
  return `
   <div class="cat-card card" data-cat-id="${cat.id}">
      <div class="cat-card-left">
        <div class="cat-photo">
          <img 
            src="${cat.photo}" 
            alt="${cat.name}" 
            class="cat-image"
            loading="lazy"
          >
        </div>
      </div>
      
      <div class="cat-card-right">
        <div class="cat-header">
          <h3>${cat.name} ${getSexIcon(cat.sex)}</h3>
        </div>
        
        <div class="cat-top-row">
          <div class="cat-info">
            <p><strong>Дата рождения:</strong> ${formatDateTime(cat.birthDate)}</p>
            <p><strong>Возраст:</strong> ${calculateAge(cat.birthDate)}</p>
            <p><strong>Настроение:</strong> 
              <span style="color: ${moodColor}; font-weight: bold;">
                ${getMoodText(cat.mood)} (${cat.mood}%)
              </span>
            </p>
          </div>
          <div class="cat-today-actions">
            <label for="today-actions-${cat.id}"><strong>Интересное:</strong></label>
            <input
              id="today-actions-${cat.id}"
              class="cat-note-input"
              data-id="${cat.id}"
              type="text"
              value="${cat.todayActions}"
              placeholder="Что интересного кот сделал сегодня?"
            >
          </div>
        </div>
        
        <div class="mood-bar">
          <div class="mood-fill" style="width: ${cat.mood}%; background-color: ${moodColor}"></div>
        </div>
        
        <div class="cat-stats">
          <h4>Статистика взаимодействий</h4>
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-label">Поглаживаний:</span>
              <span class="stat-value">${stats.petCount}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">| Игр:</span>
              <span class="stat-value">${stats.playCount}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Кормлений:</span>
              <span class="stat-value">${stats.feedCount}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">| Ругательств:</span>
              <span class="stat-value">${stats.scoldCount}</span>
            </div>
            <div class="stat-item total">
              <span class="stat-label">Всего действий:</span>
              <span class="stat-value">${stats.total}</span>
            </div>
          </div>
          <div class="last-interaction">
            <small>Последнее действие: ${stats.lastInteraction ? formatDateTime(stats.lastInteraction) : 'Нет действий'}</small>
          </div>
        </div>
        
        <div class="cat-actions">
          <button class="action action-pet" data-id="${cat.id}">Погладить </button>
          <button class="action action-play" data-id="${cat.id}">Поиграть </button>
          <button class="action action-feed" data-id="${cat.id}">Покормить </button>
          <button class="action action-scold" data-id="${cat.id}">Поругать </button>
        </div>
      </div>
    </div>
  `;
}

// Расчет возраста кота по дате рождения
export const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const today = new Date();
  let year =  today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth() ;
  console.log("year", year);
  console.log("monthDiff", monthDiff);
  let month = 0;

  if (monthDiff < 0 ) {
    year--;
    month = 12 + monthDiff;;
  }

  return month !== 0 ? year.toString() +" г. " + month.toString() + " м." : year.toString() +" г. ";
};

// Форматирование даты 
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return dateString.length > 10 ? 
  date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }) :
  date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  ;
};

// Обработчики кнопок на карточках котов
function addCatCardHandlers(): void {  
  // Погладить
  document.querySelectorAll('.action-pet').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        store.dispatch(petCat(id));
        renderCats();
      }
    });
  });
  
  // Поиграть
  document.querySelectorAll('.action-play').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        store.dispatch(playWithCat(id));
        renderCats();
      }
    });
  });
  
  // Покормить
  document.querySelectorAll('.action-feed').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        store.dispatch(feedCat(id));
        renderCats();
      }
    });
  });

  // Поругать
  document.querySelectorAll('.action-scold').forEach(button => {
    button.addEventListener('click', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      if (id) {
        store.dispatch(scoldCat(id));
        renderCats();
      }
    });
  });

  // Изменени в поле "Что интересного сделал кот"
  document.querySelectorAll('.cat-note-input').forEach((input) => {
    input.addEventListener('change', (e) => {
      const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
      const value = (e.currentTarget as HTMLInputElement).value;
      if (id) {
        store.dispatch(setTodayActions({ id, value }));
      }
    });
  });
}