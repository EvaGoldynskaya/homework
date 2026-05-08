import { store } from '../store/store';
import { Cat, CatStats, getCatStats } from '../store/catSlice';

type InteractionTotals = Omit<CatStats, 'lastInteraction'>;

// Форматирование даты
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Расчет общей статистики для котов
const calculateTotals = (cats: Cat[]): InteractionTotals => {
  return cats.reduce(
    (acc, cat) => {
      const stats = getCatStats(cat);
      acc.petCount += stats.petCount;
      acc.playCount += stats.playCount;
      acc.feedCount += stats.feedCount;
      acc.scoldCount += stats.scoldCount;
      acc.positiveCount += stats.positiveCount;
      acc.negativeCount += stats.negativeCount;
      acc.total += stats.total;
      return acc;
    },
    {
      petCount: 0,
      playCount: 0,
      feedCount: 0,
      scoldCount: 0,
      positiveCount: 0,
      negativeCount: 0,
      total: 0,
    }
  );
};

// Поиск кота с наибольшим количеством взаимодействий
const getMostInteractiveCat = (cats: Cat[]): Cat | null => {
  if (cats.length === 0) {
    return null;
  }
  return [...cats].sort((a, b) => {return b.interactions.length - a.interactions.length;})[0];
};

// Рендер страницы
export function renderStats(): void {
  const content = document.getElementById('app');
  if (!content) return;

  const cats = store.getState().cats.cats;
  const totals = calculateTotals(cats);
  const favoriteCat = getMostInteractiveCat(cats);

  content.innerHTML = `
    <section class="page stats-page">
      <h1 class="page-title">Общая статистика</h1>
      <div class="grid stats-overview">
        <article class="card stats-overview-card">
          <h3>Всего котов</h3>
          <p class="stats-number">${cats.length}</p>
        </article>  
        <article class="card stats-overview-card">
          <h3>Всего взаимодействий</h3>
          <p class="stats-number">${totals.total}</p>
        </article>
        <article class="card stats-overview-card">
          <h3>Положительных взаимодействий</h3>
          <p class="stats-number stats-number-positive">${totals.positiveCount}</p>
        </article>
        <article class="card stats-overview-card">
          <h3>Отрицательный взаимодействий</h3>
          <p class="stats-number stats-number-negative">${totals.negativeCount}</p>
        </article>
      </div>

      <div class="grid grid-3 stats-grid-page">
        <article class="card stats-type-card">
          <h4>Поглаживаний</h4>
          <p>${totals.petCount}</p>
        </article>
        <article class="card stats-type-card">
          <h4>Игр</h4>
          <p>${totals.playCount}</p>
        </article>
        <article class="card stats-type-card">
          <h4>Кормлений</h4>
          <p>${totals.feedCount}</p>
        </article>
        <article class="card stats-type-card">
          <h4>Ругательств</h4>
          <p>${totals.scoldCount}</p>
        </article>
      </div>

      ${
        favoriteCat
          ? `
          <article class="card card-accent stats-highlight">
            <h3>Кот с наибольшим числом взаимодействий</h3>
            <p><strong>${favoriteCat.name}</strong></p>
            <p>Последняя активность: ${
              favoriteCat.interactions.length > 0
                ? formatDateTime(favoriteCat.interactions[favoriteCat.interactions.length - 1].createdAt)
                : 'Нет действий'
            }</p>
          </article>
        `
          : ''
      }
    </section>
  `;
}
