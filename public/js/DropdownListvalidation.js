//this function is uesd in country profile  
function CheckCountrySelected(form_Id, defaultvalue, sitecountrycode, blockID) {

    var selected = document.getElementById(form_Id).elements["country"].options[document
        .getElementById(form_Id).elements["country"].selectedIndex].value;

    if (defaultvalue == selected) {
        fnLinkFullUI(errorMessage, blockID);
        return false;
    } else {

        if (selected.indexOf(sitecountrycode) >= 0) {

            //if the country is selected in dropdown is
            //same as country of site
            //open the link of country profile in same window

            return true;
        }
        //if link is external ,open  new window with external link and return false
        else if (selected.indexOf("http") >= 0
            || selected.indexOf("https") >= 0) {

            window.open(selected, 'DHL');
            return false;
        } else {
            //open internal link in same window// this logic is already present
            //Linklistdropdownjsp

            return true;
        }
    }
}

/// this function is used in country selector
function CheckCountrySelector(formId, defaultvalue, isgloballist, sitecountrycode, blockID) {

    var globallistpresent = isgloballist;
    var trueflag = "true";

    var selected = document.getElementById(formId).elements["country"].options[document
        .getElementById(formId).elements["country"].selectedIndex].value;
    if (defaultvalue == selected) {
        //alert(" not selected any thing"+defaultvalue);
        fnLinkFullUI(errorMessage, blockID);
        return false;
    } else {
        if (globallistpresent == trueflag) {
            //alert("list is global normal flow");
            //open all the URL in same window  for "global_list" as per the
            //ticket requirment DHL-1973
            window.open(selected, "_parent");
            return false;
        } else {
            if (selected.indexOf(sitecountrycode) >= 0) {
                //if selected list is other than " gloabl_locator"
                //then if country selected is same as country of site
                //open url in same window
                window.open(selected, "_parent");
                return false;
            }

            else if (selected.indexOf("http") >= 0
                || selected.indexOf("https") >= 0) {

                //if country selected is diffrent then
                //noraml flow /since normol-flow open all the url in new window
                window.open(selected, "DHL");
                return false;
            } else {
                // if any case is not covered
                //then open URL in new  window as normal flow
                return true;
            }

        }

    }
}

//Added: DHL-1941
function fnLinkFullUI(header, blockId) {
    document.getElementById(blockId).innerHTML = "<p class=\"error\"><strong>" + header + "</strong></p>";
    document.getElementById(blockId).style.display = "block";
}

function checklistselected(formID, id, defaultvalue, blockID) {

    //var selected = document.linklist_dropdown_form.elements[id].options[document.linklist_dropdown_form.elements[id].selectedIndex].value;
    //alert(" form id "+formID);
    var option = document.getElementById(formID).elements[id].options[document
            .getElementById(formID).elements[id].selectedIndex];
    var url = option.value;

    if (defaultvalue == url) {
        //alert(" not selected any thing"+defaultvalue);
        fnLinkFullUI(errorMessage, blockID);
        return false;
    } else {

        if (option.getAttribute('data-link') == 'INTERNALURL') {
            //since this  url belongs to same site
            //will be opened in same window

            window.open(url, "_parent");
            return false;

        } else if (url.indexOf("http") >= 0 || url.indexOf("https") >= 0) {

            window.open(url, 'DHL');
            return false;
        } else {
            //open internal link in same window// this logic is already present
            //Linklistdropdownjsp

            return true;
        }
    }
}
