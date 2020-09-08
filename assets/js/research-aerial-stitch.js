$(document).ready(function() {

    function make_transform(affine, canvas_px, img_px) {
        // convert a python affine.Affine transform to
        // a css transform
        var _scale = img_px / canvas_px;
        var _a = affine[0] * _scale;  // scaleX
        var _b = -affine[1] * _scale;  // skewY
        var _c = affine[3] * _scale;  // skewX
        var _d = -affine[4] * _scale;  // scaleY
        var _tx = affine[2] / canvas_px * 100;  // translateX
        var _ty = - affine[5] / canvas_px * 100;  // translateY
        return (
            "translate(" + _tx + "%," + _ty + "%) " +
            "matrix(" + _a + "," + _b + "," + _c + "," + _d + ",0,0) "
        );
    };
    function update_transform(i) {
        const canvas_px = 1600;
        const img_px = 750;
        var step = data[i]["step"], affines = data[i]["affines"];
        $("#research-aerial-stitch-text").text("Step: " + step);
        $("#research-aerial-stitch-test0").css(
            "transform", make_transform(affines[0], canvas_px, img_px));
        $("#research-aerial-stitch-test1").css(
            "transform", make_transform(affines[1], canvas_px, img_px));
        $("#research-aerial-stitch-test2").css(
            "transform", make_transform(affines[2], canvas_px, img_px));
        $("#research-aerial-stitch-test3").css(
            "transform", make_transform(affines[3], canvas_px, img_px));
    };

    // initialize
    var i = 0;
    update_transform(i);

    // update over time
    setInterval(function() {
        i = (i + 1) % data.length;
        update_transform(i);
    }, 1000);  // every 1.5 second(s)

});