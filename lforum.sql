/*
Navicat MySQL Data Transfer

Source Server         : 我的mysql
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : lforum

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2022-06-14 19:45:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) DEFAULT NULL COMMENT '评论id',
  `reply_id` int(11) DEFAULT NULL COMMENT '回复目标id',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '回复内容',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  `to_uid` int(11) DEFAULT NULL COMMENT '回复id',
  `post_id` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `test` (`uid`),
  CONSTRAINT `test` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('41', null, null, '我来评论了', '23', null, '33', '2022-05-29 15:06:38');
INSERT INTO `comment` VALUES ('42', '41', null, '我来评论了', '23', '23', null, '2022-05-29 15:18:10');
INSERT INTO `comment` VALUES ('43', null, null, '来了把', '12', null, '33', '2022-05-29 05:59:36');
INSERT INTO `comment` VALUES ('44', null, null, '哈哈哈', '12', null, '33', '2022-05-29 05:42:37');
INSERT INTO `comment` VALUES ('45', null, null, '12312', '12', null, '33', '2022-05-29 05:45:37');
INSERT INTO `comment` VALUES ('46', null, null, '委屈委屈饿', '12', null, '33', '2022-05-29 05:48:37');
INSERT INTO `comment` VALUES ('47', null, null, '去问驱蚊器为', '12', null, '33', '2022-05-29 05:52:37');
INSERT INTO `comment` VALUES ('48', null, null, '222222222222', '12', null, '33', '2022-05-29 05:56:37');
INSERT INTO `comment` VALUES ('49', null, null, '王企鹅王企鹅', '12', null, '33', '2022-05-29 05:59:37');
INSERT INTO `comment` VALUES ('50', null, null, '我去饿我去恶趣味', '12', null, '33', '2022-05-29 05:03:38');
INSERT INTO `comment` VALUES ('51', null, null, '打撒阿德', '12', null, '33', '2022-05-29 05:05:38');
INSERT INTO `comment` VALUES ('52', null, null, '萨达萨达是', '12', null, '33', '2022-05-29 05:08:38');
INSERT INTO `comment` VALUES ('53', null, null, '萨达萨达', '12', null, '33', '2022-05-29 05:10:38');
INSERT INTO `comment` VALUES ('54', null, null, '学习了', '12', null, '34', '2022-05-29 06:36:05');

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '内容',
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '标题',
  `uid` int(11) DEFAULT NULL COMMENT '发布用户id',
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片',
  `support_count` int(11) DEFAULT '0' COMMENT '点赞量',
  `read_count` int(11) DEFAULT '0' COMMENT '阅读量',
  `type` int(11) DEFAULT NULL COMMENT '1.正常帖子2.回复帖子',
  `issue_time` timestamp NULL DEFAULT NULL COMMENT '发布时间',
  `describes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id`),
  KEY `ceshi` (`uid`),
  CONSTRAINT `ceshi` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES ('14', '我的第一个帖子', '开始', null, null, '6', '45', null, '2022-05-11 17:04:08', '111');
INSERT INTO `posts` VALUES ('15', '我的第一个帖子', '开始', '13', '', '3', '13', null, '2022-05-18 17:04:12', null);
INSERT INTO `posts` VALUES ('16', '我的第一个帖子222222222222', '开始', '13', null, '1', '1', null, '2022-05-21 17:04:17', null);
INSERT INTO `posts` VALUES ('17', '我的第一个帖子222222222222', '时间测试', '13', null, '1', '2', null, '2022-05-23 17:12:21', null);
INSERT INTO `posts` VALUES ('18', '我的第一个帖子222222222222', '开始', '13', null, '1', '1', null, '2022-05-23 17:04:26', null);
INSERT INTO `posts` VALUES ('19', '我的第一个帖子222222222222', '开始', '13', null, '0', '0', null, '2022-05-23 17:04:29', null);
INSERT INTO `posts` VALUES ('32', '<p>这是我的要饭帖<br/><img src=\"http://127.0.0.1:2000/static/images/photo/2022-5-2_jZC32BhNgX.jpeg\" style=\"max-width:100%;\" contenteditable=\"false\" width=\"392\" height=\"396.54\"/></p>', '要饭帖，不给饭就捣乱', '12', null, '1', '3', null, '2022-05-23 17:14:07', null);
INSERT INTO `posts` VALUES ('33', '<p>、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡、</p><p>这是睡</p><p><img src=\"http://127.0.0.1:2000/static/images/photo/2022-5-2_DNkzAYpvcp.jpg\" style=\"max-width:100%;\" contenteditable=\"false\"/></p>', '测试一把', '12', null, '1', '83', null, '2022-05-23 17:29:46', null);
INSERT INTO `posts` VALUES ('34', '<p>Node.js发布于2009年5月，由Ryan Dahl开发，是一个基于Chrome V8引擎的<a target=\"_blank\" href=\"https://baike.baidu.com/item/JavaScript/321142\">JavaScript</a>运行环境，使用了一个<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8/9597519\">事件驱动</a>、非阻塞式I/O模型，<sup>&nbsp;[1]</sup><a>&nbsp;</a>&nbsp;让JavaScript 运行在<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E7%AB%AF/6492316\">服务端</a>的开发平台，它让JavaScript成为与<a target=\"_blank\" href=\"https://baike.baidu.com/item/PHP/9337\">PHP</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/Python/407313\">Python</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/Perl/851577\">Perl</a>、<a target=\"_blank\" href=\"https://baike.baidu.com/item/Ruby/11419\">Ruby</a>等服务端语言平起平坐的<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80/1379708\">脚本语言</a>。<sup>&nbsp;[2]</sup><a>&nbsp;</a><br/></p><p><img src=\"http://127.0.0.1:2000/static/images/photo/2022-5-3_kDVgqWyYF3.jpg\" style=\"max-width:100%;\" contenteditable=\"false\" width=\"434\" height=\"434\"/><br/>Node.js对一些特殊用例进行优化，提供替代的<a target=\"_blank\" href=\"https://baike.baidu.com/item/API/10154\">API</a>，使得V8在非浏览器环境下运行得更好，V8引擎执行Javascript的速度非常快，性能非常好，基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%BA%94%E7%94%A8/2196523\">网络应用</a>。<sup>&nbsp;[3]</sup><a>&nbsp;</a><br/></p><hr/><p><a></a></p><p>2009年2月，Ryan Dahl在<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E5%8D%9A%E5%AE%A2/124\">博客</a>上宣布准备基于V8创建一个轻量级的<a target=\"_blank\" href=\"https://baike.baidu.com/item/Web%E6%9C%8D%E5%8A%A1%E5%99%A8\">Web服务器</a>并提供一套库。</p><p>2009年5月，Ryan Dahl在GitHub上发布了最初版本的部分Node包，随后几个月里，有人开始使用Node开发应用。</p><p>2009年11月和2010年4月，两届JSConf大会都安排了Node.js的讲座。</p><p>2010年年底，Node获得<a target=\"_blank\" href=\"https://baike.baidu.com/item/%E4%BA%91%E8%AE%A1%E7%AE%97\">云计算</a>服务商Joyent资助，创始人Ryan Dahl加入Joyent全职负责Node的发展。</p><p>2011年7月，Node在微软的支持下发布Windows版本。</p><pre><code class=\"JavaScript\">var http = require(\'http\');\nserver = http.createServer(function (req, res) {\nres.writeHeader(200, {\"Content-Type\": \"text/plain\"});\nres.end(\"Hello World\\n\");\n});\nserver.listen(8000);\nconsole.log(\"httpd start @8000\");</code></pre>', 'node简介', '12', null, '0', '76', null, '2022-05-24 13:39:50', null);
INSERT INTO `posts` VALUES ('35', '<p><font size=\"7\">12321</font></p><p><font size=\"7\">2132132</font></p><p><font size=\"7\">21312312</font></p><p><font size=\"7\">1231231231232</font></p>', '1111', '12', null, '1', '49', null, '2022-05-24 13:57:18', null);
INSERT INTO `posts` VALUES ('36', '12123', '21312', '23', null, '0', '0', null, '2022-06-14 02:22:07', null);
INSERT INTO `posts` VALUES ('37', '12123', '21312', '23', null, '0', '0', null, '2022-06-14 02:22:07', '111');
INSERT INTO `posts` VALUES ('38', '<p>&nbsp; &nbsp;qweqwe</p><p>请问恶趣味&nbsp;&nbsp;</p><p>趣味请问</p><p>去问我去饿&nbsp; &nbsp;</p>', '21312', '23', null, '0', '0', null, '2022-06-14 02:46:13', ' qweqwe请问恶趣味趣味请问去问我去饿 ');

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `content` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `to_uid` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('10', '12', '哈哈哈', '43', '12', '2022-05-29 05:06:37');
INSERT INTO `reply` VALUES ('11', '12', '都在干嘛呢', '41', '23', '2022-05-29 05:22:37');
INSERT INTO `reply` VALUES ('12', '12', '？？', '51', '12', '2022-05-29 05:16:38');
INSERT INTO `reply` VALUES ('13', '12', '哈哈哈', '54', '12', '2022-05-29 06:42:05');
INSERT INTO `reply` VALUES ('14', '22', '真有你的啊', '54', '12', '2022-05-29 06:20:06');
INSERT INTO `reply` VALUES ('15', '22', '测试下啊', '54', '22', '2022-05-29 06:32:08');

-- ----------------------------
-- Table structure for support_posts
-- ----------------------------
DROP TABLE IF EXISTS `support_posts`;
CREATE TABLE `support_posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) DEFAULT NULL COMMENT '帖子id',
  `uid` int(11) DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of support_posts
-- ----------------------------
INSERT INTO `support_posts` VALUES ('19', '21', '12');
INSERT INTO `support_posts` VALUES ('20', '26', '12');
INSERT INTO `support_posts` VALUES ('26', '18', '12');
INSERT INTO `support_posts` VALUES ('27', '20', '12');
INSERT INTO `support_posts` VALUES ('28', '22', '12');
INSERT INTO `support_posts` VALUES ('29', '23', '12');
INSERT INTO `support_posts` VALUES ('30', '16', '12');
INSERT INTO `support_posts` VALUES ('31', '17', '12');
INSERT INTO `support_posts` VALUES ('39', '25', '12');
INSERT INTO `support_posts` VALUES ('40', '15', '12');
INSERT INTO `support_posts` VALUES ('44', '32', '12');
INSERT INTO `support_posts` VALUES ('45', '33', '12');
INSERT INTO `support_posts` VALUES ('47', '35', '12');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `avatar` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `info` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `token` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('12', '哈哈哈', 'http://127.0.0.1:2000/static/images/photo/2022-5-1_2urkevwXrg.jpeg', '11111111', '1244060112@qq.com', '222', 'F5fXQkJFA7Nh16MduIwR', '3', '2022-05-11');
INSERT INTO `users` VALUES ('13', '大笨蛋', 'http://127.0.0.1:2000/static/images/photo/2022-5-1_bebHap7kGW.png', '11111111', '31244060112@qq.com', null, '9toFpc2UzYQbofzuntjf', null, null);
INSERT INTO `users` VALUES ('15', 'QLPxwB4h', null, '11111111', '901244060112@qq.com', null, null, null, null);
INSERT INTO `users` VALUES ('16', 'P847IEGR', null, '11111111', '801244060112@qq.com', null, null, null, null);
INSERT INTO `users` VALUES ('17', 'ixhBmHi4', null, '11111111', '44060112@qq.com', null, null, null, null);
INSERT INTO `users` VALUES ('18', 'Hz1VeQMd', null, '123123', '21312', null, null, null, null);
INSERT INTO `users` VALUES ('19', 'Ejaf94NL', null, '12345', '213122', null, null, null, null);
INSERT INTO `users` VALUES ('20', '6gHMw8qH', null, '12345', '2131222', null, null, null, null);
INSERT INTO `users` VALUES ('21', 'fsYUo3RS', null, '123', '12312', null, null, null, null);
INSERT INTO `users` VALUES ('22', '大小姐驾到', 'http://127.0.0.1:2000/static/images/photo/2022-5-1_89RdS8BA6t.jpg', '123', '123', null, 'gudSxHVw77V3mo1Racjx', '2', '2022-05-23');
INSERT INTO `users` VALUES ('23', 'vVvrvpJd', null, '999', '999', null, '2y5q3f5ulofu4J4vduB9', null, null);
