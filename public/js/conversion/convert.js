var def_convert = "1.0"   // Version of convert.js
var tabLen, tabArea, tabWt, tabVol = true;

var errorStrings = new Array();

errorStrings['converr'] = new Array(comm_msg002, convert_msg001);
errorStrings['numerr'] = new Array(comm_msg003, comm_msg039 + comm_msg042);
errorStrings['inpterr'] = new Array(comm_msg004, comm_msg039);

var valueLength = new Array(
    "1",
    "2.54",
    "0.39",
    "25.40",
    "0.04",
    "0.31",
    "3.28",
    "0.91",
    "1.09",
    "1.61",
    "0.62");

var valueArea = new Array(
    "1",
    "6.451",
    "0.15",
    "0.09",
    "10.76",
    "0.84",
    "1.20",
    "2.59",
    "0.39",
    "0.40",
    "2.47");

var valueVolume = new Array(
    "1",
    "16.39",
    "0.06",
    "0.03",
    "35.32",
    "0.76",
    "1.31",
    "0.02",
    "61.03",
    "4.55",
    "0.22",
    "3.79",
    "0.26",
    "30.77",
    "0.03");

var valueWeight = new Array(
    "1",
    "28.35",
    "0.04",
    "0.45249",
    "2.21",
    "1.02",
    "0.98",
    "0.91",
    "1.10");

selectsArray = new Array(
    "lengthSelects",
    "areaSelects",
    "volumeSelects",
    "weightSelects");

function makeSelects() {
    var index = 0;
    //For length combobox
    for (j = 0; j < optionsLength.length; j++) {

        document.lengthForm.lengthSelects.options[j] = new Option(optionsLength[j]);
        document.lengthForm.lengthSelects.options[j].value = valueLength[j];
        document.lengthForm.lengthSelects.options[j].title = optionsLength[j];

    }
    document.lengthForm.lengthSelects.selectedIndex = index;


    for (j = 0; j < optionsArea.length; j++) {
        document.areaForm.areaSelects.options[j] = new Option(optionsArea[j]);
        document.areaForm.areaSelects.options[j].value = valueArea[j];
        document.areaForm.areaSelects.options[j].title = optionsArea[j];
    }
    document.areaForm.areaSelects.selectedIndex = index;


    for (j = 0; j < optionsVolume.length; j++) {
        document.volumeForm.volumeSelects.options[j] = new Option(optionsVolume[j]);
        document.volumeForm.volumeSelects.options[j].value = valueVolume[j];
        document.volumeForm.volumeSelects.options[j].title = optionsVolume[j];
    }
    document.volumeForm.volumeSelects.selectedIndex = index;

    for (j = 0; j < optionsWeight.length; j++) {
        document.weightForm.weightSelects.options[j] = new Option(optionsWeight[j]);
        document.weightForm.weightSelects.options[j].value = valueWeight[j];
        //suresh
        document.weightForm.weightSelects.options[j].title = optionsWeight[j];
    }
    document.weightForm.weightSelects.selectedIndex = index;

}

function convertAlert(stringId) {
    eName = errorStrings[stringId][0];
    eText = errorStrings[stringId][1];

    dojo.byId('conversion_error_head').innerHTML = eName;
    dojo.byId('conversion_error_head').style.display = "block";
    dojo.byId('conversion_error_body').innerHTML = eText;
    dojo.byId('conversion_error_body').style.display = "block";
}

function twoDps(item) {
    return ( parseInt(item * 100) / 100 );
}

function convertFunc(formname, num_to_change, mult) {
    with (document.forms[formname]) {

        var num_change = num_to_change.value;
        var mult_by = mult.options[mult.selectedIndex].value;

        if (mult_by == "1") {
            result.value = num_change;
            convertAlert("converr");
            return;
        } else {
            if (num_change <= 0) {
                result.value = "0";
                convertAlert("numerr");
                return;
            }
        }

        var nresult = twoDps(num_change * mult_by);

        if (isNaN(nresult)) {
            result.value = "0";
            convertAlert("inpterr");
            return;
        }
        result.value = nresult;
    }

    dojo.byId('conversion_error_head').style.display = "none";
    dojo.byId('conversion_error_body').style.display = "none";
}
function fnSetTabLen() {
    if (tabLen) {
        document.areaForm.num_to_change.focus();
    }
    else {
        document.lengthForm.lengthSelects.focus();
    }
}
function fnSetTabArea() {
    if (tabArea) {
        document.volumeForm.num_to_change.focus();
    }
    else {
        document.areaForm.areaSelects.focus();
    }
}
function fnSetTabVol() {
    if (tabWt) {
        document.weightForm.num_to_change.focus();
    }
    else {
        document.volumeForm.volumeSelects.focus();
    }
}

