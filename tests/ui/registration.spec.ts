import { test, expect } from '@playwright/test';
import { generateRandomUser } from '../../utils/dataGenerator';

test.describe('Регистрация нового пользователя на fylpi.at', () => {

  test('Успешное создание аккаунта со случайными данными', async ({ page }) => {
    // 1. Генерируем уникального юзера прямо перед началом теста
    const randomUser = generateRandomUser();
    
    console.log(`Пробуем зарегистрировать: ${randomUser.email} / ${randomUser.password}`);

    // 2. Идем на страницу регистрации (предположим, она по адресу /register)
    await page.goto('/register');

    // 3. Заполняем форму нашими свежими, уникальными данными
    await test.step('Заполнение формы регистрации', async () => {
      // В реальном проекте тут были бы вызовы методов из твоего Page Object, например:
      // await registrationPage.fillFirstName(randomUser.firstName);
      
      // Но для примера покажем напрямую через локаторы:
      await page.getByPlaceholder('Имя').fill(randomUser.firstName);
      await page.getByPlaceholder('Фамилия').fill(randomUser.lastName);
      await page.getByPlaceholder('Email').fill(randomUser.email);
      await page.getByPlaceholder('Пароль').fill(randomUser.password);
      
      await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    });

    // 4. Проверяем, что регистрация прошла успешно (например, появился текст)
    await test.step('Проверка успешной регистрации', async () => {
      const successMessage = page.getByText('Добро пожаловать');
      await expect(successMessage).toBeVisible();
    });
  });

});