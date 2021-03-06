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
 - `clover.land_atexit()` - в случае если код выходит с ошибкой(KeyboardInterrupt, DevisionByZero...), автоматически осуществляет посадку коптера
 - `clover.disable_land_atexit()` - отключает автоматическую посадку коптера при неуспешном завершении программы
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

Здесь собрано несколько примеров программ

#### Полёт по точкам
```python
import rospy
import cv2
from advancedClover import Clover
from advancedClover.image import ImageSubscriber, ImagePublisher


rospy.init_node("flight")

clover = Clover(default_speed = 1, default_tolerance = 0.2)

nav_aruco_map = clover.create_navigator('aruco_map')
nav_body = clover.create_navigator('body')

nav_body.navigate_wait(0, 0, 2, auto_arm = True)

points = ((0, 7), (7, 7), (7, 0), (0, 0))

for point in points:
    nav_aruco_map.navigate_wait(point[0], point[1], 2)
    rospy.sleep(1)

print("Start landing")

clover.land_wait()

print("landed")
```

##### Важно
Этот фрагмент кода:
```python
for point in points:
    nav_aruco_map.navigate_wait(point[0], point[1], 2)
    rospy.sleep(1)
```
можно заменить на:
```python
for point in points:
    nav_aruco_map.navigate(point[0], point[1], 2)
    while not clover.arrived():
        print("Navigate to {}, {}".format(point[0], point[1]))
    rospy.sleep(1)
```

Это бывает удобно если нужно делать какие-то действия в процессе полёта к точке


#### Распознавание цветов

```python
import numpy

######

def process_image(img):
    red = cv2.inRange(img, (0, 0, 180), (80,80,256))
    green = cv2.inRange(img, (0, 180, 0), (80,256,80))
    blue = cv2.inRange(img, (180, 0, 0), (256, 80, 80))
    
    red = np.sum(red) 
    green = np.sum(green) 
    blue = np.sum(blue) 

    m = max(red, green, blue)
    
    if m < 128:
        return "none"
    if m == red:
        return "red"
    elif m == green:
        return "green"
    elif m == blue:
        return "blue"

```
#### Работа с картинками

Добавим в предыдущий код публикацию бинариризованных картинок для отладки
```python
import rospy
import numpy as np
import cv2
from advancedClover import Clover
from advancedClover.image import ImageSubscriber, ImagePublisher


rospy.init_node("flight")

clover = Clover(default_speed = 1, default_tolerance = 0.2)

camera = ImageSubscriber("/main_camera/image_raw")
red_img = ImagePublisher("/debug/red_color")
green_img = ImagePublisher("/debug/green_color")
blue_img = ImagePublisher("/debug/blue_color")

def process_image(img):
    red = cv2.inRange(img, (0, 0, 180), (80,80,256))
    green = cv2.inRange(img, (0, 180, 0), (80,256,80))
    blue = cv2.inRange(img, (180, 0, 0), (256, 80, 80))
    
    red_img.write(red)
    green_img.write(green)
    blue_img.write(blue)

    red = np.sum(red) 
    green = np.sum(green) 
    blue = np.sum(blue) 

    m = max(red, green, blue)
    
    if m < 128:
        return "none"
    if m == red:
        return "red"
    elif m == green:
        return "green"
    elif m == blue:
        return "blue"

for point in points:
    nav_aruco_map.navigate(point[0], point[1], 2)
    while not clover.arrived():
        frame = camera.read()
        print(process_image(frame))
    rospy.sleep(2)
```