[🇬🇧 English](README.md) | [🇷🇺 Русский](README.ru.md)

# Fresher - Fridge Tracker

A simple bilingual app for tracking food expiration dates
and reducing food waste

![Fresher main page](./public/screenshots/empty-en.jpg)

### 🔗 Links

- **Live Demo:** [fresher-mu.vercel.app](https://fresher-mu.vercel.app/)
- **Repository:** https://github.com/MallonsoFrey/fridge-tracker.git

## About the project

Fresher was created to solve a simple everyday problem:
it is easy to forget about food products hidden in the fridge
until they expire.

The application helps users quickly understand:

- what products they currently have;
- which products are expiring soon;
- which products have already expired.

**Features**

The interface is intentionally simple and focused on the most
important information rather than overwhelming the user with data.

- **Multi-language:** interface in Russian and English, switchable via the UI.
- **Add & Search:** quick product addition and search by name.
- **Expiry tracking:** product status (fresh/soon/expired) and number of days.
- **Stats:** cards showing expiry dates and summary metrics.
- **Responsive UI:** works on mobile and desktop devices.

## Tech Stack

**Core**

- React
- TypeScript
- Vite

**Styling**

- Tailwind CSS

**State management**

- Zustand
- localStorage

**Internationalization**

- i18next / react-i18next

**Deployment**

- Vercel

**Run locally**

1. Download project

```bash
git clone https://github.com/MallonsoFrey/Fresher--fridge-tracker.git
```

1. Установить зависимости

```bash
npm install
```

2. Запустить режим разработки

```bash
npm run dev
```

3. Построить продакшн сборку

```bash
npm run build
```

**Screenshots**

- Main view
![Main view placeholder](./public/screenshots/empty-en.jpg)

- Main view - mobile
![Main view mobile placeholder](./public/screenshots/mobile-empty-en.jpg)

- Added products - mobile
![Added products mobile placeholder](./public/screenshots/add-en.jpg)

- Add product
![Add product placeholder](./public/screenshots/add-en.jpg)

---
## Future Improvements

- Recipe recommendations based on available products
- Expiration reminders
- Barcode scanning
- Shopping list
- Product categories
- User accounts and cloud synchronization
