var queryStringList = null;

function isPortalReq() {
    queryStringList = {};
    queryStringList.size = 0;
    // get the current URL
    var url = window.location.toString();
    //get the parameters
    url.match(/\?(.+)$/);
    var params = RegExp.$1;
    // split up the query string and store in an
    // associative array
    var paramsHash = params.split("#"); //For removing any '#' from the query string before comparing query parameters
    var params = paramsHash[0].split("&");

// alert("params.length--->"+params.length);
    for (var i = 0; i < params.length; i++) {
        var tmp = params[i].split("=");
        //alert(tmp)
        if (tmp != "" && tmp != "undefine") {
            queryStringList[tmp[0]] = unescape(tmp[1]);
            queryStringList.size = i + 1;
        }
    }


    if (queryStringList["sme"] == "INbCDUH4iWqL3bhCyGjkU77fds89") {
        // alert("hellow");
        return (queryStringList["sme"] != undefined) && ( queryStringList["sme"].length != 0) && (queryStringList["sme"] != "undefined");
    }
    else {
        return false;
    }


}


function chnageAnchor(isportalrequest, ctryName) {

    //start chnages to added base url parm i
    var bup = queryStringList["smepBaseURL"] ? "&smepBaseURL=" + queryStringList["smepBaseURL"] : "";
    var smeBaseURL = queryStringList["smepBaseURL"] ? queryStringList["smepBaseURL"] : "";
    bup = (smeBaseURL == "https://www.mydhl.dhl.com/mydhl") ? bup : "";
    //alert(bup);


    if (!isportalrequest) {
        return false;
    }

    var elements = document.getElementsByTagName("a");

    for (var i = 0; i < elements.length; i++) {
        var tmp = elements[i].href;
        if (tmp != undefined && tmp != "undefined" && tmp.length != 0 && tmp.toLowerCase().indexOf("javascript") < 0 && elements[i].className != 'arrowLinkUp') {

            elements[i].href = elements[i].href + "?sme=INbCDUH4iWqL3bhCyGjkU77fds89" + "&smecc=" + ctryName + bup;

            if (tmp.indexOf("?") >= 0) {
                elements[i].href = tmp + "&sme=INbCDUH4iWqL3bhCyGjkU77fds89" + "&smecc=" + ctryName + bup;
            }
            else if (tmp.indexOf("#") >= 0)//Checking for '#'
            {
                var varStr = tmp.split("#");
                var firstStr = varStr[0];
                var secondStr = varStr[1];
                if (firstStr.indexOf("?") >= 0) {
                    elements[i].href = firstStr + "&sme=INbCDUH4iWqL3bhCyGjkU77fds89" + "&smecc=" + ctryName + bup + "#" + secondStr;
                }
                else {
                    elements[i].href = firstStr + "?sme=INbCDUH4iWqL3bhCyGjkU77fds89" + "&smecc=" + ctryName + bup + "#" + secondStr;
                }
            }
            else {
                elements[i].href = tmp + "?sme=INbCDUH4iWqL3bhCyGjkU77fds89" + "&smecc=" + ctryName + bup;

            }
            //alert("elements[i].href " + elements[i].href);
        }
    }
}