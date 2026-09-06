---
title: GUI 自动化（pyautogui）
date: 2026-09-06 08:00:00
categories:
  - Python
tags:
  - GUI
  - pyautogui
  - 自动化
coverImg: /covers/python-gui.webp
permalink: /python/y7z8a
---

# GUI自动化

“图形用户界面自动化”，发送虚拟的击键和鼠标点击

环境安装：pyautogui

# 鼠标

- 坐标：原点为屏幕<u>左上角</u>，向右x递增，向下y递增。

- 分辨率：宽和高有多少像素。比如1920*1080，则左上角坐标（0,0），右下角坐标（1919,1079）。

```py
import pyautogui
width, height = pyautogui.size()  # 获取屏幕宽和高的像素数
print(width, height)
```

- 移动鼠标：

  - `pyautogui.moveTo(x, y, duration=)`

    - duration可选，指定鼠标移到目的地位置所需的<u>时间</u>(秒数)，默认为0（后同）。

  - `pyautogui.moveRel(x,y,duration=)`，相对于当前的位置移动鼠标

    

- 获取鼠标位置：`pyautogui.position()`

  

- 点击：`pyautogui.click(x, y, botton='left')`，移动、点击、放开

  - botton：控制位置，有'left', 'middle', 'right'，默认左

- 其他点击：

  - `pyautogui.mouseDown()`：按下鼠标

  - `pyautogui.mouseUp()`：释放鼠标

  - `pyautogui.doubleClick()`：双击左键

  - `pyautogui.rightClick()`, `pyautogui.middleClick()`：双击左键、双击中键

    

- 拖动：`pyautogui.dragTo()`, `pyautogui.dragRel()`：按住鼠标不动然后移动。

  

- 滚动：`pyautogui.scroll(800)`，单位在不同的操作系统中不一样，需要试验。正负代表方向。

- 注意：停止在其他非解释器界面的循环点击方法

  ```py
  import pyautogui
  import time
  import keyboard
  
  time.sleep(2)
  while True:
      pyautogui.click(1029, y=570)
      time.sleep(0.1)
      if keyboard.is_pressed('esc'):
          break
  ```

# 屏幕

pyautogui拥有屏幕快照功能，可以根据当前屏幕的内容创建图形文件。注：在Linux系统中需先安装scrot程序才能在pyautogui中使用屏幕快照功能。

- 获取屏幕快照：

```py
import pyautogui
im = pyautogui.screenshot()
im.save('./123.png')
'''注意要有pillow模块'''
```

- image对象getpixel()
  - 传入坐标元组获得这些坐标处的像素颜色，返回一个RGB元祖，包含4个整数：红绿蓝、透明值。（用于做图像识别）

```py
import pyautogui
im = pyautogui.screenshot()
print(im.getpixel((500, 200)))
result = pyautogui.pixelMatchesColor(500,200,(248,248,248))
print(result)  # True
```



- opencv图像识别`pip install opencv-python`，以点击腾讯会议的加入会议为例：

```py
import cv2
import pyautogui
import time

time.sleep(2)
# 获取带有腾讯会议的屏幕快照并保存到本地
im = pyautogui.screenshot()
im.save('screenshot.png')
# 基于cv2读取图片
screen = cv2.imread('screenshot.png')
# 在快照中对比加入会议按钮照片(截图获取)，定位其准确位置
joinMeeting = cv2.imread('joinMeeting.png')
result = cv2.matchTemplate(screen, joinMeeting, cv2.TM_CCOEFF_NORMED)
# result是一个二维列表，列表中最大元素的位置就是我们对比后相似度最高的图片（左上角）位置
# print(result)

# minMaxLoc返回一个元组，其中三个元素，依次为最不相似点分数，最相似点分数，以及相似度最高的图片（左上角）在原图中的位置
pos_start = cv2.minMaxLoc(result)[3]  # 获取位置
print(pos_start)

# 定位点击图片中间的位置
x = int(pos_start[0] + joinMeeting.shape[1] / 2)
y = int(pos_start[1] + joinMeeting.shape[0] / 2)

time.sleep(1)
pyautogui.click(x, y)
```

# 键盘

- 录入字符：`pyautogui.typewrite()`

```py
pyautogui.typewrite('Hello world!', interval=0.25)
```

输入参数：字符串`'Hello'`，列表`['s', 'b']`；interval：在每个字符之间添加短时间的暂停。注：对于"A"或"！"，pyautogui会自动模拟按住shift键。

- press按键`pyautogui.press('enter')`
- 组合键：`pyautogui.hotkey()`



















