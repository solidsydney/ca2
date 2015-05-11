(function ($) {

    $.fn.tabmodul = function () {

        if ($(this).hasClass('is-initialized')) {
            return;
        }

        this.each(function () {

            //var loc = $(location).attr('href');

            //loc = loc.split('html');
            var loc = window.location.hash;
            $(this).prepend('<div class="containerTabNavigation"></div>');

            var containerContent = $(this).find('.containerContent');


            $(containerContent).each(function (index) {

                aHref = $(this).find('span.tabName a').attr('href');
                containerContentClass = 'containerContent_' + index;
                $(this).addClass(containerContentClass);
                containerTabClass = 'containerTab_' + index;
                tabNameClass = 'tabName' + index;
                tabTitle = $(this).find('span.tabName').text();
                tabName = $(this).find('span.tabName a').html();
                // alert(tabName);
                $(this).parents(".tabsModul").find('.containerTabNavigation').append('<div class="containerTab ' + containerTabClass + '"><div class="containerTabInnerDiv"><div class="containerTabContent"><div class="link"><a href="' + aHref + '" id="' + aHref + '" title="' + tabTitle + '">' + tabName + '</a></div></div></div></div>');

            });

            $('.containerTab').last().addClass("lastTab");

            $(this).find('.containerTabNavigation').append('<div style="clear:both"></div>');

            containerTabFirst = $(this).find('.containerTab').first();
            $(containerTabFirst).addClass('firstTab');

            containerTabAHref = $(this).find('.containerTabNavigation a');
            containerTab = $(this).find('.containerTab');
            $(containerTabFirst).addClass('containerTabChecked');
            $(containerContent).first().addClass('selectedContainerTab').show();
            $(containerContent).not('.selectedContainerTab').hide();


            $(containerTabAHref).each(function () {

                //var elHref = $(this).attr('href');
                var thisID = $(this).attr('id');

                if (thisID == loc) {
                    var myClass = $(this).parents('.containerTab').attr('class');
                    var temp = myClass.indexOf("_") + 1;
                    var result = myClass.charAt(temp);

                    $(this).parents('.containerTab').addClass("containerTabChecked");
                    var elClass = $(this).parents('.containerTab').attr('class');

                    elClass = elClass.search('firstTab')

                    if (elClass == -1) {
                        $(containerTabFirst).removeClass('containerTabChecked');

                    }

                    $(containerContent).find('.firstTab').removeClass('selectedContainerTab').hide();

                    $(this).parents(".tabsModul").find('.containerContentTabs .containerContent').each(function () {

                        var contentClass = $(this).attr('class');
                        var temp1 = contentClass.indexOf("_") + 1;

                        var result1 = contentClass.charAt(temp1);

                        if (result1 == result) {

                            $(this).addClass('selectedContainerTab').show();

                        }

                        else {
                            $(this).removeClass('selectedContainerTab').hide();
                        }

                    });
                }

            });


            // set Tab Height
            var max_height = 0;
            $(containerTab).each(function (e) {
                h = $(this).height() - 1;
                if (typeof(h) != "undefined") {
                    if (h > max_height) {
                        max_height = h;
                    }
                }

            });
            $(containerTab).each(function () {
                $(this).css("height", max_height);

            });


            $(containerTab).click(function () {

                var idx = $(this).index();

                $(this).parents(".tabsModul").find('.containerTab').removeClass('containerTabChecked');
                $(this).addClass('containerTabChecked');

                var thisClass = $(this).attr('class');
                var temp = thisClass.indexOf("_") + 1;
                var result = thisClass.charAt(temp);

                $(this).parents(".tabsModul").find('.containerContentTabs .containerContent').each(function () {

                    var contentClass = $(this).attr('class');
                    var temp1 = contentClass.indexOf("_") + 1;

                    var result1 = contentClass.charAt(temp1);

                    if (result1 == result) {
                        $(this).addClass('selectedContainerTab').show();

                        /* Added for Facelift 2013 */
                        if (typeof PubSub !== 'undefined') {
                            PubSub.publish('tab_click', idx);
                        }


                        var id = $(this).attr('id');
                        var index = findId(webtrends, id);
                        if (index != undefined) {
                            var enableWTags = webtrends[index + 1];
                            var tags = webtrends[index + 2];
                            var wtId = id.replace("containerContent", "");
                            if (enableWTags != '' && tags != '') {
                                dcsMultiTrack('DCS.dcsuri', pagePath + '-' + wtId, tags);
                            }
                        }
                    }

                    else {
                        $(this).removeClass('selectedContainerTab').hide();
                    }

                });

            });


        }); // end each(function()

        $(this).addClass('is-initialized');

    };
})(jQuery);


jQuery(document).ready(function () {

    jQuery('div.tabsModul').tabmodul();

    jQuery(".link a").click(function (event) {
        event.preventDefault();

        var isChildOfRotator = jQuery(this).parents().is("#facelift-homepage-module-teaser-rotator");
        if (!isChildOfRotator) {
            window.location.hash = jQuery(this).attr('id');
            if (jQuery.browser.msie) {
                if (location.hash) {
                    window.scrollTo(0, 0);
                }
            }
        }

    });

})

function switchPane(id) {
    var tabpane = 'containerContent' + id;
    var tabpanEl = jQuery('#' + tabpane);
    var tabpaneElClass = tabpanEl.attr('class');
    if (tabpaneElClass) {
        var position = tabpaneElClass.indexOf('_');
        var counter = tabpaneElClass.substr(position + 1, position + 2);
        var tabNavElement = jQuery('.containerTab_' + counter);
        var parentEl = jQuery('#' + tabpane).parents().parents();
        var parentElId = parentEl.attr('id');
        jQuery('#' + parentElId).find(jQuery(tabNavElement)).addClass('containerTabChecked');
        jQuery('#' + parentElId).find(jQuery('.containerTab').not(tabNavElement)).removeClass('containerTabChecked');
        tabpanEl.addClass("selectedContainerTab").show();
        jQuery('#' + parentElId).find(jQuery('.containerContent').not('.containerContent_' + counter)).removeClass('selectedContainerTab').hide();
        var linkId = jQuery(tabNavElement).find('.link a').attr('id');

        var isChildOfRotator = jQuery(tabNavElement).parents().is("#facelift-homepage-module-teaser-rotator");
        if (!isChildOfRotator) {
            window.location.hash = linkId;
            if (jQuery.browser.msie) {
                if (location.hash) {
                    window.scrollTo(0, 0);
                }
            }
        }

    }
}



