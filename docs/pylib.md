# Библиотека для python

Для начала необходимо импротировать нужные библиотеки
```python
import rospy
from advancedClover import Clover
from advancedClover.image import ImageSubscriber, ImagePublisher
```
## Классс `Clover`

`Clover`  -   класс для более удобной работы с кловером

#### Инициализация

`clover = Clover()`

При инициализации в класс можно передать следующие параметры:

 - `default_speed` для задание значение скорости по умолчанию
 - `default_tolerance` для задание значение погрешности, которая используется в navigate_wait() по умолчанию

```python
clover = Clover(default_speed = 0.5, default_tolerance = 0.2)
```

Все эти параметры позволяют впоследствии значительно сэкономить время

#### Функции класса
 - `clover.arrived()` - вернёт True/False в зависимости от того, прибыл коптер в точку назначения или нет 
 - `clover.land_wait()` - выполняет посадку, ждёт её завершения
 - `nav = clover.create_navigator(frame_id)` создаёт экземпляр класса c заданным frame_id
 - `nav.navigate(x, y, z, auto_arm = False)` - лететь в заданную точку, аналогична функции navigate(), не дожидается прибытия
 - `nav.navigate_wait(x, y, z, auto_arm = True)` - лететь в заданную точку, аналогична функции navigate_wait(), дожидается прибытия

## Класссы для работы с изображением

`ImageSubscriber`, `ImagePublisher` - классы для более удобной работы с топиками с картинками
#### Инициализация
`camera = ImageSubscriber("/main_camera/image_raw")` - создание экземпляра класса `ImageSubscriber()`, при создании необходимо в качестве параметра указать нужный топик, из которого нужно читать картинку

`debug = ImagePublisher("/debug/example")`  -  создание экземпляра класса `ImagePublisher()`, при создании необходимо в качестве параметра топик, в который необходимо сохранять картинку

#### Функции класса

У класса экземпляра класса `ImageSubscriber` есть функция `.read()`

__ImageSubscriber__ - `img = camera.read()` - записывает в переменную `img` считанную картинку


__ImagePublisher__  - `debug.write(img)` - отправляет в топик, указанный при инициализации картинку

## Примеры кода

```python
print("Hello world!!!")
```