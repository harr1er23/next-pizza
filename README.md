# 🍕 Next Pizza - Документация проекта

## Описание проекта

**Next Pizza** - это современное веб-приложение для заказа пиццы и фастфуда, разработанное с использованием передовых технологий. Проект демонстрирует полный цикл работы интернет-магазина: от просмотра каталога до оформления и оплаты заказа (является пет-проектом).

### Основные возможности

- 📦 Просмотр каталога продуктов с детальной информацией
- 🛒 Добавление товаров в корзину с выбором опций
- 🔍 Фильтрация по типу теста, размеру, цене и ингредиентам
- 👤 Личный кабинет с управлением профилем
- 💳 Оформление заказа с тестовой оплатой
- 🔐 Аутентификация пользователей

---

## 🛠 Технологический стек

### Frontend
- **Next.js 15.1.7** - React фреймворк с SSR/SSG
- **React 19.0.0** - библиотека для создания UI
- **TypeScript 5** - типизация кода
- **Tailwind CSS 3.4.1** - utility-first CSS фреймворк
- **Shadcn/ui** - компонентная библиотека на основе Radix UI

### Backend & Database
- **Prisma ORM 6.4.1** - современный ORM для работы с БД
- **PostgreSQL** - реляционная база данных
- **NextAuth.js 4.24.11** - аутентификация

### State Management & Forms
- **Zustand 5.0.3** - управление состоянием
- **React Hook Form 7.54.2** - работа с формами
- **Zod 3.24.2** - валидация схем

### UI Libraries
- **Radix UI** - примитивы для доступного UI
- **Lucide React** - иконки
- **React Hot Toast** - уведомления
- **React Insta Stories** - истории/сторис
- **Vaul** - drawer компонент

### Utilities
- **Axios** - HTTP клиент
- **bcrypt** - хеширование паролей
- **Nodemailer** - отправка email
- **qs** - парсинг query строк

---

## 📁 Структура проекта

```
next-pizza/
├── app/                      # Next.js App Router
│   ├── (root)/              # Главная группа маршрутов
│   ├── api/                 # API routes
│   └── layout.tsx           # Корневой layout
├── components/              # React компоненты
│   ├── shared/             # Переиспользуемые компоненты
│   │   ├── Product/        # Компонент карточки продукта
│   │   ├── CartDrawer/     # Компонент корзины
│   │   ├── Checkout/       # Компонент оформления заказа
│   │   └── Profile/        # Компонент личного кабинета
│   └── ui/                 # UI примитивы (shadcn/ui)
├── prisma/                  # Prisma ORM
│   ├── schema.prisma       # Схема базы данных
│   └── seed.ts             # Seeding данных
├── lib/                     # Утилиты и хелперы
├── hooks/                   # Custom React hooks
├── store/                   # Zustand стор
├── types/                   # TypeScript типы
└── public/                  # Статические файлы
```

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 20+
- PostgreSQL
- npm или yarn

### Установка

1. **Клонируйте репозиторий**
```bash
git clone <repository-url>
cd next-pizza
```

2. **Установите зависимости**
```bash
npm install
```

3. **Настройте переменные окружения**
Создайте файл `.env` в корне проекта:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/next_pizza"

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Email (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"

# Payment (если используется)
PAYMENT_API_KEY="your-payment-key"
```

4. **Инициализируйте базу данных**
```bash
npm run prisma:push
npm run prisma:seed
```

5. **Запустите проект**
```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000)

---

## 📜 Доступные скрипты

| Команда | Описание |
|---------|----------|
| `npm run dev` | Запуск в режиме разработки |
| `npm run build` | Сборка production версии |
| `npm start` | Запуск production сервера |
| `npm run lint` | Проверка кода линтером |
| `npm run prisma:push` | Синхронизация схемы с БД |
| `npm run prisma:studio` | Открыть Prisma Studio |
| `npm run prisma:seed` | Заполнение БД тестовыми данными |

---

## 🗄 База данных (Prisma)

### Основные модели

#### User (Пользователь)
```prisma
model User {
    id       Int    @id @default(autoincrement())
    fullName String
    email    String @unique
    password String

    verified         DateTime?
    role             UserRole          @default(USER)
    orders           Order[]
    cart             Cart?
    verificationCode VerificationCode?

    provider   String?
    providerId String?

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### Product (Продукт)
```prisma
model Product {
    id Int @id @default(autoincrement())

    name        String
    imageUrl    String
    description String?
    variations  ProductVariation[]
    ingredients Ingredient[]

    category   Category @relation(fields: [categoryId], references: [id])
    categoryId Int

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### ProductVariation (Вариации Продуктов)
```prisma
model ProductVariation {
    id Int @id @default(autoincrement())

    price     Int
    size      Int?
    pizzaType Int?

    product   Product @relation(fields: [productId], references: [id])
    productId Int

    cartItems CartItem[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### Ingredient (Ингридиенты)
```prisma
model Ingredient {
    id Int @id @default(autoincrement())

    name     String
    price    Int
    imageUrl String

    products Product[]

    cartItems CartItem[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### Cart (Корзина)
```prisma
model Cart {
    id Int @id @default(autoincrement())

    user   User? @relation(fields: [userId], references: [id])
    userId Int?  @unique

    items CartItem[]

    token String

    totalAmount Int @default(0)

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### CartItem (Элемент корзины)
```prisma
model CartItem {
    id Int @id @default(autoincrement())

    productVariations  ProductVariation @relation(fields: [productVariationId], references: [id])
    productVariationId Int

    cart   Cart @relation(fields: [cartId], references: [id])
    cartId Int

    quantity Int @default(1)

    ingredients Ingredient[]

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

#### Order (Заказ)
```prisma
model Order {
    id Int @id @default(autoincrement())

    user   User? @relation(fields: [userId], references: [id])
    userId Int?

    token String

    totalAmount Int
    status      OrderStatus
    paymentId   String?

    items Json

    fullName String
    email    String
    phone    String
    address  String
    comment  String?

    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
}
```

### Работа с Prisma Studio
Для визуального управления данными:
```bash
npm run prisma:studio
```

---

## 🎨 Основные компоненты

### Product Card
Компонент отображения карточки продукта с возможностью добавления в корзину.

**Функциональность:**
- Отображение изображения, названия, описания и цены
- Выбор варианта (размер, тесто)
- Добавление в корзину

### CartDrawer
Выдвигающаяся панель корзины.

**Функциональность:**
- Просмотр добавленных товаров
- Изменение количества
- Удаление товаров
- Расчет итоговой суммы
- Переход к оформлению заказа

### Checkout
Страница оформления заказа.

**Функциональность:**
- Форма с данными доставки
- Выбор способа оплаты
- Валидация полей (Zod + React Hook Form)
- Интеграция с платежной системой

### Profile
Личный кабинет пользователя.

**Функциональность:**
- Просмотр и редактирование профиля
- История заказов
- Управление адресами доставки

---

## 🔐 Аутентификация (NextAuth)

Проект использует **NextAuth.js** для управления аутентификацией.

### Поддерживаемые провайдеры
- Email/Password (Credentials)
- OAuth провайдеры (опционально)

### Защищенные маршруты
Для защиты маршрутов используется middleware Next.js:

---

## 🔍 Фильтрация продуктов

Система фильтрации поддерживает:
- **Тип теста** - традиционное, тонкое
- **Размеры** - маленькая, средняя, большая
- **Диапазон цен** - slider для выбора мин/макс цены
- **Ингредиенты** - множественный выбор ингредиентов

Фильтры используют **query параметры** для сохранения состояния в URL.

---

## 💳 Тестовая оплата

Для тестирования платежей используются следующие данные:

```
Номер карты: 4242 4242 4242 4242
Срок действия: любая будущая дата
CVC: любые 3 цифры
```

---

## 🎨 Стилизация (Tailwind CSS)

Проект использует **Tailwind CSS** с дополнительными плагинами:
- `tailwindcss-animate` - анимации
- `tailwind-merge` - объединение классов
- `class-variance-authority` - варианты компонентов

---

## 🧪 Пользовательские сценарии

### 1. Регистрация и вход в ЛК
1. Пользователь нажимает "Войти"
2. Выбирает "Регистрация"
3. Заполняет форму (email, пароль, имя)
4. Подтверждает email (опционально)
5. Автоматический вход после регистрации

### 2. Добавление товара в корзину
1. Пользователь просматривает каталог
2. Выбирает продукт
3. Выбирает опции (размер, тесто, ингредиенты)
4. Нажимает "Добавить в корзину"
5. Товар появляется в CartDrawer

### 3. Оформление заказа
1. Открывает корзину
2. Проверяет состав заказа
3. Нажимает "Оформить заказ"
4. Заполняет форму доставки
5. Выбирает способ оплаты
6. Подтверждает заказ
7. Получает email с подтверждением

### 4. Управление профилем
1. Переходит в "Личный кабинет"
2. Редактирует личные данные
3. Просматривает историю заказов
4. Сохраняет изменения

---

## 🚢 Деплой (Vercel)

Проект развернут на **Vercel**: [https://next-pizza-gamma-olive.vercel.app/](https://next-pizza-gamma-olive.vercel.app/)

## 🤝 Вклад в проект

Это пет-проект, созданный в образовательных целях для демонстрации современного стека веб-разработки.

---

## 🎯 Roadmap / Будущие улучшения

- [ ] Интеграция с картами для отслеживания доставки
- [ ] Мобильное приложение
- [ ] Админ-панель для управления продуктами
- [ ] Отзывы и рейтинги продуктов

---

**Версия документации:** 1.1  
**Последнее обновление:** Ноябрь 2024
