# 基于 nodejs + koa-ejs + mysql 实现

> 功能 登录、注册

### test
```js
git clone https://github.com/Roc-zhou/nodeJs-ejs-app.git

cd nodeJs-ejs-app 

npm install or yarn install

// http://localhost:3000
```

### mysql 表

```
#user

创建user表

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '姓名',
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
DROP TRIGGER IF EXISTS `ceshi`;
DELIMITER ;;
CREATE TRIGGER `ceshi` AFTER UPDATE ON `user` FOR EACH ROW update demo set name = 2 where id =1
;;
DELIMITER ;

```