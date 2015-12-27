var KeyHandle = function (target) {

    document.body.addEventListener("keydown", function (e) {
        if (e.keyCode == 32) {  //space
            $('canvas').trigger('shoot');
        } else {
            target.keys[e.keyCode] = true;
        }

    });
    document.body.addEventListener("keyup", function (e) {
        target.keys[e.keyCode] = false;
    });


}

