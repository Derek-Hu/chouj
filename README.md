# 抽奖程序提供以下功能

  * 观众页面：查看滚动效果及抽奖结果
  * 奖项设置： 增加/删除奖项，调整奖项抽取顺序
  * 查看获奖记录，可下载页面截图
  * 开始/结束抽奖

# 抽奖程序使用方法：
0. 直接下载[https://github.com/Derek-Hu/chouj/blob/master/build.zip](https://github.com/Derek-Hu/chouj/blob/master/build.zip)文件，无需使用源代码编译
1. 修改默认奖项设置，或者部署后使用菜单【奖项设置】线上修改

修改build文件夹中award.json
```js
[{
    "name": "一等奖", // 奖项名称
    "total": 30, // 共总获奖人数
    "unit": 6  // 每次抽取6人
}]
```

2. 设置所有可抽奖人员名单
修改build文件夹中users.json
```js
{
    "0001": "张三", // 员工编号 : 姓名
    "0002": "李四",
    "0003": "王五",
    "005": "钱某",
    "006": "邓某",
    "009": "张某"
}
```
3. 将文件夹build放入http服务器中，
4. 打开【观众入口】，重要的事情说三遍：

  **打开【观众入口】时，使用同一浏览器，以新窗口的形式打开**

  **打开【观众入口】时，使用同一浏览器，以新窗口的形式打开**

  **打开【观众入口】时，使用同一浏览器，以新窗口的形式打开**

<img src="https://github.com/Derek-Hu/chouj/blob/master/public/usage.png?raw=true">