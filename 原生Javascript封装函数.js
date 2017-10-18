/**
 * 得到ajax对象
 */
function getajaxHttp() {
    var xmlHttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
    return xmlHttp;
}

/**
 * 发送ajaxGet请求
 * @param url
 * @param delay
 */
function ajaxGet(url,delay){

    var xmlHttp  = getajaxHttp();
    xmlHttp.open("GET",url);
    xmlHttp.send(null);

    var timeout = true;
    setTimeout(function () {
        if(timeout){
            //ajax请求超时，在此处理
        }
    }, delay);

    xmlHttp.onreadystatechange = function() {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
            timeout = false;
            alert('success');
        } else {
            alert('fail');
        }
    }
}

/**
 * 发送ajaxPost请求
 * @param url
 * @param data
 */
function ajaxPost(url,data){

    var xmlHttp  = getajaxHttp();
    xmlHttp.open("POST",url);
    xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xmlHttp.send(data);
    xmlHttp.onreadystatechange = function() {
        if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
            alert('success');
        } else {
            alert('fail');
        }
    }
}

/**
 *
 * @param {Object} el HTML Element
 * @param {Object} type 事件类型
 * @param {Object} fn 事件handler
 */
function addEvent(el, type, fn){
    if(el.addEventListener){
        el.addEventListener(type, fn, true);
    }else if(el.attachEvent){
        el.attachEvent('on'+type, el['e'+fn]);
    }else{
        el['e' + fn] = function(){
            fn.call(el, window.event);
        };
    }
}

/**
 * 删除事件
 * @param el
 * @param type
 * @param fn
 */
function removeEvent(el, type, fn){
    if(el.removeEventListener){
        el.removeEventListener(type, fn, false);
    }else if(el.detachEvent){
        el.detachEvent('on' + type, el['e'+fn]);
    }
}

/**
 * 根据id获取元素
 * @param el
 * @returns {Element}
 */
function getEl(el){
    return document.getElementById(el);
}

/**
 * 判断是否为对象类型
 * @param obj
 * @returns {boolean}
 */
RegExp.isObject = function (obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
};

/**
 * 校验对象是否为空
 */
var isEmptyObj = function(Obj){
    var isEmpty = true;
    for(var key in Obj){
        isEmpty = false;
    }
    return isEmpty;
};

/**
 * 验证一个字符串时候是email
 * @param str
 * @returns {boolean}
 */
RegExp.isEmail = function (str) {
    var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w-]+$/i;
    return emailReg.test(str);
};

/**
 * 验证一个字符串是否是URL
 * @param str
 * @returns {Array|{index: number, input: string}}
 */
RegExp.isUrl = function (str) {
    var patrn = /^http(s)?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/;
    return patrn.exec(str);
};

/**
 * 转换时间戳
 * @param nS
 * @returns {string}
 */
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

/**
 * 将文件大小转成合适的刻度
 * @param nS
 * @returns {string}
 */
function fomateFileSize(nS) {
    if (nS < 1024) {
        return (nS / 1).toFixed(1) + " B";
    } else if (nS < Math.pow(1024, 2) && nS > 1024) {
        return (nS / Math.pow(1024, 1)).toFixed(1) + " KB";
    } else if (nS < Math.pow(1024, 3) && nS > 1024 ^ 2) {
        return (nS / Math.pow(1024, 2)).toFixed(1) + " MB";
    } else if (nS < Math.pow(1024, 4) && nS > 1024 ^ 3) {
        return (nS / Math.pow(1024, 3)).toFixed(1) + " GB";
    } else if (nS < Math.pow(1024, 5) && nS > 1024 ^ 4) {
        return (nS / Math.pow(1024, 4)).toFixed(1) + " TB";
    }
}

/**
 * 获取窗口宽度
 * @returns {*}
 */
function getWindowWidth() {
    if ( window.innerWidth ) {
        return window.innerWidth;
    } else if ( document.documentElement && document.documentElement.clientWidth ) {
        return document.documentElement.clientWidth;
    } else if ( document.body && document.body.clientWidth){
        return document.body.clientWidth;
    }
}

/**
 * 获取窗口高度
 * @returns {*}
 */
function getWindowHeight() {
    if ( window.innerHeight ) {
        return window.innerHeight;
    } else if ( document.documentElement && document.documentElement.clientHeight ) {
        return document.documentElement.clientHeight;
    } else if ( document.body && document.body.clientHeight){
        return document.body.clientHeight;
    }
}
/*
 浏览器视口的内部高度，包括滚动条 ：window.innerHeight
 浏览器视口的内部宽度，包括滚动条 ：window.innerWidth
 浏览器视口的内部高度，不包括滚动条 ：document.documentElement.clientHeight
 浏览器视口的内部宽度，不包括滚动条 ：document.documentElement.clientWidth
 网页整体域宽，不包括滚动条 ：document.body.clientWidth
 网页整体域高，不包括滚动条 ：document.body.clientHeight
 网页可见区域宽，不包括滚动条： document.body.offsetWidth (包括边线的宽)
 网页可见区域高，不包括滚动条： document.body.offsetHeight (包括边线的高)
 网页正文全文宽： document.body.scrollWidth
 网页正文全文高： document.body.scrollHeight
 网页被卷去的高： document.body.scrollTop
 网页被卷去的左： document.body.scrollLeft
 网页正文部分上： window.screenTop
 网页正文部分左： window.screenLeft
 屏幕分辨率的高： window.screen.height
 屏幕分辨率的宽： window.screen.width
 屏幕可用工作区高度，不含任务栏： window.screen.availHeight
 屏幕可用工作区宽度： window.screen.availWidth
 */

/**
 * 判断浏览器类型
 */
function judgeBrowser(){
    if ((navigator.userAgent.indexOf('MSIE') >= 0)
        && (navigator.userAgent.indexOf('Opera') < 0)){
        alert("IE");
    }else if (navigator.userAgent.indexOf('Firefox') >= 0){
        alert('你是使用Firefox')
    }else if (navigator.userAgent.indexOf('Opera') >= 0){
        alert('你是使用Opera')
    }else if (navigator.userAgent.indexOf('Chrome') >= 0){
        alert('你是使用Chrome')
    }else{
        alert('你是使用其他的浏览器浏览网页！')
    }
}

//对象的深度克隆
   function clone(Obj) {   
        var buf;   
        if (Obj instanceof Array) {   
            buf = [];  //创建一个空的数组 
            var i = Obj.length;   
            while (i--) {   
                buf[i] = clone(Obj[i]);   
            }   
            return buf;   
        }else if (Obj instanceof Object){   
            buf = {};  //创建一个空对象 
            for (var k in Obj) {  //为这个对象添加新的属性 
                buf[k] = clone(Obj[k]);   
            }   
            return buf;   
        }else{   
            return Obj;   
        }   
    }  

/**
 * 将URL转化为对象
 * @param argu
 * @returns {{}}
 */
function parseQueryString(argu){

    var str = argu.split('?')[1];
    var result = {};
    var temp = str.split('&');
    for(var i=0; i<temp.length; i++)
    {
        var temp2 = temp[i].split('=');
        result[temp2[0]] = temp2[1];
    }
    return result;
}

/**
 * 转换CSS中常用的颜色编码
 * @param color
 * @returns {string}
 * @description         alert(toRGB("#0000FF"));          // 输出 rgb(0, 0, 255)
                        alert(toRGB("invalid"));          // 输出 invalid
                        alert(toRGB("#G00"));             // 输出 #G00
 */
function toRGB(color) {
    var regex = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
    match = color.match(regex);

    return match ? 'rgb('+parseInt(match[1], 16)+','+parseInt(match[2], 16)+','+parseInt(match[3], 16)+')' : color;
}

/**
 * 去掉字符串首尾空格
 * @returns {string}
 */
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, '');
};

/**
 * 将下标index处的字符替换为repStr
 * @param index
 * @param repStr
 * @returns {string}
 */
String.prototype.replaceByIndex = function(index, repStr) {
    var prevStr = this.substring(0,index-1);
    var nextStr = this.substring(index, this.length);
    return prevStr+repStr+nextStr;
};

/**
 * 二分查找
 * @param value
 */
Array.prototype.binarySearch = function(value) {
    var index = 0;
    var find = false;
    var left = 0;
    var right = this.length;

    while(left <= right)
    {
        var center = Math.floor((left+right)/2);
        if(this[center] == value)
        {
            index = center;
            find = true;
        }
        if(value < this[center])
        {
            right = center - 1;
        }
        else
        {
            left = center + 1;
        }
    }

    if(find){
        alert('要查找的元素下标是' + center);
    }else{
        alert('未找到');
    }
};

/**
 * 打印对象成员
 * @param obj
 */
function writeObj(obj){
    var description = "";
    for(var i in obj){
        var property=obj[i];
        description+=i+" = "+property+"\n";
    }
    console.log(description);
}

var currTs = new Date();
var currDate = currTs.getFullYear() + '_' + (currTs.getMonth() + 1) + '_' + currTs.getDate();
var cookieKey = 'showCoinPopDate';
if(getCookie(cookieKey) !== currDate){  //当天还未显示过
   setCookie(cookieKey,currDate);
   var armyDayRank = 3;
   var goldCoin = 233;
   $('#act07_mask_3 .act07_mask_3_rank').text(armyDayRank);
   $('#act07_mask_3 .act07_mask_3_coin').text(goldCoin);
   $('#act07_mask_3').show();
}

/*
 请用CSS定义p标签，要求实现以下效果: 字体颜色在IE6下为黑色(#000000)；IE7下为红色(#ff0000)；而其他浏览器下为绿色(#00ff00)。
 p{
 color:#0f0;
 _color:#000; //ie6
 }
 //ie7
 *+html p{
 color:#f00;
 }
 * */

/*
表格结构
* <table align = "center" border="1" cellspacing = "0"cellpadding = "0" width = "50%">
    <tr>
        <th>表头</th>
        <th>表头</th>
    </tr>
    <tr align = "center">
        <td>中国</td>
        <td>淘宝网</td>
    </tr>
 </table>

 列表结构
 <dl>
    <dt>定义列表中的项目</dt>
    <dd>描述列表中的项目</dd>

    <dt>定义列表中的项目</dt>
    <dd>描述列表中的项目</dd>
 </dl>

 表单结构
 <form>
    //<label> 标签的 for 属性应当与相关元素的 id 属性相同。
    <label for="male">Male</label>
    <input type="radio" name="sex" id="male" />
 </form>
* */
