$(document).ready(function() {

    function make_transform(a, b, c, d, e, f, canvas_px, img_px) {
        var scale = 100 / canvas_px;
        var a_ = scale * a;
        var b_ = scale * b;
        var c_ = scale * c;
        var d_ = - scale * d;
        var e_ = - scale * e;
        var f_ = - scale * f;
        var s = Math.round(
            Math.sqrt(a_ * a_ + b_ * b_)
            * 100) / 100;
        var r = Math.round(Math.atan2(-b_, a_) / Math.PI * 180);
        var x_pct = Math.round(c_ * 100) / 100;
        var y_pct = Math.round(f_ * 100) / 100;
        // var s = 0.5;
        // var r = 45;
        // var x_pct = 10;
        // var y_pct = 10;
        return (
            "scale(" + s + "," + s + ") " +
            "rotate(" + r + "deg) " +
            "translate(" + x_pct + "%," + y_pct + "%) "
        );
    };

    const canvas_px = 1600;
    const img_px = 750;

    var a = 0.9376322031021118,
        b = -0.46520400047302246,
        c = 576.8189697265625,
        d = -0.46520400047302246,
        e = -0.9376322031021118,
        f = -210.5811767578125;

    // var a = 1,
    //     b = 0,
    //     c = 25,
    //     d = 0,
    //     e = -1,
    //     f = -25;

    var trans = make_transform(a, b, c, d, e, f, canvas_px, img_px);
    $('#research-aerial-stitch-test0').css('transform', trans);

    var a = 0.8238189220428467,
        b = 0.6449483633041382,
        c = 260.02374267578125,
        d = 0.6449483633041382,
        e = -0.8238189220428467,
        f = -776.68896484375;
    
    var trans = make_transform(a, b, c, d, e, f, canvas_px, img_px);
    $('#research-aerial-stitch-test1').css('transform', trans);
    
    var a = 0.7964217066764832,
        b = -0.6778961420059204,
        c = 797.0704345703125,
        d = -0.6778961420059204,
        e = -0.7964217066764832,
        f = -199.27191162109375;
    
    var trans = make_transform(a, b, c, d, e, f, canvas_px, img_px);
    $('#research-aerial-stitch-test2').css('transform', trans);
    
    var a = 1.0456798076629639,
        b = 0.03244450315833092,
        c = 377.2466735839844,
        d = 0.03244450315833092,
        e = -1.0456798076629639,
        f = -503.6390686035156;

    var trans = make_transform(a, b, c, d, e, f, canvas_px, img_px);
    $('#research-aerial-stitch-test3').css('transform', trans);

});