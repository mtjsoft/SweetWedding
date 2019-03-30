# SweetWedding

# 1、小程序之云开发初体验。完全基于云开发的小程序《甜蜜婚礼》。
婚期将近，本人亲自操刀制作了一款基于云开发的小程序“甜蜜婚礼”。也算是体验了下次小程序云开发，确实非常便捷。任何人都不在受限于域名和服务器，因为完全不需要这些东西，都能够快速的开发出一款可上线的小程序。“甜蜜婚礼”小程序已上线，欢迎大家扫码体验。

*能送上祝福就更好啦。*

![小程序码](https://img-blog.csdnimg.cn/20190330182815218.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
# 2、小程序效果图
   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190330183020983.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)         ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190330183036812.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190330183150758.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70) ![在这里插入图片描述](https://img-blog.csdnimg.cn/2019033018321817.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
    ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190330183340871.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70) ![在这里插入图片描述](https://img-blog.csdnimg.cn/20190330183353811.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
#  3、源码
   源码已上传至GitHub，可以的话，来个star呀！(^ _ ^)【[传送门](https://github.com/mtjsoft/SweetWedding)】

# 4、注意
在使用云开发的时候，因为我们经常用到分页加载，这个地方有一个坑，请大家特别留意。

```
db.collection('friendMsgList').skip((pageindex - 1) * size).limit(pagesize).orderBy('msgtime', 'desc')
```
   如上面的按照时间倒序，分页加载消息列表的数据。
   limit 设置每页加载的大小。
   **skip**  从指定序列后的结果开始返回，就是我们常说的数据偏移。
   **这里有一个坑，就是调试基础库版本小于2.3.0的时候，这个偏移值不能设置成0。这个应该是一个bug，升级到2.3.0就没有这个问题了。**
 
# 5、结语
还有整整一个月就结婚啦。跟谈了7年多的女盆友也终于修成正果了。回过头想一想，这一路走过来，我真的欠她很多。**因为我是真的不懂浪漫啊！** 很感激这么多年都坚持了下来。
**最后也祝愿所有同行们，家庭幸福、事业有成！**

**本人公众号，关注一波，共同交流吧。**

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019012509485178.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI4Nzc5MDgz,size_16,color_FFFFFF,t_70)
