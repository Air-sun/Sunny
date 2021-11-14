$(function () {
    // 点击第一部分进入p1页
    $('.home-box1').click(function () {
        $('.home').fadeOut();
        $('.p1').fadeIn();
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
    // 点击选择图片
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
    // 点击上传图片
    $('.w2-sure').click(function () {
        if ($('.p1-w2 .w2-camera #files')[0].files.length <= 0) {
            return alert('请选择文件!');
        }
        $('.p1-w2 .tab-item .w2-camera').hide();
        //合成图片的js代码
        html2canvas(document.querySelector('.tab-item'), {
            useCORS: true,
            //图片的宽高
            width: 501,
            height: 791
        }).then(canvas => {
            //合成图片放到img中
            let src = canvas.toDataURL();
            $('.p1-w3 .tab-item img').attr('src', src);
        });
        $('.p1-w2').fadeOut().next().fadeIn();
    })
    // 点击进入排行榜
    $('.w3-rank').click(function () {
        $('.p1-w3').fadeOut().next().fadeIn();
        $('.w4-layer').fadeIn(1500);
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
    $('.tab-img').on('touchstart', function (e) {
        var X = e.targetTouches[0].pageX;
        var Y = e.targetTouches[0].pageY;
        var startLeft = $(this).children().offset().left;
        var startTop = $(this).children().offset().top;
        $('.tab-img img').on('touchmove', function (e) {
            var moveX = e.targetTouches[0].pageX - X;
            var moveY = e.targetTouches[0].pageY - Y;
            $(this).offset({
                left: startLeft + moveX,
                top: startTop + moveY
            })
        })
    })
    // 点击第二部分进入p2页
    $('.home-box2').click(function () {
        $('.home').fadeOut();
        $('.p2').fadeIn();
        $('.p2-layer').fadeIn(1000);
    })
    // 点击返回首页
    $('.p2-w1 .p2-return').click(function () {
        $('.home').fadeIn();
        $('.p2').fadeOut();
    })
    //撕标签
    $('.p2-w1 .tag>div').on('touchstart', function (e) {
        var that = $(this).children('.active');
        var startX = e.targetTouches[0].pageX;
        $(document).on('touchmove', function (e) {
            //获取滑动屏幕时的X,Y
            var endX = e.originalEvent.changedTouches[0].pageX;
            //获取滑动距离
            var distanceX = endX - startX;
            if (distanceX < 0 && that.index() > 0) {
                that.fadeOut();
                that.prev().addClass('active');
            } else if (that.index() == 0) {
                return;
            }
        })
    })

    // 点击返回p2-w1
    $('.p2-w2 .p2-return').click(function () {
        $('.p2-w1').fadeIn();
        $('.p2-w2').fadeOut();
    })
    // 点击关闭弹层
    $('.p2-layer .close,.p2-layer .p2-layer-btn').click(function () {
        $('.p2-layer').fadeOut();
    })
    // 点击确定进入下一页,随机出现图片
    $('.p2-w1 .p2-sure').click(function () {
        $('.p2-w1').fadeOut();
        $('.p2-w2').fadeIn();
        var index = Math.floor(Math.random() * 6);
        $('.p2-w2 .p2-img li').eq(index).show().siblings().hide();
        $('.p2-w2-layer').fadeIn();
       
    })
    // 点击关闭弹层
    $('.p2-w2-layer .close').click(function () {
        $('.p2-w2-layer').fadeOut();
    })
    // 点击显示弹层
    $('.p2-share .pay').click(function () {
        $('.p2-w2-layer').fadeIn();
    })
    // 点击进入下一页
    $('.p2-share .find').click(function () {
        $('.p2-w2').fadeOut();
        $('.p2-w3').fadeIn();
    })
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
    var map = new BMapGL.Map("allmap");    // 创建Map实例
    map.centerAndZoom('邵阳市', 16); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    map.setHeading(64.5);
    map.setTilt(0);
    var local = new BMapGL.LocalSearch(map, {
        renderOptions: { map: map }
    });
    $('.w3-search').click(function () {
        if ($('#province').val() == '省份') {
            layer.msg('请选择省份 ', {
                area: ["300px", '100px']
            })
            return false;
        } else if ($('#city').val() == '城市') {
            layer.msg('请选择市县', {
                area: ["300px", '100px']
            })
            return false;
        } else if ($('#town').val() == '地区') {
            layer.msg('请选择地区', {
                area: ["300px", '100px']
            })
            return false;
        }
        var site = $('#province').val() + $('#city').val() + $('#town').val() + $('#inp').val();
        local.search(site);
    })
    //返回
    $('.p2-w3 .p2-return').click(function(){
        $('.p2-w3 ').fadeOut();
        $('.p2-w2').fadeIn();
        var index = Math.floor(Math.random() * 6);
        $('.p2-w2 .p2-img li').eq(index).show().siblings().hide();
        $('.p2-w2-layer').fadeIn();
    })
})