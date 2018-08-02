/**
 * Created by ghy on 2018/8/1.
 */
var str = "nativechannel://share?params=" + JSON.stringify(
        {
            "config": [{
                "shareto": "QQ",
                "img_url": "http://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2",
                "url": "http://bj.58.com",
                "title": "58同城",
                "content": "租房子，找房子，找工作，买卖二手车。神奇的58真万能",
                "jumpprotocol": "wbmain://jump/core/singleSharePage?params=%7B%22key%22%3A%22value%22%7D"
            }, {
                "shareto": "SINA",
                "img_url": "http://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2",
                "url": "http://bj.58.com",
                "title": "58同城",
                "content": "租房子，找房子，找工作，买卖二手车。神奇的58真万能"
            }, {
                "shareto": "FRIENDS",
                "img_url": "http://img.58cdn.com.cn/logo/58/252_84/logo-o.png?v=2",
                "url": "http://bj.58.com",
                "title": "58同城",
                "content": "租房子，找房子，找工作，买卖二手车。神奇的58真万能",
                "jumpprotocol": "wbmain://jump/core/singleSharePage?params=%7B%22key%22%3A%22value%22%7D"
            }, {
                "shareto": "WEIXIN",
                "url": "https://bj.58.com",
                "title": "这是文章标题",
                "type": "wxminipro",
                "wxminiproid": "wxaea78830c7829f80",
                "wxminipropath": "pages/elist",
                "wxminipropic": "https://pic1.58cdn.com.cn/nowater/58toutiao/small/n_v2aaa214c9e3e942d1aa3edb1a27200cd4.jpg?t=1&w1=640&h1=427&w=240&h=171&crop=1"
            }], "callback": "WBAPPCb1533113623901A36192581031825544"
        })
console.log(str);