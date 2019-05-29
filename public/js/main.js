$(document).ready(function() {
     //player on hover function

     var pPre = '/static/img/player_';
     var mapHoverImg = new Array();

     mapHoverImg[0] = pPre + 'bethelove.png';
     mapHoverImg[1] = pPre + 'whyiwrite.png';
     mapHoverImg[2] = pPre + 'classic.png';
     mapHoverImg[3] = pPre + 'cellphone.png';
     mapHoverImg[4] = pPre + 'amy.png';
     mapHoverImg[5] = pPre + '2ways.png';
     mapHoverImg[6] = pPre + 'whiplash.png';
     mapHoverImg[7] = pPre + 'notyourboyfriend.png';
     mapHoverImg[8] = pPre + 'veryfunnymovie.png';
     mapHoverImg[9] = pPre + 'morelives.png';
     mapHoverImg[10] = pPre + 'callupthedevil.png';
     mapHoverImg[11] = pPre + 'sailme.png';
     mapHoverImg[12] = pPre + 'subway.png';

     function playerImgSwap() {
        var playerMapId = document.getElementById('playerMap');
        var areaElement = playerMapId.getElementsByTagName('area');

         for (e = 0; e < areaElement.length; e++) {
             areaElement[e].id = 'player' + e;

             areaElement[e].onmouseover = function() {
              document.getElementById('playerCircle').src = mapHoverImg[this.id.split('player')[1]];
              }
             //areaElement[e].addEventListener("click", function(){ 
               // document.getElementById('playerCircle').src = mapHoverImg[this.id.split('player')[1]];
              //});
             areaElement[e].onmouseout = function() {
              document.getElementById('playerCircle').src = '/static/img/player-circle.png';
             }
         }
         
     }

     if (window.addEventListener) {
         window.addEventListener('load', playerImgSwap, false);
     } else {
         if (window.attachEvent) {
             window.attachEvent('onload', playerImgSwap);
         }
     }

     //preload on hover img       

     var mapHoverImgPre = [];

     function mapHoverImgPreload() {
         for (i = 0; i < arguments.length; i++) {

             mapHoverImgPre[mapHoverImgPre.length] = new Image();

             mapHoverImgPre[mapHoverImgPre.length - 1].src = arguments[i];

         }
     }

     mapHoverImgPreload('/static/img/player_cellphone.png', '/static/img/player_classic.png', '/static/img/player_bethelove.png', '/static/img/player_whyiwrite.png', '/static/img/player_amy.png', '/static/img/player_2ways.png', '/static/img/player_whiplash.png', '/static/img/player_notyourboyfriend.png', '/static/img/player_veryfunnymovie.png', '/static/img/player_morelives.png', '/static/img/player_callupthedevil.png', '/static/img/player_sailme.png', '/static/img/player_subway.png');
     


     // url hashes
     $('.nav-prelude-red').click(function(event) {
         event.preventDefault();
         history.replaceState({}, document.title, ".");
     });
     $('.nav-libretto').click(function(event) {
         event.preventDefault();
         window.location.hash = '#libretto';
     });
     $('.nav-notes').click(function(event) {
         event.preventDefault();
         window.location.hash = '#notes';
     });
     $('.nav-credits').click(function(event) {
         event.preventDefault();
         window.location.hash = '#credits';
     });
     $('.nav-music-videos').click(function(event) {
         event.preventDefault();
         location.hash = "#" + this.getAttribute('href').substr(1);
     });
     $('.nav-bts').click(function(event) {
         event.preventDefault();
         window.location.hash = '#bts';
     });
     $('.nav-whats-in-prelude-red').click(function(event) {
         event.preventDefault();
         window.location.hash = '#whatsinpreludered';
     });

 });