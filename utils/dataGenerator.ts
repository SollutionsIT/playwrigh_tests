import { faker } from '@faker-js/faker';

// Экспортируем функцию, которая возвращает объект с готовыми данными
export function generateRandomUser() {
  return {
    // Генерируем реалистичное имя и фамилию
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    
    // Генерируем email. Удобно добавлять префикс 'autotest_', 
    // чтобы потом легко чистить базу данных сайта fylpi.at
    email: `autotest_${faker.string.uuid()}@example.com`,
    
    // Надежный пароль (со спецсимволами, цифрами и буквами разного регистра)
    password: faker.internet.password({ length: 12, memorable: false }),
    
    // Случайный номер телефона
    phone: faker.phone.number()
  };
}