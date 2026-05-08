import { renderCats } from './pages/CatPage';
import { renderHome } from './pages/HomePage';
import { renderStats } from './pages/StatsPage';

class Router {
  private currentPath: string = '';

  constructor() {
    if (typeof window !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initializeNavigation();
        this.handleRoute();
      });
      window.addEventListener('popstate', () => this.handleRoute());
    }
  }

  // Находит все элементы с атрибутом data-navigate и добавляет обработчики для них
  private initializeNavigation(): void {
    const navLinks = document.querySelectorAll('[data-navigate]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
          this.navigate(href);
        }
      });
    });
  }

  // Переход по дугому URL
  navigate(path: string): void {
    console.log ("navigate")
    if (typeof window !== 'undefined' && this.currentPath !== path) {
      window.history.pushState({}, '', path);
      this.handleRoute();
    }
  }

  // Отрисовка страницы, на которую был совершен переход
  private handleRoute(): void {
    if (typeof window === 'undefined') return;
    
    const path = window.location.pathname;
    this.currentPath = path;
    
    console.log ("path" , path)
    switch(path) {
      case '/':
      case '/home':
        renderHome();
        break;
      case '/cats':
        renderCats();
        break;
      case '/stats':
        renderStats();
        break;
      default:
        const content = document.getElementById('app');
        if (content) {
          content.innerHTML = '<h1>404 - Страница не найдена</h1>';
        }
        break;
    }
  }

  // Запуск роутера
  start(): void {
    if (typeof window !== 'undefined') {
      this.handleRoute();
    }
  }
}

export const router = new Router();