function checkFormDataForSpam(firstform) {

    var temp1 = "";
    for (var i = 0; i < firstform.length; i++) {

        temp1 = firstform.elements[i].value;
        // alert("temp value is---> "+temp1);

        if (temp1 != undefined && temp1.toLowerCase().indexOf('href') >= 0) {
            //alert("spam found"+temp1);
            return false;
        } else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('[link=') >= 0) {
            // alert("spam found"+temp1);
            return false;
        } else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('link=') >= 0) {
            // alert("spam found"+temp1);
            return false;
        } else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('[url=') >= 0) {
            //alert("spam found"+temp1);
            return false;
        } else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('url=') >= 0) {
            //alert("spam found"+temp1);
            return false;
        }
        else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('/url') >= 0) {
            //alert("spam found"+temp1);
            return false;
        }
        else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('[/url]') >= 0) {
            //alert("spam found"+temp1);
            return false;
        } else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('[/link]') >= 0) {
            //alert("spam found"+temp1);
            return false;
        }
        else if (temp1 != undefined
            && temp1.toLowerCase().indexOf('[link]') >= 0) {
            //alert("spam found"+temp1);
            return false;
        }
    }
    return true

}

////

function checkDHLFormDataForSpam(firstform) {
    for (var i = 0; i < firstform.length; i++) {

        //alert("value---->"+firstform.elements[i].value);
        var temp = firstform.elements[i].value;
        if (temp != undefined && temp.toLowerCase().indexOf('href') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined
            && temp.toLowerCase().indexOf('[link=') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined
            && temp.toLowerCase().indexOf('link=') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined
            && temp.toLowerCase().indexOf('[url=') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined && temp.toLowerCase().indexOf('url=') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined
            && temp.toLowerCase().indexOf('[/url]') >= 0) {
            //alert("spam found"+temp);
            return false;
        } else if (temp != undefined
            && temp.toLowerCase().indexOf('[/link]') >= 0) {
            //alert("spam found"+temp);
            return false;
        }
    }
    return true

}