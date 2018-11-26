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
    ]

}


function setScreenAnimate(screenCls) {
    // 获取当前屏元素
    var screen = document.querySelector(screenCls);
    // 获取当前屏需要设置动画的元素
    var animateElements = screenAnimateElements[screenCls];

    // 设置Init状态了吗？
    var isSetAnimateClass = false;
    // 设置done状态了吗？
    var isAnimateDone = false;

    // 添加点击屏幕事件 屏幕内元素动画状态循环 init->done->init
    screen.onclick = function () {
        // 初始化样式,增加init
        if (isSetAnimateClass === false) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");
                element.setAttribute('class', baseCls + ' ' + animateElements[i].substring(1) + '_animate_init');
            }
            isSetAnimateClass = true;
            return;
        }

        // 切换元素状态 init => done
        if (isAnimateDone === false) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");
                element.setAttribute('class', baseCls.replace('_animate_init', '_animate_done'));
            }
            isAnimateDone = true;
            return;

        }

        // 切换元素状态 done => init
        if (isAnimateDone === true) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute("class");
                element.setAttribute('class', baseCls.replace('_animate_done', '_animate_init'));
            }
            isAnimateDone = false;
            return;

        }
    }
}
/*setScreenAnimate('.screen-1');
    setScreenAnimate('.screen-2');*/
for (k in screenAnimateElements) {
    setScreenAnimate(k);
}