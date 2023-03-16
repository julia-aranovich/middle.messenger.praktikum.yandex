## <a href="https://keen-kleicha-40e27f.netlify.app/" target="_blank" title="JA Messenger">JA Messenger</a>

Простой чат для общения с базовой функциональностью и дизайном. Поддерживает индивидуальные и групповые чаты, поиск по чатам, редактирование профиля, аватаров.

## Установка

- `npm install` — установка стабильной версии,
- `npm start` — запуск приложения на http://localhost:3000,
- `npm run dev` — запуск приложения в режиме разработки,
- `npm run lint` — запуск линтинга кода (*.js, *.ts, .pcss файлы),
- `npm run build` — сборка стабильной версии.

## Ветки репозитория

- *main* — стабильная версия,
- *deploy* — версия, задеплоенная на <a href="https://keen-kleicha-40e27f.netlify.app/" target="_blank" title="Netlify site">Netlify</a>,
- *sprint_i* — ветка i-го спринта (для разработчиков).

## Основные концепции

- Используется компонентный подход в конструировании интерфейса, основывающийся на базовой компоненте <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/src/utils/Block.ts" target="_blank" title="Block">Block</a>
- Для управления и подпсиок на события используется класс <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/src/utils/EventBus.ts" target="_blank" title="EventBus">EventBus</a>
- Для осуществления запросов к API подготовлен класс <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/src/utils/HTTP.ts" target="_blank" title="HTTP">HTTP</a>
- Для работы с сообщениями в чатах подготовлен класс для работы с WebSockets <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/src/utils/WS.ts" target="_blank" title="WebSockets">WS</a>
- Для роутинга приложения реализован класс <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/src/utils/navigation.ts" target="_blank" title="Router">Router</a>

## Линтинг

- Линтинг JavaScript и TypeScript кода осуществляется с помощью <a href="https://eslint.org/" target="_blank" title="Eslint">Eslint</a>
- Линтинг стилей осуществляется с помощью <a href="https://stylelint.io/" target="_blank" title="Stylelint">Stylelint</a>
- Более подробно соответствующие правила описаны в <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/blob/sprint_3/Codestyle.md" target="_blank" title="Codestyle.md">Codestyle.md</a>

## UI/UX

- <a href="https://github.com/julia-aranovich/middle.messenger.praktikum.yandex/tree/main/mockups" target="_blank" title="Mockups">Прототип мессенджера (PNG)</a>

## API

- <a href="https://ya-praktikum.tech/api/v2/swagger/#/" target="_blank" title="API">Swagger UI</a>
