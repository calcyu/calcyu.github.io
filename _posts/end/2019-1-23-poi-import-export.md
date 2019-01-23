---
title: POI操作excel
tag: 
- POI
- EXCEL
- JAVA
- ExcelUtil
---

## 1. 需求
在java项目中实现读取和写入excel文件的功能

## 2. 简介
Apache POI是Apache软件基金会的开放源码函式库，POI提供API给Java程序对Microsoft Office格式档案读和写的功能。

[http://poi.apache.org/](http://poi.apache.org/)

## 3. 基本操作
### 依赖包
```xml
        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi</artifactId>
            <version>4.0.1</version>
        </dependency>

        <dependency>
            <groupId>org.apache.poi</groupId>
            <artifactId>poi-ooxml</artifactId>
            <version>4.0.1</version>
        </dependency>
```
### 读取excel中的内容
```java
@Test
    public void readExcel() throws IOException {
        //读取文件
        String filePath = "temp/手机列表.xlsx";
        String fileType = filePath.substring(filePath.lastIndexOf("."));
        Workbook wb = null;//抽象excel文件
        if(".xls".equals(fileType)){
            //2003
            wb = new HSSFWorkbook(new FileInputStream(filePath));
        }else if(".xlsx".equals(fileType)){
            //2007
            wb = new XSSFWorkbook(new FileInputStream(filePath));
        }else{
            System.out.println("格式不支持");
            return;
        }
        //遍历excel中的每一个sheet
        for (int k = 0; k < wb.getNumberOfSheets(); k++) {
            Sheet sheet = wb.getSheetAt(k);
            if(sheet==null){
                continue;
            }
            //遍历sheet中的每一行
            for (int i = sheet.getFirstRowNum(); i <=sheet.getLastRowNum() ; i++) {
                Row row = sheet.getRow(i);
                //遍历sheet中的每一个单元格
                for (int j = 0; j < row.getLastCellNum(); j++) {
                    Cell cell = row.getCell(j);
                    String value="";
                    switch (cell.getCellType()){
                        case STRING:
                            value = cell.getStringCellValue();
                            break;
                        case NUMERIC:
                            if ("General".equals(cell.getCellStyle().getDataFormatString())) {
                                value = new DecimalFormat("0").format(cell.getNumericCellValue());
                            } else if ("m/d/yy".equals(cell.getCellStyle().getDataFormatString())) {
                                value = new SimpleDateFormat("yyyy-MM-dd").format(cell.getDateCellValue());
                            } else {
                                value = new DecimalFormat("0.00").format(cell.getNumericCellValue());
                            }
                            break;
                    }
                    System.out.println("第"+k+"个sheet_第"+i+"行_第"+j+"列的值："+value);
                }
            }
        }
    }
```
### 把数据写入excel
```java
@Test
    public void writeExcel() throws IOException {
        //读取文件
        String filePath = "temp/手机列表-write.xlsx";
        String fileType = filePath.substring(filePath.lastIndexOf("."));
        Workbook wb = null;//抽象excel文
        if(".xls".equals(fileType)){
            //2003
            wb = new HSSFWorkbook();
        }else if(".xlsx".equals(fileType)){
            //2007
            wb = new XSSFWorkbook();
        }else{
            System.out.println("格式不支持");
            return;
        }
        //创建sheet
        Sheet sheet = wb.createSheet("手机清单");
        //创建行
        Row row  = sheet.createRow(0);//第一行
        //创建单元格
        Cell cell = row.createCell(0);//第一个单元格
        cell.setCellValue("手机名称");
        cell = row.createCell(1);//第二个单元格
        cell.setCellValue("售价");
        //再创建一行
        row = sheet.createRow(1);//第二行
        cell = row.createCell(0);
        cell.setCellValue("华为");
        cell = row.createCell(1);
        cell.setCellValue(8888);
        //把workbook数据保存至磁盘
        FileOutputStream os = new FileOutputStream(filePath);
        wb.write(os);
    }
```

## 4. 封装
> 本着不重复造轮子的原则找了一下，真的肯定有

```xml
        <dependency>
            <groupId>net.oschina.likaixuan</groupId>
            <artifactId>excelutil</artifactId>
            <version>2.0.2</version>
        </dependency>
``` 

文档 [http://www.likaixuan.top/excelUtil](http://www.likaixuan.top/excelUtil)

源码 [https://gitee.com/likaixuan0/ExcelUtil](https://gitee.com/likaixuan0/ExcelUtil)


### 使用方法
> 导入导出功能 

```java
@Test
    public void read(){
        String keyValue ="手机名称:phoneName,颜色:color,售价:price,上市时间:startTime";
        try {
            File file = new File("temp/手机列表.xlsx");
//            导入
//            List list= ExcelUtil.readXls("temp/手机列表.xlsx",ExcelUtil.getMap(keyValue),"excel.PhoneModel");
            //如果excel内容和keyValue不匹配的话，会报java.lang.Exception: 表头字段和定义的属性字段不匹配，请检查
            //调用readXlsPart方法可以解决
            List list= ExcelUtil.readXlsPart("temp/手机列表.xlsx",ExcelUtil.getMap(keyValue),"excel.PhoneModel");

            Assert.assertTrue(list.size()==2);
            //导出
            ExcelUtil.exportExcel("temp/手机列表-out.xls",keyValue,list,"excel.PhoneModel");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
```

> 输出至response对象，实现下载功能

```java
@RequestMapping(value = "download")
    public void downExcedl(HttpServletResponse response) throws Exception {
        //持久化得到集合
        List<User> list = new ArrayList<>();
        User user = new User();
        user.setUserName("张三");
        user.setUserPsw("123");
        user.setRoleId(1l);
        list.add(user);
        String keyValue ="用户名:userName,密码:userPsw,角色:roleId";
        ExcelUtil.exportExcelOutputStream(
                response,keyValue,list,User.class.getName(),"用户列表");
    }
```

