$(function () {
    // 点击第一部分进入p1页
    $('.home-box1').click(function () {
        $('.home').fadeOut().next().fadeIn();
        $('.p1-layer').fadeIn(1000);
    })
    //点击关闭弹层
    $('.p1-layer .close').click(function () {
        $('.p1-layer').fadeOut();
    })
    // 点击说明弹出弹层
    $('.p1 .p1-explain').click(function () {
        $('.p1-layer').fadeIn(1000);
    })
    // 点击返回首页
    $('.p1-return').click(function () {
        $('.home').fadeIn().next().fadeOut();
    })
    // 点击进入图片上传页
    $('.p1-btn').click(function () {
        $('.p1-w1').fadeOut();
        $('.p1-w2').fadeIn();
    })
    // 点击切换样式
    $('.p1-w2 .tab li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.p1-w2 .tab-txt li').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.p1-w3 .tab-txt li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    })
    // 点击上传图片
    $('.p1-w2 .w2-camera #files').change(function () {
        var fd = new FormData();
        fd.append('avatar', $(this)[0].files[0]);
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3006/api/upload/avatar',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status == 200) {
                    $('.tab-img img').attr('src', 'http://www.liulongbin.top:3006' + res.url);


                } else {
                    console.log("添加失败!");
                }
            }
        })
    })
    // 点击进入保存图片页
    $('.w2-sure').click(function () {
        if ($('.p1-w2 .w2-camera #files')[0].files.length <= 0) {
            return alert('请选择文件!');
        }
        $('.p1-w2').fadeOut().next().fadeIn();
    })
    // 点击进入排行榜
    $('.w3-rank').click(function () {
        $('.p1-w3').fadeOut().next().fadeIn();
        $('.w4-layer').fadeIn(3000);
    })
    // 点击关闭弹层
    $('.w4-layer .close').click(function () {
        $('.w4-layer').fadeOut();
    })
    // 点击返回保存图片页
    $('.w4-return').click(function () {
        $('.p1-w3').fadeIn().next().fadeOut();
    })
    // 图片拖拽
    $('.tab-img').on('touchstart', function () {
        $('.tab-img img').on('touchmove', function () {
            console.log($(this).position());
        })
    })
})