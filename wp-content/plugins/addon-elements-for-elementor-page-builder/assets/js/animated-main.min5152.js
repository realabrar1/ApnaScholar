jQuery(document).on("elementor/render/animation-text", function (e) {
    jQuery(
        ".eae-at-animation-text-wrapper .eae-at-animation-text:first-child"
    ).addClass("is-visible");
    var a,
        t,
        s = 2500,
        n = 50,
        o = 150,
        r = 500,
        l = r + 800;
    function d(e) {
        var i = m(e);
        if (e.parents(".eae-at-animation").hasClass("type")) {
            var a = e.parent(".eae-at-animation-text-wrapper");
            a.addClass("selected").removeClass("waiting"),
                setTimeout(function () {
                    a.removeClass("selected"),
                        e
                            .removeClass("is-visible")
                            .addClass("is-hidden")
                            .children("i")
                            .removeClass("in")
                            .addClass("out");
                }, r),
                setTimeout(function () {
                    !(function (e, i) {
                        e.parents(".eae-at-animation").hasClass("type") &&
                            (c(e.find("i").eq(0), e, !1, i),
                                e.addClass("is-visible").removeClass("is-hidden"));
                    })(i, o);
                }, l);
        } else if (e.parents(".eae-at-animation").hasClass("letters")) {
            var t = e.children("i").length >= i.children("i").length;
            u(e.find("i").eq(0), e, t, n), c(i.find("i").eq(0), i, t, n);
        } else
            f(e, i),
                setTimeout(function () {
                    d(i);
                }, s);
    }
    function u(e, i, a, t) {
        if (
            (e.removeClass("in").addClass("out"),
                e.is(":last-child")
                    ? a &&
                    setTimeout(function () {
                        d(m(i));
                    }, s)
                    : setTimeout(function () {
                        u(e.next(), i, a, t);
                    }, t),
                e.is(":last-child") && jQuery("html").hasClass("no-csstransitions"))
        ) {
            var n = m(i);
            f(i, n);
        }
    }
    function c(e, i, a, t) {
        e.addClass("in").removeClass("out"),
            e.is(":last-child")
                ? (i.parents(".eae-at-animation").hasClass("type") &&
                    setTimeout(function () {
                        i.parents(".eae-at-animation-text-wrapper").addClass("waiting");
                    }, 200),
                    a ||
                    setTimeout(function () {
                        d(i);
                    }, s))
                : setTimeout(function () {
                    c(e.next(), i, a, t);
                }, t);
    }
    function m(e) {
        return e.is(":last-child") ? e.parent().children().eq(0) : e.next();
    }
    function f(e, i) {
        e.removeClass("is-visible").addClass("is-hidden"),
            i.removeClass("is-hidden").addClass("is-visible");
    }
    jQuery(".eae-at-animation.letters")
        .find(".eae-at-animation-text")
        .each(function () {
            var e = jQuery(this),
                a = e.text().split(""),
                t = e.hasClass("is-visible");
            for (i in a)
                a[i] = t ? '<i class="in">' + a[i] + "</i>" : "<i>" + a[i] + "</i>";
            var s = a.join("");
            e.html(s).css("opacity", 1);
        }),
        (a = jQuery(".eae-at-animation-text-wrapper")),
        (t = s),
        a.each(function () {
            var e = jQuery(this);
            if (!e.hasClass("type")) {
                var i = e.find(".eae-at-animation-text-wrapper .eae-at-animation-text"),
                    a = 0;
                i.each(function () {
                    var e = jQuery(this).width();
                    e > a && (a = e);
                }),
                    e.find(".eae-at-animation-text-wrapper").css("width", a);
            }
            setTimeout(function () {
                d(e.find(".is-visible").eq(0));
            }, t);
        });
});
