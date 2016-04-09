define(["libraryBrowser","jQuery"],function(e,t){function a(e){return ApiClient.getUserViews({},e).then(function(e){for(var a=e.Items,i=[],r=0,n=a.length;n>r;r++){var s=a[r];if(!(AppInfo.isNativeApp&&browserInfo.safari&&"livetv"==s.CollectionType||(i.push(s),"livetv"!=s.CollectionType))){var l=t.extend({},s);l.Name=Globalize.translate("ButtonGuide"),l.ImageTags={},l.icon="dvr",l.url="livetv.html?tab=1",l.onclick="LibraryBrowser.showTab('livetv.html', 1);event.preventDefault();event.stopPropagation();return false;",i.push(l);var o=t.extend({},s);o.Name=Globalize.translate("ButtonRecordedTv"),o.ImageTags={},o.icon="video-library",o.url="livetv.html?tab=3",o.onclick="LibraryBrowser.showTab('livetv.html', 3);event.preventDefault();event.stopPropagation();return false;",i.push(o)}}return i})}function i(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function r(){return i()?"overflowBackdrop":"backdrop"}function n(){return i()?"overflowPortrait":"portrait"}function s(){return i()?"overflowSquare":"square"}function l(t){for(var a="",i=0,r=t.length;r>i;i++){var n,s=t[i],l="rgba(82, 181, 75, 0.9)";switch(s.CollectionType){case"movies":n="local-movies",l="rgba(176, 94, 81, 0.9)";break;case"music":n="library-music",l="rgba(217, 145, 67, 0.9)";break;case"photos":n="photo",l="rgba(127, 0, 0, 0.9)";break;case"livetv":n="live-tv",l="rgba(217, 145, 67, 0.9)";break;case"tvshows":n="live-tv",l="rgba(77, 88, 164, 0.9)";break;case"games":n="folder",l="rgba(183, 202, 72, 0.9)";break;case"trailers":n="local-movies",l="rgba(176, 94, 81, 0.9)";break;case"homevideos":n="video-library",l="rgba(110, 52, 32, 0.9)";break;case"musicvideos":n="video-library",l="rgba(143, 54, 168, 0.9)";break;case"books":n="folder";break;case"channels":n="folder",l="rgba(51, 136, 204, 0.9)";break;case"playlists":n="folder";break;default:n="folder"}var o="card smallBackdropCard buttonCard";s.CollectionType&&(o+=" "+s.CollectionType+"buttonCard");var d=s.url||e.getHref(s),c=s.onclick?' onclick="'+s.onclick+'"':"";n=s.icon||n,a+="<a"+c+' data-itemid="'+s.Id+'" class="'+o+'" href="'+d+'">',a+='<div class="cardBox" style="background-color:'+l+';margin:4px;border-radius:4px;">',a+="<div class='cardText' style='padding:8px 10px;color:#fff;'>",a+='<iron-icon icon="'+n+'"></iron-icon>',a+='<span style="margin-left:.7em;">'+s.Name+"</span>",a+="</div>",a+="</div>",a+="</a>"}return a}function o(e,t,i){return a(t).then(function(t){var a="<br/>";i&&(a+='<h1 class="listHeader">'+Globalize.translate("HeaderMyMedia")+"</h1>"),a+="<div>",a+=l(t),a+="</div>",e.innerHTML=a,y(e)})}function d(t,a){var i=AppInfo.hasLowImageBandwidth?16:20,r={Limit:i,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+a.Id+"/Items/Latest",r)).then(function(a){var i="",r=!1;a.length&&(i+="<div>",i+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestMedia")+"</h1>",i+="</div>",i+='<div class="itemsContainer">',i+=e.getPosterViewHtml({items:a,preferThumb:!0,shape:"backdrop",showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,cardLayout:r,showTitle:r,showYear:r,showDetailsMenu:!0,context:"home"}),i+="</div>"),t.innerHTML=i,ImageLoader.lazyChildren(t),e.createCardMenus(t)})}function c(t,a){var r={Limit:12,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",IncludeItemTypes:"Movie"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+a.Id+"/Items/Latest",r)).then(function(a){var r="",s=i();a.length&&(r+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestMovies")+"</h1>",r+=s?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',r+=e.getPosterViewHtml({items:a,shape:n(),showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,context:"home",centerText:!0,overlayPlayButton:!0}),r+="</div>"),t.innerHTML=r,ImageLoader.lazyChildren(t),e.createCardMenus(t)})}function m(t,a){var n={Limit:12,Fields:"PrimaryImageAspectRatio,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Thumb",IncludeItemTypes:"Episode"};return ApiClient.getJSON(ApiClient.getUrl("Users/"+a.Id+"/Items/Latest",n)).then(function(a){var n="",s=i();a.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestEpisodes")+"</h1>",n+=s?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=e.getPosterViewHtml({items:a,preferThumb:!0,shape:r(),showUnplayedIndicator:!1,showChildCountIndicator:!0,lazy:!0,context:"home",overlayPlayButton:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e.createCardMenus(t)})}function h(a,i){var r=t(window).width(),n={Limit:r>=2400?10:r>=1600?10:r>=1440?8:r>=800?7:6,Fields:"PrimaryImageAspectRatio,SyncInfo",Filters:"IsUnplayed",UserId:i};return ApiClient.getJSON(ApiClient.getUrl("Channels/Items/Latest",n)).then(function(t){var i="";t.Items.length&&(i+='<h1 class="listHeader">'+Globalize.translate("HeaderLatestChannelMedia")+"</h1>",i+='<div class="itemsContainer">',i+=e.getPosterViewHtml({items:t.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}),i+="</div>"),a.innerHTML=i,ImageLoader.lazyChildren(a),e.createCardMenus(a)})}function v(r,n,s,o,d,c){return a(n.Id).then(function(a){var n="";if(n+=d?'<div class="hiddenSectionOnMobile">':"<div>",a.length){var o=t(window).width();n+="<div>",n+='<h1 class="listHeader">'+Globalize.translate("HeaderMyMedia")+"</h1>",n+="</div>";var m=i()&&browserInfo.safari&&o>800;n+=m?'<div class="hiddenScrollX itemsContainer homeTopViews">':'<div class="itemsContainer homeTopViews">',n+=e.getPosterViewHtml({items:a,shape:m?"overflowBackdrop":s,showTitle:c,centerText:!0,lazy:!0,autoThumb:!0,transition:!1}),n+="</div>"}n+="</div>",d&&(n+='<div class="hiddenSectionOnNonMobile" style="margin-top:1em;">',n+=l(a),n+="</div>"),r.innerHTML=n,ImageLoader.lazyChildren(r),e.createCardMenus(r,{showDetailsMenu:!1}),y(r)})}function u(a,n){var s=t(window).width(),l={SortBy:"DatePlayed",SortOrder:"Descending",MediaTypes:"Video",Filters:"IsResumable",Limit:s>=1920?8:s>=1600?8:s>=1200?9:6,Recursive:!0,Fields:"PrimaryImageAspectRatio,SyncInfo",CollapseBoxSetItems:!1,ExcludeLocationTypes:"Virtual",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};return ApiClient.getItems(n,l).then(function(t){var n="";t.Items.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderResume")+"</h1>",n+=i()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=e.getPosterViewHtml({items:t.Items,preferThumb:!0,shape:r(),overlayText:!1,showTitle:!0,showParentTitle:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0,context:"home",centerText:!0}),n+="</div>"),a.innerHTML=n,ImageLoader.lazyChildren(a),e.createCardMenus(a)})}function p(t,a){var n={Limit:20,Fields:"PrimaryImageAspectRatio,SeriesInfo,DateCreated,SyncInfo",UserId:a,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"};ApiClient.getNextUpEpisodes(n).then(function(a){var n="";a.Items.length&&(n+='<h1 class="listHeader">'+Globalize.translate("HeaderNextUp")+"</h1>",n+=i()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=e.getPosterViewHtml({items:a.Items,preferThumb:!0,shape:r(),overlayText:!1,showTitle:!0,showParentTitle:!0,lazy:!0,overlayPlayButton:!0,context:"home",centerText:!0}),n+="</div>"),t.innerHTML=n,ImageLoader.lazyChildren(t),e.createCardMenus(t)})}function y(e){t("a",e).on("click",function(){var e=this;this.classList.contains("card")||(e=t(this).parents(".card")[0]);var a=t(".cardText",e),i=a.text();LibraryMenu.setTitle(i)})}function g(e,a,i){return i=t.extend(i||{},{UserId:a,SupportsLatestItems:!0}),ApiClient.getJSON(ApiClient.getUrl("Channels",i)).then(function(t){var a=t.Items,i=a.map(function(e){return'<div id="channel'+e.Id+'"></div>'}).join("");e.innerHTML=i;for(var r=0,n=a.length;n>r;r++){var s=a[r];I(e,s,r)}})}function I(a,i){var r=t(window).width(),n={Limit:r>=1600?10:r>=1440?5:r>=800?6:6,Fields:"PrimaryImageAspectRatio,SyncInfo",Filters:"IsUnplayed",UserId:Dashboard.getCurrentUserId(),ChannelIds:i.Id};ApiClient.getJSON(ApiClient.getUrl("Channels/Items/Latest",n)).then(function(t){var r="";if(t.Items.length){r+='<div class="homePageSection">',r+="<div>";var n=Globalize.translate("HeaderLatestFromChannel").replace("{0}",i.Name);r+='<h1 style="display:inline-block; vertical-align:middle;" class="listHeader">'+n+"</h1>",r+='<a href="channelitems.html?id='+i.Id+'" class="clearLink" style="margin-left:2em;"><paper-button raised class="more mini"><span>'+Globalize.translate("ButtonMore")+"</span></paper-button></a>",r+="</div>",r+='<div class="itemsContainer">',r+=e.getPosterViewHtml({items:t.Items,shape:"autohome",defaultShape:"square",showTitle:!0,centerText:!0,lazy:!0,showDetailsMenu:!0,overlayPlayButton:!0}),r+="</div>",r+="</div>"}var s=a.querySelector("#channel"+i.Id);s.innerHTML=r,ImageLoader.lazyChildren(s),e.createCardMenus(s)})}function b(t,a,r){return ApiClient.getLiveTvRecordings({userId:a,limit:5,IsInProgress:!1}).then(function(a){var n="";if(a.Items.length){var l=0!==r?"listHeader":"listHeader";n+="<div>",n+='<h1 style="display:inline-block; vertical-align:middle;" class="'+l+'">'+Globalize.translate("HeaderLatestTvRecordings")+"</h1>",n+='<a href="livetv.html?tab=3" onclick="LibraryBrowser.showTab(\'livetv.html\',3);" class="clearLink" style="margin-left:2em;"><paper-button raised class="more mini"><span>'+Globalize.translate("ButtonMore")+"</span></paper-button></a>",n+="</div>"}n+=i()?'<div class="hiddenScrollX itemsContainer">':'<div class="itemsContainer">',n+=e.getPosterViewHtml({items:a.Items,shape:s(),showTitle:!0,showParentTitle:!0,coverImage:!0,lazy:!0,showDetailsMenu:!0,centerText:!0,overlayPlayButton:!0}),n+="</div>",t.innerHTML=n,ImageLoader.lazyChildren(t),e.createCardMenus(t)})}return window.Sections={loadRecentlyAdded:d,loadLatestChannelMedia:h,loadLibraryTiles:v,loadResume:u,loadNextUp:p,loadLatestChannelItems:g,loadLatestLiveTvRecordings:b,loadlibraryButtons:o,loadLatestMovies:c,loadLatestEpisodes:m},window.Sections});