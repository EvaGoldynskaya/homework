import { store } from '../store/store';

// Имена котов
const getCatsNames = (): string => {
  const cats = store.getState().cats.cats;
  return cats.map((cat) => cat.name).join(' и ');
};

// Рендер страницы
export function renderHome(): void {
  const content = document.getElementById('app');
  if (!content) return;

  const catNames = getCatsNames();

  content.innerHTML = `
    <section class="page home-page">
      <h1 class="page-title">Дневник настроения котов</h1>
      <article class="card card-accent">
        <p>
          Этот небольшой учебный проект поможет мне отслеживать настроение моих котов и замечать, если из-за занятости я не уделяю им достаточно внимания.
        </p>
        <p>
         Со мной живут две кошачьи личности: <strong>${catNames}</strong>.
        </p>
      </article>

      <div class="grid grid-2">
        <article class="card">
          <h3>Как я могу влиять на настроение котов?</h3>
          <p class="muted">На странице "Коты" добавлять взаимодействия с котами через кнопки.
            Важно! Сначала погладить кота в реальности - потом в приложении)</p>
        </article>
        <article class="card">
          <h3>Что я могу анализировать?</h3>
          <p class="muted">На странице "Статистика" смотреть общую статистику взаимодействий с котами. А на странице "Коты" смотреть статистику по каждому коту.</p>
        </article>
      </div>
    </section>
  `;
}
