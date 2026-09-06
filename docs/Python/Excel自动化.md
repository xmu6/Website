---
title: Excel 自动化（openpyxl）
date: 2026-09-06 08:00:00
categories:
  - Python
tags:
  - Excel
  - openpyxl
  - 自动化
  - 办公
coverImg: /covers/python-excel.webp
permalink: /python/v5w6x
---

# 简介

- python处理Excel的方式：openpyxl。`pip install openpyxl`

- 基本定义：

  - 工作簿：一个 Excel 电子表格文档称为一个工作簿，一个 工作簿保存在扩展名为.xlsx 的文件中

  - sheet表：每个工作簿可以包含多个表(也称为工作表)

  - 活动表：用户当前查看的表(或关闭 Excel 前最后查看的表)，称为活动表

  - 单元格：每个表都有一些列(地址是从 A 开始的字母)和一些行(地址是从 1 开始的数 字)。在特定行和列的方格称为单元格。每个单元格都包含一个数字或文本值。

# 基本操作

- 读取

```py
import openpyxl
wb = openpyxl.load_workbook(filename='example.xlsx')
# 返回一个工作簿对象（路径需存在）
```

- 获取工作簿sheet表名称

```py
sheet_names = wb.sheetnames  # ['Sheet1']
```

- 获取指定sheet对象

```py
sheet = wb['Sheet1']  # <Worksheet "Sheet1">
```

- 获取活动工作表

```py
active_sheet = wb.active  # <Worksheet "Sheet1">
```

- 从表中取得单元格：有了 Worksheet 对象后，就可以按名字访问 Cell 对象。属性：
  - value: cell中存储的值
  - row：行索引
  - column：列索引
  - coordinate：坐标

```py
sheet = wb.active  # <Worksheet "Sheet1">
cell = sheet['a1']
print(cell)  # <Cell '2'.A1> ---> '2'是工作表名
print(cell.value)  # 第一行第一个：1
# 下面也能取值，注意第一行或列的整数是1不是0
sheet.cell(row=1, column=1).value  # 第一行第一个：1
print(cell.row)  # 1
print(cell.column)  # 1
print(cell.coordinate)  # A1
```

- 从工作表中取得行和列：可以将 Worksheet 对象进行切片操作，从而取得电子表格中一行、一列或一个矩形区域中的所有 Cell 对象。

```py
for cell_row in sheet['A2':'D5']:
    for cell in cell_row:
        print(cell.coordinate, cell.value)
 """
A2 None
B2 None
C2 None
D2 None
A3 None
B3 None
C3 None
D3 None
A4 None
B4 None
C4 None
D4 None
A5 None
B5 None
C5 None
D5 None
 """
print(sheet.max_row, sheet.max_column)  # 返回数据区域，中间的空值也算上
for cell in (list(sheet.columns)[0]):  # 返回某列，同样是取数据区域
    print(cell.coordinate, cell.value)
```

- 创建工作簿

```py
wb = openpyxl.Workbook()
print(wb.sheetnames)  # ['Sheet']
sheet = wb.active
sheet.title = '重命名'
print(wb.sheetnames)  # ['重命名']
```

- 创建工作表

```py
wb.create_sheet(index=1, title='新建')  # index选填
print(wb.sheetnames)  # ['重命名', '新建']
```

- 删除工作表

```py
del wb['重命名']
```

- 写入

```py
sheet['a1'] = 'hello'
```

- 保存

```py
wb.save('example.xlsx')
```

- 设置单元格字体风格

```py
from openpyxl.styles import Font, PatternFill
sheet['b1'].font = Font(name='Arial', bold=True)  # 内容
sheet['a1'].fill = PatternFill(fill_type='solid', fgColor='FF0000')  # 填充
```

- 筛选

```py
# ref：筛选器对象引用的区域
sheet.auto_filter.ref = 'a1:d7'
# add_filter_column：参数1表示对指定区域那一列进行筛选条件，参数2表示筛选条件内容
sheet.auto_filter.add_filter_column(0, ['beijing', 'shenzhen'])
```

- 排序

```py
sheet.auto_filter.add_sort_condition(ref='D2:D9', descending=True)
```

- 公式

```py
sheet['a3'] = 'SUM(A1:A2)'
```

- 合并

```py
sheet.merge_cells('A1:C4')
```

- 拆分

```py
sheet.unmerge_cell('A1:C4')
```

- 冻结窗口

```py
sheet.freeze_panes = 'A2'  # 冻结左边和上面的部分,本身不冻结
sheet.freeze_panes = None   # 解除
```

- 绘制图表
  - 创建reference对象，表示作用在图表中的数据区域
  - 创建图标对象
  - 往图表对象中添加数据
  - 将图标添加到指定sheet中

```py
values = openpyxl.chart.Reference(sheet, min_row=1, min_col=1, max_row=10, max_col=5)
chart = openpyxl.chart.BarChart()
chart.title = '柱状图'
chart.x_axis.title = '时间'
chart.y_axis.title = '销量'
# 添加数据
chart.add_data(values)
x_label = Reference(sheet_file, min_col=1,min_row=2,max_row=32)  # 让该区域作为x轴
chart.set_categories(x_label)
# 插入图及位置
sheet.add_chart(chart.'G1')
```



