!(function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : "object" == typeof exports
            ? e(require("jquery"))
            : e(window.jQuery || window.Zepto);
})(function (e) {
    var t,
        n,
        o,
        i,
        a,
        r,
        s = "Close",
        l = "BeforeClose",
        c = "MarkupParse",
        d = "Open",
        u = "Change",
        p = "mfp",
        f = "." + p,
        m = "mfp-ready",
        g = "mfp-removing",
        h = "mfp-prevent-close",
        v = function () { },
        y = !!window.jQuery,
        C = e(window),
        w = function (e, n) {
            t.ev.on(p + e + f, n);
        },
        b = function (t, n, o, i) {
            var a = document.createElement("div");
            return (
                (a.className = "mfp-" + t),
                o && (a.innerHTML = o),
                i ? n && n.appendChild(a) : ((a = e(a)), n && a.appendTo(n)),
                a
            );
        },
        I = function (n, o) {
            t.ev.triggerHandler(p + n, o),
                t.st.callbacks &&
                ((n = n.charAt(0).toLowerCase() + n.slice(1)),
                    t.st.callbacks[n] &&
                    t.st.callbacks[n].apply(t, e.isArray(o) ? o : [o]));
        },
        x = function (n) {
            return (
                (n === r && t.currTemplate.closeBtn) ||
                ((t.currTemplate.closeBtn = e(
                    t.st.closeMarkup.replace("%title%", t.st.tClose)
                )),
                    (r = n)),
                t.currTemplate.closeBtn
            );
        },
        k = function () {
            e.eaePopup.instance || ((t = new v()).init(), (e.eaePopup.instance = t));
        };
    (v.prototype = {
        constructor: v,
        init: function () {
            var n = navigator.appVersion;
            (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
                (t.isAndroid = /android/gi.test(n)),
                (t.isIOS = /iphone|ipad|ipod/gi.test(n)),
                (t.supportsTransition = (function () {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (void 0 !== e.transition) return !0;
                    for (; t.length;) if (t.pop() + "Transition" in e) return !0;
                    return !1;
                })()),
                (t.probablyMobile =
                    t.isAndroid ||
                    t.isIOS ||
                    /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                        navigator.userAgent
                    )),
                (o = e(document)),
                (t.popupsCache = {});
        },
        open: function (n) {
            var i;
            if (!1 === n.isObj) {
                (t.items = n.items.toArray()), (t.index = 0);
                var r,
                    s = n.items;
                for (i = 0; i < s.length; i++)
                    if (((r = s[i]).parsed && (r = r.el[0]), r === n.el[0])) {
                        t.index = i;
                        break;
                    }
            } else
                (t.items = e.isArray(n.items) ? n.items : [n.items]),
                    (t.index = n.index || 0);
            if (!t.isOpen) {
                (t.types = []),
                    (a = "bp-popup"),
                    n.mainEl && n.mainEl.length ? (t.ev = n.mainEl.eq(0)) : (t.ev = o),
                    n.key
                        ? (t.popupsCache[n.key] || (t.popupsCache[n.key] = {}),
                            (t.currTemplate = t.popupsCache[n.key]))
                        : (t.currTemplate = {}),
                    (t.st = e.extend(!0, {}, e.eaePopup.defaults, n)),
                    (t.fixedContentPos =
                        "auto" === t.st.fixedContentPos
                            ? !t.probablyMobile
                            : t.st.fixedContentPos),
                    t.st.modal &&
                    ((t.st.closeOnContentClick = !1),
                        (t.st.closeOnBgClick = !1),
                        (t.st.showCloseBtn = !1),
                        (t.st.enableEscapeKey = !1)),
                    t.bgOverlay ||
                    ((t.bgOverlay = b("bg").on("click" + f, function () {
                        t.close();
                    })),
                        (t.wrap = b("wrap")
                            .attr("tabindex", -1)
                            .on("click" + f, function (e) {
                                t._checkIfClose(e.target) && t.close();
                            })),
                        (t.container = b("container", t.wrap))),
                    (t.contentContainer = b("content")),
                    t.st.preloader &&
                    (t.preloader = b("preloader", t.container, t.st.tLoading));
                var l = e.eaePopup.modules;
                for (i = 0; i < l.length; i++) {
                    var u = l[i];
                    (u = u.charAt(0).toUpperCase() + u.slice(1)), t["init" + u].call(t);
                }
                I("BeforeOpen"),
                    t.st.showCloseBtn &&
                    (t.st.closeBtnInside
                        ? (w(c, function (e, t, n, o) {
                            n.close_replaceWith = x(o.type);
                        }),
                            (a += " eae-close-btn-in"))
                        : t.wrap.append(x())),
                    t.st.alignTop && (a += " mfp-align-top"),
                    t.fixedContentPos
                        ? t.wrap.css({
                            overflow: t.st.overflowY,
                            overflowX: "hidden",
                            overflowY: t.st.overflowY,
                        })
                        : t.wrap.css({ top: C.scrollTop(), position: "absolute" }),
                    (!1 === t.st.fixedBgPos ||
                        ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) &&
                    t.bgOverlay.css({ height: o.height(), position: "absolute" }),
                    t.st.enableEscapeKey &&
                    o.on("keyup" + f, function (e) {
                        27 === e.keyCode && t.close();
                    }),
                    C.on("resize" + f, function () {
                        t.updateSize();
                    }),
                    t.st.closeOnContentClick || (a += " mfp-auto-cursor"),
                    a && t.wrap.addClass(a);
                var p = (t.wH = C.height()),
                    g = {};
                if (t.fixedContentPos && t._hasScrollBar(p)) {
                    var h = t._getScrollbarSize();
                    h && (g.marginRight = h);
                }
                t.fixedContentPos &&
                    (t.isIE7
                        ? e("body, html").css("overflow", "hidden")
                        : (g.overflow = "hidden"));
                var v = t.st.mainClass;
                return (
                    t.isIE7 && (v += " mfp-ie7"),
                    v && t._addClassToMFP(v),
                    t.updateItemHTML(),
                    I("BuildControls"),
                    e("html").css(g),
                    t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                    (t._lastFocusedEl = document.activeElement),
                    setTimeout(function () {
                        t.content
                            ? (t._addClassToMFP(m), t._setFocus())
                            : t.bgOverlay.addClass(m),
                            o.on("focusin" + f, t._onFocusIn);
                    }, 16),
                    (t.isOpen = !0),
                    t.updateSize(p),
                    I(d),
                    n
                );
            }
            t.updateItemHTML();
        },
        close: function () {
            t.isOpen &&
                (I(l),
                    (t.isOpen = !1),
                    t.st.removalDelay && !t.isLowIE && t.supportsTransition
                        ? (t._addClassToMFP(g),
                            setTimeout(function () {
                                t._close();
                            }, t.st.removalDelay))
                        : t._close());
        },
        _close: function () {
            I(s);
            var n = g + " " + m + " ";
            if (
                (t.bgOverlay.detach(),
                    t.wrap.detach(),
                    t.container.empty(),
                    t.st.mainClass && (n += t.st.mainClass + " "),
                    t._removeClassFromMFP(n),
                    t.fixedContentPos)
            ) {
                var i = { marginRight: "" };
                t.isIE7 ? e("body, html").css("overflow", "") : (i.overflow = ""),
                    e("html").css(i);
            }
            o.off("keyup.mfp focusin" + f),
                t.ev.off(f),
                t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                t.bgOverlay.attr("class", "bp-popup mfp-bg"),
                t.container.attr("class", "mfp-container"),
                !t.st.showCloseBtn ||
                (t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type]) ||
                (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
                t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
                (t.currItem = null),
                (t.content = null),
                (t.currTemplate = null),
                (t.prevHeight = 0),
                I("AfterClose");
        },
        updateSize: function (e) {
            if (t.isIOS) {
                var n = document.documentElement.clientWidth / window.innerWidth,
                    o = window.innerHeight * n;
                t.wrap.css("height", o), (t.wH = o);
            } else t.wH = e || C.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), I("Resize");
        },
        updateItemHTML: function () {
            var n = t.items[t.index];
            t.contentContainer.detach(),
                t.content && t.content.detach(),
                n.parsed || (n = t.parseEl(t.index));
            var o = n.type;
            if (
                (I("BeforeChange", [t.currItem ? t.currItem.type : "", o]),
                    (t.currItem = n),
                    !t.currTemplate[o])
            ) {
                var a = !!t.st[o] && t.st[o].markup;
                I("FirstMarkupParse", a), (t.currTemplate[o] = !a || e(a));
            }
            i && i !== n.type && t.container.removeClass("mfp-" + i + "-holder");
            var r = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](
                n,
                t.currTemplate[o]
            );
            t.appendContent(r, o),
                (n.preloaded = !0),
                I(u, n),
                (i = n.type),
                t.container.prepend(t.contentContainer),
                I("AfterChange");
        },
        appendContent: function (e, n) {
            (t.content = e),
                e
                    ? t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[n]
                        ? t.content.find(".eae-close").length || t.content.append(x())
                        : (t.content = e)
                    : (t.content = ""),
                I("BeforeAppend"),
                t.container.addClass("mfp-" + n + "-holder"),
                t.contentContainer.append(t.content);
        },
        parseEl: function (n) {
            var o,
                i = t.items[n];
            if (
                (i.tagName
                    ? (i = { el: e(i) })
                    : ((o = i.type), (i = { data: i, src: i.src })),
                    i.el)
            ) {
                for (var a = t.types, r = 0; r < a.length; r++)
                    if (i.el.hasClass("mfp-" + a[r])) {
                        o = a[r];
                        break;
                    }
                (i.src = i.el.attr("data-mfp-src")),
                    i.src || (i.src = i.el.attr("href"));
            }
            return (
                (i.type = o || t.st.type || "inline"),
                (i.index = n),
                (i.parsed = !0),
                (t.items[n] = i),
                I("ElementParse", i),
                t.items[n]
            );
        },
        addGroup: function (e, n) {
            var o = function (o) {
                (o.mfpEl = this), t._openClick(o, e, n);
            };
            n || (n = {});
            var i = "click.magnificPopup";
            (n.mainEl = e),
                n.items
                    ? ((n.isObj = !0), e.off(i).on(i, o))
                    : ((n.isObj = !1),
                        n.delegate
                            ? e.off(i).on(i, n.delegate, o)
                            : ((n.items = e), e.off(i).on(i, o)));
        },
        _openClick: function (n, o, i) {
            if (
                (void 0 !== i.midClick ? i.midClick : e.eaePopup.defaults.midClick) ||
                !(2 === n.which || n.ctrlKey || n.metaKey || n.altKey || n.shiftKey)
            ) {
                var a =
                    void 0 !== i.disableOn ? i.disableOn : e.eaePopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0;
                    } else if (C.width() < a) return !0;
                n.type && (n.preventDefault(), t.isOpen && n.stopPropagation()),
                    (i.el = e(n.mfpEl)),
                    i.delegate && (i.items = o.find(i.delegate)),
                    t.open(i);
            }
        },
        updateStatus: function (e, o) {
            if (t.preloader) {
                n !== e && t.container.removeClass("mfp-s-" + n),
                    o || "loading" !== e || (o = t.st.tLoading);
                var i = { status: e, text: o };
                I("UpdateStatus", i),
                    (e = i.status),
                    (o = i.text),
                    t.preloader.html(o),
                    t.preloader.find("a").on("click", function (e) {
                        e.stopImmediatePropagation();
                    }),
                    t.container.addClass("mfp-s-" + e),
                    (n = e);
            }
        },
        _checkIfClose: function (n) {
            if (!e(n).hasClass(h)) {
                var o = t.st.closeOnContentClick,
                    i = t.st.closeOnBgClick;
                if (o && i) return !0;
                if (
                    !t.content ||
                    e(n).hasClass("eae-close") ||
                    (t.preloader && n === t.preloader[0])
                )
                    return !0;
                if (n === t.content[0] || e.contains(t.content[0], n)) {
                    if (o) return !0;
                } else if (i && e.contains(document, n)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e);
        },
        _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
        },
        _hasScrollBar: function (e) {
            return (
                (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || C.height())
            );
        },
        _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
        },
        _onFocusIn: function (n) {
            if (n.target !== t.wrap[0] && !e.contains(t.wrap[0], n.target))
                return t._setFocus(), !1;
        },
        _parseMarkup: function (t, n, o) {
            var i;
            o.data && (n = e.extend(o.data, n)),
                I(c, [t, n, o]),
                e.each(n, function (n, o) {
                    if (void 0 === o || !1 === o) return !0;
                    if ((i = n.split("_")).length > 1) {
                        var a = t.find(f + "-" + i[0]);
                        if (a.length > 0) {
                            var r = i[1];
                            "replaceWith" === r
                                ? a[0] !== o[0] && a.replaceWith(o)
                                : "img" === r
                                    ? a.is("img")
                                        ? a.attr("src", o)
                                        : a.replaceWith(
                                            e("<img>").attr("src", o).attr("class", a.attr("class"))
                                        )
                                    : a.attr(i[1], o);
                        }
                    } else t.find(f + "-" + n).html(o);
                });
        },
        _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                (e.style.cssText =
                    "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
                    document.body.appendChild(e),
                    (t.scrollbarSize = e.offsetWidth - e.clientWidth),
                    document.body.removeChild(e);
            }
            return t.scrollbarSize;
        },
    }),
        (e.eaePopup = {
            instance: null,
            proto: v.prototype,
            modules: [],
            open: function (t, n) {
                return (
                    k(),
                    ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0),
                    (t.index = n || 0),
                    this.instance.open(t)
                );
            },
            close: function () {
                return e.eaePopup.instance && e.eaePopup.instance.close();
            },
            registerModule: function (t, n) {
                n.options && (e.eaePopup.defaults[t] = n.options),
                    e.extend(this.proto, n.proto),
                    this.modules.push(t);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup:
                    '<button title="%title%" type="button" class="eae-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
            },
        }),
        (e.fn.eaePopup = function (n) {
            k();
            var o = e(this);
            if ("string" == typeof n)
                if ("open" === n) {
                    var i,
                        a = y ? o.data("magnificPopup") : o[0].magnificPopup,
                        r = parseInt(arguments[1], 10) || 0;
                    a.items
                        ? (i = a.items[r])
                        : ((i = o), a.delegate && (i = i.find(a.delegate)), (i = i.eq(r))),
                        t._openClick({ mfpEl: i }, o, a);
                } else
                    t.isOpen && t[n].apply(t, Array.prototype.slice.call(arguments, 1));
            else
                (n = e.extend(!0, {}, n)),
                    y ? o.data("magnificPopup", n) : (o[0].magnificPopup = n),
                    t.addGroup(o, n);
            return o;
        });
    var T,
        _,
        P,
        S = "inline",
        E = function () {
            P && (_.after(P.addClass(T)).detach(), (P = null));
        };
    e.eaePopup.registerModule(S, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found",
        },
        proto: {
            initInline: function () {
                t.types.push(S),
                    w(s + "." + S, function () {
                        E();
                    });
            },
            getInline: function (n, o) {
                if ((E(), n.src)) {
                    var i = t.st.inline,
                        a = e(n.src);
                    if (a.length) {
                        var r = a[0].parentNode;
                        r &&
                            r.tagName &&
                            (_ || ((T = i.hiddenClass), (_ = b(T)), (T = "mfp-" + T)),
                                (P = a.after(_).detach().removeClass(T))),
                            t.updateStatus("ready");
                    } else t.updateStatus("error", i.tNotFound), (a = e("<div>"));
                    return (n.inlineElement = a), a;
                }
                return t.updateStatus("ready"), t._parseMarkup(o, {}, n), o;
            },
        },
    });
    var z,
        O = "ajax",
        M = function () {
            z && e(document.body).removeClass(z);
        },
        B = function () {
            M(), t.req && t.req.abort();
        };
    e.eaePopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        proto: {
            initAjax: function () {
                t.types.push(O),
                    (z = t.st.ajax.cursor),
                    w(s + "." + O, B),
                    w("BeforeChange." + O, B);
            },
            getAjax: function (n) {
                z && e(document.body).addClass(z), t.updateStatus("loading");
                var o = e.extend(
                    {
                        url: n.src,
                        success: function (o, i, a) {
                            var r = { data: o, xhr: a };
                            I("ParseAjax", r),
                                t.appendContent(e(r.data), O),
                                (n.finished = !0),
                                M(),
                                t._setFocus(),
                                setTimeout(function () {
                                    t.wrap.addClass(m);
                                }, 16),
                                t.updateStatus("ready"),
                                I("AjaxContentAdded");
                        },
                        error: function () {
                            M(),
                                (n.finished = n.loadError = !0),
                                t.updateStatus(
                                    "error",
                                    t.st.ajax.tError.replace("%url%", n.src)
                                );
                        },
                    },
                    t.st.ajax.settings
                );
                return (t.req = e.ajax(o)), "";
            },
        },
    });
    var L;
    e.eaePopup.registerModule("image", {
        options: {
            markup:
                '<div class="mfp-figure"><div class="eae-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var n = t.st.image,
                    o = ".image";
                t.types.push("image"),
                    w(d + o, function () {
                        "image" === t.currItem.type &&
                            n.cursor &&
                            e(document.body).addClass(n.cursor);
                    }),
                    w(s + o, function () {
                        n.cursor && e(document.body).removeClass(n.cursor),
                            C.off("resize" + f);
                    }),
                    w("Resize" + o, t.resizeImage),
                    t.isLowIE && w("AfterChange", t.resizeImage);
            },
            resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var n = 0;
                    t.isLowIE &&
                        (n =
                            parseInt(e.img.css("padding-top"), 10) +
                            parseInt(e.img.css("padding-bottom"), 10)),
                        e.img.css("max-height", t.wH - n);
                }
            },
            _onImageHasSize: function (e) {
                e.img &&
                    ((e.hasSize = !0),
                        L && clearInterval(L),
                        (e.isCheckingImgSize = !1),
                        I("ImageHasSize", e),
                        e.imgHidden &&
                        (t.content && t.content.removeClass("mfp-loading"),
                            (e.imgHidden = !1)));
            },
            findImageSize: function (e) {
                var n = 0,
                    o = e.img[0],
                    i = function (a) {
                        L && clearInterval(L),
                            (L = setInterval(function () {
                                o.naturalWidth > 0
                                    ? t._onImageHasSize(e)
                                    : (n > 200 && clearInterval(L),
                                        3 === ++n ? i(10) : 40 === n ? i(50) : 100 === n && i(500));
                            }, a));
                    };
                i(1);
            },
            getImage: function (n, o) {
                var i = 0,
                    a = function () {
                        n &&
                            (n.img[0].complete
                                ? (n.img.off(".mfploader"),
                                    n === t.currItem &&
                                    (t._onImageHasSize(n), t.updateStatus("ready")),
                                    (n.hasSize = !0),
                                    (n.loaded = !0),
                                    I("ImageLoadComplete"))
                                : ++i < 200
                                    ? setTimeout(a, 100)
                                    : r());
                    },
                    r = function () {
                        n &&
                            (n.img.off(".mfploader"),
                                n === t.currItem &&
                                (t._onImageHasSize(n),
                                    t.updateStatus("error", s.tError.replace("%url%", n.src))),
                                (n.hasSize = !0),
                                (n.loaded = !0),
                                (n.loadError = !0));
                    },
                    s = t.st.image,
                    l = o.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    (c.className = "mfp-img"),
                        n.el &&
                        n.el.find("img").length &&
                        (c.alt = n.el.find("img").attr("alt")),
                        (n.img = e(c).on("load.mfploader", a).on("error.mfploader", r)),
                        (c.src = n.src),
                        l.is("img") && (n.img = n.img.clone()),
                        (c = n.img[0]).naturalWidth > 0
                            ? (n.hasSize = !0)
                            : c.width || (n.hasSize = !1);
                }
                return (
                    t._parseMarkup(
                        o,
                        {
                            title: (function (n) {
                                if (n.data && void 0 !== n.data.title) return n.data.title;
                                var o = t.st.image.titleSrc;
                                if (o) {
                                    if (e.isFunction(o)) return o.call(t, n);
                                    if (n.el) return n.el.attr(o) || "";
                                }
                                return "";
                            })(n),
                            img_replaceWith: n.img,
                        },
                        n
                    ),
                    t.resizeImage(),
                    n.hasSize
                        ? (L && clearInterval(L),
                            n.loadError
                                ? (o.addClass("mfp-loading"),
                                    t.updateStatus("error", s.tError.replace("%url%", n.src)))
                                : (o.removeClass("mfp-loading"), t.updateStatus("ready")),
                            o)
                        : (t.updateStatus("loading"),
                            (n.loading = !0),
                            n.hasSize ||
                            ((n.imgHidden = !0),
                                o.addClass("mfp-loading"),
                                t.findImageSize(n)),
                            o)
                );
            },
        },
    });
    var H;
    e.eaePopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var e,
                    n = t.st.zoom,
                    o = ".zoom";
                if (n.enabled && t.supportsTransition) {
                    var i,
                        a,
                        r = n.duration,
                        c = function (e) {
                            var t = e
                                .clone()
                                .removeAttr("style")
                                .removeAttr("class")
                                .addClass("mfp-animated-image"),
                                o = "all " + n.duration / 1e3 + "s " + n.easing,
                                i = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden",
                                },
                                a = "transition";
                            return (
                                (i["-webkit-" + a] = i["-moz-" + a] = i["-o-" + a] = i[a] = o),
                                t.css(i),
                                t
                            );
                        },
                        d = function () {
                            t.content.css("visibility", "visible");
                        };
                    w("BuildControls" + o, function () {
                        if (t._allowZoom()) {
                            if (
                                (clearTimeout(i),
                                    t.content.css("visibility", "hidden"),
                                    !(e = t._getItemToZoom()))
                            )
                                return void d();
                            (a = c(e)).css(t._getOffset()),
                                t.wrap.append(a),
                                (i = setTimeout(function () {
                                    a.css(t._getOffset(!0)),
                                        (i = setTimeout(function () {
                                            d(),
                                                setTimeout(function () {
                                                    a.remove(), (e = a = null), I("ZoomAnimationEnded");
                                                }, 16);
                                        }, r));
                                }, 16));
                        }
                    }),
                        w(l + o, function () {
                            if (t._allowZoom()) {
                                if ((clearTimeout(i), (t.st.removalDelay = r), !e)) {
                                    if (!(e = t._getItemToZoom())) return;
                                    a = c(e);
                                }
                                a.css(t._getOffset(!0)),
                                    t.wrap.append(a),
                                    t.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        a.css(t._getOffset());
                                    }, 16);
                            }
                        }),
                        w(s + o, function () {
                            t._allowZoom() && (d(), a && a.remove(), (e = null));
                        });
                }
            },
            _allowZoom: function () {
                return "image" === t.currItem.type;
            },
            _getItemToZoom: function () {
                return !!t.currItem.hasSize && t.currItem.img;
            },
            _getOffset: function (n) {
                var o,
                    i = (o = n
                        ? t.currItem.img
                        : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    a = parseInt(o.css("padding-top"), 10),
                    r = parseInt(o.css("padding-bottom"), 10);
                i.top -= e(window).scrollTop() - a;
                var s = {
                    width: o.width(),
                    height: (y ? o.innerHeight() : o[0].offsetHeight) - r - a,
                };
                return (
                    void 0 === H &&
                    (H = void 0 !== document.createElement("p").style.MozTransform),
                    H
                        ? (s["-moz-transform"] = s.transform =
                            "translate(" + i.left + "px," + i.top + "px)")
                        : ((s.left = i.left), (s.top = i.top)),
                    s
                );
            },
        },
    });
    var A = "iframe",
        F = function (e) {
            if (t.currTemplate[A]) {
                var n = t.currTemplate[A].find("iframe");
                n.length &&
                    (e || (n[0].src = "//about:blank"),
                        t.isIE8 && n.css("display", e ? "block" : "none"));
            }
        };
    e.eaePopup.registerModule(A, {
        options: {
            markup:
                '<div class="mfp-iframe-scaler"><div class="eae-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1",
                },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                t.types.push(A),
                    w("BeforeChange", function (e, t, n) {
                        t !== n && (t === A ? F() : n === A && F(!0));
                    }),
                    w(s + "." + A, function () {
                        F();
                    });
            },
            getIframe: function (n, o) {
                var i = n.src,
                    a = t.st.iframe;
                e.each(a.patterns, function () {
                    if (i.indexOf(this.index) > -1)
                        return (
                            this.id &&
                            (i =
                                "string" == typeof this.id
                                    ? i.substr(
                                        i.lastIndexOf(this.id) + this.id.length,
                                        i.length
                                    )
                                    : this.id.call(this, i)),
                            (i = this.src.replace("%id%", i)),
                            !1
                        );
                });
                var r = {};
                return (
                    a.srcAction && (r[a.srcAction] = i),
                    t._parseMarkup(o, r, n),
                    t.updateStatus("ready"),
                    o
                );
            },
        },
    });
    var j = function (e) {
        var n = t.items.length;
        return e > n - 1 ? e - n : e < 0 ? n + e : e;
    },
        N = function (e, t, n) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
        };
    e.eaePopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup:
                '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var n = t.st.gallery,
                    i = ".mfp-gallery";
                if (((t.direction = !0), !n || !n.enabled)) return !1;
                (a += " mfp-gallery"),
                    w(d + i, function () {
                        n.navigateByImgClick &&
                            t.wrap.on("click" + i, ".mfp-img", function () {
                                if (t.items.length > 1) return t.next(), !1;
                            }),
                            o.on("keydown" + i, function (e) {
                                37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                            });
                    }),
                    w("UpdateStatus" + i, function (e, n) {
                        n.text && (n.text = N(n.text, t.currItem.index, t.items.length));
                    }),
                    w(c + i, function (e, o, i, a) {
                        var r = t.items.length;
                        i.counter = r > 1 ? N(n.tCounter, a.index, r) : "";
                    }),
                    w("BuildControls" + i, function () {
                        if (t.items.length > 1 && n.arrows && !t.arrowLeft) {
                            var o = n.arrowMarkup,
                                i = (t.arrowLeft = e(
                                    o.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")
                                ).addClass(h)),
                                a = (t.arrowRight = e(
                                    o.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")
                                ).addClass(h));
                            i.click(function () {
                                t.prev();
                            }),
                                a.click(function () {
                                    t.next();
                                }),
                                t.container.append(i.add(a));
                        }
                    }),
                    w(u + i, function () {
                        t._preloadTimeout && clearTimeout(t._preloadTimeout),
                            (t._preloadTimeout = setTimeout(function () {
                                t.preloadNearbyImages(), (t._preloadTimeout = null);
                            }, 16));
                    }),
                    w(s + i, function () {
                        o.off(i),
                            t.wrap.off("click" + i),
                            (t.arrowRight = t.arrowLeft = null);
                    });
            },
            next: function () {
                (t.direction = !0), (t.index = j(t.index + 1)), t.updateItemHTML();
            },
            prev: function () {
                (t.direction = !1), (t.index = j(t.index - 1)), t.updateItemHTML();
            },
            goTo: function (e) {
                (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var e,
                    n = t.st.gallery.preload,
                    o = Math.min(n[0], t.items.length),
                    i = Math.min(n[1], t.items.length);
                for (e = 1; e <= (t.direction ? i : o); e++)
                    t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? o : i); e++)
                    t._preloadItem(t.index - e);
            },
            _preloadItem: function (n) {
                if (((n = j(n)), !t.items[n].preloaded)) {
                    var o = t.items[n];
                    o.parsed || (o = t.parseEl(n)),
                        I("LazyLoad", o),
                        "image" === o.type &&
                        (o.img = e('<img class="mfp-img" />')
                            .on("load.mfploader", function () {
                                o.hasSize = !0;
                            })
                            .on("error.mfploader", function () {
                                (o.hasSize = !0), (o.loadError = !0), I("LazyLoadError", o);
                            })
                            .attr("src", o.src)),
                        (o.preloaded = !0);
                }
            },
        },
    });
    var W = "retina";
    e.eaePopup.registerModule(W, {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        n = e.ratio;
                    (n = isNaN(n) ? n() : n) > 1 &&
                        (w("ImageHasSize." + W, function (e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / n,
                                width: "100%",
                            });
                        }),
                            w("ElementParse." + W, function (t, o) {
                                o.src = e.replaceSrc(o, n);
                            }));
                }
            },
        },
    }),
        k();
});
