/* /etc/designs/dhl/docroot/js/dhl_dropoff_locator.js */
function dropOffNextResults(resultLength) {
    var dropoffForm = document.dropoff_locator;
    var resultIndexField = dropoffForm.result_start_index;

    var resultStartIndex = parseInt(resultIndexField.value);
    resultStartIndex = resultStartIndex + resultLength;

    resultIndexField.value = resultStartIndex;

    dropoffForm.submit();
}

function dropOffZoomIn(steps) {
    var dropoffForm = document.dropoff_locator;
    var zoomLevelField = dropoffForm.zoom_level;
    //alert("zoomLevelField"+zoomLevelField);
    var zoomLevel = parseFloat(zoomLevelField.value);
    //alert("zoomLevel"+zoomLevel);
    //zoomLevel = zoomLevel - steps;
    //alert(zoomLevel);
    // zoom level must be greater than 0


    if (zoomLevel > 1) {
        //alert(zoomLevel);
        zoomLevel = zoomLevel - steps;
        zoomLevelField.value = zoomLevel;
    }

    else {

        zoomLevelField.value = parseFloat("1.0");

    }
    dropoffForm.submit();
}

function dropOffZoomOut(steps) {
    var dropoffForm = document.dropoff_locator;
    var zoomLevelField = dropoffForm.zoom_level;

    var zoomLevel = parseFloat(zoomLevelField.value);
    zoomLevel = zoomLevel + steps;

    zoomLevelField.value = zoomLevel;

    dropoffForm.submit();
}

function dropOffNewSearch() {
    var dropoffForm = document.dropoff_locator;

    dropoffForm.drop_off_locator_location.value = "";
    dropoffForm.city_town.value = "";
    dropoffForm.postcode_zip.value = "";
    dropoffForm.province_state.value = "";
    dropoffForm.result_start_index.value = "";
    dropoffForm.zoom_level.value = "";

    dropoffForm.submit();
    return false;
}
/* /etc/designs/dhl/docroot/js/inPageNavUtils.js */

function gotoInPageAnchor(anchorId) {
    if(anchorId.substr(0, 12) === "containerpar" ) {// _expandablelist"
        var selector = "a[name='" + anchorId + "']";
        var expListSection = $( selector ).next();
        if( expListSection.hasClass('expandablelist') ) {
            var toggleNode = expListSection.find('.dijitExpand_ListTitlePane');
            if( toggleNode.length !== 0 ) {
                //switch to dojo
                toggleNode = dijit.byId(toggleNode.attr("id"));
                if(! toggleNode.open )
                    toggleNode.toggle();
                return true;//to enable browser href focus
            }
        }
    }
    else
    {
        var targetEl = jQuery("#" + anchorId);
        if( targetEl.length === 0 ) {
            //possible TabSys without #
            targetEl = jQuery("#\\#" + anchorId);
            anchorId = "#" + anchorId;
        }
        var targetHRef = targetEl.attr('href');
        if( targetHRef && targetHRef.indexOf(anchorId) > -1 ) {
            targetEl.trigger( "click" );

            if(anchorId.charAt(0)==='#') {
                var bodyRect = document.body.getBoundingClientRect(),
                    elemRect = targetEl[0].getBoundingClientRect(),
                    offsetTop = elemRect.top - bodyRect.top,
                    offsetLeft = 0-bodyRect.left;

                window.scrollTo(offsetLeft, offsetTop-10);
                return false;
            }
        }
    }
    return true;
}



/* /etc/designs/dhl/docroot/js/AC_OETags.js */
// Flash Player Version Detection - Rev 1.5
// Detect Client Browser type
// Copyright(c) 2005-2006 Adobe Macromedia Software, LLC. All rights reserved.
var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
var isWin = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

function ControlVersion() {
    var version;
    var axo;
    var e;

    // NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry

    try {
        // version will be set for 7.X or greater players
        axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
        version = axo.GetVariable("$version");
    } catch (e) {
    }

    if (!version) {
        try {
            // version will be set for 6.X players only
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");

            // installed player is some revision of 6.0
            // GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
            // so we have to be careful.

            // default to the first public version
            version = "WIN 6,0,21,0";

            // throws if AllowScripAccess does not exist (introduced in 6.0r47)
            axo.AllowScriptAccess = "always";

            // safe to call for 6.0r47 or greater
            version = axo.GetVariable("$version");

        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 4.X or 5.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = axo.GetVariable("$version");
        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 3.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
            version = "WIN 3,0,18,0";
        } catch (e) {
        }
    }

    if (!version) {
        try {
            // version will be set for 2.X player
            axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            version = "WIN 2,0,0,11";
        } catch (e) {
            version = -1;
        }
    }

    return version;
}

// JavaScript helper required to detect Flash Player PlugIn version information
function GetSwfVer() {
    // NS/Opera version >= 3 check for Flash plugin in plugin array
    var flashVer = -1;

    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
            var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
            var descArray = flashDescription.split(" ");
            var tempArrayMajor = descArray[2].split(".");
            var versionMajor = tempArrayMajor[0];
            var versionMinor = tempArrayMajor[1];
            if (descArray[3] != "") {
                tempArrayMinor = descArray[3].split("r");
            } else {
                tempArrayMinor = descArray[4].split("r");
            }
            var versionRevision = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
            var flashVer = versionMajor + "." + versionMinor + "." + versionRevision;
        }
    }
    // MSN/WebTV 2.6 supports Flash 4
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
    // WebTV 2.5 supports Flash 3
    else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
    // older WebTV supports Flash 2
    else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
    else if (isIE && isWin && !isOpera) {
        flashVer = ControlVersion();
    }
    return flashVer;
}

// When called with reqMajorVer, reqMinorVer, reqRevision returns true if that version or greater is available
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRevision) {
    versionStr = GetSwfVer();
    if (versionStr == -1) {
        return false;
    } else if (versionStr != 0) {
        if (isIE && isWin && !isOpera) {
            // Given "WIN 2,0,0,11"
            tempArray = versionStr.split(" "); 	// ["WIN", "2,0,0,11"]
            tempString = tempArray[1];			// "2,0,0,11"
            versionArray = tempString.split(",");	// ['2', '0', '0', '11']
        } else {
            versionArray = versionStr.split(".");
        }
        var versionMajor = versionArray[0];
        var versionMinor = versionArray[1];
        var versionRevision = versionArray[2];

        // is the major.revision >= requested major.revision AND the minor version >= requested minor
        if (versionMajor > parseFloat(reqMajorVer)) {
            return true;
        } else if (versionMajor == parseFloat(reqMajorVer)) {
            if (versionMinor > parseFloat(reqMinorVer))
                return true;
            else if (versionMinor == parseFloat(reqMinorVer)) {
                if (versionRevision >= parseFloat(reqRevision))
                    return true;
            }
        }
        return false;
    }
}

function AC_AddExtension(src, ext) {
    if (src.indexOf('?') != -1)
        return src.replace(/\?/, ext + '?');
    else
        return src + ext;
}

function AC_Generateobj(objAttrs, params, embedAttrs) {
    var str = '';
    if (isIE && isWin && !isOpera) {
        str += '<object ';
        for (var i in objAttrs)
            str += i + '="' + objAttrs[i] + '" ';
        for (var i in params)
            str += '><param name="' + i + '" value="' + params[i] + '" /> ';
        str += '></object>';
    } else {
        str += '<embed ';
        for (var i in embedAttrs)
            str += i + '="' + embedAttrs[i] + '" ';
        str += '> </embed>';
    }
    document.write(str);

}

function AC_FL_RunContent() {
    var ret =
        AC_GetArgs
        (arguments, ".swf", "movie", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
            , "application/x-shockwave-flash"
        );
    AC_Generateobj(ret.objAttrs, ret.params, ret.embedAttrs);
}

function AC_GetArgs(args, ext, srcParamName, classid, mimeType) {
    var ret = new Object();
    ret.embedAttrs = new Object();
    ret.params = new Object();
    ret.objAttrs = new Object();
    for (var i = 0; i < args.length; i = i + 2) {
        var currArg = args[i].toLowerCase();

        switch (currArg) {
            case "classid":
                break;
            case "pluginspage":
                ret.embedAttrs[args[i]] = args[i + 1];
                break;
            case "src":
            case "movie":
                args[i + 1] = AC_AddExtension(args[i + 1], ext);
                ret.embedAttrs["src"] = args[i + 1];
                ret.params[srcParamName] = args[i + 1];
                break;
            case "onafterupdate":
            case "onbeforeupdate":
            case "onblur":
            case "oncellchange":
            case "onclick":
            case "ondblClick":
            case "ondrag":
            case "ondragend":
            case "ondragenter":
            case "ondragleave":
            case "ondragover":
            case "ondrop":
            case "onfinish":
            case "onfocus":
            case "onhelp":
            case "onmousedown":
            case "onmouseup":
            case "onmouseover":
            case "onmousemove":
            case "onmouseout":
            case "onkeypress":
            case "onkeydown":
            case "onkeyup":
            case "onload":
            case "onlosecapture":
            case "onpropertychange":
            case "onreadystatechange":
            case "onrowsdelete":
            case "onrowenter":
            case "onrowexit":
            case "onrowsinserted":
            case "onstart":
            case "onscroll":
            case "onbeforeeditfocus":
            case "onactivate":
            case "onbeforedeactivate":
            case "ondeactivate":
            case "type":
            case "codebase":
            case "id":
                ret.objAttrs[args[i]] = args[i + 1];
                break;
            case "width":
            case "height":
            case "align":
            case "vspace":
            case "hspace":
            case "class":
            case "title":
            case "accesskey":
            case "name":
            case "tabindex":
                ret.embedAttrs[args[i]] = ret.objAttrs[args[i]] = args[i + 1];
                break;
            default:
                ret.embedAttrs[args[i]] = ret.params[args[i]] = args[i + 1];
        }
    }
    ret.objAttrs["classid"] = classid;
    if (mimeType) ret.embedAttrs["type"] = mimeType;
    return ret;
}


/* /etc/designs/dhl/docroot/swf/swfobject.js */
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();/* /etc/designs/dhl/docroot/js/default.js */
function openPane(id) {
    // get named anchor
    var anchor = dojo.query('a[name=' + id + ']');

    if (anchor.length > 0) {
        // get expandable list section by sibling connection to anchor
        var expList = anchor[0].nextSibling;

        // get expandable list widget based on shared id string
        var paneWidget = dojo.query('[id^=dijit_Expand_ListTitlePane_]', expList);

        if (paneWidget.length > 0) {
            // get expandable list widget and toogle its state
            var pane = dijit.byId(paneWidget[0].id);
            if (new String(pane) != "undefined") {
                pane.toggle();
            }
        }
    }
}

dojo.addOnLoad(function () {
    if (window.location.hash) {
        var hash = window.location.hash.slice(1);   // strip leading "#"
        openPane(hash);
    }
});


sfHover = function () {
    var nav = document.getElementById("nav");
    if (nav != null) {
        var sfEls = document.getElementById("nav").getElementsByTagName("LI");
        for (var i = 0; i < sfEls.length; i++) {
            sfEls[i].onmouseover = function () {
                this.className += (this.className.length > 0 ? " " : "") + "sfhover";
            }
            sfEls[i].onmouseout = function () {
                this.className = this.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
            }
        }
    }
}
mcAccessible = function () {
    var nav = document.getElementById("nav");
    if (nav != null) {
        var mcEls = document.getElementById("nav").getElementsByTagName("A");
        for (var i = 0; i < mcEls.length; i++) {
            mcEls[i].onfocus = function () {
                this.className += (this.className.length > 0 ? " " : "") + "sffocus"; //a:focus
                this.parentNode.className += (this.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < a:focus
                if (this.parentNode.parentNode.parentNode.nodeName == "LI") {
                    this.parentNode.parentNode.parentNode.className += (this.parentNode.parentNode.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < ul < li < a:focus
                    if (this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.className += (this.parentNode.parentNode.parentNode.parentNode.parentNode.className.length > 0 ? " " : "") + "sfhover"; //li < ul < li < ul < li < a:focus
                    }
                }
            }
            mcEls[i].onblur = function () {
                this.className = this.className.replace(new RegExp("( ?|^)sffocus\\b"), "");
                this.parentNode.className = this.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                if (this.parentNode.parentNode.parentNode.nodeName == "LI") {
                    this.parentNode.parentNode.parentNode.className = this.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                    if (this.parentNode.parentNode.parentNode.parentNode.parentNode.nodeName == "LI") {
                        this.parentNode.parentNode.parentNode.parentNode.parentNode.className = this.parentNode.parentNode.parentNode.parentNode.parentNode.className.replace(new RegExp("( ?|^)sfhover\\b"), "");
                    }
                }
            }
        }
    }
}

// only ie needs the sfHover script. all need the accessibility script...
// thanks http://www.brothercake.com/site/resources/scripts/onload/
if (window.addEventListener) window.addEventListener('load', mcAccessible, false); // gecko, safari, konqueror and standard
else if (document.addEventListener) document.addEventListener('load', mcAccessible, false); // opera 7
else if (window.attachEvent) { // win/ie
    window.attachEvent('onload', sfHover);
    window.attachEvent('onload', mcAccessible);
} else { // mac/ie5
    if (typeof window.onload == 'function') {
        var existing = onload;
        window.onload = function () {
            existing();
            sfHover();
            mcAccessible();
        }
    } else {
        window.onload = function () {
            sfHover();
            mcAccessible();
        }
    }
}

function openPop(URLStr, winWidthStr, winHeightStr) {
    var winWidth = winWidthStr;
    var winHeight = winHeightStr;

    winWidthPos = (screen.availWidth / 2) - (winWidth / 2);
    winHeightPos = (screen.availHeight / 2) - (winHeight / 2);
    popWin = open(URLStr, 'popUpWin', 'toolbar=no,status=no,menubar=no,scrollbars=yes,resizable=no,width=' + winWidth + 'px' + ',height=' + winHeight + 'px' + ',left=' + winWidthPos + ', top=' + winHeightPos + ',screenX=' + winWidthPos + ',screenY=' + winHeightPos + '');
}

/** escapes alt and title parameter values or href value because xsl does not escape these */
function escapeZoomURL(url) {
    if (url.indexOf('title=') > -1 || url.indexOf('alt=') > -1) {
        var part = url.split('&');
        url = '';
        for (i = 0; i < part.length; i++) {
            //first is href + first param!
            var param = part[i].split('=');
            url = url + param[0] + '=' + escape(param[1]);
            if (i < part.length) url += '&';
        }
    }
    if (url.indexOf('disclaimer.jsp') > -1) {
        var part = url.split('href=');
        url = part[0] + 'href=' + escape(part[1]);
    }
    return url;
}
/**    popup functs */
var winpop;
//var img;
//var w;
function popup(url, winBreite, winHoehe, posLinks, posTop, linkfield, options, winname) {
    var screenBreite = (screen.availWidth) ? screen.availWidth : 800;
    var screenHoehe = (screen.availHeight) ? screen.availHeight : 600;
    if ((winBreite != null) && (winBreite <= 100)) winBreite = 100;
    if ((winBreite == null) || (winBreite < 100) || (winBreite > screenBreite)) winBreite = screenBreite - 100;
    if ((winHoehe != null) && (winHoehe <= 100)) winHoehe = 100;
    if ((winHoehe == null) || (winHoehe < 100) || (winHoehe > screenHoehe - 120)) winHoehe = screenHoehe - 120;
    if ((posLinks == null) || (posLinks < 0) || (screenBreite < posLinks + winBreite)) posLinks = (screenBreite - winBreite) / 2; // mitte des bildschirms
    if ((posTop == null) || (posTop < 0) || (screenHoehe < posTop + winHoehe)) posTop = (screenHoehe - winHoehe) / 2 - 20; // mitte des bildschirms
    if (posTop < 0) posTop = 0;
    if (winpop && (winpop.closed != true)) winpop.close();
    if (!options) options = 'toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1';
    if (!winname) winname = 'w';
    winpop = window.open(escapeZoomURL(url), winname, options + ',width=' + winBreite + ',height=' + winHoehe + ',left=' + posLinks + ',top=' + posTop);
    if (linkfield) winpop.w = linkfield;
    winpop.focus();
    return false;
}


// With onkeypress event, this verifies ?Enter? key
function verifyKey(oElement, oEvent) {
    if (oEvent.keyCode == 13 && oElement.onclick) {
        oElement.onclick();
    }
}

// Check of screen resolution and include of corresponding styles

//window.onload = screenResCheck;

function screenResCheck() {
    var nav_check = document.getElementById('navigation_content');

    if (screen.width == 800) {
        var default_800 = document.createElement('link');

        default_800.href = '/css/default_800.css';
        default_800.rel = 'stylesheet';
        default_800.type = 'text/css';

        var scr_js = document.getElementById('default_js');
        scr_js.parentNode.insertBefore(default_800, scr_js);

        if (nav_check) {
            var ie_opt = document.createElement('link');

            ie_opt.href = '/css/ie_optimization_800.css';
            ie_opt.rel = 'stylesheet';
            ie_opt.type = 'text/css';

            var scr_css = document.getElementById('default_js');
            scr_css.parentNode.insertBefore(ie_opt, scr_css);
        }
        else {
            var ie_opt = document.createElement('link');

            ie_opt.href = '/css/ie_optimization_home_800.css';
            ie_opt.rel = 'stylesheet';
            ie_opt.type = 'text/css';

            var scr_css = document.getElementById('default_js');
            scr_css.parentNode.insertBefore(ie_opt, scr_css);
        }
    }
}
jQuery(document).ready(function () {

    if (jQuery.browser.msie) {
        var crossReferenceStandardArticleCaptionElements = jQuery(".content_cross_reference .standardarticle .standard_article .caption");
        if (crossReferenceStandardArticleCaptionElements.length > 0) {

            crossReferenceStandardArticleCaptionElements.each(function () {

                if (jQuery(this).text() === "") {
                    jQuery(this).hide();
                }
            });
        }
        if (parseInt(jQuery.browser.version) === 6) {
            var crossReferenceStandardArticleHeadline = jQuery(".content_cross_reference .standardarticle .standard_article h2");
            if (crossReferenceStandardArticleHeadline.length > 0) {

                crossReferenceStandardArticleHeadline.each(function () {

                    if (jQuery(this).text() === "") {

                        jQuery(this).css({
                            height: "0px",
                            lineHeight: "0px",
                            paddingBottom: "0px",
                            marginBottom: "2px"
                        });
                    }
                });
            }
        }
        jQuery(".content_cross_reference .standardarticle .standard_article img[alt='External Link / New Window']").hide();
    }

});
/* /etc/designs/dhl/docroot/js/lib/jquery/jquery.cycle.all.js */
/*!
 * jQuery Cycle Plugin (with Transition Definitions)
 * Examples and documentation at: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version: 2.9999.5 (10-APR-2012)
 * Dual licensed under the MIT and GPL licenses.
 * http://jquery.malsup.com/license.html
 * Requires: jQuery v1.3.2 or later
 */
;
(function ($, undefined) {
    "use strict";

    var ver = '2.9999.5';

// if $.support is not defined (pre jQuery 1.3) add what I need
    if ($.support === undefined) {
        $.support = {
            opacity: !($.browser.msie)
        };
    }

    function debug(s) {
        if ($.fn.cycle.debug)
            log(s);
    }

    function log() {
        if (window.console && console.log)
            console.log('[cycle] ' + Array.prototype.join.call(arguments, ' '));
    }

    $.expr[':'].paused = function (el) {
        return el.cyclePause;
    };


// the options arg can be...
//   a number  - indicates an immediate transition should occur to the given slide index
//   a string  - 'pause', 'resume', 'toggle', 'next', 'prev', 'stop', 'destroy' or the name of a transition effect (ie, 'fade', 'zoom', etc)
//   an object - properties to control the slideshow
//
// the arg2 arg can be...
//   the name of an fx (only used in conjunction with a numeric value for 'options')
//   the value true (only used in first arg == 'resume') and indicates
//	 that the resume should occur immediately (not wait for next timeout)

    $.fn.cycle = function (options, arg2) {
        var o = { s: this.selector, c: this.context };

        // in 1.3+ we can fix mistakes with the ready state
        if (this.length === 0 && options != 'stop') {
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing slideshow');
                $(function () {
                    $(o.s, o.c).cycle(options, arg2);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        // iterate the matched nodeset
        return this.each(function () {
            var opts = handleArguments(this, options, arg2);
            if (opts === false)
                return;

            opts.updateActivePagerLink = opts.updateActivePagerLink || $.fn.cycle.updateActivePagerLink;

            // stop existing slideshow for this container (if there is one)
            if (this.cycleTimeout)
                clearTimeout(this.cycleTimeout);
            this.cycleTimeout = this.cyclePause = 0;
            this.cycleStop = 0; // issue #108

            var $cont = $(this);
            var $slides = opts.slideExpr ? $(opts.slideExpr, this) : $cont.children();
            var els = $slides.get();

            if (els.length < 2) {
                log('terminating; too few slides: ' + els.length);
                return;
            }

            var opts2 = buildOptions($cont, $slides, els, opts, o);
            if (opts2 === false)
                return;

            var startTime = opts2.continuous ? 10 : getTimeout(els[opts2.currSlide], els[opts2.nextSlide], opts2, !opts2.backwards);

            // if it's an auto slideshow, kick it off
            if (startTime) {
                startTime += (opts2.delay || 0);
                if (startTime < 10)
                    startTime = 10;
                debug('first timeout: ' + startTime);
                this.cycleTimeout = setTimeout(function () {
                    go(els, opts2, 0, !opts.backwards);
                }, startTime);
            }
        });
    };

    function triggerPause(cont, byHover, onPager) {
        var opts = $(cont).data('cycle.opts');
        var paused = !!cont.cyclePause;
        if (paused && opts.paused)
            opts.paused(cont, opts, byHover, onPager);
        else if (!paused && opts.resumed)
            opts.resumed(cont, opts, byHover, onPager);
    }

// process the args that were passed to the plugin fn
    function handleArguments(cont, options, arg2) {
        if (cont.cycleStop === undefined)
            cont.cycleStop = 0;
        if (options === undefined || options === null)
            options = {};
        if (options.constructor == String) {
            switch (options) {
                case 'destroy':
                case 'stop':
                    var opts = $(cont).data('cycle.opts');
                    if (!opts)
                        return false;
                    cont.cycleStop++; // callbacks look for change
                    if (cont.cycleTimeout)
                        clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                    if (opts.elements)
                        $(opts.elements).stop();
                    $(cont).removeData('cycle.opts');
                    if (options == 'destroy')
                        destroy(cont, opts);
                    return false;
                case 'toggle':
                    cont.cyclePause = (cont.cyclePause === 1) ? 0 : 1;
                    checkInstantResume(cont.cyclePause, arg2, cont);
                    triggerPause(cont);
                    return false;
                case 'pause':
                    cont.cyclePause = 1;
                    triggerPause(cont);
                    return false;
                case 'resume':
                    cont.cyclePause = 0;
                    checkInstantResume(false, arg2, cont);
                    triggerPause(cont);
                    return false;
                case 'prev':
                case 'next':
                    opts = $(cont).data('cycle.opts');
                    if (!opts) {
                        log('options not found, "prev/next" ignored');
                        return false;
                    }
                    $.fn.cycle[options](opts);
                    return false;
                default:
                    options = { fx: options };
            }
            return options;
        }
        else if (options.constructor == Number) {
            // go to the requested slide
            var num = options;
            options = $(cont).data('cycle.opts');
            if (!options) {
                log('options not found, can not advance slide');
                return false;
            }
            if (num < 0 || num >= options.elements.length) {
                log('invalid slide index: ' + num);
                return false;
            }
            options.nextSlide = num;
            if (cont.cycleTimeout) {
                clearTimeout(cont.cycleTimeout);
                cont.cycleTimeout = 0;
            }
            if (typeof arg2 == 'string')
                options.oneTimeFx = arg2;
            go(options.elements, options, 1, num >= options.currSlide);
            return false;
        }
        return options;

        function checkInstantResume(isPaused, arg2, cont) {
            if (!isPaused && arg2 === true) { // resume now!
                var options = $(cont).data('cycle.opts');
                if (!options) {
                    log('options not found, can not resume');
                    return false;
                }
                if (cont.cycleTimeout) {
                    clearTimeout(cont.cycleTimeout);
                    cont.cycleTimeout = 0;
                }
                go(options.elements, options, 1, !options.backwards);
            }
        }
    }

    function removeFilter(el, opts) {
        if (!$.support.opacity && opts.cleartype && el.style.filter) {
            try {
                el.style.removeAttribute('filter');
            }
            catch (smother) {
            } // handle old opera versions
        }
    }

// unbind event handlers
    function destroy(cont, opts) {
        if (opts.next)
            $(opts.next).unbind(opts.prevNextEvent);
        if (opts.prev)
            $(opts.prev).unbind(opts.prevNextEvent);

        if (opts.pager || opts.pagerAnchorBuilder)
            $.each(opts.pagerAnchors || [], function () {
                this.unbind().remove();
            });
        opts.pagerAnchors = null;
        $(cont).unbind('mouseenter.cycle mouseleave.cycle');
        if (opts.destroy) // callback
            opts.destroy(opts);
    }

// one-time initialization
    function buildOptions($cont, $slides, els, options, o) {
        var startingSlideSpecified;
        // support metadata plugin (v1.0 and v2.0)
        var opts = $.extend({}, $.fn.cycle.defaults, options || {}, $.metadata ? $cont.metadata() : $.meta ? $cont.data() : {});
        var meta = $.isFunction($cont.data) ? $cont.data(opts.metaAttr) : null;
        if (meta)
            opts = $.extend(opts, meta);
        if (opts.autostop)
            opts.countdown = opts.autostopCount || els.length;

        var cont = $cont[0];
        $cont.data('cycle.opts', opts);
        opts.$cont = $cont;
        opts.stopCount = cont.cycleStop;
        opts.elements = els;
        opts.before = opts.before ? [opts.before] : [];
        opts.after = opts.after ? [opts.after] : [];

        // push some after callbacks
        if (!$.support.opacity && opts.cleartype)
            opts.after.push(function () {
                removeFilter(this, opts);
            });
        if (opts.continuous)
            opts.after.push(function () {
                go(els, opts, 0, !opts.backwards);
            });

        saveOriginalOpts(opts);

        // clearType corrections
        if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
            clearTypeFix($slides);

        // container requires non-static position so that slides can be position within
        if ($cont.css('position') == 'static')
            $cont.css('position', 'relative');
        if (opts.width)
            $cont.width(opts.width);
        if (opts.height && opts.height != 'auto')
            $cont.height(opts.height);

        if (opts.startingSlide !== undefined) {
            opts.startingSlide = parseInt(opts.startingSlide, 10);
            if (opts.startingSlide >= els.length || opts.startSlide < 0)
                opts.startingSlide = 0; // catch bogus input
            else
                startingSlideSpecified = true;
        }
        else if (opts.backwards)
            opts.startingSlide = els.length - 1;
        else
            opts.startingSlide = 0;

        // if random, mix up the slide array
        if (opts.random) {
            opts.randomMap = [];
            for (var i = 0; i < els.length; i++)
                opts.randomMap.push(i);
            opts.randomMap.sort(function (a, b) {
                return Math.random() - 0.5;
            });
            if (startingSlideSpecified) {
                // try to find the specified starting slide and if found set start slide index in the map accordingly
                for (var cnt = 0; cnt < els.length; cnt++) {
                    if (opts.startingSlide == opts.randomMap[cnt]) {
                        opts.randomIndex = cnt;
                    }
                }
            }
            else {
                opts.randomIndex = 1;
                opts.startingSlide = opts.randomMap[1];
            }
        }
        else if (opts.startingSlide >= els.length)
            opts.startingSlide = 0; // catch bogus input
        opts.currSlide = opts.startingSlide || 0;
        var first = opts.startingSlide;

        // set position and zIndex on all the slides
        $slides.css({position: 'absolute', top: 0, left: 0}).hide().each(function (i) {
            var z;
            if (opts.backwards)
                z = first ? i <= first ? els.length + (i - first) : first - i : els.length - i;
            else
                z = first ? i >= first ? els.length - (i - first) : first - i : els.length - i;
            $(this).css('z-index', z);
        });

        // make sure first slide is visible
        $(els[first]).css('opacity', 1).show(); // opacity bit needed to handle restart use case
        removeFilter(els[first], opts);

        // stretch slides
        if (opts.fit) {
            if (!opts.aspect) {
                if (opts.width)
                    $slides.width(opts.width);
                if (opts.height && opts.height != 'auto')
                    $slides.height(opts.height);
            } else {
                $slides.each(function () {
                    var $slide = $(this);
                    var ratio = (opts.aspect === true) ? $slide.width() / $slide.height() : opts.aspect;
                    if (opts.width && $slide.width() != opts.width) {
                        $slide.width(opts.width);
                        $slide.height(opts.width / ratio);
                    }

                    if (opts.height && $slide.height() < opts.height) {
                        $slide.height(opts.height);
                        $slide.width(opts.height * ratio);
                    }
                });
            }
        }

        if (opts.center && ((!opts.fit) || opts.aspect)) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ?
                        ((opts.width - $slide.width()) / 2) + "px" :
                        0,
                    "margin-top": opts.height ?
                        ((opts.height - $slide.height()) / 2) + "px" :
                        0
                });
            });
        }

        if (opts.center && !opts.fit && !opts.slideResize) {
            $slides.each(function () {
                var $slide = $(this);
                $slide.css({
                    "margin-left": opts.width ? ((opts.width - $slide.width()) / 2) + "px" : 0,
                    "margin-top": opts.height ? ((opts.height - $slide.height()) / 2) + "px" : 0
                });
            });
        }

        // stretch container
        var reshape = opts.containerResize && !$cont.innerHeight();
        if (reshape) { // do this only if container has no size http://tinyurl.com/da2oa9
            var maxw = 0, maxh = 0;
            for (var j = 0; j < els.length; j++) {
                var $e = $(els[j]), e = $e[0], w = $e.outerWidth(), h = $e.outerHeight();
                if (!w) w = e.offsetWidth || e.width || $e.attr('width');
                if (!h) h = e.offsetHeight || e.height || $e.attr('height');
                maxw = w > maxw ? w : maxw;
                maxh = h > maxh ? h : maxh;
            }
            if (maxw > 0 && maxh > 0)
                $cont.css({width: maxw + 'px', height: maxh + 'px'});
        }

        var pauseFlag = false;  // https://github.com/malsup/cycle/issues/44
        if (opts.pause)
            $cont.bind('mouseenter.cycle',function () {
                pauseFlag = true;
                this.cyclePause++;
                triggerPause(cont, true);
            }).bind('mouseleave.cycle', function () {
                    if (pauseFlag)
                        this.cyclePause--;
                    triggerPause(cont, true);
                });

        if (supportMultiTransitions(opts) === false)
            return false;

        // apparently a lot of people use image slideshows without height/width attributes on the images.
        // Cycle 2.50+ requires the sizing info for every slide; this block tries to deal with that.
        var requeue = false;
        options.requeueAttempts = options.requeueAttempts || 0;
        $slides.each(function () {
            // try to get height/width of each slide
            var $el = $(this);
            this.cycleH = (opts.fit && opts.height) ? opts.height : ($el.height() || this.offsetHeight || this.height || $el.attr('height') || 0);
            this.cycleW = (opts.fit && opts.width) ? opts.width : ($el.width() || this.offsetWidth || this.width || $el.attr('width') || 0);

            if ($el.is('img')) {
                // sigh..  sniffing, hacking, shrugging...  this crappy hack tries to account for what browsers do when
                // an image is being downloaded and the markup did not include sizing info (height/width attributes);
                // there seems to be some "default" sizes used in this situation
                var loadingIE = ($.browser.msie && this.cycleW == 28 && this.cycleH == 30 && !this.complete);
                var loadingFF = ($.browser.mozilla && this.cycleW == 34 && this.cycleH == 19 && !this.complete);
                var loadingOp = ($.browser.opera && ((this.cycleW == 42 && this.cycleH == 19) || (this.cycleW == 37 && this.cycleH == 17)) && !this.complete);
                var loadingOther = (this.cycleH === 0 && this.cycleW === 0 && !this.complete);
                // don't requeue for images that are still loading but have a valid size
                if (loadingIE || loadingFF || loadingOp || loadingOther) {
                    if (o.s && opts.requeueOnImageNotLoaded && ++options.requeueAttempts < 100) { // track retry count so we don't loop forever
                        log(options.requeueAttempts, ' - img slide not loaded, requeuing slideshow: ', this.src, this.cycleW, this.cycleH);
                        setTimeout(function () {
                            $(o.s, o.c).cycle(options);
                        }, opts.requeueTimeout);
                        requeue = true;
                        return false; // break each loop
                    }
                    else {
                        log('could not determine size of image: ' + this.src, this.cycleW, this.cycleH);
                    }
                }
            }
            return true;
        });

        if (requeue)
            return false;

        opts.cssBefore = opts.cssBefore || {};
        opts.cssAfter = opts.cssAfter || {};
        opts.cssFirst = opts.cssFirst || {};
        opts.animIn = opts.animIn || {};
        opts.animOut = opts.animOut || {};

        $slides.not(':eq(' + first + ')').css(opts.cssBefore);
        $($slides[first]).css(opts.cssFirst);

        if (opts.timeout) {
            opts.timeout = parseInt(opts.timeout, 10);
            // ensure that timeout and speed settings are sane
            if (opts.speed.constructor == String)
                opts.speed = $.fx.speeds[opts.speed] || parseInt(opts.speed, 10);
            if (!opts.sync)
                opts.speed = opts.speed / 2;

            var buffer = opts.fx == 'none' ? 0 : opts.fx == 'shuffle' ? 500 : 250;
            while ((opts.timeout - opts.speed) < buffer) // sanitize timeout
                opts.timeout += opts.speed;
        }
        if (opts.easing)
            opts.easeIn = opts.easeOut = opts.easing;
        if (!opts.speedIn)
            opts.speedIn = opts.speed;
        if (!opts.speedOut)
            opts.speedOut = opts.speed;

        opts.slideCount = els.length;
        opts.currSlide = opts.lastSlide = first;
        if (opts.random) {
            if (++opts.randomIndex == els.length)
                opts.randomIndex = 0;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.backwards)
            opts.nextSlide = opts.startingSlide === 0 ? (els.length - 1) : opts.startingSlide - 1;
        else
            opts.nextSlide = opts.startingSlide >= (els.length - 1) ? 0 : opts.startingSlide + 1;

        // run transition init fn
        if (!opts.multiFx) {
            var init = $.fn.cycle.transitions[opts.fx];
            if ($.isFunction(init))
                init($cont, $slides, opts);
            else if (opts.fx != 'custom' && !opts.multiFx) {
                log('unknown transition: ' + opts.fx, '; slideshow terminating');
                return false;
            }
        }

        // fire artificial events
        var e0 = $slides[first];
        if (!opts.skipInitializationCallbacks) {
            if (opts.before.length)
                opts.before[0].apply(e0, [e0, e0, opts, true]);
            if (opts.after.length)
                opts.after[0].apply(e0, [e0, e0, opts, true]);
        }
        if (opts.next)
            $(opts.next).bind(opts.prevNextEvent, function () {
                return advance(opts, 1);
            });
        if (opts.prev)
            $(opts.prev).bind(opts.prevNextEvent, function () {
                return advance(opts, 0);
            });
        if (opts.pager || opts.pagerAnchorBuilder)
            buildPager(els, opts);

        exposeAddSlide(opts, els);

        return opts;
    }

// save off original opts so we can restore after clearing state
    function saveOriginalOpts(opts) {
        opts.original = { before: [], after: [] };
        opts.original.cssBefore = $.extend({}, opts.cssBefore);
        opts.original.cssAfter = $.extend({}, opts.cssAfter);
        opts.original.animIn = $.extend({}, opts.animIn);
        opts.original.animOut = $.extend({}, opts.animOut);
        $.each(opts.before, function () {
            opts.original.before.push(this);
        });
        $.each(opts.after, function () {
            opts.original.after.push(this);
        });
    }

    function supportMultiTransitions(opts) {
        var i, tx, txs = $.fn.cycle.transitions;
        // look for multiple effects
        if (opts.fx.indexOf(',') > 0) {
            opts.multiFx = true;
            opts.fxs = opts.fx.replace(/\s*/g, '').split(',');
            // discard any bogus effect names
            for (i = 0; i < opts.fxs.length; i++) {
                var fx = opts.fxs[i];
                tx = txs[fx];
                if (!tx || !txs.hasOwnProperty(fx) || !$.isFunction(tx)) {
                    log('discarding unknown transition: ', fx);
                    opts.fxs.splice(i, 1);
                    i--;
                }
            }
            // if we have an empty list then we threw everything away!
            if (!opts.fxs.length) {
                log('No valid transitions named; slideshow terminating.');
                return false;
            }
        }
        else if (opts.fx == 'all') {  // auto-gen the list of transitions
            opts.multiFx = true;
            opts.fxs = [];
            for (var p in txs) {
                if (txs.hasOwnProperty(p)) {
                    tx = txs[p];
                    if (txs.hasOwnProperty(p) && $.isFunction(tx))
                        opts.fxs.push(p);
                }
            }
        }
        if (opts.multiFx && opts.randomizeEffects) {
            // munge the fxs array to make effect selection random
            var r1 = Math.floor(Math.random() * 20) + 30;
            for (i = 0; i < r1; i++) {
                var r2 = Math.floor(Math.random() * opts.fxs.length);
                opts.fxs.push(opts.fxs.splice(r2, 1)[0]);
            }
            debug('randomized fx sequence: ', opts.fxs);
        }
        return true;
    }

// provide a mechanism for adding slides after the slideshow has started
    function exposeAddSlide(opts, els) {
        opts.addSlide = function (newSlide, prepend) {
            var $s = $(newSlide), s = $s[0];
            if (!opts.autostopCount)
                opts.countdown++;
            els[prepend ? 'unshift' : 'push'](s);
            if (opts.els)
                opts.els[prepend ? 'unshift' : 'push'](s); // shuffle needs this
            opts.slideCount = els.length;

            // add the slide to the random map and resort
            if (opts.random) {
                opts.randomMap.push(opts.slideCount - 1);
                opts.randomMap.sort(function (a, b) {
                    return Math.random() - 0.5;
                });
            }

            $s.css('position', 'absolute');
            $s[prepend ? 'prependTo' : 'appendTo'](opts.$cont);

            if (prepend) {
                opts.currSlide++;
                opts.nextSlide++;
            }

            if (!$.support.opacity && opts.cleartype && !opts.cleartypeNoBg)
                clearTypeFix($s);

            if (opts.fit && opts.width)
                $s.width(opts.width);
            if (opts.fit && opts.height && opts.height != 'auto')
                $s.height(opts.height);
            s.cycleH = (opts.fit && opts.height) ? opts.height : $s.height();
            s.cycleW = (opts.fit && opts.width) ? opts.width : $s.width();

            $s.css(opts.cssBefore);

            if (opts.pager || opts.pagerAnchorBuilder)
                $.fn.cycle.createPagerAnchor(els.length - 1, s, $(opts.pager), els, opts);

            if ($.isFunction(opts.onAddSlide))
                opts.onAddSlide($s);
            else
                $s.hide(); // default behavior
        };
    }

// reset internal state; we do this on every pass in order to support multiple effects
    $.fn.cycle.resetState = function (opts, fx) {
        fx = fx || opts.fx;
        opts.before = [];
        opts.after = [];
        opts.cssBefore = $.extend({}, opts.original.cssBefore);
        opts.cssAfter = $.extend({}, opts.original.cssAfter);
        opts.animIn = $.extend({}, opts.original.animIn);
        opts.animOut = $.extend({}, opts.original.animOut);
        opts.fxFn = null;
        $.each(opts.original.before, function () {
            opts.before.push(this);
        });
        $.each(opts.original.after, function () {
            opts.after.push(this);
        });

        // re-init
        var init = $.fn.cycle.transitions[fx];
        if ($.isFunction(init))
            init(opts.$cont, $(opts.elements), opts);
    };

// this is the main engine fn, it handles the timeouts, callbacks and slide index mgmt
    function go(els, opts, manual, fwd) {
        var p = opts.$cont[0], curr = els[opts.currSlide], next = els[opts.nextSlide];

        // opts.busy is true if we're in the middle of an animation
        if (manual && opts.busy && opts.manualTrump) {
            // let manual transitions requests trump active ones
            debug('manualTrump in go(), stopping active transition');
            $(els).stop(true, true);
            opts.busy = 0;
            clearTimeout(p.cycleTimeout);
        }

        // don't begin another timeout-based transition if there is one active
        if (opts.busy) {
            debug('transition active, ignoring new tx request');
            return;
        }


        // stop cycling if we have an outstanding stop request
        if (p.cycleStop != opts.stopCount || p.cycleTimeout === 0 && !manual)
            return;

        // check to see if we should stop cycling based on autostop options
        if (!manual && !p.cyclePause && !opts.bounce &&
            ((opts.autostop && (--opts.countdown <= 0)) ||
                (opts.nowrap && !opts.random && opts.nextSlide < opts.currSlide))) {
            if (opts.end)
                opts.end(opts);
            return;
        }

        // if slideshow is paused, only transition on a manual trigger
        var changed = false;
        if ((manual || !p.cyclePause) && (opts.nextSlide != opts.currSlide)) {
            changed = true;
            var fx = opts.fx;
            // keep trying to get the slide size if we don't have it yet
            curr.cycleH = curr.cycleH || $(curr).height();
            curr.cycleW = curr.cycleW || $(curr).width();
            next.cycleH = next.cycleH || $(next).height();
            next.cycleW = next.cycleW || $(next).width();

            // support multiple transition types
            if (opts.multiFx) {
                if (fwd && (opts.lastFx === undefined || ++opts.lastFx >= opts.fxs.length))
                    opts.lastFx = 0;
                else if (!fwd && (opts.lastFx === undefined || --opts.lastFx < 0))
                    opts.lastFx = opts.fxs.length - 1;
                fx = opts.fxs[opts.lastFx];
            }

            // one-time fx overrides apply to:  $('div').cycle(3,'zoom');
            if (opts.oneTimeFx) {
                fx = opts.oneTimeFx;
                opts.oneTimeFx = null;
            }

            $.fn.cycle.resetState(opts, fx);

            // run the before callbacks
            if (opts.before.length)
                $.each(opts.before, function (i, o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });

            // stage the after callacks
            var after = function () {
                opts.busy = 0;
                $.each(opts.after, function (i, o) {
                    if (p.cycleStop != opts.stopCount) return;
                    o.apply(next, [curr, next, opts, fwd]);
                });
                if (!p.cycleStop) {
                    // queue next transition
                    queueNext();
                }
            };

            debug('tx firing(' + fx + '); currSlide: ' + opts.currSlide + '; nextSlide: ' + opts.nextSlide);

            // get ready to perform the transition
            opts.busy = 1;
            if (opts.fxFn) // fx function provided?
                opts.fxFn(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else if ($.isFunction($.fn.cycle[opts.fx])) // fx plugin ?
                $.fn.cycle[opts.fx](curr, next, opts, after, fwd, manual && opts.fastOnEvent);
            else
                $.fn.cycle.custom(curr, next, opts, after, fwd, manual && opts.fastOnEvent);
        }
        else {
            queueNext();
        }

        if (changed || opts.nextSlide == opts.currSlide) {
            // calculate the next slide
            var roll;
            opts.lastSlide = opts.currSlide;
            if (opts.random) {
                opts.currSlide = opts.nextSlide;
                if (++opts.randomIndex == els.length) {
                    opts.randomIndex = 0;
                    opts.randomMap.sort(function (a, b) {
                        return Math.random() - 0.5;
                    });
                }
                opts.nextSlide = opts.randomMap[opts.randomIndex];
                if (opts.nextSlide == opts.currSlide)
                    opts.nextSlide = (opts.currSlide == opts.slideCount - 1) ? 0 : opts.currSlide + 1;
            }
            else if (opts.backwards) {
                roll = (opts.nextSlide - 1) < 0;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = 1;
                    opts.currSlide = 0;
                }
                else {
                    opts.nextSlide = roll ? (els.length - 1) : opts.nextSlide - 1;
                    opts.currSlide = roll ? 0 : opts.nextSlide + 1;
                }
            }
            else { // sequence
                roll = (opts.nextSlide + 1) == els.length;
                if (roll && opts.bounce) {
                    opts.backwards = !opts.backwards;
                    opts.nextSlide = els.length - 2;
                    opts.currSlide = els.length - 1;
                }
                else {
                    opts.nextSlide = roll ? 0 : opts.nextSlide + 1;
                    opts.currSlide = roll ? els.length - 1 : opts.nextSlide - 1;
                }
            }
        }
        if (changed && opts.pager)
            opts.updateActivePagerLink(opts.pager, opts.currSlide, opts.activePagerClass);

        function queueNext() {
            // stage the next transition
            var ms = 0, timeout = opts.timeout;
            if (opts.timeout && !opts.continuous) {
                ms = getTimeout(els[opts.currSlide], els[opts.nextSlide], opts, fwd);
                if (opts.fx == 'shuffle')
                    ms -= opts.speedOut;
            }
            else if (opts.continuous && p.cyclePause) // continuous shows work off an after callback, not this timer logic
                ms = 10;
            if (ms > 0)
                p.cycleTimeout = setTimeout(function () {
                    go(els, opts, 0, !opts.backwards);
                }, ms);
        }
    }

// invoked after transition
    $.fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
        $(pager).each(function () {
            $(this).children().removeClass(clsName).eq(currSlide).addClass(clsName);
        });
    };

// calculate timeout value for current transition
    function getTimeout(curr, next, opts, fwd) {
        if (opts.timeoutFn) {
            // call user provided calc fn
            var t = opts.timeoutFn.call(curr, curr, next, opts, fwd);
            while (opts.fx != 'none' && (t - opts.speed) < 250) // sanitize timeout
                t += opts.speed;
            debug('calculated timeout: ' + t + '; speed: ' + opts.speed);
            if (t !== false)
                return t;
        }
        return opts.timeout;
    }

// expose next/prev function, caller must pass in state
    $.fn.cycle.next = function (opts) {
        advance(opts, 1);
    };
    $.fn.cycle.prev = function (opts) {
        advance(opts, 0);
    };

// advance slide forward or back
    function advance(opts, moveForward) {
        var val = moveForward ? 1 : -1;
        var els = opts.elements;
        var p = opts.$cont[0], timeout = p.cycleTimeout;
        if (timeout) {
            clearTimeout(timeout);
            p.cycleTimeout = 0;
        }
        if (opts.random && val < 0) {
            // move back to the previously display slide
            opts.randomIndex--;
            if (--opts.randomIndex == -2)
                opts.randomIndex = els.length - 2;
            else if (opts.randomIndex == -1)
                opts.randomIndex = els.length - 1;
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else if (opts.random) {
            opts.nextSlide = opts.randomMap[opts.randomIndex];
        }
        else {
            opts.nextSlide = opts.currSlide + val;
            if (opts.nextSlide < 0) {
                if (opts.nowrap) return false;
                opts.nextSlide = els.length - 1;
            }
            else if (opts.nextSlide >= els.length) {
                if (opts.nowrap) return false;
                opts.nextSlide = 0;
            }
        }

        var cb = opts.onPrevNextEvent || opts.prevNextClick; // prevNextClick is deprecated
        if ($.isFunction(cb))
            cb(val > 0, opts.nextSlide, els[opts.nextSlide]);
        go(els, opts, 1, moveForward);
        return false;
    }

    function buildPager(els, opts) {
        var $p = $(opts.pager);
        $.each(els, function (i, o) {
            $.fn.cycle.createPagerAnchor(i, o, $p, els, opts);
        });
        opts.updateActivePagerLink(opts.pager, opts.startingSlide, opts.activePagerClass);
    }

    $.fn.cycle.createPagerAnchor = function (i, el, $p, els, opts) {
        var a;
        if ($.isFunction(opts.pagerAnchorBuilder)) {
            a = opts.pagerAnchorBuilder(i, el);
            debug('pagerAnchorBuilder(' + i + ', el) returned: ' + a);
        }
        else
            a = '<a href="#">' + (i + 1) + '</a>';

        if (!a)
            return;
        var $a = $(a);
        // don't reparent if anchor is in the dom
        if ($a.parents('body').length === 0) {
            var arr = [];
            if ($p.length > 1) {
                $p.each(function () {
                    var $clone = $a.clone(true);
                    $(this).append($clone);
                    arr.push($clone[0]);
                });
                $a = $(arr);
            }
            else {
                $a.appendTo($p);
            }
        }

        opts.pagerAnchors = opts.pagerAnchors || [];
        opts.pagerAnchors.push($a);

        var pagerFn = function (e) {
            e.preventDefault();
            opts.nextSlide = i;
            var p = opts.$cont[0], timeout = p.cycleTimeout;
            if (timeout) {
                clearTimeout(timeout);
                p.cycleTimeout = 0;
            }
            var cb = opts.onPagerEvent || opts.pagerClick; // pagerClick is deprecated
            if ($.isFunction(cb))
                cb(opts.nextSlide, els[opts.nextSlide]);
            go(els, opts, 1, opts.currSlide < i); // trigger the trans
//		return false; // <== allow bubble
        };

        if (/mouseenter|mouseover/i.test(opts.pagerEvent)) {
            $a.hover(pagerFn, function () {/* no-op */
            });
        }
        else {
            $a.bind(opts.pagerEvent, pagerFn);
        }

        if (!/^click/.test(opts.pagerEvent) && !opts.allowPagerClickBubble)
            $a.bind('click.cycle', function () {
                return false;
            }); // suppress click

        var cont = opts.$cont[0];
        var pauseFlag = false; // https://github.com/malsup/cycle/issues/44
        if (opts.pauseOnPagerHover) {
            $a.hover(
                function () {
                    pauseFlag = true;
                    cont.cyclePause++;
                    triggerPause(cont, true, true);
                }, function () {
                    if (pauseFlag)
                        cont.cyclePause--;
                    triggerPause(cont, true, true);
                }
            );
        }
    };

// helper fn to calculate the number of slides between the current and the next
    $.fn.cycle.hopsFromLast = function (opts, fwd) {
        var hops, l = opts.lastSlide, c = opts.currSlide;
        if (fwd)
            hops = c > l ? c - l : opts.slideCount - l;
        else
            hops = c < l ? l - c : l + opts.slideCount - c;
        return hops;
    };

// fix clearType problems in ie6 by setting an explicit bg color
// (otherwise text slides look horrible during a fade transition)
    function clearTypeFix($slides) {
        debug('applying clearType background-color hack');
        function hex(s) {
            s = parseInt(s, 10).toString(16);
            return s.length < 2 ? '0' + s : s;
        }

        function getBg(e) {
            for (; e && e.nodeName.toLowerCase() != 'html'; e = e.parentNode) {
                var v = $.css(e, 'background-color');
                if (v && v.indexOf('rgb') >= 0) {
                    var rgb = v.match(/\d+/g);
                    return '#' + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                }
                if (v && v != 'transparent')
                    return v;
            }
            return '#ffffff';
        }

        $slides.each(function () {
            $(this).css('background-color', getBg(this));
        });
    }

// reset common props before the next transition
    $.fn.cycle.commonReset = function (curr, next, opts, w, h, rev) {
        $(opts.elements).not(curr).hide();
        if (typeof opts.cssBefore.opacity == 'undefined')
            opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        if (opts.slideResize && w !== false && next.cycleW > 0)
            opts.cssBefore.width = next.cycleW;
        if (opts.slideResize && h !== false && next.cycleH > 0)
            opts.cssBefore.height = next.cycleH;
        opts.cssAfter = opts.cssAfter || {};
        opts.cssAfter.display = 'none';
        $(curr).css('zIndex', opts.slideCount + (rev === true ? 1 : 0));
        $(next).css('zIndex', opts.slideCount + (rev === true ? 0 : 1));
    };

// the actual fn for effecting a transition
    $.fn.cycle.custom = function (curr, next, opts, cb, fwd, speedOverride) {
        var $l = $(curr), $n = $(next);
        var speedIn = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut;
        $n.css(opts.cssBefore);
        if (speedOverride) {
            if (typeof speedOverride == 'number')
                speedIn = speedOut = speedOverride;
            else
                speedIn = speedOut = 1;
            easeIn = easeOut = null;
        }
        var fn = function () {
            $n.animate(opts.animIn, speedIn, easeIn, function () {
                cb();
            });
        };
        $l.animate(opts.animOut, speedOut, easeOut, function () {
            $l.css(opts.cssAfter);
            if (!opts.sync)
                fn();
        });
        if (opts.sync) fn();
    };

// transition definitions - only fade is defined here, transition pack defines the rest
    $.fn.cycle.transitions = {
        fade: function ($cont, $slides, opts) {
            $slides.not(':eq(' + opts.currSlide + ')').css('opacity', 0);
            opts.before.push(function (curr, next, opts) {
                $.fn.cycle.commonReset(curr, next, opts);
                opts.cssBefore.opacity = 0;
            });
            opts.animIn = { opacity: 1 };
            opts.animOut = { opacity: 0 };
            opts.cssBefore = { top: 0, left: 0 };
        }
    };

    $.fn.cycle.ver = function () {
        return ver;
    };

// override these globally if you like (they are all optional)
    $.fn.cycle.defaults = {
        activePagerClass: 'activeSlide', // class name used for the active pager link
        after: null,     // transition callback (scope set to element that was shown):  function(currSlideElement, nextSlideElement, options, forwardFlag)
        allowPagerClickBubble: false, // allows or prevents click event on pager anchors from bubbling
        animIn: null,     // properties that define how the slide animates in
        animOut: null,     // properties that define how the slide animates out
        aspect: false,    // preserve aspect ratio during fit resizing, cropping if necessary (must be used with fit option)
        autostop: 0,        // true to end slideshow after X transitions (where X == slide count)
        autostopCount: 0,        // number of transitions (optionally used with autostop to define X)
        backwards: false,    // true to start slideshow at last slide and move backwards through the stack
        before: null,     // transition callback (scope set to element to be shown):     function(currSlideElement, nextSlideElement, options, forwardFlag)
        center: null,     // set to true to have cycle add top/left margin to each slide (use with width and height options)
        cleartype: !$.support.opacity,  // true if clearType corrections should be applied (for IE)
        cleartypeNoBg: false,    // set to true to disable extra cleartype fixing (leave false to force background color setting on slides)
        containerResize: 1,        // resize container to fit largest slide
        continuous: 0,        // true to start next transition immediately after current one completes
        cssAfter: null,     // properties that defined the state of the slide after transitioning out
        cssBefore: null,     // properties that define the initial state of the slide before transitioning in
        delay: 0,        // additional delay (in ms) for first transition (hint: can be negative)
        easeIn: null,     // easing for "in" transition
        easeOut: null,     // easing for "out" transition
        easing: null,     // easing method for both in and out transitions
        end: null,     // callback invoked when the slideshow terminates (use with autostop or nowrap options): function(options)
        fastOnEvent: 0,        // force fast transitions when triggered manually (via pager or prev/next); value == time in ms
        fit: 0,        // force slides to fit container
        fx: 'fade',   // name of transition effect (or comma separated names, ex: 'fade,scrollUp,shuffle')
        fxFn: null,     // function used to control the transition: function(currSlideElement, nextSlideElement, options, afterCalback, forwardFlag)
        height: 'auto',   // container height (if the 'fit' option is true, the slides will be set to this height as well)
        manualTrump: true,     // causes manual transition to stop an active transition instead of being ignored
        metaAttr: 'cycle',  // data- attribute that holds the option data for the slideshow
        next: null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for next slide
        nowrap: 0,        // true to prevent slideshow from wrapping
        onPagerEvent: null,     // callback fn for pager events: function(zeroBasedSlideIndex, slideElement)
        onPrevNextEvent: null,     // callback fn for prev/next events: function(isNext, zeroBasedSlideIndex, slideElement)
        pager: null,     // element, jQuery object, or jQuery selector string for the element to use as pager container
        pagerAnchorBuilder: null,   // callback fn for building anchor links:  function(index, DOMelement)
        pagerEvent: 'click.cycle', // name of event which drives the pager navigation
        pause: 0,        // true to enable "pause on hover"
        pauseOnPagerHover: 0,       // true to pause when hovering over pager link
        prev: null,     // element, jQuery object, or jQuery selector string for the element to use as event trigger for previous slide
        prevNextEvent: 'click.cycle',// event which drives the manual transition to the previous or next slide
        random: 0,        // true for random, false for sequence (not applicable to shuffle fx)
        randomizeEffects: 1,        // valid when multiple effects are used; true to make the effect sequence random
        requeueOnImageNotLoaded: true, // requeue the slideshow if any image slides are not yet loaded
        requeueTimeout: 250,      // ms delay for requeue
        rev: 0,        // causes animations to transition in reverse (for effects that support it such as scrollHorz/scrollVert/shuffle)
        shuffle: null,     // coords for shuffle animation, ex: { top:15, left: 200 }
        skipInitializationCallbacks: false, // set to true to disable the first before/after callback that occurs prior to any transition
        slideExpr: null,     // expression for selecting slides (if something other than all children is required)
        slideResize: 1,        // force slide width/height to fixed size before every transition
        speed: 1000,     // speed of the transition (any valid fx speed value)
        speedIn: null,     // speed of the 'in' transition
        speedOut: null,     // speed of the 'out' transition
        startingSlide: undefined,// zero-based index of the first slide to be displayed
        sync: 1,        // true if in/out transitions should occur simultaneously
        timeout: 4000,     // milliseconds between slide transitions (0 to disable auto advance)
        timeoutFn: null,     // callback for determining per-slide timeout value:  function(currSlideElement, nextSlideElement, options, forwardFlag)
        updateActivePagerLink: null,// callback fn invoked to update the active pager link (adds/removes activePagerClass style)
        width: null      // container width (if the 'fit' option is true, the slides will be set to this width as well)
    };

})(jQuery);


/*!
 * jQuery Cycle Plugin Transition Definitions
 * This script is a plugin for the jQuery Cycle Plugin
 * Examples and documentation at: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Version:	 2.73
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
    "use strict";

//
// These functions define slide initialization and properties for the named
// transitions. To save file size feel free to remove any of these that you
// don't need.
//
    $.fn.cycle.transitions.none = function ($cont, $slides, opts) {
        opts.fxFn = function (curr, next, opts, after) {
            $(next).show();
            $(curr).hide();
            after();
        };
    };

// not a cross-fade, fadeout only fades out the top slide
    $.fn.cycle.transitions.fadeout = function ($cont, $slides, opts) {
        $slides.not(':eq(' + opts.currSlide + ')').css({ display: 'block', 'opacity': 1 });
        opts.before.push(function (curr, next, opts, w, h, rev) {
            $(curr).css('zIndex', opts.slideCount + (rev !== true ? 1 : 0));
            $(next).css('zIndex', opts.slideCount + (rev !== true ? 0 : 1));
        });
        opts.animIn.opacity = 1;
        opts.animOut.opacity = 0;
        opts.cssBefore.opacity = 1;
        opts.cssBefore.display = 'block';
        opts.cssAfter.zIndex = 0;
    };

// scrollUp/Down/Left/Right
    $.fn.cycle.transitions.scrollUp = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.cssFirst.top = 0;
        opts.animIn.top = 0;
        opts.animOut.top = -h;
    };
    $.fn.cycle.transitions.scrollDown = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var h = $cont.height();
        opts.cssFirst.top = 0;
        opts.cssBefore.top = -h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
    $.fn.cycle.transitions.scrollLeft = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = 0 - w;
    };
    $.fn.cycle.transitions.scrollRight = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push($.fn.cycle.commonReset);
        var w = $cont.width();
        opts.cssFirst.left = 0;
        opts.cssBefore.left = -w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
    $.fn.cycle.transitions.scrollHorz = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.left = fwd ? (next.cycleW - 1) : (1 - next.cycleW);
            opts.animOut.left = fwd ? -curr.cycleW : curr.cycleW;
        });
        opts.cssFirst.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = 0;
    };
    $.fn.cycle.transitions.scrollVert = function ($cont, $slides, opts) {
        $cont.css('overflow', 'hidden');
        opts.before.push(function (curr, next, opts, fwd) {
            if (opts.rev)
                fwd = !fwd;
            $.fn.cycle.commonReset(curr, next, opts);
            opts.cssBefore.top = fwd ? (1 - next.cycleH) : (next.cycleH - 1);
            opts.animOut.top = fwd ? curr.cycleH : -curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.left = 0;
    };

// slideX/slideY
    $.fn.cycle.transitions.slideX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.width = 'show';
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.slideY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $(opts.elements).not(curr).hide();
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animIn.height = 'show';
        opts.animOut.height = 0;
    };

// shuffle
    $.fn.cycle.transitions.shuffle = function ($cont, $slides, opts) {
        var i, w = $cont.css('overflow', 'visible').width();
        $slides.css({left: 0, top: 0});
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
        });
        // only adjust speed once!
        if (!opts.speedAdjusted) {
            opts.speed = opts.speed / 2; // shuffle has 2 transitions
            opts.speedAdjusted = true;
        }
        opts.random = 0;
        opts.shuffle = opts.shuffle || {left: -w, top: 15};
        opts.els = [];
        for (i = 0; i < $slides.length; i++)
            opts.els.push($slides[i]);

        for (i = 0; i < opts.currSlide; i++)
            opts.els.push(opts.els.shift());

        // custom transition fn (hat tip to Benjamin Sterling for this bit of sweetness!)
        opts.fxFn = function (curr, next, opts, cb, fwd) {
            if (opts.rev)
                fwd = !fwd;
            var $el = fwd ? $(curr) : $(next);
            $(next).css(opts.cssBefore);
            var count = opts.slideCount;
            $el.animate(opts.shuffle, opts.speedIn, opts.easeIn, function () {
                var hops = $.fn.cycle.hopsFromLast(opts, fwd);
                for (var k = 0; k < hops; k++) {
                    if (fwd)
                        opts.els.push(opts.els.shift());
                    else
                        opts.els.unshift(opts.els.pop());
                }
                if (fwd) {
                    for (var i = 0, len = opts.els.length; i < len; i++)
                        $(opts.els[i]).css('z-index', len - i + count);
                }
                else {
                    var z = $(curr).css('z-index');
                    $el.css('z-index', parseInt(z, 10) + 1 + count);
                }
                $el.animate({left: 0, top: 0}, opts.speedOut, opts.easeOut, function () {
                    $(fwd ? this : curr).hide();
                    if (cb) cb();
                });
            });
        };
        $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
    };

// turnUp/Down/Left/Right
    $.fn.cycle.transitions.turnUp = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = next.cycleH;
            opts.animIn.height = next.cycleH;
            opts.animOut.width = next.cycleW;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.height = 0;
        opts.animIn.top = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnDown = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssFirst.top = 0;
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.height = 0;
        opts.animOut.height = 0;
    };
    $.fn.cycle.transitions.turnLeft = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = next.cycleW;
            opts.animIn.width = next.cycleW;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };
    $.fn.cycle.transitions.turnRight = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        $.extend(opts.cssBefore, { top: 0, left: 0, width: 0 });
        opts.animIn.left = 0;
        opts.animOut.width = 0;
    };

// zoom
    $.fn.cycle.transitions.zoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.cssBefore.left = next.cycleW / 2;
            $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
            $.extend(opts.animOut, { width: 0, height: 0, top: curr.cycleH / 2, left: curr.cycleW / 2 });
        });
        opts.cssFirst.top = 0;
        opts.cssFirst.left = 0;
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
    };

// fadeZoom
    $.fn.cycle.transitions.fadeZoom = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, false);
            opts.cssBefore.left = next.cycleW / 2;
            opts.cssBefore.top = next.cycleH / 2;
            $.extend(opts.animIn, { top: 0, left: 0, width: next.cycleW, height: next.cycleH });
        });
        opts.cssBefore.width = 0;
        opts.cssBefore.height = 0;
        opts.animOut.opacity = 0;
    };

// blindX
    $.fn.cycle.transitions.blindX = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.width = next.cycleW;
            opts.animOut.left = curr.cycleW;
        });
        opts.cssBefore.left = w;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
        opts.animOut.left = w;
    };
// blindY
    $.fn.cycle.transitions.blindY = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = 0;
        opts.animIn.top = 0;
        opts.animOut.top = h;
    };
// blindZ
    $.fn.cycle.transitions.blindZ = function ($cont, $slides, opts) {
        var h = $cont.css('overflow', 'hidden').height();
        var w = $cont.width();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH;
        });
        opts.cssBefore.top = h;
        opts.cssBefore.left = w;
        opts.animIn.top = 0;
        opts.animIn.left = 0;
        opts.animOut.top = h;
        opts.animOut.left = w;
    };

// growX - grow horizontally from centered 0 width
    $.fn.cycle.transitions.growX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true);
            opts.cssBefore.left = this.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
// growY - grow vertically from centered 0 height
    $.fn.cycle.transitions.growY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false);
            opts.cssBefore.top = this.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = this.cycleH;
            opts.animOut.top = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };

// curtainX - squeeze in both edges horizontally
    $.fn.cycle.transitions.curtainX = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, false, true, true);
            opts.cssBefore.left = next.cycleW / 2;
            opts.animIn.left = 0;
            opts.animIn.width = this.cycleW;
            opts.animOut.left = curr.cycleW / 2;
            opts.animOut.width = 0;
        });
        opts.cssBefore.top = 0;
        opts.cssBefore.width = 0;
    };
// curtainY - squeeze in both edges vertically
    $.fn.cycle.transitions.curtainY = function ($cont, $slides, opts) {
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, false, true);
            opts.cssBefore.top = next.cycleH / 2;
            opts.animIn.top = 0;
            opts.animIn.height = next.cycleH;
            opts.animOut.top = curr.cycleH / 2;
            opts.animOut.height = 0;
        });
        opts.cssBefore.height = 0;
        opts.cssBefore.left = 0;
    };

// cover - curr slide covered by next slide
    $.fn.cycle.transitions.cover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts);
            if (d == 'right')
                opts.cssBefore.left = -w;
            else if (d == 'up')
                opts.cssBefore.top = h;
            else if (d == 'down')
                opts.cssBefore.top = -h;
            else
                opts.cssBefore.left = w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };

// uncover - curr slide moves off next slide
    $.fn.cycle.transitions.uncover = function ($cont, $slides, opts) {
        var d = opts.direction || 'left';
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            if (d == 'right')
                opts.animOut.left = w;
            else if (d == 'up')
                opts.animOut.top = -h;
            else if (d == 'down')
                opts.animOut.top = h;
            else
                opts.animOut.left = -w;
        });
        opts.animIn.left = 0;
        opts.animIn.top = 0;
        opts.cssBefore.top = 0;
        opts.cssBefore.left = 0;
    };

// toss - move top slide and fade away
    $.fn.cycle.transitions.toss = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'visible').width();
        var h = $cont.height();
        opts.before.push(function (curr, next, opts) {
            $.fn.cycle.commonReset(curr, next, opts, true, true, true);
            // provide default toss settings if animOut not provided
            if (!opts.animOut.left && !opts.animOut.top)
                $.extend(opts.animOut, { left: w * 2, top: -h / 2, opacity: 0 });
            else
                opts.animOut.opacity = 0;
        });
        opts.cssBefore.left = 0;
        opts.cssBefore.top = 0;
        opts.animIn.left = 0;
    };

// wipe - clip animation
    $.fn.cycle.transitions.wipe = function ($cont, $slides, opts) {
        var w = $cont.css('overflow', 'hidden').width();
        var h = $cont.height();
        opts.cssBefore = opts.cssBefore || {};
        var clip;
        if (opts.clip) {
            if (/l2r/.test(opts.clip))
                clip = 'rect(0px 0px ' + h + 'px 0px)';
            else if (/r2l/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px ' + h + 'px ' + w + 'px)';
            else if (/t2b/.test(opts.clip))
                clip = 'rect(0px ' + w + 'px 0px 0px)';
            else if (/b2t/.test(opts.clip))
                clip = 'rect(' + h + 'px ' + w + 'px ' + h + 'px 0px)';
            else if (/zoom/.test(opts.clip)) {
                var top = parseInt(h / 2, 10);
                var left = parseInt(w / 2, 10);
                clip = 'rect(' + top + 'px ' + left + 'px ' + top + 'px ' + left + 'px)';
            }
        }

        opts.cssBefore.clip = opts.cssBefore.clip || clip || 'rect(0px 0px 0px 0px)';

        var d = opts.cssBefore.clip.match(/(\d+)/g);
        var t = parseInt(d[0], 10), r = parseInt(d[1], 10), b = parseInt(d[2], 10), l = parseInt(d[3], 10);

        opts.before.push(function (curr, next, opts) {
            if (curr == next) return;
            var $curr = $(curr), $next = $(next);
            $.fn.cycle.commonReset(curr, next, opts, true, true, false);
            opts.cssAfter.display = 'block';

            var step = 1, count = parseInt((opts.speedIn / 13), 10) - 1;
            (function f() {
                var tt = t ? t - parseInt(step * (t / count), 10) : 0;
                var ll = l ? l - parseInt(step * (l / count), 10) : 0;
                var bb = b < h ? b + parseInt(step * ((h - b) / count || 1), 10) : h;
                var rr = r < w ? r + parseInt(step * ((w - r) / count || 1), 10) : w;
                $next.css({ clip: 'rect(' + tt + 'px ' + rr + 'px ' + bb + 'px ' + ll + 'px)' });
                (step++ <= count) ? setTimeout(f, 13) : $curr.css('display', 'none');
            })();
        });
        $.extend(opts.cssBefore, { display: 'block', opacity: 1, top: 0, left: 0 });
        opts.animIn = { left: 0 };
        opts.animOut = { left: 0 };
    };

})(jQuery);
/* /etc/designs/dhl/docroot/js/lib/jquery/jquery.MediaGallery.js */
(function ($) {

    /**
     * The "global" configuration which is the same for all MediaGalleries on the page
     * @type {Object}
     */
    var config = {

        imageSlider: {
            sliderElementSelector: "a.lightbox"
        },

        lightbox: {
            isInitialised: false,

            overlay: null,
            baseElement: null,
            closeButton: null,
            headline: null,
            loadingAnimation: null,

            gallery: {
                baseElement: null,
                nextBtn: null,
                prevBtn: null,
                elementContainer: null,
                dynamicTabSelector: ".dynamic_tabs ul li a"
            },

            imageSlider: {
                baseElement: null,
                nextBtn: null,
                prevBtn: null,
                elementContainer: null
            },

            pager: null
        }

    }


    var methods = {

        /**
         * Collect the data out of the HTML Structure
         *
         * @param {Object} sourceStructure The pointer to the structure to collect the data from
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         * @return {Object} The collected Data
         */
        collectDataFromHTML: function (sourceStructure, mediaGallerySettings, mediaGalleryState, isRelatedContent) {
            var collectedData = {};

            //Add the gallery Title to the collected data
            var titleElementSelector = "h2";
            if (isRelatedContent) {
                titleElementSelector = "h4"
            }
            collectedData["title"] = sourceStructure.find(titleElementSelector).text();

            //Prepare content array
            collectedData["contents"] = [];
            collectedData["numberOfElements"] = 0;

            //Collect the contents of each element
            sourceStructure.find(mediaGallerySettings.galleryElementSelector).each(function (i) {
                collectedData["contents"][i] = {};

                //get the media "caption"
                collectedData["contents"][i]["caption"] = {};

                var captionHeadlineSelector = mediaGallerySettings.galleryElementCaptionHeadlineSelector;
                if (isRelatedContent) {
                    var captionHeadlineSelector = mediaGallerySettings.galleryElementRelatedCaptionHeadlineSelector;
                }
                collectedData["contents"][i]["caption"]["headline"] = $.trim($(this).find(captionHeadlineSelector).text());
                collectedData["contents"][i]["caption"]["description"] = $.trim($(this).find(mediaGallerySettings.galleryElementCaptionDescriptionSelector).text());

                //get the media content
                collectedData["contents"][i]["media"] = $.trim($(this).find(mediaGallerySettings.galleryElementMediaSelector).html());

                //get the download content
                collectedData["contents"][i]["download"] = $.trim($(this).find(mediaGallerySettings.galleryElementDownloadSelector).html());

                //get the links content
                collectedData["contents"][i]["links"] = $.trim($(this).find(mediaGallerySettings.galleryElementLinksSelector).html());

                //get the info content
                collectedData["contents"][i]["info"] = $.trim($(this).find(mediaGallerySettings.galleryElementInfoSelector).html());

                //get the thumbnails
                collectedData["contents"][i]["thumbnails"] = {};


                //get the large thumb
                var largeThumb = $(this).find(mediaGallerySettings.galleryElementThumbnailsLargeSelector);

                collectedData["contents"][i]["thumbnails"]["large"] = "<img src=\"" + largeThumb.text() + "\" width=\"204\" />";


                //get the medium thumb
                var mediumThumb = $(this).find(mediaGallerySettings.galleryElementThumbnailsMediumSelector);

                collectedData["contents"][i]["thumbnails"]["medium"] = "<img src=\"" + mediumThumb.text() + "\" width=\"136\" />";


                //get the small thumb
                var smallThumb = $(this).find(mediaGallerySettings.galleryElementThumbnailsSmallSelector);

                collectedData["contents"][i]["thumbnails"]["small"] = "<img src=\"" + smallThumb.text() + "\" width=\"89\" />";


                //get the related content if desired
                if (mediaGallerySettings.showRelatedContent && !isRelatedContent) {

                    collectedData["contents"][i]["relatedContents"] = methods.collectDataFromHTML($(this).find(mediaGallerySettings.galleryElementRelatedContentSelector), mediaGallerySettings, mediaGalleryState, true);
                }


                //raise the number of related content-/elements
                collectedData["numberOfElements"]++;


                //closeButtonText from html
                var closeButtonText = sourceStructure.find(mediaGallerySettings.galleryElementCloseButtonTextSelector).html();
                if (typeof closeButtonText !== "undefined" && closeButtonText !== "") {

                    mediaGallerySettings.closeButtonText = closeButtonText;
                }

            });

            return collectedData;
        },


        /**
         * Initialise the in image slider in the content area by building it's HTML Structure and returning an object with information/pointers of/to the slider
         *
         * @param {Object} mediaGallery A pointer to the  MediaGallery source structure
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         * @return {Object} The object containing the information/pointers of the image slider
         */
        initOnPageImageSlider: function (mediaGallery, mediaGalleryData, mediaGallerySettings) {

            var onPageImageSlider = "<div class=\"image_slider\">";


            //hide headline if empty
            var imageSliderTitle = mediaGalleryData.title;
            if (typeof imageSliderTitle === "undefined" || imageSliderTitle === "" || mediaGallerySettings.hideOnPageSliderTitle) {

                onPageImageSlider += "<h2 style=\"display:none;\"></h2>";
            }
            else {
                onPageImageSlider += "	<h2>" + mediaGalleryData.title + "</h2>";
            }


            onPageImageSlider += "	<img width=\"15\" height=\"43\" class=\"next\" alt=\"\" src=\"/img/nextbtn.gif\">" +
                "	<img width=\"15\" height=\"43\" class=\"prev\" alt=\"\" src=\"/img/prevbtn.gif\">" +
                " <div class=\"slider_outer\">" +
                "		<div class=\"slider_inner\">";


            //get the number of Elements
            var numberOfElements = mediaGalleryData.numberOfElements;

            //Add a link for each gallery element
            for (var i = 0; i < numberOfElements; i++) {

                onPageImageSlider += "<a class=\"lightbox\" href=\"javascript:;\">" +
                    mediaGalleryData.contents[i].thumbnails.medium +
                    "</a>";
            }


            onPageImageSlider += "		</div>" +
                "	</div>" +
                "</div>";


            //create an image slider object to prevent overusing of "find"
            var imageSlider = {};

            //append the image slider into the page and add it to the image slider object
            imageSlider["baseElement"] = $(onPageImageSlider).insertBefore(mediaGallery);

            //add a pointer to the next and prev button to the image slider object
            imageSlider["nextBtn"] = imageSlider.baseElement.find(".next");
            imageSlider["prevBtn"] = imageSlider.baseElement.find(".prev");

            //add the image slider element container to the object
            imageSlider["elementContainer"] = imageSlider.baseElement.find(".slider_inner");

            //add the number of visible thumbnails
            imageSlider["numberOfVisibleThumbnails"] = mediaGallerySettings.numberOfThumbnailsOnPage;

            //add the stepwidth to the image slider
            var imageSliderElement = imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector);
            imageSlider["stepWidth"] = parseInt(imageSliderElement.width()) + parseInt(imageSliderElement.css("margin-right"));

            //init the slidePosition
            imageSlider["slidePosition"] = 0;

            //add the minimum slide position
            imageSlider["minSlidePosition"] = 0;

            //add the maximum slide position
            if (numberOfElements <= imageSlider.numberOfVisibleThumbnails) {

                imageSlider["maxSlidePosition"] = 0;
            }
            else {

                imageSlider["maxSlidePosition"] = (imageSlider.stepWidth * (numberOfElements - imageSlider.numberOfVisibleThumbnails)) * -1;
            }

            //add is animated Flag
            imageSlider["isAnimated"];

            return imageSlider;
        },


        /**
         * Initialise the in tab image slider by building it's HTML Structure and returning an object with information/pointers of/to the slider
         *
         * @param {Object} mediaGallery A pointer to the  MediaGallery source structure
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @return {Object} The object containing the information/pointers of the image slider
         */
        initInTabImageSlider: function (mediaGallery, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {
            var inTabImageSlider = "<div class=\"inner\">";

            for (var i = 0, len = mediaGalleryData.numberOfElements; i < len; i++) {

                inTabImageSlider += "	<div class=\"slide\">" +
                    "		<h2>" + mediaGalleryData.contents[i].caption.headline + "</h2>" +
                    "		<a class=\"lightbox\" href=\"javascript:;\" >" +
                    "			" + mediaGalleryData.contents[i].thumbnails.large +
                    "			<span class=\"image_descr\">" + mediaGalleryData.contents[i].caption.description + "</span>" +
                    "		</a>" +
                    "	</div>";
            }

            inTabImageSlider += "</div>";


            //create an image slider object to prevent overusing of "find"
            var imageSlider = {};

            //add the image slider element container to the object
            imageSlider["elementContainer"] = $(inTabImageSlider).insertBefore(mediaGallery);

            //add the number of visible thumbnails
            imageSlider["numberOfVisibleThumbnails"] = mediaGallerySettings.numberOfThumbnailsInTab;

            //add galleryTogglerElements selector to the object
            imageSlider["sliderElementSelector"] = ".slide " + config.imageSlider.sliderElementSelector;

            return imageSlider;
        },


        /**
         * Initialise the lightbox by building it's HTML Structure and saving pointers to it in a "global" config object
         */
        initLightbox: function (mediaGallerySettings) {
            var pageOverlayHTML = "<div class=\"gallery_overlay\"></div>";

            config.lightbox.overlay = $(pageOverlayHTML).appendTo("body");


            var lightboxHTML = "<div id=\"gallery\">" +
                "	<div class=\"close\">" + mediaGallerySettings.closeButtonText + "</div>" +
                "	<div class=\"gallery_inner\">" +
                "		<h2></h2>" +
                "		<div class=\"zoom_outer\">" +
                "			<a class=\"zoom_next\"></a>" +
                "			<a class=\"zoom_prev\"></a>" +
                "			<div class=\"zoom_inner\">" +
                "			</div>" +
                "		</div>" +
                "		<div class=\"zoom_slider\">" +
                "			<img src=\"/img/nextbtn.gif\" width=\"15\" height=\"43\" alt=\"next\" class=\"next\" />" +
                "			<img src=\"/img/prevbtn.gif\" width=\"15\" height=\"43\" alt=\"prev\" class=\"prev\" />" +
                "			<div class=\"slider_outer\">" +
                "				<h3>&nbsp;</h3>" +
                "				<div class=\"slider_inner\">" +
                "				</div>" +
                "			</div>" +
                "		</div>" +
                "		<div class=\"zoom_pager\"></div>"
            "	</div>" +
            "</div>";


            var lightboxElement = $(lightboxHTML).appendTo("body");

            //insert the lightbox element als baseElement to the config
            config.lightbox.baseElement = lightboxElement;

            //insert the close button to the config
            config.lightbox.closeButton = lightboxElement.find(".close");

            //insert the headline element to the config
            config.lightbox.headline = lightboxElement.find(".gallery_inner h2");

            //insert the lightbix gallery's next button, prev button and element container to the config
            config.lightbox.gallery.baseElement = lightboxElement.find(".gallery_inner .zoom_outer");
            config.lightbox.gallery.nextBtn = lightboxElement.find(".gallery_inner .zoom_outer .zoom_next");
            config.lightbox.gallery.prevBtn = lightboxElement.find(".gallery_inner .zoom_outer .zoom_prev");
            config.lightbox.gallery.elementContainer = lightboxElement.find(".gallery_inner .zoom_outer .zoom_inner");

            //insert the lightbox slider's next button, prev button and element container to the config
            config.lightbox.imageSlider.baseElement = lightboxElement.find(".gallery_inner .zoom_slider");
            config.lightbox.imageSlider.nextBtn = lightboxElement.find(".gallery_inner .zoom_slider .next");
            config.lightbox.imageSlider.prevBtn = lightboxElement.find(".gallery_inner .zoom_slider .prev");
            config.lightbox.imageSlider.elementContainer = lightboxElement.find(".gallery_inner .zoom_slider .slider_outer .slider_inner");

            //insert the lightbox pager to the cofig
            config.lightbox.pager = lightboxElement.find(".gallery_inner .zoom_pager");

            //flag that the lightbox has been initialized
            config.lightbox.isInitialised = true;
        },


        /**
         * Register the events for the image slider in the content of the page
         *
         * @param {Object} imageSlider The object containing the information/pointers of the image slider
         * @param {Object} mediaGalleryData The Data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current State of the MediaGallery
         */
        registerOnPageImageSliderEvents: function (imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //register next btn click event
            imageSlider.nextBtn.click(function () {

                methods.slideToNextElement(imageSlider, mediaGallerySettings.imageSliderSpeed);
                methods.updateImageSliderButtons(imageSlider);
            });

            //register prev btn click event
            imageSlider.prevBtn.click(function () {

                methods.slideToPreviousElement(imageSlider, mediaGallerySettings.imageSliderSpeed);
                methods.updateImageSliderButtons(imageSlider);
            });

            //register thumbnail click event
            imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector).click(function () {

                methods.openLightboxGallery($(this).index(), mediaGalleryData, mediaGallerySettings, mediaGalleryState);
            });
        },


        /**
         * Slide to the previous element with the given speed (over the given time)
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {number} speed The speed in which to slide/the duration of sliding
         */
        slideToNextElement: function (imageSlider, speed) {

            if (!imageSlider.isAnimated) {

                //imageSlider.isAnimated = true;
                imageSlider.slidePosition -= imageSlider.stepWidth;

                methods.slideToPosition(imageSlider, imageSlider.slidePosition, speed)
            }
        },


        /**
         * Slide to the previous element with the given speed (over the given time)
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {number} speed The speed in which to slide/the duration of sliding
         */
        slideToPreviousElement: function (imageSlider, speed) {

            if (!imageSlider.isAnimated) {

                //imageSlider.isAnimated = true;
                imageSlider.slidePosition += imageSlider.stepWidth;

                methods.slideToPosition(imageSlider, imageSlider.slidePosition, speed);
            }
        },


        /**
         * Lets the slider slide to the given position with the given speed (over the given time)
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {number} position The position to slide to
         * @param {number} speed The speed in which to slide/the duration of sliding
         */
        slideToPosition: function (imageSlider, position, speed) {
            imageSlider.isAnimated = true;

            imageSlider.elementContainer.animate({"margin-left": position}, speed, function () {

                imageSlider.isAnimated = false;
            });
        },


        /**
         * Update the image slider buttons displaying/hiding the next/prev button if there is no next/previous element
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         */
        updateImageSliderButtons: function (imageSlider) {

            //imageslider next button management
            if (imageSlider.slidePosition === imageSlider.maxSlidePosition) {

                imageSlider.nextBtn.hide();
            }
            else if (imageSlider.nextBtn.is(":hidden")) { //TODO: Check if calling the show method without first checking if the element is hidden is quicker (performance)

                imageSlider.nextBtn.show();
            }

            //imagesloder prev button management
            if (imageSlider.slidePosition === imageSlider.minSlidePosition) {
                imageSlider.prevBtn.hide();
            }
            else if (imageSlider.prevBtn.is(":hidden")) { //TODO: Check if calling the show method without first checking if the element is hidden is quicker (performance)
                imageSlider.prevBtn.show();
            }

        },


        /**
         * Initialise the events for the image slider in a tab module
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        registerInTabImageSliderEvents: function (imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //register thumbnail click event
            imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector).click(function () {

                methods.openLightboxGallery($(this).parent(".slide").index(), mediaGalleryData, mediaGallerySettings, mediaGalleryState);
            });
        },


        /**
         * Register the Events of the lightbox itself (not the lightbox gallery/-contnet or the lightbox slider)
         *
         * @param {Object} mediaGallerySettings The settings of the media gallery
         */
        registerLightboxEvents: function (mediaGallerySettings, mediaGalleryState) {

            //register the closeButton event
            config.lightbox.closeButton.click(function () {

                methods.closeLightboxGallery(mediaGallerySettings, mediaGalleryState);
            });

            //register the click event for clicking on the overlay
            config.lightbox.overlay.click(function () {

                methods.closeLightboxGallery(mediaGallerySettings, mediaGalleryState);
            });

        },


        /**
         * Close the lightbox gallery
         *
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         */
        closeLightboxGallery: function (mediaGallerySettings, mediaGalleryState) {

            //hide the lightbox
            config.lightbox.overlay.fadeOut(mediaGallerySettings.lightboxFadeOutDuration).removeAttr("style");
            config.lightbox.baseElement.fadeOut(mediaGallerySettings.lightboxFadeOutDuration).removeAttr("style");

            //TODO: Check if the lightbox gallery and the lightbox slider should realy be emptied in any case


            //reset the gallery content
            methods.resetLightboxGallery();


            //reset the gallery slider
            config.lightbox.imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector).unbind("click");//TODO: unbind('click') not needed if click event can be bind once instead of with every gallery opening
            config.lightbox.imageSlider.nextBtn.show().unbind("click");
            config.lightbox.imageSlider.prevBtn.show().unbind("click");
            config.lightbox.imageSlider.baseElement.find("h3").html("&nbsp;");
            config.lightbox.imageSlider.baseElement.show();
            config.lightbox.imageSlider.baseElement.find(".slider_outer").removeClass("related_content_slider");
            config.lightbox.imageSlider.elementContainer.removeAttr("style").empty();

            //reset media gallery state vars if neccessary
            mediaGalleryState.isRelatedContent = false;

            //ie resets
            if ($.browser.msie) {
                config.lightbox.pager.removeAttr("style");
            }
        },


        /**
         * Open the lightbox gallery showing the selected element in the lightbox gallery content
         *
         * @param {number} selectedElementIndex The index of the selected element
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        openLightboxGallery: function (selectedElementIndex, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            mediaGalleryState.activeElementIndex = selectedElementIndex;

            methods.initLoadingAnimation();

            methods.showLightbox(mediaGallerySettings);

            methods.updateCloseButton(mediaGallerySettings); //TODO: Check if there is a way to update the close button before the box is displayed to prevent possible "jumping" of it's icon and text

            methods.initLightboxGalleryContent(mediaGalleryData, mediaGallerySettings, mediaGalleryState);

            methods.initDynamicTabs(mediaGalleryState);

            //prepare content vs. related content differences
            var lightboxSliderData = mediaGalleryData;
            var omitActiveElementHighlighting = false;

            if (typeof mediaGallerySettings.showRelatedContent !== "undefined" && mediaGallerySettings.showRelatedContent) {

                lightboxSliderData = mediaGalleryData.contents[mediaGalleryState.activeElementIndex].relatedContents;
                omitActiveElementHighlighting = true;
            }

            var lightboxSlider = methods.initLightboxImageSlider(lightboxSliderData, mediaGallerySettings);

            methods.updateLightboxGalleryPager(mediaGalleryData, mediaGallerySettings, mediaGalleryState);

            methods.updateLightboxGalleryButtons(mediaGalleryData, mediaGallerySettings, mediaGalleryState);

            methods.updateLightboxImageSlider(lightboxSlider, lightboxSliderData, mediaGallerySettings, mediaGalleryState, omitActiveElementHighlighting);

            methods.updateImageSliderButtons(lightboxSlider);

            methods.updateLightboxOverlay(mediaGallerySettings);

            //TODO: Try registering the lightbox gallery events once and not on every gallery opening
            methods.registerLightboxGalleryEvents(lightboxSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState);

            methods.registerLightboxSliderEvents(lightboxSlider, lightboxSliderData, mediaGallerySettings, mediaGalleryState);
        },


        /**
         * Show the lightbox
         *
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         */
        showLightbox: function (mediaGallerySettings) {

            var windowInnerWidth = $(window).innerWidth();
            var windowInnerHeight = $(window).innerHeight();

            var windowScrollTop = $(window).scrollTop();
            var windowScrollLeft = $(window).scrollLeft();


            var lightboxHeight = parseInt(config.lightbox.baseElement.height()); //TODO: Eventually add margin top to the height because of the close button
            var lightboxWidth = parseInt(config.lightbox.baseElement.width());

            var lightboxPositionLeft = 0;
            if (windowInnerWidth > lightboxWidth) {

                lightboxPositionLeft = Math.floor((windowInnerWidth - lightboxWidth) / 2) + windowScrollLeft;
            }
            else {
                lightboxPositionLeft = windowScrollLeft;
            }

            var lightboxPositionTop = 0;
            if (windowInnerHeight > lightboxHeight) {

                lightboxPositionTop = Math.floor((windowInnerHeight - lightboxHeight) / 2) + windowScrollTop;
            }
            else {
                lightboxPositionTop = windowScrollTop;
            }

            config.lightbox.baseElement.css({
                //display: "block",
                top: lightboxPositionTop,
                left: lightboxPositionLeft,
                zIndex: 9999,
                height: "auto"
            }).fadeIn(mediaGallerySettings.lightboxFadeInDuration);

            methods.updateLightboxOverlay(mediaGallerySettings, true);
        },


        /**
         * Initialise the loading animation content
         */
        initLoadingAnimation: function () {

            var loadingAnimationContent = "<div class=\"loadingAnimation\">&nbsp;</div>";

            config.lightbox.loadingAnimation = $(loadingAnimationContent).appendTo(config.lightbox.gallery.elementContainer);
        },


        /**
         * Initialise the lightbox gallery content by building it's HTML
         *
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGalleryState The settings of the MediaGallery
         * @param {Object} mediaGallerySettings The current state of the MediaGallery
         */
        initLightboxGalleryContent: function (mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            for (var i = 0, len = mediaGalleryData.numberOfElements; i < len; i++) {


                var contentElementHTML = "<div class=\"zoom_content\">" +
                    "	<div class=\"zoom_image\">";


                //add the mediacontent to the html
                contentElementHTML += mediaGalleryData.contents[i].media;


                //get additional contents
                var downloadContent = mediaGalleryData.contents[i].download;
                var infoContent = mediaGalleryData.contents[i].info;
                var linkContent = mediaGalleryData.contents[i].links;


                //check if download content is present
                var hasDownloadContent = false;
                if (typeof  downloadContent !== "undefined" && downloadContent !== "") {

                    hasDownloadContent = true
                }


                //check if link content is present
                var hasLinkContent = false;
                if (typeof linkContent !== "undefined" && linkContent !== "") {

                    hasLinkContent = true;
                }


                //check if info content is present
                var hasInfoContent = false;
                if (typeof infoContent !== "undefined" && infoContent !== "") {

                    hasInfoContent = true;
                }

                //check if ie and add style for ie specific stuff
                var ieStyle = "";
                if (!hasDownloadContent && !hasLinkContent && !hasInfoContent && $.browser.msie) {

                    ieStyle = " style=\"height:0px;line-height:0px;overflow:hidden;background-position:0 0;\"";
                }

                contentElementHTML += "	</div>" +
                    "	<div class=\"dynamic_tabs\"" + ieStyle + ">";


                var contentTabs = "";

                //add download content if present
                if (hasDownloadContent) {

                    contentTabs += "<li>" +
                        " <a class=\"download_tab\" href=\"javascript:;\"></a>";
                    "</li>"
                }


                //add info content is present
                if (hasLinkContent) {

                    contentTabs += "<li>" +
                        " <a class=\"link_tab\" href=\"javascript:;\"></a>";
                    "</li>"
                }


                //add info content is present
                if (hasInfoContent) {

                    contentTabs += "<li>" +
                        " <a class=\"info_tab\" href=\"javascript:;\"></a>";
                    "</li>"
                }


                //add list of tabs of at least one additional content is present
                if (hasDownloadContent || hasInfoContent || hasLinkContent) {

                    contentElementHTML += "<ul>" +
                        contentTabs +
                        "</ul>"
                }

                //add the download content if present
                if (hasDownloadContent) {

                    contentElementHTML += "<div class=\"download_tab\">" +
                        downloadContent +
                        "</div>"
                }

                //add the link content if present
                if (hasLinkContent) {

                    contentElementHTML += "<div class=\"link_tab\">" +
                        linkContent +
                        "</div>"
                }

                //add the info content if present
                if (hasInfoContent) {

                    contentElementHTML += "<div class=\"info_tab\">" +
                        infoContent +
                        "</div>"
                }


                contentElementHTML += "	</div>" +
                    "</div>";

                //if element is the active(clicked) one
                if (i === mediaGalleryState.activeElementIndex) {

                    //add a pointer to the element to the gallery state object
                    mediaGalleryState.activeElement = $(contentElementHTML).appendTo(config.lightbox.gallery.elementContainer);
                }
                else {

                    //just add the element to the element container
                    config.lightbox.gallery.elementContainer.append(contentElementHTML);
                }


            }

            //remove the loading animation
            config.lightbox.loadingAnimation.remove();


            //show the general headline if forced od the active element headline is empty
            var activeElementHeadline = mediaGalleryData.contents[mediaGalleryState.activeElementIndex].caption.headline;

            var lightboxHeadline = "";
            if (!mediaGallerySettings.forceGlobalHeadline && activeElementHeadline !== "") {

                lightboxHeadline = activeElementHeadline;
            }
            else {
                lightboxHeadline = mediaGalleryData.title;
            }

            //hide headline if empty, else show it
            if (typeof lightboxHeadline === "undefined" || lightboxHeadline === "") {

                config.lightbox.headline.hide();
            }
            else {

                config.lightbox.headline.text(lightboxHeadline).show();
            }


            //display the clicked element
            mediaGalleryState.activeElement.fadeIn(mediaGallerySettings.contentFadeDuration);

            mediaGalleryState.dynamicTabsOpened = true;
        },


        /**
         * Initialise the dynamic tabs by setting it to it'S default state
         *
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        initDynamicTabs: function (mediaGalleryState) { //TODO: Try refactoring this method to reduce the DOM accesses if possible

            config.lightbox.gallery.elementContainer.find(".dynamic_tabs ul li").removeClass("active");
            config.lightbox.gallery.elementContainer.find(".dynamic_tabs div").hide();

            mediaGalleryState.activeElement.find(".dynamic_tabs ul li:first").addClass("active");
            mediaGalleryState.activeElement.find(".dynamic_tabs div:first").show();
        },


        /**
         * Initialise the image slider  within the lightbox by building it'S HTML stucture
         *
         * @param {Object} mediaGalleryData The data of the MediaGallery
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        initLightboxImageSlider: function (mediaGalleryData, mediaGallerySettings) {

            //get the number of elements
            var numberOfElements = mediaGalleryData.numberOfElements;

            if (numberOfElements === 1 && !mediaGallerySettings.showRelatedContent
                || numberOfElements < 1 && mediaGallerySettings.showRelatedContent) {

                config.lightbox.imageSlider.baseElement.hide();
            }
            else {

                if (/*mediaGallerySettings.isVideoGallery || */mediaGallerySettings.showRelatedContent || mediaGallerySettings.showHeadlineAboveLightboxSlider) { //TODO: Remove comment around "mediaGallerySettings.isVideoGallery ||" if a video gallery should be handled like related content

                    config.lightbox.imageSlider.baseElement.find("h3").text(mediaGalleryData.title);
                }

                for (var i = 0; i < numberOfElements; i++) {
                    var sliderElementHTML = "";


                    sliderElementHTML += "<a class=\"lightbox\" href=\"javascript:;\">"


                    var numberOfThumbnails = mediaGallerySettings.numberOfThumbnailsInLightbox;
                    if (typeof numberOfThumbnails === "undefinded" || numberOfThumbnails === 6) {

                        sliderElementHTML += "		<span class=\"thumb\">" +
                            //"			<img src=\""+mediaGalleryData.contents[i].thumbnails.small+"\" width=\"89\" alt=\"\"/>" +
                            mediaGalleryData.contents[i].thumbnails.small +
                            "		</span>";

                        //config.lightbox.imageSlider.elementContainer.attr("id","smallSlides");
                        config.lightbox.imageSlider.baseElement.attr("id", "smallSlides");
                    }
                    else if (numberOfThumbnails === 4) {

                        sliderElementHTML += "		<span class=\"thumb\">" +
                            //"			<img src=\""+mediaGalleryData.contents[i].thumbnails.medium+"\" width=\"136\" alt=\"\"/>" +
                            mediaGalleryData.contents[i].thumbnails.medium +
                            "		</span>";

                        //config.lightbox.imageSlider.elementContainer.attr("id","mediumSlides");
                        config.lightbox.imageSlider.baseElement.attr("id", "mediumSlides");
                    }


                    //add caption text in case of video or related content
                    if (mediaGallerySettings.showRelatedContent || mediaGallerySettings.isVideoGallery) {

                        sliderElementHTML += "	<span class=\"caption\">" + mediaGalleryData.contents[i].caption.description + "</span>";
                    }

                    sliderElementHTML += "	</a>";


                    //append the slider element to the slider
                    config.lightbox.imageSlider.elementContainer.append(sliderElementHTML);
                }
            }


            //add related content slider class to slider outer
            if (mediaGallerySettings.showRelatedContent) {
                config.lightbox.imageSlider.baseElement.find(".slider_outer").addClass("related_content_slider");
            }


            //create an image slider object to prevent overusing of "find"
            var imageSlider = {};

            //append the image slider into the page and add it to the image slider object
            imageSlider["baseElement"] = config.lightbox.imageSlider.baseElement;//$(onPageImageSlider).insertBefore(mediagallery);

            //add a pointer to the next and prev button to the image slider object
            imageSlider["nextBtn"] = config.lightbox.imageSlider.nextBtn;//imageSlider.baseElement.find(".next");
            imageSlider["prevBtn"] = config.lightbox.imageSlider.prevBtn;//imageSlider.baseElement.find(".prev");

            //add the image slider element container to the object
            imageSlider["elementContainer"] = config.lightbox.imageSlider.elementContainer;//imageSlider.baseElement.find(".slider_inner");

            //add the number of visible thumbnails
            imageSlider["numberOfVisibleThumbnails"] = mediaGallerySettings.numberOfThumbnailsInLightbox;

            //add the stepwidth to the image slider
            var imageSliderElement = imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector);
            imageSlider["stepWidth"] = parseInt(imageSliderElement.width()) + parseInt(imageSliderElement.css("margin-right"));

            //init the slidePosition
            imageSlider["slidePosition"] = 0;

            //add the minimum slide position
            imageSlider["minSlidePosition"] = 0;

            //add the maximum slide position
            if (numberOfElements <= imageSlider.numberOfVisibleThumbnails) {

                imageSlider["maxSlidePosition"] = 0
            }
            else {

                imageSlider["maxSlidePosition"] = (imageSlider.stepWidth * (numberOfElements - imageSlider.numberOfVisibleThumbnails)) * -1;
            }

            //add is animated Flag
            imageSlider["isAnimated"];

            return imageSlider;
        },


        /**
         * Register the events of the gallery/content within the lightbox
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        registerLightboxGalleryEvents: function (imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //register the next button event
            config.lightbox.gallery.nextBtn.click(function () {
                var selectedElementIndex = mediaGalleryState.activeElementIndex + 1;

                methods.switchLightboxGalleryContent(selectedElementIndex, mediaGallerySettings, mediaGalleryState);
                methods.initDynamicTabs(mediaGalleryState);
                methods.updateLightboxHeadline(selectedElementIndex, mediaGalleryData, mediaGallerySettings);
                methods.updateLightboxGalleryPager(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxGalleryButtons(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxImageSlider(imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateImageSliderButtons(imageSlider);
                methods.updateLightboxOverlay(mediaGallerySettings);
            });

            //register the prev button event
            config.lightbox.gallery.prevBtn.click(function () {
                var selectedElementIndex = mediaGalleryState.activeElementIndex - 1;

                methods.switchLightboxGalleryContent(selectedElementIndex, mediaGallerySettings, mediaGalleryState);
                methods.initDynamicTabs(mediaGalleryState);
                methods.updateLightboxHeadline(selectedElementIndex, mediaGalleryData, mediaGallerySettings);
                methods.updateLightboxGalleryPager(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxGalleryButtons(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxImageSlider(imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateImageSliderButtons(imageSlider);
                methods.updateLightboxOverlay(mediaGallerySettings);
            });


            //define info tab selector
            var dynamicTabSelector = config.lightbox.gallery.dynamicTabSelector;


            //register info tab click event
            config.lightbox.gallery.elementContainer.find(dynamicTabSelector).click(function () {

                methods.manageDynamicTabDisplay($(this), mediaGallerySettings, mediaGalleryState);
            });

            //register info tab hover event
            config.lightbox.gallery.elementContainer.find(dynamicTabSelector).hover(function () {

                if (mediaGalleryState.dynamicTabsOpened) {

                    methods.switchDynamicTab($(this), mediaGalleryState);
                }
            });

        },


        /**
         * Register the events for the slider within the lightbox
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        registerLightboxSliderEvents: function (imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //register next btn click event
            imageSlider.nextBtn.click(function () {

                methods.slideToNextElement(imageSlider);
                methods.updateImageSliderButtons(imageSlider);
            });

            //register prev btn click event
            imageSlider.prevBtn.click(function () {

                methods.slideToPreviousElement(imageSlider);
                methods.updateImageSliderButtons(imageSlider);
            });

            imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector).click(function () {
                var selectedElementIndex = $(this).index();

                if (mediaGallerySettings.showRelatedContent && !mediaGalleryState.isRelatedContent) {

                    methods.hideActiveElement(mediaGallerySettings, mediaGalleryState);
                    methods.resetLightboxGallery();

                    mediaGalleryState.activeElementIndex = selectedElementIndex;
                    mediaGalleryState.isRelatedContent = true;

                    methods.initLightboxGalleryContent(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                    methods.registerLightboxGalleryEvents(imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState)

                }
                else {

                    methods.switchLightboxGalleryContent(selectedElementIndex, mediaGallerySettings, mediaGalleryState);
                }
                methods.initDynamicTabs(mediaGalleryState);
                methods.updateLightboxHeadline(selectedElementIndex, mediaGalleryData, mediaGallerySettings);
                methods.updateLightboxGalleryPager(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxGalleryButtons(mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateLightboxImageSlider(imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState);
                methods.updateImageSliderButtons(imageSlider);
                methods.updateLightboxOverlay(mediaGallerySettings);
            });
        },


        /**
         * Switches the gallery to the selected element
         *
         * @param {number} elementIndex The index of the element to switch to
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        switchLightboxGalleryContent: function (elementIndex, mediaGallerySettings, mediaGalleryState) {


            //hide the current active element
            methods.hideActiveElement(mediaGallerySettings, mediaGalleryState);

            //set new active element index
            mediaGalleryState.activeElementIndex = elementIndex;

            //set the new active element
            mediaGalleryState.activeElement = config.lightbox.gallery.elementContainer.children(":eq(" + mediaGalleryState.activeElementIndex + ")");

            //show the new active element
            mediaGalleryState.activeElement.fadeIn(mediaGallerySettings.contentFadeDuration);

            //Reset the dynamic tabs opened state to true
            mediaGalleryState.dynamicTabsOpened = true;
        },


        /**
         * Switches to the selected dynamic tab (containing additional data on the current element)
         *
         * @param {Object} selectedTab The pointer to the selected tab
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        switchDynamicTab: function (selectedTab, mediaGalleryState) { //TODO: Try refactoring this method to reduce the DOM accesses if possible
            var tabClass = selectedTab.attr("class");

            mediaGalleryState.activeElement.find(".dynamic_tabs ul li").removeClass("active");
            mediaGalleryState.activeElement.find(".dynamic_tabs div").hide();

            selectedTab.parent("li").addClass("active");
            mediaGalleryState.activeElement.find(".dynamic_tabs div." + tabClass).show();
        },


        /**
         * Manages the displaying of the selected dynamic tab (containing additional data on the current element)
         *
         * @param {Object} selectedTab The pointer to the selected tab
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        manageDynamicTabDisplay: function (selectedTab, mediaGallerySettings, mediaGalleryState) {//TODO: Try refactoring this method to reduce the DOM accesses if possible
            var tabClass = selectedTab.attr("class");

            if (mediaGalleryState.dynamicTabsOpened) {

                selectedTab.parent("li").removeClass("active");
                mediaGalleryState.activeElement.find(".dynamic_tabs div." + tabClass).slideUp(mediaGallerySettings.dynamicTabSlideDuration, function () {

                    selectedTab.parents("ul").addClass("closed");
                });//hide();

                mediaGalleryState.dynamicTabsOpened = false;
            }
            else {

                selectedTab.parent("li").addClass("active");
                selectedTab.parents("ul").removeClass("closed");
                mediaGalleryState.activeElement.find(".dynamic_tabs div." + tabClass).slideDown(mediaGallerySettings.dynamicTabSlideDuration);//show();

                mediaGalleryState.dynamicTabsOpened = true;
            }

        },


        /**
         * Updates the lightbix gallery buttons displaying/hiding the next/prev button according to if there is a next/previous element
         *
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        updateLightboxGalleryButtons: function (mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //next button management
            if (mediaGalleryState.activeElementIndex === (mediaGalleryData.numberOfElements - 1) || mediaGallerySettings.showRelatedContent) {

                config.lightbox.gallery.nextBtn.hide();
            }
            else if (config.lightbox.gallery.nextBtn.is(":hidden")) { //TODO: Check if calling the show method without first checking if the element is hidden is quicker (performance)
                config.lightbox.gallery.nextBtn.show();
            }

            //prev button management
            if (mediaGalleryState.activeElementIndex === 0 || mediaGallerySettings.showRelatedContent) {

                config.lightbox.gallery.prevBtn.hide();
            }
            else if (config.lightbox.gallery.prevBtn.is(":hidden")) { //TODO: Check if calling the show method without first checking if the element is hidden is quicker (performance)
                config.lightbox.gallery.prevBtn.show();
            }
        },


        /**
         * Updates the gallery "pager" showing the x of y elements text
         *
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         */
        updateLightboxGalleryPager: function (mediaGalleryData, mediaGallerySettings, mediaGalleryState) {

            //get the number of elements
            var numberOfElements = mediaGalleryData.numberOfElements;

            //get the related elements and their amount
            var relatedElements = mediaGalleryData.contents[mediaGalleryState.activeElementIndex].relatedContents;
            var numberOfRelatedElements = 0;

            if (typeof relatedElements !== "undefined") {
                numberOfRelatedElements = relatedElements.numberOfElements;
            }


            if ((mediaGallerySettings.showRelatedContent && numberOfRelatedElements >= 1) || mediaGalleryState.isRelatedContent/* || mediaGallerySettings.isVideoGallery*/) { //TODO: Remove comment around "mediaGallerySettings.isVideoGallery" if a video gallery should be handled like related content

                config.lightbox.pager.html("");

                if ($.browser.msie) {
                    config.lightbox.pager.css({
                        height: "0px",
                        lineHeight: "0px"
                    });
                }
            }
            else if ((mediaGallerySettings.showRelatedContent && numberOfRelatedElements < 1) || numberOfElements === 1) {

                config.lightbox.pager.html("&nbsp;");
            }
            else {

                //update pager
                config.lightbox.pager.text((mediaGalleryState.activeElementIndex + 1) + "/" + numberOfElements);
            }
        },


        /**
         * Updates the image slider within the lightbox to slide to the appropriate position for the selected slider/content element
         *
         * @param {Object} imageSlider The object containing the information/pointers of the slider
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         * @param {Object} mediaGalleryState The current state of the MediaGallery
         * @param {Object} omitHighlighting Determines whether the element with the activeElementIndex in the image slider should not be highlighted
         */
        updateLightboxImageSlider: function (imageSlider, mediaGalleryData, mediaGallerySettings, mediaGalleryState, omitHighlighting) {

            var activeElementIndex = mediaGalleryState.activeElementIndex;
            var imageSliderElements = imageSlider.elementContainer.find(config.imageSlider.sliderElementSelector);

            imageSliderElements.removeClass("active");

            if (typeof omitHighlighting === "undefined" || !omitHighlighting) {
                imageSliderElements.eq(activeElementIndex).addClass("active");
            }

            //get number of elements
            var numberOfElements = mediaGalleryData.numberOfElements;

            var slideIndexLowerBound = 1;
            var slideIndexUpperBound = numberOfElements - 2;

            var numberOfThumbnails = mediaGallerySettings.numberOfThumbnailsInLightbox;
            if (typeof numberOfThumbnails === "undefined" || numberOfThumbnails === 6) {

                slideIndexLowerBound = 2;
                slideIndexUpperBound = numberOfElements - (numberOfThumbnails / 2);
            }
            else if (numberOfThumbnails === 4) {

                slideIndexLowerBound = 1;
                slideIndexUpperBound = numberOfElements - (numberOfThumbnails / 2);
            }


            var updatedSlidePosition = ((activeElementIndex - slideIndexLowerBound) * imageSlider.stepWidth) * -1;

            if (updatedSlidePosition > imageSlider.minSlidePosition || activeElementIndex <= slideIndexLowerBound) {

                updatedSlidePosition = imageSlider.minSlidePosition;
            }
            else if (updatedSlidePosition < imageSlider.maxSlidePosition || activeElementIndex >= slideIndexUpperBound) {

                updatedSlidePosition = imageSlider.maxSlidePosition;
            }


            //set the slide position to the updated position
            imageSlider.slidePosition = updatedSlidePosition;

            //slide to the new positon
            methods.slideToPosition(imageSlider, imageSlider.slidePosition, mediaGallerySettings.lightboxSliderSpeed);

        },


        /**
         * Hides the active MediaGallery element
         *
         * @param {Object} mediaGallerySettings
         * @param {Object} mediaGalleryState
         */
        hideActiveElement: function (mediaGallerySettings, mediaGalleryState) {

            mediaGalleryState.activeElement.fadeOut(mediaGallerySettings.contentFadeDuration);
        },


        /**
         * Clears/removes the current lightbox gallery content
         */
        resetLightboxGallery: function () {

            config.lightbox.gallery.nextBtn.show().unbind("click"); //TODO: unbind('click') not needed if click event can be bind once instead of with every gallery opening
            config.lightbox.gallery.prevBtn.show().unbind("click");
            config.lightbox.gallery.elementContainer.find(config.lightbox.gallery.dynamicTabSelector).unbind("click").unbind("hover");
            config.lightbox.gallery.elementContainer.empty();
        },


        /**
         * Sets the lightbox headline to the headlinie of the selected element of the gobal headline is not forced
         *
         * @param {Object} mediaGalleryData The data of the MediaGallery collected from the HTML
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         */
        updateLightboxHeadline: function (selectedElementIndex, mediaGalleryData, mediaGallerySettings) {

            if (!mediaGallerySettings.forceGlobalHeadline) {

                var lightboxHeadline = mediaGalleryData.contents[selectedElementIndex].caption.headline;

                //hide headline if empty, else show it
                if (typeof lightboxHeadline === "undefined" || lightboxHeadline === "") {

                    config.lightbox.headline.hide();
                }
                else {

                    config.lightbox.headline.text(lightboxHeadline).show();
                }
            }
        },

        /**
         * Update the close button with the text to use for it in the specific gallery.
         *
         * @param {Object} mediaGallerySettings The settings of the MediaGallery
         */
        updateCloseButton: function (mediaGallerySettings) {
            var closeButton = config.lightbox.closeButton;

            //change the close button text
            closeButton.html(mediaGallerySettings.closeButtonText);


            //get the correct background position
            var backgroundPosition = parseInt(closeButton.innerWidth()) - 17;

            closeButton.css("background-position", backgroundPosition + "px 7px");
        },

        /**
         *
         */
        updateLightboxOverlay: function (mediaGallerySettings, doFade) {
            var pageInnerWidth = $(document).innerWidth();
            var pageInnerHeight = $(document).innerHeight();


            config.lightbox.overlay.css({
                position: "absolute",
                width: pageInnerWidth,
                height: pageInnerHeight
            });

            if (typeof doFade !== "undefined" && doFade) {
                config.lightbox.overlay.fadeIn(mediaGallerySettings.lightboxFadeInDuration);
            }
        }
    }


    $.fn.MediaGallery = function (options) {


        // Create some defaults, extending them with any options that were provided
        var settings = $.extend({
            galleryVariant: "onPage",	//Either "onPage" for a standard slider in the content area or "inTab" for a slider in a tab module, default "onPage"
            numberOfThumbnailsOnPage: 3, //The number of thumbnails to show in the slider on the page, default: 3
            numberOfThumbnailsInTab: 1, //The number of thumbnails to show in the slider in a tab, default: 1
            numberOfThumbnailsInLightbox: 6, //The number of thumbnails to show in the slider in the lightbox, default: 6
            lightboxFadeInDuration: 0, //The duration which it takes the lightbox to fade in, default: 0 ms
            lightboxFadeOutDuration: 0, //The duration which it takes the lightbox to fade out, default: 0 ms
            contentFadeDuration: 0, //The duration which it takes the content to fade in or out, default: 0 ms
            forceGlobalHeadline: true, //Force the lightbox to use a global headline instead of the headline of each element
            imageSliderSpeed: 500, //The duration it takes the imageslider in the content area to slide to the next element, default 500 ms
            lightboxSliderSpeed: 500, //The duration it takes the imageslider in the lightbox to slide to the next element, default 500 ms
            showRelatedContent: false, //If set to true, the image slider in the lightbox will contain the related content instead of all elements of the gallery and the next/prev buttons of the lightbox gallery will be disabled, default: false
            isVideoGallery: false, //If set to true, the pager will be hidden and the slider in the lightbox will be extended with a headline and caption text for each slider element, default: false
            showHeadlineAboveLightboxSlider: false, //If set to true, the global headline will be shown above the thumbnauls in the lighbox slider (do not set to true when "forceGlobalHeadline" is true because globel headline will then appear above the large image and above the thumbs, default: false
            closeButtonText: "close", //The text to show in the close button, default: close
            hideOnPageSliderTitle: false, //If set to true, the headline above the slider in the content area will be hidden, default: false
            dynamicTabSlideDuration: 500, //The duration it takes the dynamic tabs to slide in/out on click, default: 500ms
            galleryElementSelector: "> .galleryElement", //The selector for the content elements within the media gallery, default "> .galleryElement"
            galleryElementCaptionHeadlineSelector: "> .caption h3", //The selector for the caption headline of the content element, default "> .caption h3"
            galleryElementRelatedCaptionHeadlineSelector: "> .caption h5", //The selector for the caption headline of the content elements related contents, default "> .caption h5"
            galleryElementCaptionDescriptionSelector: "> .caption p.description", //The selector for the caption description of the content element, default "> .caption p.description"
            galleryElementMediaSelector: "> .media", //The selector for the media content of the content element, default "> .media"
            galleryElementDownloadSelector: "> .download", //The selector for the dynamic tab "download" of the content element, default "> .download"
            galleryElementLinksSelector: "> .links", //The selector for the dynamic tab "links" of the content element, default "> .links"
            galleryElementInfoSelector: "> .info", //The selector for the dynamic tab "info" of the content element, default "> .info"
            galleryElementThumbnailsSmallSelector: "> .thumbnails .small_thumb", //The selector for the "small_thumb" of the content element, default "> .thumbnails .small_thumb"
            galleryElementThumbnailsMediumSelector: "> .thumbnails .medium_thumb",//The selector for the "medium_thumb" of the content element, default "> .thumbnails .medium_thumb"
            galleryElementThumbnailsLargeSelector: "> .thumbnails .large_thumb",//The selector for the "large_thumb" of the content element, default "> .thumbnails .large_thumb"
            galleryElementRelatedContentSelector: ".relatedContent",//The selector for the related content of the content element, default ".relatedContent"
            galleryElementCloseButtonTextSelector: ".closeButtonText"//The selector for close button text of the media gallery, default ".closeButtonText"
        }, options);


        return this.each(function () {

            /**
             * Variable containing the state of the gallery module
             *
             * @type {Object}
             */
            var state = {

                lighboxSlider: { //the state of the thumbnail slider in the lightbox
                    marginLeft: 0,
                    isAnimated: false
                },

                lighboxGallery: { //the state of the gallery containing the large media in the lightbox
                    marginLeft: 0,
                    isAnimated: false
                },

                activeElementIndex: 0,	//the currently active/selected slider element
                activeElement: null,

                isRelatedContent: false,

                dynamicTabsOpened: false
            }

            var mediaGallery = $(this);

            //Collect data from the HTML Structure
            var data = methods.collectDataFromHTML(mediaGallery, settings, state);

            //START: Initialisation
            var imageSlider = null;

            if (typeof settings.galleryVariant === "undefined" || settings.galleryVariant === "onPage") {

                imageSlider = methods.initOnPageImageSlider(mediaGallery, data, settings);

                //hide the mediaGallery source html
                mediaGallery.hide();

                methods.updateImageSliderButtons(imageSlider, state);

                methods.registerOnPageImageSliderEvents(imageSlider, data, settings, state);
            }
            else if (settings.galleryVariant === "inTab") {

                imageSlider = methods.initInTabImageSlider(mediaGallery, data, settings, state);

                //hide the mediaGallery source html
                mediaGallery.hide();

                methods.registerInTabImageSliderEvents(imageSlider, data, settings, state)
            }
            else {
                mediaGallery.show();
            }


            if (!config.lightbox.isInitialised) {

                methods.initLightbox(settings);
            }

            methods.registerLightboxEvents(settings, state);
            //END: Initialisation

        });

    };
})(jQuery);/* /etc/designs/dhl/docroot/js/modernizr.custom.60388.js */
/* Modernizr 2.6.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-boxshadow-rgba-csstransitions-shiv-cssclasses-prefixed-testprop-testallprops-domprefixes-load
 */
;
window.Modernizr = function (a, b, c) {
    function x(a) {
        j.cssText = a
    }

    function y(a, b) {
        return x(prefixes.join(a + ";") + (b || ""))
    }

    function z(a, b) {
        return typeof a === b
    }

    function A(a, b) {
        return!!~("" + a).indexOf(b)
    }

    function B(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!A(e, "-") && j[e] !== c)return b == "pfx" ? e : !0
        }
        return!1
    }

    function C(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)return d === !1 ? a[e] : z(f, "function") ? f.bind(d || b) : f
        }
        return!1
    }

    function D(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + n.join(d + " ") + d).split(" ");
        return z(b, "string") || z(b, "undefined") ? B(e, b) : (e = (a + " " + o.join(d + " ") + d).split(" "), C(e, b, c))
    }

    var d = "2.6.1", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = "Webkit Moz O ms", n = m.split(" "), o = m.toLowerCase().split(" "), p = {}, q = {}, r = {}, s = [], t = s.slice, u, v = {}.hasOwnProperty, w;
    !z(v, "undefined") && !z(v.call, "undefined") ? w = function (a, b) {
        return v.call(a, b)
    } : w = function (a, b) {
        return b in a && z(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function (b) {
        var c = this;
        if (typeof c != "function")throw new TypeError;
        var d = t.call(arguments, 1), e = function () {
            if (this instanceof e) {
                var a = function () {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(t.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(t.call(arguments)))
        };
        return e
    }), p.rgba = function () {
        return x("background-color:rgba(150,255,150,.5)"), A(j.backgroundColor, "rgba")
    }, p.boxshadow = function () {
        return D("boxShadow")
    }, p.csstransitions = function () {
        return D("transition")
    };
    for (var E in p)w(p, E) && (u = E.toLowerCase(), e[u] = p[E](), s.push((e[u] ? "" : "no-") + u));
    return e.addTest = function (a, b) {
        if (typeof a == "object")for (var d in a)w(a, d) && e.addTest(d, a[d]); else {
            a = a.toLowerCase();
            if (e[a] !== c)return e;
            b = typeof b == "function" ? b() : b, f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, x(""), i = k = null, function (a, b) {
        function k(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function l() {
            var a = r.elements;
            return typeof a == "string" ? a.split(" ") : a
        }

        function m(a) {
            var b = i[a[g]];
            return b || (b = {}, h++, a[g] = h, i[h] = b), b
        }

        function n(a, c, f) {
            c || (c = b);
            if (j)return c.createElement(a);
            f || (f = m(c));
            var g;
            return f.cache[a] ? g = f.cache[a].cloneNode() : e.test(a) ? g = (f.cache[a] = f.createElem(a)).cloneNode() : g = f.createElem(a), g.canHaveChildren && !d.test(a) ? f.frag.appendChild(g) : g
        }

        function o(a, c) {
            a || (a = b);
            if (j)return a.createDocumentFragment();
            c = c || m(a);
            var d = c.frag.cloneNode(), e = 0, f = l(), g = f.length;
            for (; e < g; e++)d.createElement(f[e]);
            return d
        }

        function p(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return r.shivMethods ? n(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + l().join().replace(/\w+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }

        function q(a) {
            a || (a = b);
            var c = m(a);
            return r.shivCSS && !f && !c.hasCSS && (c.hasCSS = !!k(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), j || p(a, c), a
        }

        var c = a.html5 || {}, d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, e = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, f, g = "_html5shiv", h = 0, i = {}, j;
        (function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", f = "hidden"in a, j = a.childNodes.length == 1 || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined"
                }()
            } catch (c) {
                f = !0, j = !0
            }
        })();
        var r = {elements: c.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: c.shivCSS !== !1, supportsUnknownElements: j, shivMethods: c.shivMethods !== !1, type: "default", shivDocument: q, createElement: n, createDocumentFragment: o};
        a.html5 = r, q(b)
    }(this, b), e._version = d, e._domPrefixes = o, e._cssomPrefixes = n, e.testProp = function (a) {
        return B([a])
    }, e.testAllProps = D, e.prefixed = function (a, b, c) {
        return b ? D(a, b, c) : D(a, "pfx")
    }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + s.join(" ") : ""), e
}(this, this.document), function (a, b, c) {
    function d(a) {
        return"[object Function]" == o.call(a)
    }

    function e(a) {
        return"string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return!a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : q = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && m(function () {
                    t.removeChild(l)
                }, 50);
                for (var d in y[c])y[c].hasOwnProperty(d) && y[c][d].onload()
            }
        }

        var j = j || B.errorTimeout, l = b.createElement(a), o = 0, r = 0, u = {t: d, s: c, e: f, a: i, x: j};
        1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, r)
        }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
    }

    function j(a, b, c, d, f) {
        return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this
    }

    function k() {
        var a = B;
        return a.loader = {load: j, i: 0}, a
    }

    var l = b.documentElement, m = a.setTimeout, n = b.getElementsByTagName("script")[0], o = {}.toString, p = [], q = 0, r = "MozAppearance"in l.style, s = r && !!b.createRange().compareNode, t = s ? l : n.parentNode, l = a.opera && "[object Opera]" == o.call(a.opera), l = !!b.attachEvent && !l, u = r ? "object" : l ? "script" : "img", v = l ? "script" : u, w = Array.isArray || function (a) {
        return"[object Array]" == o.call(a)
    }, x = [], y = {}, z = {timeout: function (a, b) {
        return b.length && (a.timeout = b[0]), a
    }}, A, B;
    B = function (a) {
        function b(a) {
            var a = a.split("!"), b = x.length, c = a.pop(), d = a.length, c = {url: c, origUrl: c, prefixes: a}, e, f, g;
            for (f = 0; f < d; f++)g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
            for (f = 0; f < b; f++)c = x[f](c);
            return c
        }

        function g(a, e, f, g, h) {
            var i = b(a), j = i.autoCallback;
            i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function () {
                k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2
            })))
        }

        function h(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))c || (j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    }), g(a, j, b, 0, h); else if (Object(a) === a)for (n in m = function () {
                        var b = 0, c;
                        for (c in a)a.hasOwnProperty(c) && b++;
                        return b
                    }(), a)a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function () {
                        var a = [].slice.call(arguments);
                        k.apply(this, a), l()
                    } : j[n] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), l()
                        }
                    }(k[n])), g(a[n], j, b, n, h))
                } else!c && l()
            }

            var h = !!a.test, i = a.load || a.both, j = a.callback || f, k = j, l = a.complete || f, m, n;
            c(h ? a.yep : a.nope, !!i), i && c(i)
        }

        var i, j, l = this.yepnope.loader;
        if (e(a))g(a, 0, l, 0); else if (w(a))for (i = 0; i < a.length; i++)j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l); else Object(a) === a && h(a, l)
    }, B.addPrefix = function (a, b) {
        z[a] = b
    }, B.addFilter = function (a) {
        x.push(a)
    }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function () {
        b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k = b.createElement("script"), l, o, e = e || B.errorTimeout;
        k.src = a;
        for (o in d)k.setAttribute(o, d[o]);
        c = j ? h : c || f, k.onreadystatechange = k.onload = function () {
            !l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null)
        }, m(function () {
            l || (l = 1, c(1))
        }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var e = b.createElement("link"), j, c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)e.setAttribute(j, d[j]);
        g || (n.parentNode.insertBefore(e, n), m(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};/* /etc/designs/dhl/docroot/js/specialDHL.command.js */
var SpecialDHL = (function () {
    var specialDHL = SpecialDHL || {};

    //EVENT HANDLER
    specialDHL.Event = function () {
        var event = {}
        var eventList = {};

        event.addEventListener = function (e, fn, c) {
            if (eventList[e] === undefined)
                eventList[e] = [];

            eventList[e].push({fn: fn, context: c});
        };

        event.dispatchEvent = function (e, c) {
            //console.log('DISPATCHED EVENT:',e);
            if (eventList[e] !== undefined) {
                for (var a = 0, b = eventList[e].length; a < b; a++) {
                    eventList[e][a].fn.call(eventList[e][a].context, c);
                }
            }
        }

        event.removeEventListener = function (e, fn, c) {
            if (eventList[e] !== undefined) {
                for (var a = 0, b = eventList[e].length; a < b; a++) {
                    if (eventList[e][a].fn == fn && eventList[e][a].context == c)
                        delete eventList[e][a];
                }
            }
        }

        return event;

    };

    return specialDHL;
})();

var SpecialDHL = (function () {
    var specialDHL = SpecialDHL || {};

    specialDHL.Command = function (stage, application, options) {
        var command = {};
        var _stage = stage;
        var _activeMain = 0;
        var _activeSub = 0;
        var _multContents = [];
        var _options = options;
        var _multiviewContainer;


        //Register event handler
        var commandEvents = specialDHL.Event();

        //Register main navigation of the application
        var mainNavigation = SpecialDHL.VerticalNavigationView(_stage, commandEvents, application.nav.items, application.browser, _options);

        //Register the sub navigation of the application
        var subNavigation = SpecialDHL.HorizontalNavigationView(_stage, commandEvents, application.contents[0].nav.items, application.browser, _options);

        //Register the headline view
        var headline = SpecialDHL.HeadlineView(_stage, application.headline, application.contents[0].nav.items[0].headlineClass, application.browser);


        //Register the multi views for the contents

        for (var a = 0, b = application.contents.length; a < b; a++)
            _multContents[a] = SpecialDHL.MultiContentView(_stage, application.contents[a].contents, a, (a == 0) ? true : false);

        //Write Div around multcontents
        _stage.find('.multiview').wrapAll('<div id="multiviewContainer"></div>');
        _multiviewContainer = _stage.find('#multiviewContainer');

        /*
         MAIN NAVIGATION LOGIC
         */

        var nextMainContent = function () {

            _activeMain++;
            if (_activeMain > _multContents.length - 1)
                _activeMain = 0;

            sc_cycle_reset();
            _multiviewContainer.animate({'top': (_activeMain * _stage.height() * (-1)) + 'px'}, (_activeMain == 0) ? (_multContents.length - 1) * _options.verticalSpeed : _options.verticalSpeed)
            subNavigation.update(application.contents[_activeMain].nav.items, _activeSub);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);
        }
        commandEvents.addEventListener('VerticalNavigationView.NEXT', nextMainContent, command);

        var previousMainContent = function () {

            _activeMain--;
            if (_activeMain < 0)
                _activeMain = _multContents.length - 1;

            sc_cycle_reset();
            _multiviewContainer.animate({'top': (_activeMain * _stage.height() * (-1)) + 'px'}, (_activeMain == _multContents.length - 1) ? (_multContents.length - 1) * _options.verticalSpeed : _options.verticalSpeed)
            subNavigation.update(application.contents[_activeMain].nav.items, _activeSub);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);
        }
        commandEvents.addEventListener('VerticalNavigationView.PREVIOUS', previousMainContent, command);

        var jumpMainContent = function (i) {

            var dif = Math.abs(i - _activeMain);
            _activeMain = i;

            sc_cycle_reset();
            _multiviewContainer.animate({'top': (_activeMain * _stage.height() * (-1)) + 'px'}, dif * _options.verticalSpeed)
            subNavigation.update(application.contents[_activeMain].nav.items, _activeSub);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);
        }
        commandEvents.addEventListener('VerticalNavigationView.JUMP_TO', jumpMainContent, command);

        /*
         SUB NAVIGATION LOGIC
         */

        var nextSubContent = function () {

            _activeSub++;
            if (_activeSub > _multContents[_activeMain].getLength() - 1)
                _activeSub = 0;

            sc_cycle_reset();
            _multiviewContainer.animate({'left': (_activeSub * _stage.width() * (-1)) + 'px'}, (_activeSub == 0) ? (_multContents[_activeMain].getLength() - 1) * _options.horizontalSpeed : _options.horizontalSpeed);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);
        }
        commandEvents.addEventListener('HorizontalNavigationView.NEXT', nextSubContent, command);

        var previousSubContent = function () {

            _activeSub--;
            if (_activeSub < 0)
                _activeSub = _multContents[_activeMain].getLength() - 1;

            sc_cycle_reset();
            _multiviewContainer.animate({'left': (_activeSub * _stage.width() * (-1)) + 'px'}, (_activeSub == _multContents[_activeMain].getLength() - 1) ? (_multContents[_activeMain].getLength() - 1) * _options.horizontalSpeed : _options.horizontalSpeed);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);

        }
        commandEvents.addEventListener('HorizontalNavigationView.PREVIOUS', previousSubContent, command);

        var jumpSubContent = function (i) {

            var dif = Math.abs(i - _activeSub);
            _activeSub = i;

            sc_cycle_reset();
            _multiviewContainer.animate({'left': (_activeSub * _stage.width() * (-1)) + 'px'}, dif * _options.horizontalSpeed);

            /*headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text);*/
            headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_activeSub].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);

        }
        commandEvents.addEventListener('HorizontalNavigationView.JUMP_TO', jumpSubContent, command);

        headline.hide(0);

        //Navigation Fades
        var naviShift;
        var fadeout = window.setInterval(function () {
            window.clearInterval(fadeout);
            subNavigation.hide();
            naviShift = window.setInterval(function () {
                window.clearInterval(naviShift);
                mainNavigation.hide();
                headline.show(_options.navigationHideDelay);
            }, _options.navigationShift);
        }, _options.navigationHideDelay);

        _stage.on('mouseenter', '.mouseover.horizontal , .mouseover.vertical', function () {
            window.clearInterval(fadeout);
            window.clearInterval(naviShift);
            mainNavigation.show();
            headline.hide(_options.navigationHideDelay);
            naviShift = window.setInterval(function () {
                window.clearInterval(naviShift);
                subNavigation.show();
            }, _options.navigationShift);
        });
        _stage.on('mouseleave', '.nav.horizontal , .nav.vertical', function () {
            window.clearInterval(naviShift);
            fadeout = setInterval(function () {
                window.clearInterval(fadeout);
                subNavigation.hide();
                naviShift = window.setInterval(function () {
                    window.clearInterval(naviShift);
                    mainNavigation.hide();
                    headline.show(_options.navigationHideDelay);
                }, _options.navigationShift);
            }, _options.navigationHideDelay);
        });
        _stage.on('mouseenter', '.nav.horizontal , .nav.vertical', function () {
            window.clearInterval(fadeout);
            window.clearInterval(naviShift);
            mainNavigation.show();
            headline.hide(_options.navigationHideDelay);
            naviShift = window.setInterval(function () {
                window.clearInterval(naviShift);
                subNavigation.show();
            }, _options.navigationShift);
        });

        //HEADLINE
        headline.changeBreadcrumb(application.contents[_activeMain].nav.items[_multContents[_activeMain].getActive()].text, application.contents[_activeMain].nav.items[_activeSub].headlineClass);

        return command;

    };

    return specialDHL;
})();/* /etc/designs/dhl/docroot/js/specialDHL.view.js */
var SpecialDHL = (function () {

    var specialDHL = SpecialDHL || {};

    /*
     Horizontal Navigation View
     */
    specialDHL.HorizontalNavigationView = function (stage, events, navigationItems, browser, options) {

        var viewObject = {};

        var _navigationItems, _content, _active = 0, _stage = stage, _event = events, _fadeTime = 1000,
            _browser = browser, _options = options;

        //Fade in the navigation and delete mouse over container
        viewObject.show = function () {

            _content.animate({'bottom': '0px'}, 500);
            _stage.find('.mouseover.horizontal').remove();

        };

        //Hide the navigation and leave a mouse over container to secure the fade in
        viewObject.hide = function () {

            _content.animate({'bottom': '-40px'}, 500);
            _stage.append('<div class="mouseover horizontal"></div>');

        };

        // Switch to the next navigation element or to the first
        viewObject.next = function (speed) {

            _active++;
            if (_active == _navigationItems.length)
                _active = 0;

            _event.dispatchEvent('HorizontalNavigationView.NEXT');

            var ul = _content.find('ul:last');
            ul.animate({'margin-left': (parseInt(ul.css('margin-left')) - (ul.find('li:not(.seperator)').eq(_active).offset().left - _stage.offset().left) + 70) + 'px'}, (_active == 0) ? speed * (navigationItems.length - 1) : speed);

        };

        // Switch to the previous navigation element or to the last
        viewObject.previous = function (speed) {

            _active--;
            if (_active < 0)
                _active = _navigationItems.length - 1;

            _event.dispatchEvent('HorizontalNavigationView.PREVIOUS');

            var ul = _content.find('ul:last');
            ul.animate({'margin-left': (parseInt(ul.css('margin-left')) - (ul.find('li:not(.seperator)').eq(_active).offset().left - _stage.offset().left) + 70) + 'px'}, (_active == _navigationItems.length - 1) ? speed * (_navigationItems.length - 1) : speed);

        };

        //Switch to clicked navigation element
        viewObject.jumpTo = function (i, speed) {

            var dif = Math.abs(i - _active);

            _active = i;

            _event.dispatchEvent('HorizontalNavigationView.JUMP_TO', i);

            var ul = _content.find('ul:last');
            ul.animate({'margin-left': (parseInt(ul.css('margin-left')) - (ul.find('li:not(.seperator)').eq(_active).offset().left - _stage.offset().left) + 70) + 'px'}, dif * speed);

        };

        //Update the navigation
        viewObject.update = function (i, j) {

            _navigationItems = checkStartup(i);

            var _activeSub = j;

            var ul = _content.find('.navwrapper ul');

            var originalNavPosition = (parseInt(ul.css('margin-left')) - (ul.find('li:not(.seperator)').eq(_activeSub).offset().left - _stage.offset().left) + 70) + 'px';
            var navScrollSpeed = _activeSub * _options.horizontalSpeed;
            if (_activeSub === 0) {
                navScrollSpeed = _options.horizontalSpeed / 2;
            }

            ul.animate({'margin-left': '-500px'}, _options.horizontalSpeed / 2, function () {
                ul.empty();

                for (var a = 0, b = _navigationItems.length; a < b; a++)
                    ul.append('<li><a href="' + _navigationItems[a].link + '" class="navigationItem ' + ((_active == a) ? 'active' : '') + '">' + _navigationItems[a].text + '</a></li><li class="seperator"></li>');

                ul.css('margin-left', '500px');

                /*ul.animate({'margin-left':'0px'},_options.horizontalSpeed/2);*/
                ul.animate({'margin-left': originalNavPosition}, navScrollSpeed);
            })


        };


        /*
         Function to check the given object or array of objects and return the valid ones in an Array
         */
        var checkStartup = function (o) {

            var returnArray = [];

            for (var a = 0, b = o.length; a < b; a++) {

                if (o[a].text !== undefined && o[a].link !== undefined)
                    returnArray.push(o[a]);

            }

            return returnArray;

        };

        /*
         Function that returns the html markup of the navigation
         */
        var getMarkup = function () {

            var html = '';

            html = $('<div class="nav horizontal"><ul class="specialContentHorizontalNavigation"></ul></div>');

            var ul = html.find('ul');

            //Arrows
            html.prepend('<ul class="arrows"><li><a href="#" class="previous">&nbsp;</a></li><li><a href="#" class="next">&nbsp;</a></li><li class="seperator"></li></ul>');

            for (var a = 0, b = _navigationItems.length; a < b; a++)
                ul.append('<li><a href="' + _navigationItems[a].link + '" class="navigationItem ' + ((_active == a) ? 'active' : '') + '">' + _navigationItems[a].text + '</a></li><li class="seperator"></li>');

            ul.wrap('<div class="navwrapper" />');

            if ($('html').hasClass('rgba')) {
                html.css('background-color', 'rgba(255,255,255,0.9)');
            } else if (_browser != 'ie6') {
                html.css('background', 'url("/img/horizontal.png") repeat-x 0 -8px');
            } else {
                html.css('background-color', '#eeeeee');
            }

            return html;

        };

        _navigationItems = checkStartup(navigationItems);

        _content = getMarkup();
        _stage.append(_content);

        _content.on('click', '.next', function (e) {
            e.preventDefault();
            viewObject.next(_options.horizontalSpeed);
        });
        _content.on('click', '.previous', function (e) {
            e.preventDefault();
            viewObject.previous(_options.horizontalSpeed);
        });
        _content.on('click', '.navigationItem', function (e) {
            e.preventDefault();
            viewObject.jumpTo($(e.target).parent().index() / 2, _options.horizontalSpeed);
        });

        return viewObject;

    }

    /*
     Vertical Navigation View
     */
    specialDHL.VerticalNavigationView = function (stage, events, navigationItems, browser, options) {

        var viewObject = {};

        //Array of navigation items
        var _navigationItems, _content, _active = 0, _stage = stage, _event = events, _fadeTime = 1000,
            _browser = browser, _options = options;

        //Fade in the navigation and delete mouse over container
        viewObject.show = function (speed) {

            _content.children(".arrows").show();

            _content.animate({'height': '383px'}, speed);

            _stage.find('.mouseover.vertical').remove();

        };

        //Hide the navigation and leave a mouse over container to secure the fade in
        viewObject.hide = function () {

            _content.children(".arrows").hide();

            _content.animate({'height': '40px'}, 500);

            _stage.append('<div class="mouseover vertical"></div>');

        };

        // Switch to the next navigation element or to the first
        viewObject.next = function (speed) {

            _active++;
            if (_active == _navigationItems.length)
                _active = 0;

            _event.dispatchEvent('VerticalNavigationView.NEXT');


            var ul = _content.find('ul:first');
            ul.animate({'margin-top': (parseInt(ul.css('margin-top')) - (ul.find('li:not(.seperator)').eq(_active).offset().top - _stage.offset().top)) + 'px'}, (_active == 0) ? speed * (_navigationItems.length - 1) : speed);

        };

        // Switch to the previous navigation element or to the last
        viewObject.previous = function (speed) {

            _active--;
            if (_active < 0)
                _active = _navigationItems.length - 1;

            _event.dispatchEvent('VerticalNavigationView.PREVIOUS');

            var ul = _content.find('ul:first');
            ul.animate({'margin-top': (parseInt(ul.css('margin-top')) - (ul.find('li:not(.seperator)').eq(_active).offset().top - _stage.offset().top)) + 'px'}, (_active == _navigationItems.length - 1) ? speed * (_navigationItems.length - 1) : speed);

        };

        //Switch to clicked navigation element
        viewObject.jumpTo = function (i, speed) {

            var dif = Math.abs(i - _active);
            _active = i;

            _event.dispatchEvent('VerticalNavigationView.JUMP_TO', i);

            var ul = _content.find('ul:first');
            ul.animate({'margin-top': (parseInt(ul.css('margin-top')) - (ul.find('li:not(.seperator)').eq(_active).offset().top - _stage.offset().top)) + 'px'}, dif * speed);

        };

        /*
         Function to check the given object or array of objects and return the valid ones in an Array
         */
        var checkStartup = function (o) {

            var returnArray = [];

            for (var a = 0, b = o.length; a < b; a++) {

                if (o[a].text !== undefined && o[a].link !== undefined)
                    returnArray.push(o[a]);

            }

            return returnArray;

        };

        /*
         Function that returns the html markup of the navigation
         */
        var getMarkup = function () {

            var html = '';

            html = $('<div class="nav vertical"><div class="verticalWrapper"><ul class="specialContentVerticalNavigation"></ul></div></div>');
            html.prepend('<div class="active "></div>');

            var ul = html.find('ul');

            for (var a = 0, b = _navigationItems.length; a < b; a++) {

                //ul.append('<li><a href="'+_navigationItems[a].link+'" class="navigationItem">'+_navigationItems[a].text+'</a></li><li class="seperator"></li>');
                ul.append('<li><a href="' + _navigationItems[a].link + '" class="navigationItem">' + _navigationItems[a].text + '</a></li>');

            }

            //Arrows
            html.append('<ul class="arrows"><li><a href="#" class="next">&nbsp;</a></li><li><a href="#" class="previous">&nbsp;</a></li></ul>');


            if ($('html').hasClass('rgba')) {
                html.css('background-color', 'rgba(255,255,255,0.9)');
                html.find('.active').css('background-color', 'rgba(0,0,0,0.1)');
            } else if (_browser != 'ie6') {
                html.css('background', 'url("/img/vertical.png") repeat-y -10px 0');
                html.find('.active').css('background', 'url("/img/vertical_active.png") repeat-y');
            } else {
                html.css('background-color', '#eeeeee');
                html.find('.active').css('background-color', '#000000');
                html.find('.active').css('filter', 'Alpha(opacity=20');
            }

            return html;

        };

        _navigationItems = checkStartup(navigationItems);

        _content = getMarkup();

        _content.on('click', '.previous', function (e) {
            e.preventDefault();
            viewObject.next(_options.verticalSpeed);
        });
        _content.on('click', '.next', function (e) {
            e.preventDefault();
            viewObject.previous(_options.verticalSpeed);
        });
        _content.on('click', '.navigationItem', function (e) {
            e.preventDefault();
            viewObject.jumpTo($(e.target).parent().index(), _options.verticalSpeed);
        });

        _stage.append(_content);

        return viewObject;

    }

    specialDHL.HeadlineView = function (stage, defaultText, headlineColorClass, browser) {
        var viewObject = {};
        var _stage = $(stage);
        var _breadcrumbs = [defaultText];
        var _browser = browser;

        var headlineColor = "";
        if (typeof headlineColorClass !== "undefined" && _browser != 'ie6') {
            headlineColor = headlineColorClass;
        }

        _stage = _stage.append('<div class="headline ' + headlineColor + '"><h2>' + defaultText + '</h2></div>').find('.headline h2');

        var setHeadlineBackground = function (headlineColor) {
            var rgbaColor = '255,255,255,0.3';
            var hexColor = '#FFFFFF';
            var alphaValue = '30';
            var bgImage = '/img/headline.png';

            if (typeof headlineColor !== undefined && headlineColor === "headlineBlack") {
                rgbaColor = '0,0,0,0.3';
                hexColor = '#000000';
                alphaValue = '10';
                bgImage = '/img/headline_black.png';
            }

            if ($('html').hasClass('rgba')) {
                _stage.parent().css('background-color', 'rgba(' + rgbaColor + ')');
            } else if (_browser != 'ie6') {
                if (_browser.substring(0, 2) == 'ie') {
                    _stage.after('<div class="headlineBg" style="background-color: ' + hexColor + ';filter:Alpha(opacity=' + alphaValue + ');width:100%;height:40px;position:absolute;top:0;left:0"></div>');
                    $('div.headlineBg').hide();
                    //_stage.css('filter','none');
                } else {
                    _stage.parent().css('background', 'url("' + bgImage + '") repeat-x');
                }
            } else {
                _stage.parent().css('background-color', '#969696');
            }
        }

        setHeadlineBackground(headlineColor);


        var update = function () {

            var text = '';

            for (var a = 0, b = _breadcrumbs.length; a < b; a++) {

                text += _breadcrumbs[a] + ' - ';

            }

            text = text.substring(0, text.length - 3);

            _stage.html(text);

            if (typeof headlineColor !== "undefined" && _browser != 'ie6') {
                _stage.parent(".headline").removeClass('headlineBlack headlineWhite').addClass(headlineColor);
            }

            setHeadlineBackground(headlineColor);

        };

        viewObject.changeBreadcrumb = function (s, c) {

            _breadcrumbs[1] = s;

            headlineColor = c || "";

            update();

        };

        viewObject.show = (function () {

            if (_browser != 'ie6' && _browser.substring(0, 2) == 'ie') {
                return function (speed) {
                    _stage.fadeIn(speed);
                    _stage.next().fadeIn(speed);
                };
            } else {
                return function (speed) {
                    _stage.parent().fadeIn(speed);
                };
            }

        })();

        viewObject.hide = (function (speed) {

            if (_browser != 'ie6' && _browser.substring(0, 2) == 'ie') {
                return function (speed) {
                    _stage.fadeOut(speed);
                    _stage.next().fadeOut(speed);
                };
            } else {
                return function (speed) {
                    _stage.parent().fadeOut(speed);
                };
            }

        })();

        return viewObject;
    }

    specialDHL.ContentView = function (stage, content, id) {

        var viewObject = {};
        var _stage = $(stage);
        var _content = $('<div class="content" id="' + id + '"></div>').append(content.html());
        var _id = id;
        var _transition = $('html').hasClass('csstransition');


        //Random Background for testing
        var rgb = 'rgb(' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ',' + Math.floor(Math.random() * 256) + ')';
        _content.css('background-color', rgb);

        _stage.append(_content);
//
//        //Fade Out
//        viewObject.fadeOutTop = (function(){
//            if(_transition){
//                return function(){_content.css('marin-top','-'+parseInt(_content.height())+'px')};
//            }else{
//                return function(){_content.animate({'marin-top':'-'+parseInt(_content.height())+'px'},500)};
//            }
//        })();
//        viewObject.fadeOutBottom = (function(){
//            if(_transition){
//                return function(){_content.css('marin-top',parseInt(_content.height())+'px')};
//            }else{
//                return function(){_content.animate({'marin-top':parseInt(_content.height())+'px'},500)};
//            }
//        })();
//        viewObject.fadeOutLeft = (function(){
//            if(_transition){
//                return function(){_content.css('marin-left','-'+parseInt(_content.width())+'px')};
//            }else{
//                return function(){_content.animate({'marin-left':'-'+parseInt(_content.width())+'px'},500)};
//            }
//        })();
//        viewObject.fadeOutRight = (function(){
//            if(_transition){
//                return function(){_content.css('marin-left',parseInt(_content.width())+'px')};
//            }else{
//                return function(){_content.animate({'marin-left':parseInt(_content.width())+'px'},500)};
//            }
//        })();
//
//        //Fade In
//        viewObject.fadeInTop = (function(){
//            if(_transition){
//                return function(){_content.css('margin-top','0px')};
//            }else{
//                return function(){_content.animate({'margin-top':'0px'},500)};
//            }
//        })();
//        viewObject.fadeInBottom = (function(){
//            if(_transition){
//                return function(){_content.css('margin-top','0px')};
//            }else{
//                return function(){_content.animate({'margin-top':'0px'},500)};
//            }
//        })();
//        viewObject.fadeInLeft = (function(){
//            if(_transition){
//                return function(){_content.css('margin-left','0px')};
//            }else{
//                return function(){_content.animate({'margin-left':'0px'},500)};
//            }
//        })();
//        viewObject.fadeInRight = (function(){
//            if(_transition){
//                return function(){_content.css('margin-left','0px')};
//            }else{
//                return function(){_content.animate({'margin-left':'0px'},500)};
//            }
//        })();


        return viewObject;
    }

    specialDHL.MultiContentView = function (stage, contentItems, id, active, options) {

        var viewObject = {};
        var _stage = stage.append('<div class="multiview" id="' + id + '"></div>').find('#' + id);
        var _contentItems = contentItems;
        var _id = id;
        var _active = active;
        var _activeContent = 0;
        var _transition = $('html').hasClass('csstransitions');
        var _options = options;

        var registerContentItems = function () {

            var contentItemArray = [];

            for (var a = 0, b = _contentItems.length; a < b; a++) {

                contentItemArray.push(SpecialDHL.ContentView(_stage, _contentItems[a], _id + '_' + a));

                if (!_active)
                    _stage.css('top', '0px');
            }


            return contentItemArray;

        }
//
//        viewObject.fadeOutTop = function(speed){_stage.animate({'top':'-'+parseInt(_stage.height())+'px'},speed)};
//        viewObject.fadeOutBottom = function(speed){_stage.animate({'top':parseInt(_stage.height())+'px'},speed)};
//        viewObject.fadeInBottom = function(speed){_stage.animate({'top':'0px'},speed)};
//        viewObject.fadeInTop = function(speed){_stage.animate({'top':'0px'},speed)};
//
//
//        var contentModuleAnimation = function(dif,speed){_stage.animate({'left':'-'+(_activeContent*480)+'px'},dif*speed);};
//
//        viewObject.next = function(speed){
//
//            _activeContent ++;
//            if(_activeContent > _contentItems.length-1)
//                _activeContent = 0;
//
//            contentModuleAnimation((_activeContent == 0)?(_contentItems.length-1):1,speed);
//        };
//
//        viewObject.previous = function(speed){
//
//            _activeContent --;
//            if(_activeContent < 0)
//                _activeContent = _contentItems.length-1;
//
//            contentModuleAnimation((_activeContent == _contentItems.length-1)?(_contentItems.length-1):1,speed);
//
//        };
//
//        viewObject.jumpTo = function(i,speed){
//
//            var dif = Math.abs(i-_active);
//
//            _activeContent = i;
//
//            contentModuleAnimation(dif,speed);
//
//        }

        viewObject.getActive = function () {

            return _activeContent;

        };

        viewObject.getLength = function () {

            return _contentItems.length;

        };

        _contentItems = registerContentItems();

        return viewObject;
    }

    return specialDHL;
})();/* /etc/designs/dhl/docroot/js/specialDHL.jquery.js */
/*
 *  Project: Special Container Module DHL
 *  Description: A special form of 'Teaser' with two dimensional navigation
 *  Author: Raphael Rauwolf
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function ($, window, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'specialDHL',
        document = window.document,
        appStructure = {},
        defaults = {
            width: 480,
            heigth: 382,
            verticalSpeed: 500,
            verticalDelay: 0,
            horizontalSpeed: 500,
            horizontalDelay: 0,
            navigationHideDelay: 1000,
            navigationShift: 1000
        };

    // The actual plugin constructor
    function specialDHL(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    specialDHL.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance,
        // e.g., this.element and this.options
        var element = this.element;
        var options = this.options;

        /*
         Function to recursively parse the markup of the given element and put it into the object
         */
        var parseMarkup = function (e) {

            //empty object [o} to be returned
            var o = {};

            //Get JQuery functions for the given element [e]
            e = $(e);

            //Look through all the child elements and put them into [o]
            e.children('A,H2,H3,H4,DIV').each(function () {

                //Check the tag names and put the content into the object [o]
                switch ($(this)[0].tagName) {

                    case 'H2':
                    case 'H3':
                    case 'H4':
                        o.headline = $(this).html();
                        break;

                    case 'A':
                        o.anchor = $(this).attr('name');

                    case 'DIV':
                        if ($(this).hasClass('nav')) {

                            o.nav = {};
                            o.nav.items = [];
                            o.nav.type = ($(this).hasClass('horizontal')) ? 'horizontal' : 'vertical';

                            var listItems = $(this).find('li');

                            for (var a = 0, b = listItems.length; a < b; a++) {

                                o.nav.items.push({text: listItems.eq(a).text(), link: listItems.eq(a).find('a').attr('href'), headlineClass: listItems.eq(a).find('a').attr('class')});

                            }

                        } else {
                            if (o.contents === undefined)
                                o.contents = [];

                            if ($(this).hasClass('content')) {

                                o.contents.push(parseMarkup(this));

                            } else if ($(this).hasClass('special_content')) {

                                o.contents.push($(this.outerHTML.replace(/(\r\n|\n|\r)/gm, '')));

                            }

                        }

                        break;

                    default:
                        break;
                }

            });

            o.browser = checkBrowser();

            return o;
        };

        /*
         Applying main styles to main container
         */

        var styleMainContainer = function () {

            var e = $(element);

            e.html('').width(options.width);
            e.height(options.height);

        };

        /*
         Check Browser and apply the version to appStructure
         */

        var checkBrowser = function () {

            var animation = false, cssprefix = '',
                attributes = 'Transition',
                domPrefixes = 'Webkit Moz o ms Khtml'.split(' ');

            if (element.style[attributes]) {
                animation = true;
            }

            if (animation === false) {
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (element.style[ domPrefixes[i] + attributes ] !== undefined) {
                        pfx = domPrefixes[ i ];
                        animationstring = pfx + 'Animation';
                        cssprefix = '-' + pfx.toLowerCase() + '-';
                        animation = true;
                        break;
                    }
                }
            }

            if (animation === false) {
                if ($.browser.msie) {
                    switch (parseInt($.browser.version, 10)) {
                        case 6:
                            cssprefix = 'ie6';
                            break;
                        case 7:
                            cssprefix = 'ie7';
                            break;
                        case 8:
                            cssprefix = 'ie8';
                            break;
                        default:
                            cssprefix = 'fml';
                            break;
                    }
                }
            }


            return cssprefix;
        };

        /*
         converts AppStructure into Objects
         */
        var implementAppStructure = function () {

            //console.log('implementAppStructure',appStructure);

            var command = SpecialDHL.Command($(element), appStructure, options);
            /*
             var mainNav = SpecialDHL.VerticalNavigationView($(element),appStructure.nav.items,0);
             mainNav.init();


             var bottomNav = SpecialDHL.HorizontalNavigationView($(element),appStructure.contents[0].nav.items, 0);
             bottomNav.init(); */
        };

        /*
         Parse the markup and store the relevant informations into an object and style the container
         */

        appStructure = parseMarkup(element);

        styleMainContainer();

        implementAppStructure();

    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new specialDHL(this, options));
            }
        });
    };

}(jQuery, window));/* /etc/designs/dhl/docroot/js/functions.js */
/* CURTAIN MODULE */
(function ($) {

    $.fn.curtain = function () {

        this.each(function () {

            $(this).css({
                height: 150,
                overflow: "hidden",
                cursor: 'pointer'
            });


            var closedPosTop = parseInt($(this).height()) - parseInt($(this).find("span.headline").innerHeight());

            $(this).mouseenter(function () {
                $(this).find(".curtain_content").stop().animate({top: 0}, 500/*, function(){
                 $(this).find(".headline").addClass("hover");
                 }*/);
                $(this).find(".headline").addClass("hover");
            });

            $(this).mouseleave(function () {
                $(this).find(".curtain_content").stop().animate({top: closedPosTop}, 500/*, function(){
                 $(this).find(".headline").removeClass("hover");
                 }*/);
                $(this).find(".headline").removeClass("hover");
            });

            $(this).find(".curtain_content .curtain_copy span[class^='arrowLink']").hover(
                function () {
                    $(this).css({
                        textDecoration: "underline"
                    });
                },
                function () {
                    $(this).css({
                        textDecoration: "none"
                    });
                }
            );

        });

    };

})(jQuery);

(function ($) {

    $.fn.dynamictabs = function (options) {

        var clicked = false;
        //close all tabs
        $('.dynamic_tabs div').hide();

        //init first tab open on load
        $('.dynamic_tabs').each(function (i) {
            $('div:eq(0)', this).show();
            $('li:eq(0) ', this).addClass('active');


        });
        this.each(function () {
            var open = true;
            $(".dynamic_tabs li a").mouseenter(function () {
                var divs = $(this).parent().parent().parent().find('div').size();

                $(".dynamic_tabs li").removeClass('active');
                $(this).parent('li').addClass('active');
                if (open == true) {
                    if (divs > 1) {
                        var currentTab = '.' + $(this).attr('class');
                        $(currentTab).show();
                        $(".dynamic_tabs div").not(currentTab).hide();
                    }
                }

            });
            $(".dynamic_tabs li a").click(function (e) {
                if (open == true) {
                    $('.dynamic_tabs div').hide();
                    $(".dynamic_tabs li").removeClass('active');
                    open = false;

                } else {
                    var currentTab = '.' + $(this).attr('class');
                    $(currentTab).show();
                    open = true;

                }


                e.preventDefault();
            });
        });
    };
    return this;
})(jQuery);

function tabState() {
    var state = $('.dynamic_tabs div').is(':visible');
    if (state == true) {
        $('.dynamic_tabs div').hide();
        $('.dynamic_tabs').each(function (i) {
            $('div:eq(0)', this).show();
            $('li:eq(0) ', this).addClass('active');

        });
    }
};


function sc_cycle(id) {
    $(id)
        .before('<div class="sc_controls">')
        .cycle({
            fx: 'fade',
            speed: 1000,
            timeout: 0,
            cleartype: true,
            cleartypeNoBg: true,
            pause: 1,
            pager: '.sc_controls',
            sync: 0,
            height: 212

        });
}

function sc_cycle_reset() {
    $('.sc_text').css('padding-bottom', '15px');
    $('.sc_controls').remove();
    $('.text_cycle').cycle('destroy');
    $('.text_cycle').removeAttr("style");
    $('.text_cycle div').removeAttr("style");
    $('.text_cycle div').hide();
    $('.text_cycle div:first-child').show();
    $('.sc_hidden').hide();
    $('.sc_text_more').show();
}

$(document).ready(function () {

    $('.curtain').curtain();


    //init video gallery in tabmodule
    var tabVideoGallerySelector = ".mediabox > .type_video > .videotab > .mediaGallery";
    if ($(tabVideoGallerySelector).length > 0) {

        var tabVideoGalleryConfig = getMediaGalleryConfig($(tabVideoGallerySelector));

        $(tabVideoGallerySelector).MediaGallery({
            galleryVariant: "inTab",
            numberOfThumbnailsInLightbox: 4,
            forceGlobalHeadline: false,
            showRelatedContent: tabVideoGalleryConfig["relatedContent"],
            isVideoGallery: tabVideoGalleryConfig["isVideoGallery"],
            galleryElementDownloadSelector: ".download .download",
            galleryElementLinksSelector: ".links .links",
            galleryElementInfoSelector: ".info .info"

        });
    }

    //init visual/image gallery in tabmodule
    var tabImageGallerySelector = ".mediabox > .type_visuals > .visualtab > .mediaGallery";

    var tabImageGalleryConfig = getMediaGalleryConfig($(tabImageGallerySelector));

    if ($(tabImageGallerySelector).length > 0) {

        $(tabImageGallerySelector).MediaGallery({
            galleryVariant: "inTab",
            showRelatedContent: tabImageGalleryConfig["relatedContent"],
            galleryElementDownloadSelector: ".download .download",
            galleryElementLinksSelector: ".links .links",
            galleryElementInfoSelector: ".info .info"

        });
    }

    //init imge gallery in the content area
    var contentImageGallerySelector = ".content_main_index .imagevideogallery:not(.videotab, .visualtab) .mediaGallery";
    if ($(contentImageGallerySelector).length > 0) {

        $(contentImageGallerySelector).each(function () {
            var mediaGalleryConfig = getMediaGalleryConfig($(this));

            $(this).MediaGallery({
                galleryVariant: "onPage",
                showRelatedContent: mediaGalleryConfig["relatedContent"],
                isVideoGallery: mediaGalleryConfig["isVideoGallery"],
                galleryElementDownloadSelector: ".download .download",
                galleryElementLinksSelector: ".links .links",
                galleryElementInfoSelector: ".info .info"

            });
        });
    }

    function getMediaGalleryConfig(mediaGallery) {
        var mediaGalleryConfig = {};

        var configElement = mediaGallery.prev(".mediaGalleryConfig");

        configElement.children().each(function () {
            mediaGalleryConfig[$(this).attr("class")] = getValueWithType($(this).text());
        });

        return mediaGalleryConfig;
    }

    function getValueWithType(originalValue) {
        var valueWithType = null;

        if ((/^true$/i).test(originalValue)) {
            valueWithType = true;
        }
        else if ((/^false$/i).test(originalValue)) {
            valueWithType = false;
        }
        else if (!isNaN(parseFloat(originalValue)) && isFinite(originalValue)) {
            valueWithType = parseFloat(originalValue);
        }
        else {
            valueWithType = originalValue;
        }

        return valueWithType;
    }


    //init tabmodule
    if ($('.mediabox').length > 0) {
        $('.mediabox').tabmodule();
        $('.image_descr').hide();
        $('.mediabox .type_video a.lightbox').hover(function () {
            $(this).find('.image_descr').show();

        }, function () {
            $(this).find('.image_descr').hide();
        });
    }


    if ($(".dynamic_tabs").length) {
        $('.dynamic_tabs').dynamictabs();
    }

    //first/last class logic
    $(".content_main_index .containerpar div:first").addClass("first");
    $(".content_main_index .containerpar div:last").addClass("last");

    //about us page title stuff
    if ($(".pagetitle .richtext").is(":empty")) {
        $(".pagetitle h1").css({
            "padding-bottom": "12px"
        });
    }
});




/* /etc/designs/dhl/docroot/js/tabmodule_aboutus.js */
(function ($) {

    $.fn.tabmodule = function () {

        this.each(function () {

            if ($.browser.msie && parseInt($.browser.version) === 6) {
                $('.medianame').not("#active_media_tab").hover(
                    function () {
                        $(this).css("background-position-y", "-27px");
                    },
                    function () {
                        $(this).css("background-position-y", "-1px");
                    }
                );
            }


            function getData() {
                var data = $('.mediabox');
                return data;
            };

            function getNav() {
                var data = getData();
                var el = $('.medianame');
                var navArray = new Array();
                data.find(el).each(function (e) {
                    navArray[e] = $(this); //'<li><span class="' +$(this).attr("class")+ '">'+$(this).html()+'</span></li>';
                });
                return navArray;
            };

            function initNav() {
                $('.mediabox').append($('<ul class="tabnav"></ul>'));
                $('.mediabox').each(function () {
                    var el = $(this).find('.medianame');
                    el.find('a').text("");
                    $('.tabnav').append(el);
                });

                if ($.browser.msie && parseInt($.browser.version) === 6) {
                    $('.mediabox .tabnav .medianame.active').removeClass('active').attr('id', 'active_media_tab');
                }
            };

            function getContent() {
                var content = getData();
                var el = $('.media_content');
                var contentArray = new Array();
                content.find(el).each(function (e) {
                    contentArray[e] = $(this);
                });
                return contentArray;
            };


            function initContent() {

                var content = getContent();

                var h = -1;

                $('.mediabox').each(function () {
                    var el = $(this).find('.media_content');
                    if (el.height() > h) {
                        h = el.height();
                    }
                    $(this).append(el);
                });

                $('.mediabox').append('<div class="bottom"></div>');
                //$('.media_content').css('height', h);
                $('.media_content').css('display', 'none');
                $('.media_content.active').css('display', 'block');


            };

            function updateView() {
                var className = "";
                $('.medianame').bind('click', function () {

                    if ($.browser.msie && parseInt($.browser.version) === 6) {
                        $(this).attr('id', 'active_media_tab');
                        $(this).siblings('span').attr('id', '');
                    }
                    else {

                        $(this).addClass('active');
                        $(this).siblings('span').removeClass('active');
                    }
                    className = $(this).attr('class');
                    className = className.split(" ");
                    className[1] = "." + className[1];

                    $('div' + className[1]).addClass('active');
                    $('div.active').css('display', 'block');
                    $('div' + className[1]).siblings('div.media_content').removeClass('active').css('display', 'none');

                    //reset all slides
                    currentPosition = 1;
                    count = 0;
                    $('span.activeNumber').text(currentPosition);
                    $(".inner").css('margin-left', '0');
                    $('a.back').hide();
                    $('a.next').show();

                });
            };


            var currentPosition = 1;

            function slideInsideMediaContent() {
                var count = 0
                var width;
                $('.media_content').each(function () {
                    count = $(this).find('.slide').size();

                    if (count > 1) {
                        $(this).append('<span class="scroll"><a class="back" href="#"></a><span class="activeNumber">' + currentPosition + '</span>' + '<span class="count">' + "/" + count + '</span><a class="next" href="#"></a></span>')

                        //width=$('.media_content').width()*count+40;
                        // $('.inner').css('width', width);

                    }


                });


                if (currentPosition == 1) {
                    $('a.back').hide();
                }


                if (currentPosition == count) {
                    $('a.next').hide();
                }

            };


            function slideRight() {

                $('a.next').click(function (e) {
                    var allSlides = $(this).parent().prev().find('.slide').size();

                    $(".inner").animate({"margin-left": "-=" + 221});
                    currentPosition++;

                    if (currentPosition == 1) {
                        $('a.back').hide();
                    }
                    else {
                        $('a.back').show();
                    }


                    if (currentPosition == allSlides) {
                        $('a.next').hide();
                    }

                    $('span.activeNumber').text(currentPosition);
                    e.preventDefault();
                });
            };

            function slideLeft() {
                //var currentPosition = parseInt($('span.activeNumber').text());

                $('a.back').click(function (e) {
                    $(".inner").animate({"margin-left": "+=" + 221});
                    currentPosition--;


                    $('a.next').show();


                    if (currentPosition == 1) {
                        $('a.back').hide();
                    }

                    $('span.activeNumber').text(currentPosition);
                    e.preventDefault();
                });
            };

            var init = function () {
                initNav();
                initContent();
                updateView();
                slideInsideMediaContent();
                slideRight();
                slideLeft();
            }();


        });

    };

})(jQuery);









/* /etc/designs/dhl/docroot/js/iconTeaser.js */
$(document).ready(function () {

    $(".iconTeaser").each(function () {

        var imageContainer = $(this).find(".iconImage"),

            defaultTextAlignment = "richtextLeft",
            richtextAlignment = defaultTextAlignment,

            richtextElements = $(this).find(".richtext"),
            numRichtextElements = richtextElements.length,

            linkAlignment,
            defaultLinkAlignment = "linkContainerLeft",
            standardLinkAlignment = defaultLinkAlignment,
            expandableLinkAlignment = defaultLinkAlignment,
            
            standardLinks = $(this).find(".standardlink:not(.expandablelink .standardlink)"),
            numStandardLinks = standardLinks.length,
            expandableLinks = $(this).find(".expandablelink"),
            numExpandableLinks = expandableLinks.length,

            centeredElementMaxWidth = $(this).width() - imageContainer.outerWidth();

        //Manage rightext alignment
        if (numRichtextElements > 0) {
            var textAlignment = $.trim($(this).find(".richtext_alignment").text());

            if (typeof textAlignment !== "undefined") {
                richtextAlignment = textAlignment;
            }

            richtextElements.addClass(richtextAlignment);
        }


        //Build standard link container
        if (numStandardLinks > 0) {
            linkAlignment = $.trim($(this).find(".standard_link_alignment").text());

            if (typeof linkAlignment !== "undefined") {
                standardLinkAlignment = linkAlignment;
            }

            standardLinks.wrapAll("<div class=\"standard_link_container " + standardLinkAlignment + "\"></div>");
        }


        //Build expandable link container
        if (numExpandableLinks > 0) {
            linkAlignment = $.trim($(this).find(".expandable_link_alignment").text());

            if (typeof linkAlignment !== "undefined" && (numStandardLinks <= 0 || numStandardLinks > 0 && standardLinkAlignment !== defaultLinkAlignment)) {
                expandableLinkAlignment = linkAlignment;
            }

            expandableLinks.wrapAll("<div class=\"expandable_link_container " + expandableLinkAlignment + "\"></div>");
        }


        //Image container height management
        var manageCenterAlignment = false,
            imageContainerHeight = -3, //Start with -3 because of already existing padding
            additionalSpaceTop = 0;

        if (numStandardLinks > 0 && standardLinkAlignment === "linkContainerCenter") {
            imageContainerHeight += $(this).find(".standard_link_container").outerHeight();
            manageCenterAlignment = true;
        }

        if (numExpandableLinks > 0 && expandableLinkAlignment === "linkContainerCenter") {

            if (!$.browser.msie || ($.browser.msie && $(this).find(".expandable_link_container").width() <= centeredElementMaxWidth )) {
                imageContainerHeight += numExpandableLinks * 18;
                manageCenterAlignment = true;
            }
        }

        if (numRichtextElements > 0 && richtextAlignment === "richtextCenter") {
            richtextElements.css({
                width: centeredElementMaxWidth + "px",
                float: "left"
            });

            imageContainerHeight += richtextElements.outerHeight();
            manageCenterAlignment = true;
            richtextElements.removeAttr("style");
        }

        if ((numStandardLinks > 0 && numExpandableLinks > 0 && standardLinkAlignment === "linkContainerCenter" && expandableLinkAlignment === "linkContainerCenter") ||
            (!$.browser.msie && numStandardLinks > 0 && numRichtextElements > 0 && standardLinkAlignment === "linkContainerCenter" && richtextAlignment === "richtextCenter")) {
            $(this).find(".standard_link_container").css("float", "none");
        }

        if (manageCenterAlignment) {
            imageContainerHeight += $(this).find("h2:eq(0)").outerHeight();

            if (imageContainerHeight < imageContainer.height()) {
                imageContainerHeight = imageContainer.height();
            }
            else {
                additionalSpaceTop = Math.floor((imageContainerHeight - imageContainer.height()) / 2);
            }

            //imageContainer.height(imageContainerHeight - additionalSpaceTop).css("paddingTop", "+="+additionalSpaceTop);
        }


        //IE Browser tweeks
        if ($.browser.msie) {

            if (expandableLinkAlignment === defaultLinkAlignment) {
                $(this).find(".expandable_link_container").width("100%");
            }

            if (expandableLinkAlignment === "linkContainerCenter" && imageContainer.length > 0 && !imageContainer.is(":empty")) {
                var availableSpace = $(this).width() - imageContainer.outerWidth();
                var availablePercent = Math.floor((availableSpace * 100) / $(this).width());

                if (availablePercent > 65 && $(this).parents(".container_1_1").hasClass("container_1_1") && $(this).find(".richtext").css("direction") !== "rtl") {
                    availablePercent = 65;
                }
                else if ((availablePercent > 63 && $(this).parents(".content_cross_reference").hasClass("content_cross_reference")) ||
                    (availablePercent >= 65 && $(this).parents(".container_1_1").hasClass("container_1_1") && $(this).find(".richtext").css("direction") === "rtl")) {
                    availablePercent = 63;
                }
                else if (availablePercent > 78 && $(this).parents(".contentleftpar").hasClass("contentleftpar")) {
                    availablePercent = 78;
                }
                else if (availablePercent > 74 && $(this).parents(".contentrightpar").hasClass("contentrightpar")) {
                    availablePercent = 74;
                }

                $(this).find(".expandable_link_container").width(availablePercent + "%");
            }

            if (standardLinkAlignment === "linkContainerLeft") {
                $(this).find(".standard_link_container").width("100%");
            }

            if (richtextElements.text() === "") {
                richtextElements.hide();
            }
        }

        // build a table to vertical align image
        var iconTeaser = $(this),
            images = imageContainer.find('img'),
            imageRight = imageContainer.hasClass('iconRight'),
            imageWidth = 0,
            tableWidth = 9,
            tmpAlignDir = '';

        iconTeaser.find('h2').wrap('<td class="helper">');
        var helper = $(this).find('.helper');

        iconTeaser.find('.richtextCenter').appendTo(helper);

        iconTeaser.find(".expandable_link_container").css('width', "100%");
        iconTeaser.find('.arrowLinkUp').css('display', 'inline-block');

        iconTeaser.find('.linkContainerCenter').appendTo(helper);

        if ($(helper).children().length == 1) {
            $(helper).css('verticalAlign', 'middle');
            $(helper).find('h2').css('paddingTop', '6px');
        }

        /**
         * apply calculated image and table widths, wrap table cells
         * @param {Integer} imgWidth - max width of images in iconTeaser
         * @param {Integer} tableWidth - width of surrounding image table
         */
        function finalizeTable(imgWidth, tableWidth) {
            imageContainer.wrap('<td ' + tmpAlignDir + ' class="iconHelper" style="width:' + tableWidth + 'px;">');

            if (!imageRight) {
                // fix image container for left floating images
                imageContainer.css('width', imgWidth);
            } else {
                //if icon align right move td to the end
                iconTeaser.find('.iconHelper').insertAfter(helper);
            }

            iconTeaser.find('td').wrapAll('<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr></tr></table>');
        };
        
        // simple iteration over image to get image width asynchronously (to compensate image loading delays)
        // give up after 100 times (20 sec)
        if (images.length > 0) {
            var widthVerificationIterator = 0,
                calculations = {
                    interval: null,
                    iterator: 0,
                    width: 0
                };

            calculations.interval = window.setInterval(function() {
                calculations.width = images[0].width;
                
                if (calculations.width != undefined && calculations.width != 0 && calculations.width == imageWidth) {
                    widthVerificationIterator++; // simple check to ensure that image width doesn't change anymore (2x)
                } else {
                    imageWidth = calculations.width;
                    widthVerificationIterator = 0;
                }

                if (calculations.iterator >= 100 || (imageWidth > 0 && widthVerificationIterator >= 2)) {
                    tableWidth += imageWidth;
                    finalizeTable(imageWidth, tableWidth);

                    // stop interval
                    window.clearInterval(calculations.interval);
                }

                calculations.iterator++;
            }, 200);
        } else {
            finalizeTable(imageWidth, tableWidth);
        }
    });

});/* /etc/designs/dhl/docroot/js/miniTaskCenter.js */
$(document).ready(function () {

    $(".miniTaskCenter").each(function () {


        /* iconTeaser dynamic width depend on the parent column*/
        var iconTeaser = $(this);
        var columnWidth = iconTeaser.parent().width();
        var marginLeft = parseInt(iconTeaser.css('marginLeft'));
        var marginRight = parseInt(iconTeaser.css('marginRight'));
        var paddingLeft = parseInt(iconTeaser.css('paddingLeft'));
        var paddingRight = parseInt(iconTeaser.css('paddingRight'));
        var allMargPad = marginLeft + marginRight + paddingLeft + paddingRight;
        //width minus all paddings and margins
        iconTeaser.width(columnWidth - allMargPad);

        // width of iconTeaserGreyContainer with borders
        if ($('.miniTaskCenterGrey', this).length) {
            //ie needs a smaller width
            if ($.browser.msie && $.browser.version == "6.0") {
                iconTeaser.width(columnWidth - allMargPad);
            } else if ($.browser.msie && $.browser.version != "6.0") {
                iconTeaser.width(columnWidth - allMargPad + 2);
            } else {
                iconTeaser.width(columnWidth - allMargPad + 5);
            }
        } else {
            //width of the plain iconTeaser
            iconTeaser.width(columnWidth - allMargPad);
        }

        // width of iconTeaserGrey to show the shadows propertly
        if ($('.miniTaskCenterGrey', this).length) {
            //ie needs a smaller width
            if ($.browser.msie) {
                $('.miniTaskCenterGrey', this).width(columnWidth - allMargPad - 26);
            } else {
                $('.miniTaskCenterGrey', this).width(columnWidth - allMargPad - 23);
            }
        }

        // build a table to vertical align image
        var tableImg = iconTeaser.find('.iconImage img').width() + 9;

        var tmpAlignDir = '';
        if ($(iconTeaser).find(".richtext").css("direction") === "rtl") {
            iconTeaser.find('.iconImage').css('marginLeft', '9px');
            iconTeaser.find('.iconImage').css('marginRight', '0px');
            tmpAlignDir = 'align="right"';
        }
        iconTeaser.find('.iconImage').wrap('<td ' + tmpAlignDir + ' class="iconHelper" style="vertical-align:middle;width:' + tableImg + 'px">');

        iconTeaser.find('h2').wrap('<td class="helper">');
        var helper = $(this).find('.helper');

        iconTeaser.find('.richtextCenter').appendTo(helper);

        if ($(helper).children().length == 1) {
            $(helper).css('verticalAlign', 'middle');
            $(helper).find('h2').css('paddingTop', '6px');
        }
        //if icon align right move td to the end
        var imageRight = iconTeaser.find('.iconImage').hasClass('iconRight');
        if (imageRight == true) {
            iconTeaser.find('.iconHelper').insertAfter(helper);
        }

        iconTeaser.find('td').wrapAll('<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr></tr></table>');

    });

});