// Bootstrap - FontAwesome star rating

$.fn.rating = function (params, callback) {

    var settings = $.extend({
        startRate: 0,
        total: 0,
        stars: 5,
        textVote: "rate",
        textVotes: "rates",
        readOnly: false,
        fullStarClass: 'fas fa-star',
        halfStarClass: 'fas fa-star-half-alt',
        emptyStarClass: 'far fa-star',
        readOnlyMessage: "If you want to rate please login",
        readOnlyLink: "pas de lien par defaut",
        selectedColor: '#F00',
        rateInfos: true
    }, params);

    var box = ((settings.readOnly) ? $('<a href="' + settings.readOnlyLink + '" class="text-star" title="' + settings.readOnlyMessage + '"></a>') : $('<span class="text-star"></span>'));

    function getPoll(rateAmount) {
        var split_rate = ("" + rateAmount).split(".");
        var current_poll = ('<span class="' + settings.fullStarClass + '"></span>').repeat(split_rate[0]);
        current_poll += (split_rate[1] != null) ? '<span class="' + settings.halfStarClass + '"></span>' : "";
        current_poll += ('<span class="' + settings.emptyStarClass + '"></span>').repeat(settings.stars - Math.ceil(rateAmount));
        return current_poll;
    }
    ;

    box.html(getPoll(settings.rate));

    $(this).html(box);
    $(this).append(" ");

    if (settings.rateInfos) {
        var total_rates = $('<small id="total_rates"></small>');
        total_rates.html("(<small>" + settings.rate + "</small>/" + settings.total + " " + ((settings.total == 1) ? settings.textVote : settings.textVotes) + ")");
        $(this).append(total_rates);
    }
    var amount = settings.rate;

    if (!settings.readOnly) {
        var i = 0;

        $(this).hover(function () {
            $(".text-star").css({cursor: "default"});

            $.each($(".text-star span"), function (item, value) {

                $(this).hover(function () {
                    i = 0;
                    $(this).css({cursor: "pointer"}).removeClass(settings.halfStarClass).removeClass(settings.emptyStarClass).addClass(settings.fullStarClass).css("font-size", "1.3em");
                    $(this).prevAll().each(function () {
                        $(this).removeClass(settings.emptyStarClass).removeClass(settings.halfStarClass).addClass(settings.fullStarClass).css("font-size", "1em");
                    });
                    $(this).nextAll().each(function () {
                        $(this).removeClass(settings.halfStarClass).removeClass(settings.fullStarClass).addClass(settings.emptyStarClass).css("font-size", "1em");
                    });
                    $(this).click(function () {
                        i++;
                        $(this).css('color', settings.selectedColor);
                        amount = $(this).index() + 1;
                        if (callback && typeof (callback) === "function") {
                            if (i == 1) {
                                callback(amount);
                            }
                        }
                    });
                });
            });
        }, function () {
            $(".text-star").html(getPoll(amount));
            $(".text-star span").css("font-size", "1em")
        });
    }
    box.tooltip();
}
