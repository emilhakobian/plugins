(function ($) {
    var defaults = {
        popupMinWidth  : '400',
        popupMinHeight: '200',
        popupObjClass : 'popupBox',
        animation: 'fadeIn', //,slideDown',
        onOK: function () {},
        onNO: function () { methods.removePopup(); },
        onCANCEL: function () { }
    }
    

    var methods = {
        
        init: function (object, options) {

            var settings = $.extend(defaults, options);

            return object.each(function () {
                $(this).click(function () {
                    methods.object = $(this);
                    methods.popupObj = $('.' + defaults.popupObjClass);
                    methods.openPopup()
                })
            })
        },

        removePopup: function () {
            var popupObj = $('.' + defaults.popupObjClass);
            if (popupObj.length > 0) {
                popupObj.remove();
                $('.BGOverlay').remove();
            }
        },

        getPopupInfo: function () {
            var popupObjectInfo = {}

            popupObjectInfo.title = methods.object.attr('title');
            popupObjectInfo.text = methods.object.attr('text');
            popupObjectInfo.type = 'confirm';

            return popupObjectInfo;
        },

        popupType: function(popupType) {
            switch (parseInt( popupType )) { 

                case 1:
                    return '<input type="button" value="Ok" class="popupButton"/>';
                    break;

                case 2:
                    return '<input type="button" value="Ok" class="popupButton" id="popupOKButton" /> <input type="button" value="No" class="popupButton" id="popupNOButton"/>';
                    break
            }
        },

        openPopup: function () {
           
            this.removePopup();
            var popupObject = this.getPopupInfo();

            var htmlStr = '';

            htmlStr += '<div class="' + defaults.popupObjClass + '">';
            htmlStr += '<div class="popupBoxTitle">' + popupObject.title + '</div>';
            htmlStr += '<div class="popupBoxText">' + popupObject.text + '</div>';
            htmlStr += this.popupType(2);
            htmlStr += '</div>';


            $('body').append('<div class="BGOverlay"> </div>').append(htmlStr);
            
            $('.' + defaults.popupObjClass).slideDown().css({ 'left': ($(window).width() - defaults.popupMinWidth) / 2, 'top': '100px' });
            
            $('#popupOKButton').on('click', defaults.onOK);
            $('#popupNOButton').on('click', defaults.onNO)
            $('#popupCANCELButton').on('click', defaults.onCANCEL)

        },
    }

    $.fn.popupBox = function (options) {
        methods.init($(this), options);
    }
})(jQuery);