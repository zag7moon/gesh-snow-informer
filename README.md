# gesh-snow-informer

Данный скрипт посещает сай rp5.ru, скачивает оттуда последнее значение уровня снега в Шереге и отправляет информацию в телеграм чат.

Основной скрипт описан в файле `index.js`. Для иммитации поведения пользователя используется библиотека Nightmarejs. Смысл ее работы заключается в запуске браузера Chromium и выполнении действий описанных в `index.js`, так как это сделал бы реальный пользователь.

Так как для запуска Chromium необходимы библиотеки отображения графической информации, запуск скрипта на севере осложнен необходимостью все эти пакеты доустанавливать. Для облегчения настройки среды выполнения, приложение оформлено в качестве Docker контейнера. (см. Dockerfile)

## Сборка приложения локально

1. Необходимо иметь Docker версии не ниже 19.3
2. Заполнить файл `.env` по примеру из `.env.example`
3. Выполнить команду: `docker build -t "<container-name>" .`.

#### Описание переменных конфигурации

- `TOKEN`: Токен бота;
- `CHAT_ID`: идентификатор чата в который нужно отправить сообщение;
- `WEATHER_URL`: Адрес страницы на которой расположен архив погоды;
- `CITY_ID`: id города в openweathermap;
- `OPENWEATHERMAP_API_KEY`: api ключ в openweathermap;
- `SYNC_AT`: время в которое нужно проверять данные о снеге.

## Запуск приложения

Для запуска скрипта использовать команду `docker run <container-name>`

