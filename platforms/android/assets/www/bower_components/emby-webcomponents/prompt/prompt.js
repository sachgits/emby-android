define(["dialogHelper","layoutManager","globalize","html!./../icons/nav.html","css!./style.css","paper-button","paper-icon-button-light","paper-input"],function(t,e,n){function o(t,e,n,o){var r=n?"":' tabindex="-1"';return o=o?" autofocus":"",'<button is="paper-icon-button-light" class="'+e+'"'+r+o+'><iron-icon icon="'+t+'"></iron-icon></button>'}return function(r){"string"==typeof r&&(r={title:"",text:r});var i={removeOnClose:!0},a=!1,l=!1;e.tv?(i.size="fullscreen",a=!0,l=!0):(i.modal=!1,i.entryAnimationDuration=160,i.exitAnimationDuration=200);var s=t.createDialog(i);s.classList.add("promptDialog");var u="",c="";return u+='<div class="promptDialogContent">',a&&(u+=o("dialog:arrow-back","btnPromptExit",!1)),r.title&&(u+="<h2>",u+=r.title,u+="</h2>"),u+="<form>",u+='<paper-input autoFocus class="txtPromptValue" value="'+(r.value||"")+'" label="'+(r.label||"")+'"></paper-input>',r.description&&(u+='<div class="fieldDescription">',u+=r.description,u+="</div>"),u+="<br/>",l?u+='<paper-button raised class="btnSubmit"><iron-icon icon="nav:check"></iron-icon><span>'+n.translate("sharedcomponents#ButtonOk")+"</span></paper-button>":(u+='<div class="buttons">',u+='<paper-button class="btnSubmit">'+n.translate("sharedcomponents#ButtonOk")+"</paper-button>",u+='<paper-button class="btnPromptExit">'+n.translate("sharedcomponents#ButtonCancel")+"</paper-button>",u+="</div>"),u+="</form>",u+="</div>",s.innerHTML=u,document.body.appendChild(s),s.querySelector("form").addEventListener("submit",function(e){return c=s.querySelector(".txtPromptValue").value,e.preventDefault(),e.stopPropagation(),setTimeout(function(){t.close(s)},300),!1}),s.querySelector(".btnSubmit").addEventListener("click",function(){var t=document.createElement("input");t.setAttribute("type","submit"),t.style.display="none";var e=s.querySelector("form");e.appendChild(t),t.click(),e.removeChild(t)}),s.querySelector(".btnPromptExit").addEventListener("click",function(){t.close(s)}),t.open(s).then(function(){var t=c;return t?t:Promise.reject()})}});