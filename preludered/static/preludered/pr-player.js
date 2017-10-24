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


var nav =
{
    locations : {
        'prelude-red' : {
            'hover' : 'nav-prelude-red.png',
            'click' : function() {
                nav.load_page('/preludered/nav/prelude-red');
            }
        },
        'libretto' : {
            'hover' : 'nav-libretto.png',
            'click' : function() {
                nav.load_page('/preludered/nav/libretto');
            }
        },
        'notes' : {
            'hover' : 'nav-notes.png',
            'click' : function() {
                nav.load_page('/preludered/nav/notes');
            }
        },
        'credits' : {
            'hover' : 'nav-credits.png',
            'click' : function() {
                nav.load_page('/preludered/nav/credits');
            }
        },
        'music-videos' : {
            'hover' : 'nav-music-videos.png',
            'click' : function() {
                nav.load_page('/preludered/nav/music-videos');
            }
        }
    },

    init : function() {
        for (var key in this.locations)
        {
            if (this.locations.hasOwnProperty(key))
            {
                var loc = this.locations[key];

                // Preload image so its not fetched on each hover
                this.locations[key].hoverimg = new Image();
                this.locations[key].hoverimg.src = '/static/img/' + loc.hover;

                // Create hover listener
                $('.nav-' + key).hover(this.hover(loc),
                function() {
                    $('.nav > img').attr('src', '/static/img/nav.png');
                });

                // Create click listener
                $('.nav-' + key).click(this.click(loc))
            }
        }
        console.log(this.locations);
    },

    hover : function(loc)
    {
        return function(event)
        {
            $('.nav > img').attr('src', '/static/img/' + loc.hover);
        }
    },

    click : function(loc)
    {
        return function(event)
        {
            loc.click();
            return false;
        }
    },

    load_page : function(url)
    {
        $.get(url, function(data) {
            $(".columnLeftPage").html(data);
        });
    },

}

$(document).ready(function(){
    player.init();
    nav.init();
});
