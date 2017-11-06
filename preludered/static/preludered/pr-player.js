$.fn.animateRotate = function(from, to, duration, easing, complete)
{
    var args = $.speed(duration, easing, complete);
    var step = args.step;

    return this.each(function(i, e) {
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({deg: from}).animate({deg: to}, args);
    });
};


var player =
{
    circle : null,
    currentRotation : 0,
    currentTrackStartingRotation: 0,
    rotationSpaceBetweenTracks : 0,

    totalTracks : 13,
    currentTrack : 1,
    playlist : [],
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

        if(this.playlist[this.currentTrack] && this.playlist[this.currentTrack].playing())
        {
            this.stop();
        }

        if(track < this.currentTrack)
        {
           var tracksToSkip = (this.totalTracks - this.currentTrack) + track;
        } else {
            var tracksToSkip = track - this.currentTrack;
        }

        var moveTo = (this.rotationSpaceBetweenTracks * tracksToSkip) + this.currentTrackStartingRotation;

        this.circle.animateRotate(this.currentRotation, moveTo, 500, 'swing', function() {
            player.lockAnimation = 0;
        });

        this.currentRotation = moveTo;
        this.currentTrackStartingRotation = moveTo;
        this.currentTrack = track;

        if(this.playlist[track] && this.playlist[track].state() == 'loaded')
        {
            this.playlist[track].play();
        } else {
            var trackObj = this.loadTrack(track);
            trackObj.once("load", function() {
                this.play();
            });
        }
    },

    pause : function()
    {
        if(!this.playlist[this.currentTrack]) return false;

        if(!this.playlist[this.currentTrack].playing()) {
            $('.playerDirections > img').attr('src', '/static/img/player-directions-whenplaying.png');
            this.playlist[this.currentTrack].play();
        } else {
            $('.playerDirections > img').attr('src', '/static/img/player-directions-whenpaused.png');
            this.playlist[this.currentTrack].pause();
        }
    },

    stop : function()
    {
        this.playlist[this.currentTrack].stop();
    },

    getNextTrackNumber : function()
    {
        var next = this.currentTrack + 1;
        return (next > this.totalTracks) ? 1 : next;
    },

    playNextTrack : function()
    {
        this.stop();
        this.play(this.getNextTrackNumber());
    },

    loadNextTrack : function()
    {
        if(!this.playlist[this.getNextTrackNumber()])
        {
            this.loadTrack(this.getNextTrackNumber());
        }
    },

    loadTrack : function(track)
    {
        this.playlist[track] = new Howl({
            src : ['/static/preludered/music/' + track + '.mp3'],
            onplay: function() {
                requestAnimationFrame(player.step.bind(player));
            },
            onend: function() {
                player.playNextTrack();
            }
        });

        return this.playlist[track];
    },

    step: function() {
        var self = this;

        // Determine our current seek position.
        var currentTrack = this.playlist[this.currentTrack];

        var seek = currentTrack.seek() || 0;
        var percent = ((seek / currentTrack.duration()) || 0);
        var change = this.rotationSpaceBetweenTracks * percent;
        var rotation = this.currentTrackStartingRotation + change;
        this.currentRotation = rotation;
        if(!this.lockAnimation)
        {
            this.circle.css('transform', 'rotate(' + rotation + 'deg)');
        }

        // At 75% though the track, start loading the next one
        if(Math.floor(percent * 100) > 74)
        {
            this.loadNextTrack();
        }

        // If the song is still playing, continue stepping.
        if (currentTrack.playing())
        {
          requestAnimationFrame(self.step.bind(self));
        }
    },
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

    track = Math.floor((Math.random() * player.totalTracks) + 1);
    player.play(track);
});
