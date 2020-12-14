# IDE

AdvancedClover IDE - это VSCode-like IDE разработаная специально для разработки проектов для Clover.

На данный момент она включает в себя следующие функции:

- Возможность просмотра топиков
- Возможность просмотра топиков с изображениями
- Возможность вызова сервисов
- Интегрированый файловый менеджер
- Интегрированый терминал
- Авто-комплит

## Установка

На данный момент поддерживается только архитектура x86 поэтому её можно установить только в [симулятор](https://clover.coex.tech/ru/simulation_vm.html) или на компьютор с ubuntu/debian с архитектурой процесора x86-64
Инструкция по шагам:

1. Скачайте файл advanceedClover.deb на виртуальную машину из последнего релиза [отсюда](https://github.com/FTL-team/cloverIDE/releases/)
   ![Страница скачивания](https://i.imgur.com/YLaNs11.png)
2. Откройте терминал в виртуальной машине и перейдите в директорию куда скачали файл
3. Обновите список пакетов с помощью `apt update`
4. Затем установите пакет `apt install ./advancedClover.deb`

Готово

## Запуск

1. Откройте терминал на виртуальной машине с симулятором
2. Перейдите в директорию с симулятором `cd /opt/advancedClover/ide`
3. Выполните скрипт запуски `./run.sh`

## Подготовка к работе

Вам потребуется скачать и устаноить корневой сертификат, а также разрешить небезопасный контент, данная инструкция приведена для браузера chrome 87

1. Скачайте корневой сертификат откроя в браузере страницу `http://<ip аддрес клевера>:3003`
2. Откройте настройки хрома и найдите в безопасности сертификаты
   ![Страница настроек безопасности](https://i.imgur.com/CRRchon.png)
3. Откройте настроить сертификаты потом центры сертификаты
   ![Страница центров сертификации](https://i.imgur.com/EHnZhK8.png)
4. Нажмите импортировать сертификат, и выберете файл который вы скачали в шаге 1
5. Выбрете пункт доверять при идентификации сайтов и нажмите ок
   ![Добавление сертификатf](https://i.imgur.com/8AFNaIZ.png)
6. Откройте в браузере `https://<ip аддрес клевера>:3333` 
7. Нажмите на замочек затем на настройки сайтов
   ![Замочек](https://i.imgur.com/EiSZzZw.png)
8. Найдите пункт небезопасный контент и разрешите его
   ![Разрешение небозопасного контента](https://i.imgur.com/WguULZh.png)
Готово
## Использование
Для того чтобы открыть ide перейдите на `https://<ip аддрес клевера>:3333`

Для того чтобы посмотреть список доступных инструментов для работы с clover нажмите на иконку с фигурными скобками внутри которых находится коптер
![Кнопка](https://i.imgur.com/gNWiJw8.png)

Для того чтобы открыть папку нажмите File>Open или `Ctrl+Alt+O`  и выбрете папку

Для того чтобы показать терминал нажмите Terminal>New Terminal или Ctrl+Shift+\`