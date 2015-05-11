var errorTitle = comm_msg001;
var dateError = shipperRef_msg001 + shipperRef_msg002;
var srefError = comm_msg039 + shipperRef_Msg003;
var accountError = validAcc_msg001 + "." + comm_msg019 + persind_msg004;
var fromName = "from";
var toName = "to";
var shipref_dirty = true;
var maxDaysAllo = 120;
var today = new Date();
var monOptArr = new Array();

addValidateMethod( "todate", "validateDate", "makeError", shipperRef_msg005 );
addValidateMethod( "fromdate", "validateDate", "makeError", shipperRef_Msg004 );

addElementType( "shipperReference", true, shipperRef_Msg003);
addElementType( "fromDayValue", false, shipperRef_Msg006, "fromdate");
addElementType( "toDayValue", false, shipperRef_msg007, "todate");
addElementType( "accountNumber", false, persind_msg004, "account");


function properDate( j ) {
    return j < 10 ? "0" + j : j;
}


function populateDates( formRef ) {
    elms = formRef.elements;
    date = today.getDate() - 1;
    month = today.getMonth();
    year  = today.getFullYear();
    var yearOpts = month > 3 ? 0 : 1;
    var count = 0;
    var yearCount = 0;
    var dayCount = 0;
    var dispMonth = new Array();

    // days
    for( j = 1 ; j <= 31; j++ ) {
        dayOpt = properDate(j);
        elms['fromDayValue'].options[dayCount] = new Option( dayOpt, dayOpt );
        elms['toDayValue'].options[dayCount] = new Option( dayOpt, dayOpt );
        dayCount++;
    }

    // months
    if ( month >= 4 ) {
        for ( i = month - 4; i <= month; i++ ) {
            monOpt = properDate(i+1);
            monOptArr[monOpt] = count;
            elms['fromMonthValue'].options[count] = new Option( monOpt, monOpt );
            elms['toMonthValue'].options[count] = new Option( monOpt, monOpt );
            count++;
        }
    } else {
        for ( j = 8 + month; j <= 11; j++ ) {
            monOpt = properDate(j+1);
            monOptArr[monOpt] = count;
            elms['fromMonthValue'].options[count] = new Option( monOpt, monOpt );
            elms['toMonthValue'].options[count] = new Option( monOpt, monOpt );
            count++;
        }
        for ( j = 0; j <= month; j++ ) {
            monOpt = properDate(j+1);
            monOptArr[monOpt] = count;
            elms['fromMonthValue'].options[count] = new Option( monOpt, monOpt );
            elms['toMonthValue'].options[count] = new Option( monOpt, monOpt );
            count++;
        }
    }

    // years
    for ( j = yearOpts; j >= 0; j-- ) {
        elms['fromYearValue'].options[yearCount] = new Option( year - j, year - j );
        elms['toYearValue'].options[yearCount] = new Option( year - j, year - j );
        yearCount++;
    }
}


function selectDates( theform ) {
    if( typeof( theform ) == "undefined" ) theform = document.forms[ 0 ];

    firstToYear   = theform.elements[ toName + 'YearValue' ].options[ 0 ].value;
    firstFromYear = theform.elements[ fromName + 'YearValue' ].options[ 0 ].value;

    if (shipref_dirty) {
        shipref_readCookie();
    }

    fromDay = shipref_fromDayValue != '' ? shipref_fromDayValue - 1 : today.getDate() - 1;
    theform.elements[ fromName + 'DayValue' ].options[ fromDay ].selected = 'true';

    fromMonth = shipref_fromMonthValue != '' ? monOptArr[ shipref_fromMonthValue ] : 4;
    theform.elements[ fromName + 'MonthValue' ].options[ fromMonth ].selected = 'true';

    fromYear = shipref_fromYearValue != '' ? shipref_fromYearValue - firstFromYear : today.getFullYear() - firstFromYear;
    theform.elements[ fromName + 'YearValue' ].options[ fromYear ].selected = 'true';

    toDay = shipref_toDayValue != '' ? shipref_toDayValue - 1 : today.getDate() - 1;
    theform.elements[ toName + 'DayValue' ].options[ toDay ].selected = 'true';

    toMonth = shipref_toMonthValue != '' ? monOptArr[ shipref_toMonthValue ] : 4;
    theform.elements[ toName + 'MonthValue' ].options[ toMonth ].selected = 'true';

    toYear = shipref_toYearValue != '' ? shipref_toYearValue - firstToYear : today.getFullYear() - firstToYear;
    theform.elements[ toName + 'YearValue' ].options[ toYear ].selected = 'true';
}


function clearForm( theform ) {
    selectDates( theform );
    theform.destCountryCodeIndex.value = '0';
    theform.destCountryCode.selectedIndex = 0;
    theform.accountNumber.value = '';
    theform.shipperReference.value = '';
}


function validateDate( fieldVal, fieldRef ) {
    var dayRef,
        monRef,
        yearRef,
        theform = document.forms["shipment"],
        montharr = new Array(),
        prefix = fieldRef.name;
        strErrMess = "";

    montharr['01'] = 31;
    montharr['02'] = 28;
    montharr['03'] = 31;
    montharr['04'] = 30;
    montharr['05'] = 31;
    montharr['06'] = 30;
    montharr['07'] = 31;
    montharr['08'] = 31;
    montharr['09'] = 30;
    montharr['10'] = 31;
    montharr['11'] = 30;
    montharr['12'] = 31;

    prefix = prefix.substring( 0, prefix.indexOf("Day") );
    dayRef  = theform.elements[ prefix + "DayValue" ];
    monRef  = theform.elements[ prefix + "MonthValue" ];
    yearRef = theform.elements[ prefix + "YearValue" ];
    yearVal = parseInt( yearRef.options[ yearRef.selectedIndex ].value );

    if ( ( yearVal % 400 == 0 ) || ( yearVal % 4 == 0 && yearVal % 100 != 0 ) ) {
        montharr[1] = 29;
    }

    if ( parseInt( dayRef.options[ dayRef.selectedIndex ].value ) > montharr[ monRef.options[ monRef.selectedIndex ].value ] ) {
        strErrMess = shipperRef_Msg001;
        return false;
    }

    return compDates( theform, fieldRef );
}


function compDates( theform, fieldRef ) {
    var elems = theform.elements,
        toDayVal = elems[ "toDayValue" ].selectedIndex,
        toMonthVal = elems[ "toMonthValue" ].options[ elems[ "toMonthValue" ].selectedIndex ].value,
        toYearVal = elems[ "toYearValue" ].options[ elems[ "toYearValue" ].selectedIndex ].value,
        fromDayVal = elems[ "fromDayValue" ].selectedIndex,
        fromMonthVal = elems[ "fromMonthValue" ].options[ elems[ "fromMonthValue" ].selectedIndex ].value,
        fromYearVal = elems[ "fromYearValue" ].options[ elems[ "fromYearValue" ].selectedIndex ].value;

    var dateFrom = new Date( fromYearVal, fromMonthVal-1, fromDayVal+1 ),
        dateTo = new Date( toYearVal, toMonthVal-1, toDayVal+1 ),
        thisDate = new Date( today.getFullYear(), today.getMonth(), today.getDate() ),
        difference = dateTo - dateFrom,
        noOfDays = difference/86400000;

    if (fieldRef != "undefined" && fieldRef.name == "fromDayValue") {
        if ( noOfDays < 0 ) {
            strErrMess = shipperRef_Msg001;
            return false;
        }

        if ( noOfDays > maxDaysAllo ) {
            strErrMess = shipperRef_msg008;
            return false;
        }
    } else {
        if ( (thisDate - dateTo) < 0 ) {
            strErrMess = shipperRef_msg009;
            return false;
        }
    }

    return true;
}


function setupCookie( thisForm ) {
    shipref_setCookie(
        thisForm.fromDayValue.options[ thisForm.fromDayValue.selectedIndex ].value,
        thisForm.fromMonthValue.options[ thisForm.fromMonthValue.selectedIndex ].value,
        thisForm.fromYearValue.options[ thisForm.fromYearValue.selectedIndex ].value,
        thisForm.toDayValue.options[ thisForm.toDayValue.selectedIndex ].value,
        thisForm.toMonthValue.options[ thisForm.toMonthValue.selectedIndex ].value,
        thisForm.toYearValue.options[ thisForm.toYearValue.selectedIndex ].value
    );
}


function shipref_setCookie( fromDayValue, fromMonthValue, fromYearValue, toDayValue, toMonthValue, toYearValue ) {
    var shipref_fromDayValue = fromDayValue,
        shipref_fromMonthValue = fromMonthValue,
        shipref_fromYearValue = fromYearValue,
        shipref_toDayValue = toDayValue,
        shipref_toMonthValue = toMonthValue,
        shipref_toYearValue = toYearValue,
        expdate = new Date();

    FixCookieDate ( expdate );
    expdate.setTime ( expdate.getTime() + ( 31536000 ) );
    var cookieVal = shipref_fromDayValue + "!" + shipref_fromMonthValue + "!" + shipref_fromYearValue + "!" + shipref_toDayValue + "!" + shipref_toMonthValue + "!" + shipref_toYearValue;
    SetCookie( "shipRefDetails", cookieVal, expdate, '/' );

    shipref_dirty = false;
}


function shipref_readCookie() {
    var cook = GetCookie('shipRefDetails');

    if ( cook != null ) {
        details = cook.split('!');
        shipref_fromDayValue = details[0] ? details[0] : '';
        shipref_fromMonthValue = details[1] ? details[1] : '';
        shipref_fromYearValue = details[2] ? details[2] : '';
        shipref_toDayValue = details[3] ? details[3] : '';
        shipref_toMonthValue = details[4] ? details[4] : '';
        shipref_toYearValue = details[5] ? details[5] : '';
    } else {
        shipref_fromDayValue = "";
        shipref_fromMonthValue = "";
        shipref_fromYearValue = "";
        shipref_toDayValue = "";
        shipref_toMonthValue = "";
        shipref_toYearValue = "";
    }

    shipref_dirty = false;
}


function shipperForm( formRef ) {
    if ( validateForm( 'shipment' ) ) {
       setupCookie( formRef );
       return true;
    }
    return false;
}
