var _items = [];
var _select = new Audio('audio/select.wav');
var _winner = new Audio('audio/winner.wav');
var _looser = new Audio('audio/looser.wav');
var _end = new Audio('audio/end.mp3');


$(document).ready(function(){
    $('.column').on('click',function(){
        if($('.column.active').length <= 2){
            playSound(_select);
            $(this).addClass('active');
        }else if($('.column.active').length > 2){
            return false;
        }
    });    
    $('.item#item1 img').on('click',function(){
        $(this).css('opacity',1).siblings().remove();
        if($(this).attr('data_item_rel') == $(this).parent().attr('data_item_rel')){
            playSound(_winner);
            $(this).parent().addClass('won');
        }else{
            playSound(_looser);
            $(this).parent().addClass('lost');
        }
        $('#curtain').css('right','66.66%');
        loop(2);
    });
    $('.item#item2 img').on('click',function(){
        $(this).css('opacity',1).siblings().remove();
        if($(this).attr('data_item_rel') == $(this).parent().attr('data_item_rel')){
            playSound(_winner);
            $(this).parent().addClass('won');
        }else{
            playSound(_looser);
            $(this).parent().addClass('lost');
        }
        $('#curtain').css('right','100%');
        loop(3);
    });
    $('.item#item3 img').on('click',function(){
        $(this).css('opacity',1).siblings().remove();
        if($(this).attr('data_item_rel') == $(this).parent().attr('data_item_rel')){
            playSound(_winner);
            $(this).parent().addClass('won');
        }else{
            playSound(_looser);
            $(this).parent().addClass('lost');
        }
        end();
    });
});

function random_unique_array(){
    while(_items.length < 3){
        var randomnumber = Math.floor(Math.random()*10) + 1;
        if(_items.indexOf(randomnumber) > -1) continue;
        _items[_items.length] = randomnumber;
    }
    return _items;
}

function go(){
    $('body').append('<div id="curtain" style="position:fixed;width:100%;height:100%;z-index:999;right:0;top:0;bottom:0;"></div>');
    $('.column').not('.active').animate({opacity: 0.1});
    $('.column.active').each(function(e){
        _items.push($(this).attr('rel'));
        $('.stage#during .item#item'+(e+1)).attr('data_item_rel',$(this).attr('rel'));
    });
    setTimeout(function(){
        $('.stage#start').fadeOut(function(){
            $('.stage#during').fadeIn(function(){
                for (var o=0;o<_items.length;o++){console.log(o);
                    $('.stage#during .body .item#item'+(o+1)+' img[data_item_rel='+_items[o]+']').css('opacity',1);   
                }
                setTimeout(function(){
                    $('.stage#during .body .item img').removeAttr('style');
                    $('#curtain').css('right','33%');
                    countDown(30);
                    loop(1);
                },3000);
            });
        });
    },3000);
}

function countDown(duration){
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        $('.timer').text(minutes + ":" + seconds);
        if (--timer < 0) {
            //timer = duration;
            end();
        }
    }, 1000);
}

function end(){
    setTimeout(function(){
        $('.stage#during').fadeOut(function(){
            $('.stage#end').fadeIn(function(){
                playSound(_end);
            });
        });    
    },1500);
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
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    _sound.play();
}