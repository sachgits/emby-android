define(["appSettings"],function(e){function t(e){var t=i,n=a;i=null,a=null,e?t&&t():n?n():MediaController.removeActivePlayer(o)}function n(){function e(){var e=n.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}var n=this;n.name=o,n.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?ApiClient.getItem(t,e.Ids.split(",")).then(function(e){return{Items:[e],TotalRecordCount:1}}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))},Events.on(p,"connect",function(){i?t(!0):MediaController.setActivePlayer(o,n.getCurrentTargetInfo()),n.lastPlayerData={}}),Events.on(p,"playbackstart",function(e,t){p.initializeCastPlayer();var s=n.getPlayerStateInternal(t);Events.trigger(n,"playbackstart",[s])}),Events.on(p,"playbackstop",function(e,t){var s=n.getPlayerStateInternal(t);Events.trigger(n,"playbackstop",[s]),n.lastPlayerData={}}),Events.on(p,"playbackprogress",function(e,t){var s=n.getPlayerStateInternal(t);Events.trigger(n,"positionchange",[s])}),Events.on(p,"volumechange",function(e,t){var s=n.getPlayerStateInternal(t);Events.trigger(n,"volumechange",[s])}),Events.on(p,"playstatechange",function(e,t){var s=n.getPlayerStateInternal(t);Events.trigger(n,"playstatechange",[s])}),n.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?n.playWithCommand(e,"PlayNow"):n.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,n.playWithCommand(e,"PlayNow")})})},n.playWithCommand=function(e,t){return e.items?void p.loadMedia(e,t):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(s){e.items=[s],n.playWithCommand(e,t)})},n.unpause=function(){p.sendMessage({options:{},command:"Unpause"})},n.pause=function(){p.sendMessage({options:{},command:"Pause"})},n.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){n.playWithCommand({items:[e]},"Shuffle")})},n.instantMix=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(e){n.playWithCommand({items:[e]},"InstantMix")})},n.canQueueMediaType=function(e){return"Audio"==e},n.queue=function(e){n.playWithCommand(e,"PlayLast")},n.queueNext=function(e){n.playWithCommand(e,"PlayNext")},n.stop=function(){p.sendMessage({options:{},command:"Stop"})},n.displayContent=function(e){p.sendMessage({options:e,command:"DisplayContent"})},n.mute=function(){p.sendMessage({options:{},command:"Mute"})},n.unMute=function(){n.setVolume(e()+2)},n.setRepeatMode=function(e){p.sendMessage({options:{RepeatMode:e},command:"SetRepeatMode"})},n.toggleMute=function(){var e=n.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?n.unMute():n.mute()},n.getTargets=function(){var e=[];return p.hasReceivers&&e.push(n.getCurrentTargetInfo()),Promise.resolve(e)},n.getCurrentTargetInfo=function(){var e=null;return p.session&&p.session.receiver&&p.session.receiver.friendlyName&&(e=p.session.receiver.friendlyName),{name:o,id:o,playerName:o,playableMediaTypes:["Audio","Video"],isLocalPlayer:!1,appName:o,deviceName:e,supportedCommands:["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"]}},n.seek=function(e){e=parseInt(e),e/=1e7,p.sendMessage({options:{position:e},command:"Seek"})},n.setAudioStreamIndex=function(e){p.sendMessage({options:{index:e},command:"SetAudioStreamIndex"})},n.setSubtitleStreamIndex=function(e){p.sendMessage({options:{index:e},command:"SetSubtitleStreamIndex"})},n.nextTrack=function(){p.sendMessage({options:{},command:"NextTrack"})},n.previousTrack=function(){p.sendMessage({options:{},command:"PreviousTrack"})},n.beginPlayerUpdates=function(){},n.endPlayerUpdates=function(){},n.volumeDown=function(){p.sendMessage({options:{},command:"VolumeDown"})},n.endSession=function(){n.stop(),setTimeout(function(){p.stopApp()},1e3)},n.volumeUp=function(){p.sendMessage({options:{},command:"VolumeUp"})},n.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),p.sendMessage({options:{volume:e},command:"SetVolume"})},n.getPlayerState=function(){var e=n.getPlayerStateInternal();return Promise.resolve(e)},n.lastPlayerData={},n.getPlayerStateInternal=function(e){return e=e||n.lastPlayerData,n.lastPlayerData=e,e},n.tryPair=function(){return new Promise(function(e,t){p.deviceState!=r.ACTIVE&&p.isInitialized?(i=e,a=t,p.launchApp()):(i=null,a=null,t())})}}function s(){p=new u;var e=new n;MediaController.registerPlayer(e),document.dispatchEvent(new CustomEvent("chromecastloaded",{detail:{player:e}}))}var i,a,o="Chromecast",r={IDLE:0,ACTIVE:1,WARNING:2,ERROR:3},c={IDLE:"IDLE",LOADING:"LOADING",LOADED:"LOADED",PLAYING:"PLAYING",PAUSED:"PAUSED",STOPPED:"STOPPED",SEEKING:"SEEKING",ERROR:"ERROR"},d="2D4B1DA3",l="urn:x-cast:com.connectsdk",u=function(){this.deviceState=r.IDLE,this.currentMediaSession=null,this.session=null,this.castPlayerState=c.IDLE,this.hasReceivers=!1,this.errorHandler=this.onError.bind(this),this.mediaStatusUpdateHandler=this.onMediaStatusUpdate.bind(this),this.initializeCastPlayer()};u.prototype.initializeCastPlayer=function(){var e=window.chrome;if(e){if(!e.cast||!e.cast.isAvailable)return void setTimeout(this.initializeCastPlayer.bind(this),1e3);var t=new e.cast.SessionRequest(d),n=new e.cast.ApiConfig(t,this.sessionListener.bind(this),this.receiverListener.bind(this),"origin_scoped");e.cast.initialize(n,this.onInitSuccess.bind(this),this.errorHandler)}},u.prototype.onInitSuccess=function(){this.isInitialized=!0},u.prototype.onError=function(){},u.prototype.sessionListener=function(e){this.session=e,this.session&&(this.session.media[0]&&this.onMediaDiscovered("activeSession",this.session.media[0]),this.onSessionConnected(e))},u.prototype.messageListener=function(e,t){if(t=JSON.parse(t),"playbackerror"==t.type){var n=t.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+n),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==t.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):t.type&&Events.trigger(this,t.type,[t.data])},u.prototype.receiverListener=function(e){this.hasReceivers="available"===e?!0:!1},u.prototype.sessionUpdateListener=function(e){e||(this.session=null,this.deviceState=r.IDLE,this.castPlayerState=c.IDLE,this.currentMediaSession=null,t(!1))},u.prototype.launchApp=function(){chrome.cast.requestSession(this.onRequestSessionSuccess.bind(this),this.onLaunchError.bind(this))},u.prototype.onRequestSessionSuccess=function(e){this.onSessionConnected(e)},u.prototype.onSessionConnected=function(e){this.session=e,this.deviceState=r.ACTIVE,this.session.addMessageListener(l,this.messageListener.bind(this)),this.session.addMediaListener(this.sessionMediaListener.bind(this)),this.session.addUpdateListener(this.sessionUpdateListener.bind(this)),Events.trigger(this,"connect"),this.sendMessage({options:{},command:"Identify"})},u.prototype.sessionMediaListener=function(e){this.currentMediaSession=e,this.currentMediaSession.addUpdateListener(this.mediaStatusUpdateHandler)},u.prototype.onLaunchError=function(){this.deviceState=r.ERROR,t(!1)},u.prototype.stopApp=function(){this.session&&this.session.stop(this.onStopAppSuccess.bind(this,"Session stopped"),this.errorHandler)},u.prototype.onStopAppSuccess=function(e){this.deviceState=r.IDLE,this.castPlayerState=c.IDLE,this.currentMediaSession=null},u.prototype.loadMedia=function(e,t){this.session&&(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),this.sendMessage({options:e,command:t}))},u.prototype.sendMessage=function(t){var n=this,s=null;p.session&&p.session.receiver&&p.session.receiver.friendlyName&&(s=p.session.receiver.friendlyName),t=$.extend(t,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),receiverName:s});var i=e.maxChromecastBitrate();i&&(t.maxBitrate=i),require(["chromecasthelpers"],function(e){e.getServerAddress(ApiClient).then(function(e){t.serverAddress=e,n.sendMessageInternal(t)})})},u.prototype.sendMessageInternal=function(e){e=JSON.stringify(e),this.session.sendMessage(l,e,this.onPlayCommandSuccess.bind(this),this.errorHandler)},u.prototype.onPlayCommandSuccess=function(){},u.prototype.onMediaDiscovered=function(e,t){this.currentMediaSession=t,"loadMedia"==e&&(this.castPlayerState=c.PLAYING),"activeSession"==e&&(this.castPlayerState=t.playerState),this.currentMediaSession.addUpdateListener(this.mediaStatusUpdateHandler)},u.prototype.onMediaStatusUpdate=function(e){0==e&&(this.castPlayerState=c.IDLE)},u.prototype.setReceiverVolume=function(e,t){this.currentMediaSession&&(e?this.session.setReceiverMuted(!0,this.mediaCommandSuccessCallback.bind(this),this.errorHandler):this.session.setReceiverVolumeLevel(t||1,this.mediaCommandSuccessCallback.bind(this),this.errorHandler))},u.prototype.mute=function(){this.setReceiverVolume(!0)},u.prototype.mediaCommandSuccessCallback=function(e){};var p,m=document.createElement("script");m.setAttribute("type","text/javascript"),m.onload=s,m.setAttribute("src","https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"),document.querySelector("head").appendChild(m)});