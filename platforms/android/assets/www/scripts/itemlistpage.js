define(["libraryBrowser","jQuery"],function(e,t){return function(a,r){function n(){var t=c;if(!t){t=c={query:{SortBy:"IsFolder,SortName",SortOrder:"Ascending",Fields:"DateCreated,PrimaryImageAspectRatio,MediaSourceCount,SyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:e.getDefaultPageSize()}},t.query.Filters="",t.query.NameStartsWithOrGreater="";var a=o();t.view=e.getSavedView(a)||e.getDefaultItemsView("Poster","Poster"),t.query.ParentId=r.parentId||null,e.loadSavedQueryValues(a,t.query)}return t}function i(){return n().query}function o(){return a.savedQueryKey||(a.savedQueryKey=e.getSavedQueryKey("itemsv1")),a.savedQueryKey}function l(){Dashboard.showLoadingMsg();var d=i(),c=Dashboard.getCurrentUserId(),y=d.ParentId?ApiClient.getItem(c,d.ParentId):ApiClient.getRootFolder(c),g=ApiClient.getItems(c,d);Promise.all([y,g]).then(function(i){var c=i[0];m=c;var y=i[1];window.scrollTo(0,0);var g=n(a).view,h="",p=e.getQueryPagingHtml({startIndex:d.StartIndex,limit:d.Limit,totalRecordCount:y.TotalRecordCount,showLimit:!1,addLayoutButton:!0,currentLayout:g,sortButton:!0,layouts:"Poster,PosterCard,Thumb",filterButton:!0});a.querySelector(".listTopPaging").innerHTML=p,s();var b=r.context,f={items:y.Items,shape:"auto",centerText:!0,lazy:!0,coverImage:"PhotoAlbum"==c.Type};"Backdrop"==g?(f.shape="backdrop",f.showTitle=!0,f.preferBackdrop=!0,h=e.getPosterViewHtml(f)):"Poster"==g?(f.showTitle="photos"==b?"auto":!0,f.overlayText="photos"==b,h=e.getPosterViewHtml(f)):"PosterCard"==g?(f.showTitle=!0,f.showYear=!0,f.cardLayout=!0,f.centerText=!1,h=e.getPosterViewHtml(f)):"Thumb"==g&&(f.preferThumb=!0,f.shape="backdrop",h=e.getPosterViewHtml(f));var v=a.querySelector("#items");v.innerHTML=h+p,ImageLoader.lazyChildren(v),t(".btnFilter",a).on("click",function(){u()}),t(".btnNextPage",a).on("click",function(){d.StartIndex+=d.Limit,l(a)}),t(".btnPreviousPage",a).on("click",function(){d.StartIndex-=d.Limit,l(a)}),t(".btnChangeLayout",a).on("layoutchange",function(t,r){n(a).view=r,e.saveViewSetting(o(),r),l(a)}),t(".btnSort",a).on("click",function(){e.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionCommunityRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionCriticRating"),id:"CriticRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionDatePlayed"),id:"DatePlayed,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionPlayCount"),id:"PlayCount,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"},{name:Globalize.translate("OptionRuntime"),id:"Runtime,SortName"}],callback:function(){l(a)},query:d})}),e.saveQueryValues(r.parentId,d);var P=c.Name;null!=c.IndexNumber&&(P=c.IndexNumber+" - "+P),null!=c.ParentIndexNumber&&(P=c.ParentIndexNumber+"."+P),LibraryMenu.setTitle(P),a.dispatchEvent(new CustomEvent("displayingitem",{detail:{item:c},bubbles:!0})),Dashboard.hideLoadingMsg()})}function u(){require(["components/filterdialog/filterdialog"],function(e){var t=new e({query:i()});Events.on(t,"filterchange",function(){l()}),t.show()})}function s(){var e=i();t(".alphabetPicker",a).alphaValue(e.NameStartsWithOrGreater)}function d(){var t=i(),r=e.getListItemInfo(this);return"Photo"==r.mediaType?(require(["scripts/photos"],function(){Photos.startSlideshow(a,t,r.id)}),!1):void 0}var m,c;t(".alphabetPicker",a).on("alphaselect",function(e,t){var r=i();r.NameStartsWithOrGreater=t,r.StartIndex=0,l(a)}).on("alphaclear",function(){var e=i();e.NameStartsWithOrGreater="",l(a)}),t(a).on("click",".mediaItem",d),a.addEventListener("viewbeforeshow",function(){l(a),s(),LibraryMenu.setBackButtonVisible(r.context)})}});