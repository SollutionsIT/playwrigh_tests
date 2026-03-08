import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Универсальный метод для перехода по URL
  async visit(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle'); // Ждем, пока прогрузятся все скрипты
  }

  // Универсальный метод получения заголовка вкладки
  async getTitle() {
    return await this.page.title();
  }
}