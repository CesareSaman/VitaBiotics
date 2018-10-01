var _items = [];
var counDownTimer;
var _passed = [];
var audios = [ new Audio('audio/select.wav'),
               new Audio('audio/winner.wav'),
               new Audio('audio/looser.wav'),
               new Audio('audio/countdown.mp3'),
               new Audio('audio/won.mp3'),
               new Audio('audio/gameover.wav') ];
$(document).ready(function(){
    $('.column').on('click touchend',function(){
        if($('.column.active').length <= 2){
            playSound(0);
            $(this).addClass('active');
        }else if($('.column.active').length > 2){
            return false;
        }
    });
});


function selectedItem(item_num,img_num){console.log('clickedJS');
    $.imgObj = $('#item'+item_num+' img[data_item_rel='+img_num+']');
    
    if($.imgObj.attr('data_item_rel') == $.imgObj.parent().attr('data_item_rel')){
        _passed.push(item_num);
        playSound(1);
        $.imgObj.css('opacity',1).siblings().remove();
        $('.stage#during .titleBox#titleBox'+(item_num)+' span').removeClass('lost').addClass('won');
        $('#curtain').css('right',((item_num+1)*33.33)+'%');
        if(item_num==3){
            end();
        }else{
            loop(item_num+1);
        }
    }else{
        playSound(2);
        $('.stage#during .titleBox#titleBox'+(item_num)+' span').addClass('lost');
    }
}

function random_unique_array(){
    while(_items.length < 3){
        var randomnumber = Math.floor(Math.random()*10) + 1;
        if(_items.indexOf(randomnumber) > -1) continue;
        _items[_items.length] = randomnumber;
    }
    return _items;
}

function start(){
    $('.column').not('.active').animate({opacity: 0.1});
    $('.column.active').each(function(e){
        _items.push($(this).attr('rel'));
        $('.stage#during .item#item'+(e+1)).attr('data_item_rel',$(this).attr('rel'));
        $('.stage#during .titleBox#titleBox'+(e+1)+' span').text($(this).find('img').attr('alt'));
    });
    setTimeout(function(){
        $('.stage#start').fadeOut(function(){
            $('.stage#during').fadeIn(function(){
                for (var o=0;o<_items.length;o++){
                    $('.stage#during .body .item#item'+(o+1)+' img[data_item_rel='+_items[o]+']').css('opacity',1);   
                }
            });
        });
    },1000);
}

function go(){
    $('body').append('<div id="curtain" style="position:fixed;width:100%;height:100%;z-index:999;right:0;top:0;bottom:0;"></div>');
    $('.stage#during .body .item img').removeAttr('style');
    $('#curtain').css('right','33%');
    loop(1);
    countDown(30);
}

function countDown(duration){
    var timer = duration, minutes, seconds;
    counDownTimer = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $('.timer').text(minutes + ":" + seconds);
        if(timer==8){
            playSound(3);
        }
        if (--timer < 0) {
            //timer = duration;
            end();
        }
    }, 1000);
}

function end(){
    clearInterval(counDownTimer);
    setTimeout(function(){
        $('.stage#during').fadeOut(function(){
            $('.stage#end').fadeIn(function(){
                if(_passed.length == 3){
                    playSound(4);
                    $('#winnergif').fadeIn();
                }else{
                    playSound(5);
                }
                $('#curtain').remove();
            });
        });    
    },3000);
}

function loop(number) {
    var products = document.querySelectorAll('.item#item'+number+' img');
    var currentProduct = 0;
    var productInterval = setInterval(function(){
        products[currentProduct].className = 'product';
        currentProduct = (currentProduct+1)%products.length;
        products[currentProduct].className = 'product showing';
    },500);
}

function playSound(_sound){
    //for (a = 0; a < audios.length; a++) {audios[a].pause();}
    audios[_sound].loop = false;
    audios[_sound].play();
}