(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"],d=0;a.each(c,function(a2,c2){d=parseFloat(b.css(c2))||d}),d!=0&&(b.addClass("is-transitioning"),b[0].offsetWidth)})}})(jQuery);function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a}window.timber=window.timber||{},timber.cacheSelectors=function(){timber.cache={$html:$("html"),$body:$(document.body),$navigation:$("#AccessibleNav"),$mobileSubNavToggle:$(".js-toggle-mobilenavmenu"),$changeView:$(".change-view"),$productImage:$(".js-ProductPhotoImg"),$thumbImages:$("#ProductThumbs").find("a.product-single__thumbnail"),$recoverPasswordLink:$("#RecoverPassword"),$hideRecoverPasswordLink:$("#HideRecoverPasswordLink"),$recoverPasswordForm:$("#RecoverPasswordForm"),$customerLoginForm:$("#CustomerLoginForm"),$passwordResetSuccess:$("#ResetSuccess")}},timber.init=function(){timber.cacheSelectors(),timber.accessibleNav(),timber.drawersInit(),timber.mobileNavToggle(),timber.productImageSwitch(),timber.responsiveVideos(),timber.collectionViews(),timber.loginForms()},timber.accessibleNav=function(){var $nav=timber.cache.$navigation,$allLinks=$nav.find("a"),$topLevel=$nav.children("li").find("a"),$parents=$nav.find(".site-nav--has-dropdown"),$subMenuLinks=$nav.find(".site-nav__dropdown").find("a"),activeClass="nav-hover",focusClass="nav-focus";$parents.on("mouseenter touchstart",function(evt){var $el=$(this);$el.hasClass(activeClass)||evt.preventDefault(),showDropdown($el)}),$parents.on("mouseleave",function(){hideDropdown($(this))}),$subMenuLinks.on("touchstart",function(evt){evt.stopImmediatePropagation()}),$allLinks.focus(function(){handleFocus($(this))}),$allLinks.blur(function(){removeFocus($topLevel)});function handleFocus($el){var $subMenu=$el.next("ul"),hasSubMenu=!!$subMenu.hasClass("sub-nav"),isSubItem=$(".site-nav__dropdown").has($el).length,$newFocus=null;isSubItem?($newFocus=$el.closest(".site-nav--has-dropdown").find("a"),addFocus($newFocus)):(removeFocus($topLevel),addFocus($el))}function showDropdown($el){$el.addClass(activeClass),setTimeout(function(){timber.cache.$body.on("touchstart",function(){hideDropdown($el)})},250)}function hideDropdown($el){$el.removeClass(activeClass),timber.cache.$body.off("touchstart")}function addFocus($el){$el.addClass(focusClass)}function removeFocus($el){$el.removeClass(focusClass)}},timber.drawersInit=function(){timber.LeftDrawer=new timber.Drawers("NavDrawer","left"),timber.RightDrawer=new timber.Drawers("CartDrawer","right",{onDrawerOpen:ajaxCart.load})},timber.mobileNavToggle=function(){timber.cache.$mobileSubNavToggle.on("click",function(evt){evt.preventDefault(),$(this).parent().toggleClass("is-expanded")})},timber.getHash=function(){return window.location.hash},timber.productImageSwitch=function(){timber.cache.$thumbImages.length&&timber.cache.$thumbImages.on("click",function(evt){evt.preventDefault();var newImage=$(this).attr("href");timber.switchImage(newImage,null,timber.cache.$productImage)})},timber.switchImage=function(src,imgObject,el){var $el=$(el);if($el.attr("src")!=src){var src_placeholder=src.replace("_160x160.","_{width}x.").replace("_300x300.","_{width}x.");$el.attr({src:src,"data-src":src_placeholder,"data-widths":"[540, 720, 900, 1080, 1296, 1512, 1728, 2048]","data-aspectratio":"1.0","data-sizes":"auto","data-srcset":"",srcset:""}).removeClass("lazyautosizes lazyloaded").addClass("lazyload")}},timber.responsiveVideos=function(){var $iframeVideo=$('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]'),$iframeReset=$iframeVideo.add("iframe#admin_bar_iframe");$iframeVideo.each(function(){$(this).wrap('<div class="c-embedded-video"></div>')}),$iframeReset.each(function(){this.src=this.src})},timber.collectionViews=function(){timber.cache.$changeView.length&&timber.cache.$changeView.on("click",function(){var view=$(this).data("view"),url=document.URL,hasParams=url.indexOf("?")>-1;hasParams?window.location=replaceUrlParam(url,"view",view):window.location=url+"?view="+view})},timber.loginForms=function(){function showRecoverPasswordForm(){timber.cache.$recoverPasswordForm.show(),timber.cache.$customerLoginForm.hide()}function hideRecoverPasswordForm(){timber.cache.$recoverPasswordForm.hide(),timber.cache.$customerLoginForm.show()}timber.cache.$recoverPasswordLink.on("click",function(evt){evt.preventDefault(),showRecoverPasswordForm()}),timber.cache.$hideRecoverPasswordLink.on("click",function(evt){evt.preventDefault(),hideRecoverPasswordForm()}),timber.getHash()=="#recover"&&showRecoverPasswordForm()},timber.resetPasswordSuccess=function(){timber.cache.$passwordResetSuccess.show()},timber.Drawers=function(){var Drawer=function(id,position,options){var defaults={close:".js-drawer-close",open:".js-drawer-open-"+position,openClass:"js-drawer-open",dirOpenClass:"js-drawer-open-"+position};if(this.$nodes={parent:$("body, html"),page:$("#PageContainer"),moved:$(".is-moved-by-drawer")},this.config=$.extend(defaults,options),this.position=position,this.$drawer=$("#"+id),!this.$drawer.length)return!1;this.drawerIsOpen=!1,this.init()};return Drawer.prototype.init=function(){$(this.config.open).on("click",$.proxy(this.open,this)),this.$drawer.find(this.config.close).on("click",$.proxy(this.close,this))},Drawer.prototype.update=function(evt){},Drawer.prototype.open=function(evt){var externalCall=!1;if(evt?evt.preventDefault():externalCall=!0,evt&&evt.stopPropagation&&(this.$activeSource=$(evt.currentTarget)),this.drawerIsOpen&&!externalCall)return this.close();timber.cache.$body.trigger("beforeDrawerOpen.timber",this),this.$nodes.moved.addClass("is-transitioning"),this.$drawer.prepareTransition(),this.$nodes.parent.addClass(this.config.openClass+" "+this.config.dirOpenClass),this.drawerIsOpen=!0,this.trapFocus(this.$drawer,"drawer_focus"),this.config.onDrawerOpen&&typeof this.config.onDrawerOpen=="function"&&(externalCall||this.config.onDrawerOpen()),this.$activeSource&&this.$activeSource.attr("aria-expanded")&&this.$activeSource.attr("aria-expanded","true"),this.$nodes.page.on("touchmove.drawer",function(){return!1}),this.$nodes.page.on("click.drawer",$.proxy(function(){return this.close(),!1},this)),timber.cache.$body.trigger("afterDrawerOpen.timber",this)},Drawer.prototype.close=function(){this.drawerIsOpen&&(timber.cache.$body.trigger("beforeDrawerClose.timber",this),$(document.activeElement).trigger("blur"),this.$nodes.moved.prepareTransition({disableExisting:!0}),this.$drawer.prepareTransition({disableExisting:!0}),this.$nodes.parent.removeClass(this.config.dirOpenClass+" "+this.config.openClass),this.drawerIsOpen=!1,this.removeTrapFocus(this.$drawer,"drawer_focus"),this.$nodes.page.off(".drawer"),timber.cache.$body.trigger("afterDrawerClose.timber",this))},Drawer.prototype.trapFocus=function($container,eventNamespace){var eventName=eventNamespace?"focusin."+eventNamespace:"focusin";$container.attr("tabindex","-1"),$container.focus(),$(document).on(eventName,function(evt){$container[0]!==evt.target&&!$container.has(evt.target).length&&$container.focus()})},Drawer.prototype.removeTrapFocus=function($container,eventNamespace){var eventName=eventNamespace?"focusin."+eventNamespace:"focusin";$container.removeAttr("tabindex"),$(document).off(eventName)},Drawer}(),$(timber.init);
//# sourceMappingURL=/cdn/shop/t/146/assets/shopify.js.map?v=105673741846614329321709039946
