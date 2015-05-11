function createcrossclist(region, formname, countryarr, defaulttext) {
    var countrylistform = document.forms[formname];
    var countrysel = countrylistform.elements["country"];
    countrysel.length = 0;

    var country_selected = region.options[region.options.selectedIndex].value;
    if (countryarr[country_selected]) {
        countrylistform.country.options[0] = new Option(defaulttext);
        countrylistform.country.options[0].value = defaulttext;

        for (var count = 1; count - 1 < countryarr[country_selected].length; count++) {
            countrylistform.country.options[count] = new Option(countryarr[country_selected][count - 1][0]);
            countrylistform.country.options[count].value = countryarr[country_selected][count - 1][1];
        }
    }
}
