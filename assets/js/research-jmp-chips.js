$(document).ready(function() {
    var i = 0;
    $('#research-jmp-chips-nav').click(function() {
        i = (i + 1) % 10;
        $('#research-jmp-chips-img').attr('src', '/assets/data/research-jmp-chips/img'+ i + '.png')
        $('#research-jmp-chips-pred').attr('src', '/assets/data/research-jmp-chips/pred' + i + '.png')
    });
});