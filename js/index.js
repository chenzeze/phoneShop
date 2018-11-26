var getElem = function (selector) {
    return document.querySelector(selector);
}
var getAllElem = function (selector) {
    return document.querySelectorAll(selector);
}

var getCls = function (element) {
    return element.getAttribute("class");
}
var setCls = function (element, cls) {
    return element.setAttribute("class", cls);
}

// 先检查元素当前有没有要添加的cls，如果没有，再添加
var addCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1)
        setCls(element, baseCls + ' ' + cls);
}

// 先检查元素当前有没有要删除的cls，如果有，再删除
var delCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) != -1)
        // 将要删除的cls元素位置变成一个空格，然后全局修改将连续一个以上的空格变成一个空格
        setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g, ' '));
}


var screenAnimateElements = {
    '.screen-1': [
        '.screen-1_heading',
        '.screen-1_phone',
        '.screen-1_shadow',
    ],
    '.screen-2': [
        '.screen-2_heading',
        '.screen-2_sub_heading',
        '.screen-2_phone',
    ],
    '.screen-3': [
        '.screen-3_heading',
        '.screen-3_sub_heading',
        '.screen-3_phone',
        '.screen-3_squares',
    ],
    '.screen-4': [
        '.screen-4_heading',
        '.screen-4_sub_heading',
        '.screen-4_phone-1',
        '.screen-4_phone-2',
        '.screen-4_phone-3',
        '.screen-4_phone-4',

    ],
    '.screen-5': [
        '.screen-5_heading',
        '.screen-5_sub_heading',
        '.screen-5_pic',

    ]


}

/*第一步 页面加载完成后，所有动画设置_animate_init*/
function setScreenAnimateInit(screenCls) {
    var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];

    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute("class");
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substring(1) + '_animate_init');
    }
}

function PlayScreenAnimateDone(screenCls) {
    var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];

    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute("class");
        element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
    }
}


/*第四步 导航条滑动门实现*/
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline-item');


var switchNavItemActive = function (idx) {
    for (var i = 0; i < navItems.length; i++) {
        delCls(navItems[i], 'header__nav-item_active');
    }
    addCls(navItems[idx], 'header__nav-item_active');

    for (var i = 0; i < outLineItems.length; i++) {
        delCls(outLineItems[i], 'outline-item_active');
    }
    addCls(outLineItems[idx], 'outline-item_active');

}

/*第三步 导航条 & 大纲的双向出现*/
var setNavJump = function (i, lib) {
    var item = lib[i];
    item.onclick = function () {
        $('html,body').animate({
            scrollTop: i * 800
        }, 800);
        /*document.body.scrollTop=i*800;*/
    }
}

for (var i = 0; i < navItems.length; i++) {
    setNavJump(i, navItems);
}
for (var i = 0; i < outLineItems.length; i++) {
    setNavJump(i, outLineItems);
}

var navTip = getElem('.header__nav-tip');
navTip.style.left = '20px';
var setTip = function (idx, lib) {
    lib[idx].onmouseover = function () {
        navTip.style.left = (20 + idx * 110) + 'px';
    }
    var activeIdx = 0;

    lib[idx].onmouseout = function () {
        for (var i = 0; i < lib.length; i++) {
            if (getCls(lib[i]).indexOf('header__nav-item_active') != -1) {
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = (20 + activeIdx * 110) + 'px';
    }
}
for (var i = 0; i < navItems.length - 1; i++) {
    setTip(i, navItems);
}

/*第二步 页面滚动到哪个屏幕，哪个屏幕就播放动画 & 导航条和大纲的出现*/
window.onscroll = function () {

    var top = document.body.scrollTop;

    if (top > 80) {
        addCls(getElem('.header'), 'header_status_black');
        addCls(getElem('.outline'), 'outline_status_in');
    } else {
        delCls(getElem('.header'), 'header_status_black');
        delCls(getElem('.outline'), 'outline_status_in');
        switchNavItemActive(0);
        navTip.style.left = (20 + 0 * 110) + 'px';
    }

    if (top > 1) {
        PlayScreenAnimateDone('.screen-1');
    }
    if (top > 800 * 1 - 120) {
        PlayScreenAnimateDone('.screen-2');
        switchNavItemActive(1);
        navTip.style.left = (20 + 1 * 110) + 'px';
    }
    if (top > 800 * 2 - 120) {
        PlayScreenAnimateDone('.screen-3');
        switchNavItemActive(2);
        navTip.style.left = (20 + 2 * 110) + 'px';
    }
    if (top > 800 * 3 - 120) {
        PlayScreenAnimateDone('.screen-4');
        switchNavItemActive(3);
        navTip.style.left = (20 + 3 * 110) + 'px';
    }
    if (top > 800 * 4 - 120) {
        PlayScreenAnimateDone('.screen-5');
        switchNavItemActive(4);
        navTip.style.left = (20 + 4 * 110) + 'px';
    }

}

/*第五步 让第一屏init样式一开始就在css中添加，然后延时设置init-done动作*/
window.onload = function () {
    $('html,body').animate({
        scrollTop: 0
    }, 500);
    for (k in screenAnimateElements) {
        if (k == ".screen-1") continue;
        setScreenAnimateInit(k);
    }
}


setTimeout(function () {
    PlayScreenAnimateDone('.screen-1');
}, 600);