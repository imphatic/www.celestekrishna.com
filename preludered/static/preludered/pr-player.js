var curDeg = 0;
$.fn.animateRotate = function(angle, duration, easing, complete)
{
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: curDeg}).animate({deg: angle}, args);
        curDeg = angle;
    });

};


var rotation = 0;
function rotate()
{
    rotation -= 20;
    $('#playerCircle').animateRotate(rotation, 500, 'swing');
    return false;
}

var player =
{
    circle : null,
    currentRotation : 0,
    rotationSpaceBetweenTracks : 0,

    totalTracks : 13,
    currentTrack : 1,
    lockAnimation : 0,

    init : function()
    {
        this.circle = $('#playerCircle');
        this.rotationSpaceBetweenTracks = (360/this.totalTracks) * -1;
    },

    play : function(track)
    {
        if(this.lockAnimation) return;
        this.lockAnimation = 1;

        if(track < this.currentTrack)
        {
           var tracksToSkip = (this.totalTracks - this.currentTrack) + track;
        } else {
            var tracksToSkip = track - this.currentTrack;
        }


        var moveTo = (this.rotationSpaceBetweenTracks * tracksToSkip) + this.currentRotation;
        this.currentRotation = moveTo;

        this.circle.animateRotate(moveTo, 500, 'swing', function() {
            player.lockAnimation = 0;
        });

        this.currentTrack = track;
        console.log('play track: ' + track, 'spaceBetweenTracks: ' + this.rotationSpaceBetweenTracks, 'moveTo:' + moveTo);
    }
};


$(document).ready(function(){
    player.init();
});
