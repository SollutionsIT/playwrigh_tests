import { test, expect } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';

test.describe('Авторизация на сайте fylpi.at', () => {

  test('Переход на страницу логина с главной страницы', async ({ page }) => {
    // 1. Инициализируем наш Page Object
    const mainPage = new MainPage(page);

    // 2. Открываем сайт (URL берется из playwright.config.ts)
    await test.step('Открываем главную страницу', async () => {
      await mainPage.open();
    });

    // 3. Проверяем заголовок (используем метод из BasePage)
    await test.step('Проверяем, что страница загрузилась', async () => {
      const title = await mainPage.getTitle();
      expect(title).not.toBe(''); // Убеждаемся, что заголовок не пустой
    });

    // 4. Выполняем действие
    await test.step('Кликаем на кнопку "Войти"', async () => {
      await mainPage.goToLogin();
    });

    // 5. Демонстрация безопасной работы с .env (для формы логина на следующей странице)
    await test.step('Проверка переменных окружения', async () => {
      // Имитация ввода email. Восклицательный знак (!) говорит TypeScript, что мы уверены, что переменная существует
      const userEmail = process.env.TEST_USER_EMAIL!; 
      console.log(`В реальном тесте мы бы ввели в поле email: ${userEmail}`);
      
      // await loginPage.fillEmail(userEmail); <-- так бы это выглядело
    });

    // 6. Проверяем результат (что URL изменился)
    await expect(page).toHaveURL(/.*login/);
  });

});