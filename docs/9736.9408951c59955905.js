"use strict";(self.webpackChunkMyAngularTegel=self.webpackChunkMyAngularTegel||[]).push([[9736],{9736:(c,s,a)=>{a.r(s),a.d(s,{tds_table_body_row_expandable:()=>l});var o=a(5861),t=a(6857),i=a(8407);const n=["verticalDividers","compactDesign","noMinWidth","modeVariant"],l=class{constructor(e){(0,t.r)(this,e),this.internalTdsRowExpanded=(0,t.c)(this,"internalTdsRowExpanded",6),this.tdsChange=(0,t.c)(this,"tdsChange",6),this.colSpan=null,this.rowId=(0,i.g)(),this.expanded=void 0,this.isExpanded=!1,this.tableId="",this.columnsNumber=null,this.verticalDividers=!1,this.compactDesign=!1,this.noMinWidth=!1,this.modeVariant=null}internalTdsPropChangeListener(e){this.tableId===e.detail.tableId&&e.detail.changed.filter(d=>n.includes(d)).forEach(d=>{if(typeof this[d]>"u")throw new Error(`Table prop is not supported: ${d}`);this[d]=e.detail[d]})}watchExpanded(e){e!==this.isExpanded&&(this.isExpanded=e,this.tdsChange.emit({rowId:this.rowId,isExpanded:this.isExpanded}))}expand(){var e=this;return(0,o.Z)(function*(){e.isExpanded=!0,e.tdsChange.emit({rowId:e.rowId,isExpanded:e.isExpanded})})()}collapse(){var e=this;return(0,o.Z)(function*(){e.isExpanded=!1,e.tdsChange.emit({rowId:e.rowId,isExpanded:e.isExpanded})})()}connectedCallback(){void 0!==this.expanded&&(this.isExpanded=this.expanded),this.tableEl=this.host.closest("tds-table"),this.tableId=this.tableEl.tableId}componentWillLoad(){n.forEach(e=>{this[e]=this.tableEl[e]})}componentWillRender(){this.columnsNumber=null!==this.colSpan?this.colSpan:this.tableEl.querySelector("tds-table-header").childElementCount+1}sendValue(){this.internalTdsRowExpanded.emit([this.tableId,this.isExpanded]),this.tdsChange.emit({rowId:this.rowId,isExpanded:this.isExpanded})}onChangeHandler(e){this.isExpanded=!0===e.currentTarget.checked,this.sendValue()}render(){return(0,t.h)(t.H,{key:"74b02f93d3827e994ec32d6936861ca272cf6091",class:{"tds-table__row":!0,"tds-table__row-expand--active":this.isExpanded,"tds-table__compact":this.compactDesign,"tds-table--divider":this.verticalDividers}},(0,t.h)("tr",{key:"8c9b941b05eba4e785bd3d0d3b2fcc102e582e3b",class:{"tds-table__row":!0,"tds-table__row--expanded":this.isExpanded}},(0,t.h)("td",{key:"6ca2b7232372c6773b20cbebcf57c2dc22873b8e",class:"tds-table__cell tds-table__cell--expand"},(0,t.h)("label",{key:"37831f286353d52f811edec384f2e8e9da65cd50",class:"tds-table__expand-control-container"},(0,t.h)("input",{key:"ecd7ac5041cba257b00485e44e9b2867fdd563a6",class:"tds-table__expand-input",type:"checkbox",onChange:e=>this.onChangeHandler(e),checked:this.isExpanded}),(0,t.h)("span",{key:"2eb29d27eea8ff2ee7a6afe74a70695b03aa141d",class:"tds-expendable-row-icon"},(0,t.h)("svg",{key:"88731d236df24d952130566dfa395d3e161de82e",fill:"none",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 32 32"},(0,t.h)("path",{key:"81a677c1f6a0b15145b879748cc4d9d6a93821d4","fill-rule":"evenodd","clip-rule":"evenodd",d:"M4.273 9.783a1 1 0 0 1 1.415 0l9.888 9.888a.6.6 0 0 0 .848 0l9.888-9.888a1 1 0 1 1 1.415 1.414l-9.889 9.889a2.6 2.6 0 0 1-3.677 0l-9.888-9.889a1 1 0 0 1 0-1.414Z",fill:"currentColor"}))))),(0,t.h)("slot",{key:"deffa2b70b546db18812e4288e07fe6f8ac0d42d"})),(0,t.h)("tr",{key:"1515f8da52b7fec720a788ae9c2127d8a9a69fce",class:{"tds-table__row-expand":!0,"tds-table__row-expand--expanded":this.isExpanded}},(0,t.h)("td",{key:"e16011d9e155b003d011de4a73518a81414f2e91",class:"tds-table__cell-expand",colSpan:this.columnsNumber},(0,t.h)("slot",{key:"f60bf938090436423632bf93076bd41ee8def3ce",name:"expand-row"}))))}get host(){return(0,t.g)(this)}static get watchers(){return{expanded:["watchExpanded"]}}};l.style=":host{box-sizing:border-box;display:contents}:host *{box-sizing:border-box}:host .tds-table__row,:host .tds-table__row-extend{display:table-row;border-bottom:1px solid var(--tds-table-divider);background-color:var(--tds-table-body-row-background);transition:background-color 200ms ease;color:var(--tds-table-color)}:host .tds-table__row--expanded{border-bottom:none}:host .tds-table__row:hover,:host .tds-table__row-extend:hover{background-color:var(--tds-table-body-row-background-hover)}:host .tds-table__expand-control-container{display:flex;justify-content:center;align-items:center;height:46px;cursor:pointer;padding:0 16px;position:relative}:host .tds-table__expand-control-container .tds-table__expand-input{all:unset;top:0;left:0;width:100%;height:100%;position:absolute;cursor:pointer}:host .tds-table__expand-control-container .tds-table__expand-input:focus{outline:2px solid var(--tds-blue-400);outline-offset:-2px}:host .tds-table__expand-control-container .tds-expendable-row-icon{height:16px;width:16px;transition:transform 200ms ease;transform:rotate(0)}:host .tds-table__row-expand{display:none;transition:background-color 200ms ease}:host .tds-table__row-expand--expanded{border-bottom:1px solid var(--tds-table-divider)}:host .tds-table__row-expand .tds-table__cell-expand{padding:16px 16px 16px 66px;color:var(--tds-table-color)}:host(.tds-table__row-expand--active) .tds-table__row{background-color:var(--tds-table-body-row-background-selected)}:host(.tds-table__row-expand--active) .tds-table__expand-control-container .tds-expendable-row-icon{transform:rotate(180deg)}:host(.tds-table__row-expand--active) .tds-table__row-expand{background-color:var(--tds-table-body-row-background-selected);display:table-row}:host(.tds-table__compact) .tds-table__expand-control-container{height:30px}:host(.tds-table__compact) .tds-table__row-expand .tds-table__cell-expand{padding:8px 16px 8px 66px}:host(.tds-table__row--hidden){display:none}:host(.tds-table--divider) .tds-table__cell--expand{border-right:1px solid var(--tds-table-divider)}"}}]);