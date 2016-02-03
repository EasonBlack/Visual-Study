var KeyHandle = function (target) {

    document.body.addEventListener("keydown", function (e) {
        var _direction = '';
        var current = target.getStart();
        var _cloneCurrent = $.extend({},current);
        switch(e.keyCode) {
            case 39 :
                _direction = 'r';
                break;
            case 37:
                _direction = 'l';
                break;
            case 38 :
                _direction = 'u';
                break;
            case 40:
                _direction = 'd';
                break;
            default:
                return ;
                break;
        }
        if(target.direction != _direction) {
            target.direction = _direction;
            _cloneCurrent.d = _direction;
            target.stopBoxes.push(_cloneCurrent);
        } else {
            return ;
        }

    });

}
