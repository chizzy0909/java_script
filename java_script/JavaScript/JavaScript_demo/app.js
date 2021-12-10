var nowDate = new Date();
var nowYear = nowDate.getFullYear();
var nowMonth = nowDate.getMonth() + 1;
var text = document.getElementById("yearAndMon");
text.innerText = nowYear + "年" + nowMonth + "月";
var monthDays1 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthDays2 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function becomeDate(nowYear, nowMonth) {
    var dt = new Date(nowYear, nowMonth - 1, 1);
    var firstDay = dt.getDay();
    var table = document.getElementById("table1");
    var monthDays = isRunNian();
    var rows = 5;
    var cols = 7;
    var k = 1;
    for (var i = 1; i <= rows; i++) {
        var tri = table.insertRow();
        for (var j = 1; j <= 7; j++) {
            var tdi = tri.insertCell();
            if (i == 1 && i * j < firstDay + 1)
                tdi.innerHTML = "";
            else {
                if (k > monthDays[nowMonth - 1])
                    break;
                tdi.innerHTML = k;
                k++;
            }
        }

    }
}

function lastMon() {
    table1.innerHTML = "";
    var text = document.getElementById("yearAndMon");
    if (nowMonth > 1)
        nowMonth = nowMonth - 1;
    else {
        nowYear--;
        nowMonth = 12;
    }
    text.innerText = nowYear + "年" + nowMonth + "月";
    becomeDate(nowYear, nowMonth);
}

function nextMon() {
    table1.innerHTML = "";
    if (nowMonth < 12)
        nowMonth = nowMonth + 1;
    else {
        nowYear++;
        nowMonth = 1;
    }
    var text = document.getElementById("yearAndMon");
    text.innerText = nowYear + "年" + nowMonth + "月";
    becomeDate(nowYear, nowMonth);
}

function isRunNian() {
    if ((nowYear % 4 == 0 || nowYear % 400 == 0) && nowYear % 100 != 0)
        return monthDays1;
    else
        return monthDays2;
}
becomeDate(nowYear, nowMonth);


//总页数
var total = 20;
$(function () {
    //页面初始化调用 生成页码
    makePage(total, 5);
});
//生成页码函数
function makePage(total, page) {
    var pageHtml = '';
    //点点点的html
    var ddd = '<div class="">…</div>';

    function createPage(index) { //单页码生成
        if (page == index) {
            //当前页(或选中)样式 多了个selected(换背景色字体色的)
            pageHtml += '<div class="fy_y selected" >' + page + '</div>';
        } else {
            pageHtml += '<div class="fy_y" onclick="pageClick(this)">' + index + '</div>';
        }
    }

    if (total <= 10) { //总页数小于10
        for (var i = 1; i <= total; i++) {
            //正常生成排列
            createPage(i);
        }
    } else {
        if (page <= 4) { //总页数大于10且当前页远离总页数(小于4)
            for (var i = 1; i <= 4 + 1; i++) { //显示1-5
                createPage(i);
            }
            //三个点...
            pageHtml += ddd;
            //三个点后面 生成最后一个页数
            createPage(total);

        } else if (page > total - 4) { //总页数大于10且当前页接近总页数(大于总页数-4)
            //第一页
            createPage(1);
            //三个点...
            pageHtml += ddd;
            //生成最后5个页数
            for (var i = total - 4; i <= total; i++) {
                createPage(i);
            }
        } else { //除开上面两个情况 当前页在中间
            //页数1
            createPage(1);
            //三个点...
            pageHtml += ddd;
            //生成当前页和 前跟后一个页数
            for (var i = page - 2; i <= page + 2; i++) {
                createPage(i);
            }
            //三个点...
            pageHtml += ddd;
            //最后一个页数
            createPage(total);
        }
    }

    if (page > 1 && total > 1) { // 上一页
        pageHtml += '<div class="previous" onclick="previous()">上一页</div>';
    } else {
        pageHtml += '<div class="previous">上一页</div>';
    }
    if (page < total && total > 1) { // 下一页
        pageHtml += '<div class="next" onclick="next()">下一页</div>';
    } else {
        pageHtml += '<div class="next">下一页</div>';
    }
    //赋值生成html
    $('.rb_bottom').html(pageHtml);
}
//上一页点击事件
function previous() {
    //获取当前页
    var page = $('.rb_bottom>.selected').text();
    if (page <= 1) {
        return;
    }
    makePage(total, page - 1);
}
//下一页点击事件
function next() {
    //获取当前页
    var page = $('.rb_bottom>.selected').text();
    if (page >= total) {
        return;
    }
    makePage(total, page * 1 + 1);
}
//直接点击页数事件
function pageClick(that) {
    var page = $(that).html();
    makePage(total, page * 1);
}