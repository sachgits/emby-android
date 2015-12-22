!function(){function e(e){function r(){Events.trigger(window.AudioRenderer.Current,"ended")}function n(){Events.trigger(window.AudioRenderer.Current,"timeupdate")}function t(){Events.trigger(window.AudioRenderer.Current,"playing")}function i(){Events.trigger(window.AudioRenderer.Current,"pause")}function o(){var e=this.error?this.error.code:"";Logger.log("Media element error code: "+e),Events.trigger(window.AudioRenderer.Current,"error")}function u(e,o){var u=o.duration||0,a=o.progress||0,d=AudioRenderer.Current.playerState;return d.duration=u,d.currentTime=a,d.paused=3==o.state||"paused"==e,d.volume=0,"positionchange"==e?void n():(Logger.log("eventName: "+e+". position: "+a),void("playbackstop"==e?r():"paused"==e?i():"unpaused"==e?t():"playing"==e&&t()))}function a(e){if(e)if("next"===e.type)MediaPlayer.nextTrack();else if("previous"===e.type)MediaPlayer.previousTrack();else if(4==e.state||6==e.state)u("playbackstop",e);else{var r="positionchange";u(r,e)}}function d(){o()}var s=this;window.AudioRenderer.Current=s,s.enableProgressReporting="audio"==e.type,s.playerState={},s.currentTime=function(e){return null!=e?void window.audioplayer.seekto(function(){Logger.log("set currentTime succeeded!")},function(){Logger.log("set currentTime failed!")},e/1e3):s.playerState.currentTime},s.duration=function(){return 1},s.stop=function(){window.audioplayer.stop(function(e){Logger.log("Stop succeeded!"),u("playbackstop",e)},function(){Logger.log("Stop failed!")})},s.pause=function(){window.audioplayer.pause(function(e){Logger.log("Pause succeeded!"),u("sepaused",e)},function(){Logger.log("Pause failed!")})},s.unpause=function(){window.audioplayer.pause(function(e){Logger.log("Unpause succeeded!"),u("playing",e)},function(){Logger.log("Unpause failed!")})},s.volume=function(e){return null==e?s.playerState.volume:void 0},s.setCurrentSrc=function(r,n){if(r){var t=r.url,i=t.indexOf("#t="),o=0;if(-1!=i&&(o=t.substring(i+3),o=1e3*parseFloat(o),t=t.split("#")[0]),"audio"==e.type){var d=n.ArtistItems&&n.ArtistItems.length?n.ArtistItems[0].Name:null,s={};n.Name&&(s.title=n.Name),d&&(s.artist=d),n.Overview&&(s.description=n.Overview),e.poster&&(s.image={url:e.poster},s.imageThumbnail={url:e.poster}),window.audioplayer.playstream(a,function(){Logger.log("playstream failed!")},{ios:t},s)}AudioRenderer.Current.playerState.currentSrc=t,u("playing",{})}},s.currentSrc=function(){return s.playerState.currentSrc},s.paused=function(){return s.playerState.paused},s.cleanup=function(){s.playerState={}},s.init=function(){return new Promise(function(e){window.audioplayer.configure(a,d),setTimeout(e,500)})}}window.AudioRenderer=function(r){return r=r||{},r.type="audio",new e(r)}}();