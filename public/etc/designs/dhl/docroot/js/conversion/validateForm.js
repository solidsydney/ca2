var def_validateForm = "1.0";
var validateMethods = new Array();
var elementTypes = new Array();
var splElementType = new Array();
var dependentFields = new Array();
var addCheckTypes = new Array();
var performaElementType = new Array();
var errorList = new Array();
var errorOrder = new Array();
var alertMethod = "";
var alertMIME = "text";
var alertWidth = 350;
var alertExtraLines = 3;
var alertLineHeight = 25;
var alertExtraLine = 20;
var mandatoryEmptyType = "mandempty";
var inputType = "notsinglebyte";
//var comm_msg039 = "Please enter ";
var accreq_msg006 = "your state/province/county ";
var noStateError = "Please enter " + accreq_msg006;
var strErrMess = "";
var focusField = null;
var EMPTY_STRING = "";
var blankmark = "---";
function makeError() {
    return strErrMess;
}
function addValidateMethod(formatType, validateMethodName, messageMethodName, formatErrorTitle) {
    validateMethods[formatType] = new Array(validateMethodName, messageMethodName, formatErrorTitle);
}
function addElementType(elementName, mandatory, humanName, formatType) {
    if (typeof( elementName ) == "undefined") return;
    if (typeof( mandatory ) == "undefined") mandatory = false;
    if (typeof( humanName ) == "undefined") humanName = "";
    if (typeof( formatType ) == "undefined") formatType = "";
    elementTypes[elementName] = new Array(mandatory, humanName, formatType);
}
function bindDependentFields(master, slave) {
    if (typeof( master ) == "undefined") mandatory = false;
    if (typeof( slave ) == "undefined") mandatory = false;
    dependentFields[slave] = master;
}
function addCheckElementType(elementName, mandatory, humanName, formatType) {
    if (typeof( elementName ) == "undefined") return;
    if (typeof( mandatory ) == "undefined") mandatory = false;
    if (typeof( humanName ) == "undefined") humanName = "";
    if (typeof( formatType ) == "undefined") formatType = "";
    splElementType[elementName] = new Array(mandatory, humanName, formatType);
}

function validateForm(form, isSplList) {
    var theForm;
    focusField = null;
    if (typeof(isSplList) == "undefined") {
        isSplList = false;
    }
    if (typeof( form ) == 'undefined') {
        theForm = document.forms[0];
    }
    else {
        theForm = document.forms[form];
    }
    //alert(theForm);
    errorList = new Array();
    errorOrder = new Array();
    el = 0;
    while (theForm.elements[el]) {
        element = theForm.elements[el];
        //alert("element:"+element);
        elementName = element.name;
        //alert("elementName:"+elementName);
        //alert(elementName);
        //########################Commented and Added Lalit: 26/11#######################

        if (elementName == "NameHexa") {
            //alert("elementName1:");
            element.value = convertToUnicode(theForm.elements['Name'].value);
            elementValue = element.value;
        }
        else if (elementName == "MessageHexa") {
            //alert("elementName2:");
            element.value = convertToUnicode(theForm.elements['Message'].value);
            elementValue = element.value;
        }
        else if (elementName == "FirstNameHexa") {
            element.value = convertToUnicode(theForm.elements['FirstName'].value);
            elementValue = element.value;
        }
        else if (elementName == "LastNameHexa") {
            //alert("elementName3:");
            element.value = convertToUnicode(theForm.elements['LastName'].value);
            elementValue = element.value;
        }
        else if (elementName == "PositionHexa") {
            //alert("elementName4:");
            element.value = convertToUnicode(theForm.elements['Position'].value);
            elementValue = element.value;
        }
        else if (elementName == "CompanyHexa") {
            //alert("elementName5:");
            element.value = convertToUnicode(theForm.elements['Company'].value);
            elementValue = element.value;
        }
        else if (elementName == "AddressLine1Hexa") {
            //alert("elementName6:");
            element.value = convertToUnicode(theForm.elements['AddressLine1'].value);
            elementValue = element.value;
        }
        else if (elementName == "AddressLine2Hexa") {
            //alert("elementName7:");
            element.value = convertToUnicode(theForm.elements['AddressLine2'].value);
            elementValue = element.value;
        }
        else if (elementName == "AddressLine3Hexa") {
            //alert("elementName8:");
            element.value = convertToUnicode(theForm.elements['AddressLine3'].value);
            elementValue = element.value;
        }
        else if (elementName == "CityHexa") {
            //alert("elementName9:");
            element.value = convertToUnicode(theForm.elements['City'].value);
            elementValue = element.value;
        }
        else if (elementName == "StateHexa") {
            //alert("elementName10:");
            element.value = convertToUnicode(theForm.elements['State'].value);
            elementValue = element.value;
        }
        else if (elementName == "NotesHexa") {
            //alert("elementName11:");
            element.value = convertToUnicode(theForm.elements['Notes'].value);
            elementValue = element.value;
        }


        //########################Commented and Added Lalit: 26/11#######################

        if (element.type == "radio") {
            if (element != theForm.elements[element.name][0]) {
                el++;
                continue;
            }
        }
        if ((elementTypes[elementName] && !isSplList) || (splElementType[elementName] && isSplList)) {
            if (splElementType[elementName] && isSplList) {
                elementType = splElementType[elementName];
            }
            else {
                elementType = elementTypes[elementName];
            }
            elementValue = element.value;
            if (isMandatoryEmpty(elementType[0], element)) {
                //alert("Empty Mandatory");
                if (focusField == null) {
                    focusField = element;
                }
                addError(mandatoryEmptyType, comm_Msg025, comm_Msg026, elementType[1]);
            }
            else if (elementValue != "" && elementType[2] != "" && validateMethods[elementType[2]]) {
                valid = eval(validateMethods[elementType[2]][0] + "( elementValue, element )");
                if (!valid) {
                    errorMessage = eval(validateMethods[elementType[2]][1] + "()");
                    formatErrorTitle = "";

                    if (typeof( formatErrorTitle ) == "undefined" || formatErrorTitle == "undefined" || formatErrorTitle == "") {
                        formatErrorTitle = validateMethods[elementType[2]][2];
                    }
                    elementTitle = ( ( elementType[1] != "" ) ? elementType[1] : elementName );
                    if (focusField == null) {
                        focusField = element;
                    }
                    addError(elementType[2], formatErrorTitle, errorMessage, elementTitle);
                }
            }
        }
        el++;
    }
    return showErrors();
}
function addError(formatType, formatTypeName, errorMessage, humanName) {
    if (errorList[formatType]) {
        //alert("errorList["+formatType+"]");
        errorList[formatType][errorList[formatType].length] = humanName;
    }
    else {

        errorList[formatType] = new Array(formatTypeName, errorMessage, humanName);
        errorOrder[errorOrder.length] = formatType;
    }
}
function showErrors() {
    if (errorOrder.length == 0) return true;
    nl = ( ( alertMIME == "html" ) ? "\n" : "\n" );
    ls = ( ( alertMIME == "html" ) ? "<ul>" : "\n" );
    le = ( ( alertMIME == "html" ) ? "</ul>" : "\n" );
    li = ( ( alertMIME == "html" ) ? "<li>" : "  " );
    il = ( ( alertMIME == "html" ) ? "</li>" : "\n" );
    bs = ( ( alertMIME == "html" ) ? "<b>" : "" );
    be = ( ( alertMIME == "html" ) ? "</b>" : "" );
    errorMessage = "";
    count = 0;
    for (i = 0; i < errorOrder.length; i++) {
        errorDetails = errorList[errorOrder[i]];
        tmp = bs + errorDetails[0] + be + nl + errorDetails[1] + nl + ls;
        if (errorDetails[1].length > alertExtraLine) count++;
        for (j = 2; j < errorDetails.length; j++) {
            tmp += ( li + errorDetails[j] + il );
            count++;
        }
        errorMessage += ( tmp + le + "<br>" );
        count += 3;
    }
    if (focusField != null && focusField.type != "hidden") {
        focusField.focus();
        focusField = null;
    }
    if (alertMethod != "") {
        alertHeight = ( count + alertExtraLines ) * alertLineHeight;
        eval(alertMethod + "( comm_Msg047, errorMessage, alertWidth, alertHeight )");
    }
    else {
        //alert("errorMessage:::"+errorMessage);
        message = nl + nl + errorMessage;
        //alert("message:"+message);
        document.getElementById("errorDivison").innerHTML =
            "<p class=\"error\"><strong>" + comm_Msg047 + "</strong></p><p class=\"error\">" + message + "</p>";
        document.getElementById("errorDivison").style.display = "block";
        // These two variables are set to enable the live chat popup window to come up.
        // Variables submission using lpAddVars
        if (typeof(lpAddVars) == 'function') lpAddVars('page', 'lp_Page_Name', 'sPage');
        if (typeof(lpAddVars) == 'function')lpAddVars('page', 'lp_Page_Error', 'True');


        //alert( comm_msg047 + nl + nl + errorMessage );
    }
    return false;
}
function isMandatoryEmpty(mandatory, element) {
    var emptyFlag = isEmpty(element);
    return ( mandatory && emptyFlag );
}
function checkMultiByteChars(element) {
    isEmpty(element);
    return;
}
function getTextInputFromName(inputName, theForm) {
    element = getInputFromName(inputName, theForm);
    if (element == null) return null;
    if (element.type.toLowerCase() != "text") return null;
    return element;
}
function getInputFromName(inputName, theForm) {
    if (typeof( theForm.elements[inputName] ) == undefined) return null;
    return theForm.elements[inputName];
}
function charIsDigit(ch) {
    code = ch.charCodeAt(0);
    return code >= 48 && code <= 57;

}
function charIsLetter(ch) {
    code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) return true;
    return code >= 97 && code <= 122;

}
function charIsNonAlphanumeric(ch) {
    return !(charIsLetter(ch) || charIsDigit(ch));

}
function isEmpty(element) {
    var val = "";
    if (element.type.indexOf("select") == 0) {
        if (element.name == "itemLines" && (document.forms['CommercialInvoice'].elements['itemLines'].length != 0)) {
            val = document.forms['CommercialInvoice'].elements['itemLines'].options[0].text;
        }
        else if (element.selectedIndex >= 0) {
            val = element.options[element.selectedIndex].value;
        }
    }
    else if (element.type == "radio") {
        elArray = element.form.elements[element.name];
        for (rb = 0; rb < elArray.length; rb++) {
            if (elArray[rb].checked) {
                val = elArray[rb].value;
                break;
            }
        }
    }
    else if (element.type == "checkbox") {
        val = ( ( element.checked ) ? element.value : "" );
    }
    else {
        val = element.value;
    }
    val = trimString(val);
    if (element.type == "text") {
        element.value = val;
    }
    if (typeof( val ) == "undefined" || typeof( val ) == "null" || val == "" || val == null) {
        return true;
    }
    else if (element.type == "text" || element.type == "textarea") {
        return false;
    }
}
function fnGetLable(eleName) {
    return eleName;
}
function fncmCheckEnglish(sValue) {
    var ASCII_END = 128;
    var bRetValue = true;
    var iCount = 0;
    var iCode = 0;
    var iLength = 0;
    sValue = sValue + "";
    iLength = sValue.length;
    for (iCount = 0; iCount < iLength; iCount++) {
        iCode = sValue.charCodeAt(iCount);
        if (ASCII_END < iCode) {
            bRetValue = false;
            break;
        }
    }
    return bRetValue;
}
function fnValidatePhone(phonNo) {
    var indChar = "";
    var allowedChars = " +-()";
    var index = -1;
    var gotNo = 0;
    var openBrFlag = false;
    strErrMess = "";
    for (count = 0; count < phonNo.length; count++) {
        indChar = phonNo.charAt(count);
        if (!isNaN(indChar)) {
            gotNo++;
            continue;
        }
        if ((index = allowedChars.indexOf(indChar)) == -1) {
            strErrMess = comm_msg039 + comm_msg060;
            return false;
        }
        else if ((index = allowedChars.indexOf(indChar, index + 1)) != -1) {
            strErrMess = comm_msg039 + comm_msg060 + comm_msg061 + "'" + indChar + "'" + comm_msg062;
            return false;
        }
        else if ((indChar == ")" && count == 0) || (indChar == "(" && count > 0) || (indChar == "+" && count > 1)) {
            strErrMess = comm_msg039 + comm_msg060;
            return false;
        }
        else if (indChar == "(") {
            openBrFlag = true;
        }
        else if (indChar == ")" && !openBrFlag) {
            strErrMess = comm_msg039 + comm_msg060;
            return false;
        }
        else if ((indChar == "-" && count == 0) || (indChar == "-" && count == phonNo.length)) {
            strErrMess = comm_msg039 + comm_msg060;
            return false;
        }
    }
    return true;
}
function checkTime(time) {
    var timeArr = time.split(":");
    var timeInSecs;
    if (timeArr.length != 2) {
        strErrMess = comm_msg063;
        return false;
    }
    if (isNaN(timeArr[0]) || isNaN(timeArr[1]) || timeArr[0] < 0 || timeArr[1] < 0) {
        strErrMess = comm_msg063;
        return false;
    }
    if (timeArr[1] > 59 || timeArr[0] > 23) {
        strErrMess = comm_msg063;
        return false;
    }
    timeInSecs = parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);
    if (typeof(intTime) != "undefined") {
        intTime = timeInSecs
    }
    if (timeInSecs == 0) {
        strErrMess = comm_msg064;
        return false;
    }
    return true;
}
function checkExtn(extnNo, extNoRef) {
    var phoneVal, phoneRef;
    strErrMess = "";
    extnNo = trimString(extnNo);
    if (extnNo == "") {
        return true;
    }
    else if (isNaN(parseInt(extnNo))) {
        strErrMess = comm_msg065;
        return false;
    }
    else if (extnNo.indexOf(".") != -1) {
        strErrMess = comm_msg065;
        return false;
    }
    else if (typeof(dependentFields) != "undefined") {
        phoneRef = eval(dependentFields[extNoRef.name]);
        if (typeof(phoneRef) != "undefined") {
            phoneVal = trimString(phoneRef.value);
            if (phoneVal == "" && extnNo != "") {
                strErrMess = supplierCode_msg005
                return false;
            }
        }
    }
    return true;
}
function checkDate(dtvalue) {
    var montharr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var dtarr = dtvalue.split("/");
    var temp = "", tmpidx = -2;
    var backDate = false;
    if (dtarr.length < 2 || dtarr > 3) {
        strErrMess = comm_msg039 + pickup_msg031 + "<BR>" + pickup_msg032 + "<P>1  dd/mm/yy<BR>2  dd/mm/yyyy<BR>3  mm/yy<BR>4  mm/yyyy";
        return false;
    }
    for (index = 0; index < dtarr.length; index++) {
        if (dtarr[index] == "" || dtarr[index].indexOf(".") != -1 || isNaN(temp = parseInt(dtarr[index])) || temp <= 0) {
            strErrMess = comm_msg039 + pickup_msg031;
            return false;
        }
        tmpidx++
    }
    if (dtarr[tmpidx] < 1 || dtarr[tmpidx] > 12) {
        strErrMess = comm_msg039 + pickup_msg033 + " (1-12)"
        return false;
    }
    if (dtarr[tmpidx + 1].length != 2 && dtarr[tmpidx + 1].length != 4) {
        strErrMess = comm_msg039 + comm_msg066;
        return false;
    }
    if (tmpidx == 1) {
        if (dtarr[2] % 4 == 0) {
            montharr[1] = 29
        }
        if (parseInt(dtarr[0]) > parseInt(montharr[dtarr[1] - 1])) {
            strErrMess = comm_msg039 + pickup_msg033 + " (1-" + montharr[dtarr[1] - 1] + ")"
            return false;
        }
        if (dtarr[0] < now.getDate()) {
            backDate = true;
        }
    }
    if (dtarr[tmpidx + 1].length < 4 && dtarr[tmpidx + 1] < 2000) {
        dtarr[tmpidx + 1] = parseInt(dtarr[tmpidx + 1]) + 2000
    }
    if (dtarr[tmpidx + 1] == now.getFullYear()) {
        if (dtarr[tmpidx] == now.getMonth() + 1) {
            if (backDate) {
                strErrMess = comm_msg067;
                return false;
            }
        }
        else if (dtarr[tmpidx] < now.getMonth() + 1) {
            strErrMess = comm_msg067;
            return false;
        }
    }
    else if (dtarr[tmpidx + 1] < now.getFullYear()) {
        strErrMess = comm_msg067;
        return false;
    }
    return true;
}
function trimString(sInput, iSide) {
    var sTemp = "";
    var cChar = "";
    var iCount = "";
    var SINGLE_BLANK = " ";
    var iInputWidth = 0;
    if (typeof(iSide) == "undefined") {
        iSide = 2
    }
    if (null == sInput) {
        sTemp = EMPTY_STRING;
    }
    else {
        iInputWidth = sInput.length;
        switch (iSide) {
            case 0:
                for (iCount = 0; iCount < iInputWidth; iCount++) {
                    cChar = sInput.charAt(iCount);
                    if (SINGLE_BLANK != cChar) {
                        sTemp = sInput.substring(iCount, iInputWidth);
                        break;
                    }
                }
                break;
            case 1:
                for (iCount = iInputWidth - 1; iCount >= 0; iCount--) {
                    cChar = sInput.charAt(iCount);
                    if (cChar != SINGLE_BLANK) {
                        sTemp = sInput.substring(0, iCount + 1);
                        break;
                    }
                }
                break;
            case 2:
                for (iCount = 0; iCount < iInputWidth; iCount++) {
                    cChar = sInput.charAt(iCount);
                    if (SINGLE_BLANK != cChar) {
                        sTemp = sInput.substring(iCount, iInputWidth);
                        break;
                    }
                }
                iInputWidth = sTemp.length;
                for (iCount = iInputWidth - 1; iCount >= 0; iCount--) {
                    cChar = sTemp.charAt(iCount);
                    if (cChar != SINGLE_BLANK) {
                        sTemp = sTemp.substring(0, iCount + 1);
                        break;
                    }
                }
                break;
        }
    }
    return sTemp;
}
function validateNumber(value, paramName, defVal, toFloat, allowZero, decimalPoints, maxVal) {
    var defMess = "\n";
    var value2, lpCtr, dp = 1;
    if (typeof( defVal ) == "undefined") defVal = 0;
    if (typeof( toFloat ) == "undefined") toFloat = 1;
    if (typeof( allowZero ) == "undefined") allowZero = 1;
    if (typeof(decimalPoints) == "undefined") decimalPoints = 0;
    if (value == "") return defVal;
    if (value == blankmark) {
        return value;
    }
    if (defVal != "") {
        defMess = comm_msg017
    }
    if (isNaN(parseFloat(value))) {
        strErrMess += volweight_msg008 + defMess + " " + defVal + ".\n";
        return defVal;
    }
    if (value < 0 || (value == 0 && allowZero == 0)) {
        strErrMess += volweight_msg008 + defMess + " " + defVal + ".\n";
        return defVal;
    }
    if (toFloat == 1) {
        value2 = parseFloat(value);
    }
    else {
        value2 = Math.round(value);
    }
    if (isNaN(value2)) {
        strErrMess += paramName + comm_msg050 + defMess + " " + defVal + ".\n";
        return defVal;
    }
    if (value2 < 1 && value2 > 0 && ( value2 + "" ).charAt(0) != "0") {
        value2 = "0" + value2;
    }
    if (toFloat == 1 && decimalPoints > 0) {
        value2 = roundToDp(value2, decimalPoints)
    }
    if (typeof(maxVal) != "undefined" && value2 > maxVal) {
        strErrMess += paramName + comm_msg073 + defMess + " " + maxVal + ".\n";
        return maxVal;
    }
    if (value != value2) {
        strErrMess += paramName + " " + comm_msg050 + defMess + " " + value2 + ".\n";
    }
    return value2;
}
function roundToDp(inValue, numDps) {
    if (typeof( numDps ) == "undefined") numDps = 2;
    factor = Math.pow(10, numDps);
    result = Math.round(inValue * factor) / factor;
    return ( result );
}
function checkGcsDate(dtvalue) {
    var montharr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var dtarr = dtvalue.split("/");
    var temp = "", tmpidx = -2;
    var backDate = false;
    if (dtarr.length != 3) {
        strErrMess = comm_msg039 + pickup_msg031 + "<BR>" + comm_msg090 + "<P>" + comm_msg095 + "<BR>";
        return false;
    }
    for (index = 0; index < dtarr.length; index++) {
        if (dtarr[index] == "" || dtarr[index].indexOf(".") != -1 || isNaN(temp = eval(dtarr[index])) || temp <= 0 || dtarr[index].indexOf("-") != -1) {
            strErrMess = comm_msg039 + pickup_msg031;
            return false;
        }
        tmpidx++
    }
    if (dtarr[tmpidx] < 1 || dtarr[tmpidx] > 12) {
        strErrMess = comm_msg039 + pickup_msg033 + " (1-12)"
        return false;
    }
    if (dtarr[tmpidx + 1].length != 4) {
        strErrMess = comm_msg039 + comm_msg091;
        return false;
    }
    if (tmpidx == 1) {
        if (dtarr[2] % 4 == 0) {
            montharr[1] = 29
        }
        if (parseInt(dtarr[0]) > parseInt(montharr[dtarr[1] - 1])) {
            strErrMess = comm_msg039 + comm_msg092 + " (1-" + montharr[dtarr[1] - 1] + ")"
            return false;
        }
        if (dtarr[0] < now.getDate()) {
            backDate = true;
        }
    }
    if (dtarr[tmpidx + 1].length < 4 && dtarr[tmpidx + 1] < 2000) {
        dtarr[tmpidx + 1] = parseInt(dtarr[tmpidx + 1]) + 2000
    }
    return true;
}

function convertToUnicode(source) {
    result = '';
    for (i = 0; i < source.length; i++) {
        if (source.charCodeAt(i) == "13" && source.charCodeAt(i + 1) == "10") {
            result += '\n';
            i++;
        }
        else {
            result += '#' + source.charCodeAt(i) + ';';
        }
    }
    return result;
}