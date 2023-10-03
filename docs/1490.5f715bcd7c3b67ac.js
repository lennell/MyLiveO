"use strict";(self.webpackChunkMyAngularTegel=self.webpackChunkMyAngularTegel||[]).push([[1490],{1490:(m,l,n)=>{n.r(l),n.d(l,{tds_side_menu:()=>r});var i=n(5861),s=n(1879),a=n(813);const r=class{constructor(e){(0,s.r)(this,e),this.tdsCollapse=(0,s.c)(this,"tdsCollapse",7),this.internalTdsCollapse=(0,s.c)(this,"internalTdsCollapse",6),this.internalTdsSideMenuPropChange=(0,s.c)(this,"internalTdsSideMenuPropChange",6),this.handleMatchesLgBreakpointChange=t=>{!t.matches&&(this.collapsed=!1)},this.open=!1,this.persistent=!1,this.collapsed=!1,this.isUpperSlotEmpty=!1,this.isClosed=!0,this.isOpen=!1,this.isClosing=!1,this.isCollapsed=!1,this.isOpening=!1}connectedCallback(){this.matchesLgBreakpointMq=window.matchMedia("(min-width: 992px)"),this.matchesLgBreakpointMq.addEventListener("change",this.handleMatchesLgBreakpointChange),this.isCollapsed=this.collapsed}componentDidLoad(){setTimeout(()=>this.onOpenChange(this.open),500);const t=this.host.shadowRoot.querySelector("slot:not([name])").assignedElements();t?.length>0||(this.isUpperSlotEmpty=!0)}disconnectedCallback(){this.matchesLgBreakpointMq.removeEventListener("change",this.handleMatchesLgBreakpointChange)}onOpenChange(e,t){var o=this;return(0,i.Z)(function*(){e&&!t&&(yield o.setOpening()),!e&&t&&(yield o.setClosing())})()}onCollapsedChange(e){this.internalTdsSideMenuPropChange.emit({changed:["collapsed"],collapsed:e}),this.isCollapsed=e}onIsOpenChange(e){e&&(0,a.k)(this.host,a.l,!0).focus()}collapsedSideMenuEventHandler(e){this.collapsed=e.detail.collapsed}setOpening(){var e=this;return(0,i.Z)(function*(){e.isClosed=!1,yield new Promise(t=>{setTimeout(t,0)}),e.isOpening=!0,yield new Promise(t=>{setTimeout(t,400)}),e.isOpening=!1,e.isOpen=!0})()}setClosing(){var e=this;return(0,i.Z)(function*(){e.isOpen=!1,e.isClosing=!0,yield new Promise(t=>{setTimeout(t,400)}),e.isClosing=!1,e.isClosed=!0})()}render(){return(0,s.h)(s.H,{role:"navigation",class:{"menu-opened":this.open,"menu-persistent":this.persistent,"menu-collapsed":this.collapsed}},(0,s.h)("div",{class:{wrapper:!0,"state-upper-slot-empty":this.isUpperSlotEmpty,"state-open":this.isOpen||this.isOpening,"state-closed":this.isClosed}},(0,s.h)("slot",{name:"overlay"}),(0,s.h)("aside",{class:"menu"},(0,s.h)("slot",{name:"close-button"}),(0,s.h)("div",{class:"tds-side-menu-wrapper"},(0,s.h)("ul",{class:"tds-side-menu-list tds-side-menu-list-upper"},(0,s.h)("slot",null)),(0,s.h)("ul",{class:"tds-side-menu-list tds-side-menu-list-end"},(0,s.h)("slot",{name:"end"}))),(0,s.h)("slot",{name:"sticky-end"}))))}get host(){return(0,s.g)(this)}static get watchers(){return{open:["onOpenChange"],collapsed:["onCollapsedChange"],isOpening:["onIsOpenChange"]}}};r.style=":host{pointer-events:none;display:block;position:fixed;top:0;width:100%;height:100%;z-index:400}:host .wrapper{height:inherit;}:host .wrapper slot:not([name])::slotted(*){border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host .wrapper ::slotted([slot=end]){border-top:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host .wrapper .tds-side-menu-list-end{margin-top:68px}:host .state-closed{display:none}:host .state-open slot[name=overlay]::slotted(tds-side-menu-overlay){opacity:0.4}:host .state-open slot[name=close-button]::slotted(tds-side-menu-close-button){opacity:1}:host .state-open .tds-side-menu-wrapper{transform:scaleY(1)}:host .state-upper-slot-empty .tds-side-menu-list-upper{display:none}:host .state-upper-slot-empty .tds-side-menu-list-end{margin-top:0}:host .state-upper-slot-empty ::slotted([slot=end]){border-top:none;border-bottom:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}@media (max-width: 992px){:host(.menu-opened){pointer-events:auto;z-index:400}}@media (min-width: 992px){:host(.menu-persistent){pointer-events:auto;position:static;width:272px;height:auto;border-right:1px solid var(--tds-sidebar-side-menu-bottom-menu-border-top)}:host(.menu-persistent) .wrapper slot[name=overlay]::slotted(tds-side-menu-overlay){display:none}:host(.menu-persistent) .wrapper slot[name=close-button]::slotted(tds-side-menu-close-button){display:none}:host(.menu-persistent) .wrapper .tds-side-menu-wrapper{transform:none}:host(.menu-persistent) .menu{width:272px}:host(.menu-persistent) .state-closed{display:block}:host(.menu-persistent):host(.menu-collapsed){width:69px}:host(.menu-persistent):host(.menu-collapsed) .menu{width:68px}:host(.menu-persistent) slot[name=end]::slotted(*){display:none}}.menu{width:80%;height:inherit;position:relative;left:0;display:flex;flex-direction:column;justify-content:space-between}.menu *{padding:0;margin:0;box-sizing:border-box}@media (max-width: 384px){.menu{width:100%}}aside .tds-side-menu-wrapper{display:flex;justify-content:space-between;flex-direction:column;flex-grow:1;background-color:var(--tds-sidebar-side-menu-background-cover);transition:transform 250ms ease;transform-origin:top;transform:scaleY(0);overflow-y:auto}aside .tds-side-menu-wrapper::-webkit-scrollbar{width:4px;background-color:inherit}aside .tds-side-menu-wrapper::-webkit-scrollbar-thumb{background-color:var(--tds-grey-300)}aside .tds-side-menu-wrapper ::-webkit-scrollbar-button{height:0;width:0}"}}]);