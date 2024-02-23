"use strict";(self.webpackChunkMyAngularTegel=self.webpackChunkMyAngularTegel||[]).push([[9559],{9559:(y,c,r)=>{r.r(c),r.d(c,{tds_table_body:()=>d});var a=r(1879);const b=["multiselect","expandableRows"],d=class{constructor(t){(0,a.r)(this,t),this.internalTdsSortingChange=(0,a.c)(this,"internalTdsSortingChange",6),this.internalTdsCheckboxChange=(0,a.c)(this,"internalTdsCheckboxChange",6),this.internalTdsMainCheckboxChange=(0,a.c)(this,"internalTdsMainCheckboxChange",6),this.uncheckAll=()=>{this.mainCheckboxStatus=!1,this.internalTdsMainCheckboxChange.emit([this.tableId,this.mainCheckboxStatus]),this.internalTdsCheckboxChange.emit([this.tableId,this.mainCheckboxStatus])},this.selectedDataExporter=()=>{const e=this.host.getElementsByClassName("tds-table__row--selected");this.multiselectArray=[];for(let i=0;i<e.length;i++){const s=e[i].getElementsByTagName("tds-body-cell"),o={};for(let l=0;l<s.length;l++){const h=s[l].getAttribute("cell-key"),n=s[l].getAttribute("cell-value");o[h]=n}this.multiselectArray.push(o)}this.multiselectArrayJSON=JSON.stringify(this.multiselectArray)},this.bodyCheckBoxClicked=()=>{const e=this.host.getElementsByClassName("tds-table__row").length,i=this.host.getElementsByClassName("tds-table__row--selected").length;this.mainCheckboxStatus=e===i,this.internalTdsMainCheckboxChange.emit([this.tableId,this.mainCheckboxStatus]),this.selectedDataExporter()},this.bodyData=void 0,this.noResultMessage=void 0,this.rowsPerPage=1,this.multiselect=!1,this.enablePaginationTableBody=!1,this.expandableRows=!1,this.innerBodyData=[],this.bodyDataManipulated=[],this.bodyDataOriginal=[],this.multiselectArray=[],this.multiselectArrayJSON=void 0,this.mainCheckboxStatus=!1,this.columnsNumber=0,this.disableAllSorting=!1,this.numberOfPages=0,this.paginationValue=1,this.tempPaginationDisable=!1,this.showNoResultsMessage=!1,this.tableId=""}arrayDataWatcher(t){this.innerBodyData="string"==typeof t?JSON.parse(t):t,this.bodyDataManipulated=[...this.innerBodyData],this.bodyDataOriginal=[...this.innerBodyData]}internalTdsPropChangeListener(t){this.tableId===t.detail.tableId&&t.detail.changed.filter(e=>b.includes(e)).forEach(e=>{if(typeof this[e]>"u")throw new Error(`Table prop is not supported: ${e}`);this[e]=t.detail[e]})}static compareValues(t,e="asc"){return function(s,o){if(!s.hasOwnProperty(t)||!o.hasOwnProperty(t))return 0;const l="string"==typeof s[t]?s[t].toUpperCase():s[t],h="string"==typeof o[t]?o[t].toUpperCase():o[t];let n=0;return l>h?n=1:l<h&&(n=-1),"desc"===e?-1*n:n}}sortData(t,e){this.multiselect&&this.uncheckAll(),this.bodyDataManipulated=[...this.bodyDataManipulated],this.bodyDataManipulated.sort(d.compareValues(t,e))}updateOptionsContent(t){const{tableId:e,columnKey:i,sortingDirection:s}=t.detail;this.tableId===e&&this.sortData(i,s)}headCheckboxListener(t){this.tableId===t.detail[0]&&([,this.mainCheckboxStatus]=t.detail,this.selectedDataExporter())}bodyCheckboxListener(){this.bodyCheckBoxClicked()}searchFunction(t){const e=this.host.querySelectorAll("tds-table-body-row, tds-table-body-row-expandable");if(t.length>0){this.enablePaginationTableBody&&(this.tempPaginationDisable=!0),e.forEach(s=>{const o=s.querySelectorAll("tds-body-cell"),l=[];o.forEach(n=>{const g=n.getAttribute("cell-value").toLowerCase();l.push(g)}),l.find(n=>n.includes(t))?s.classList.remove("tds-table__row--hidden"):s.classList.add("tds-table__row--hidden")}),this.disableAllSorting=!0,this.internalTdsSortingChange.emit([this.tableId,this.disableAllSorting]);const i=this.host.querySelectorAll(".tds-table__row--hidden");this.showNoResultsMessage=i.length===e.length}else this.enablePaginationTableBody&&(this.tempPaginationDisable=!1),this.enablePaginationTableBody||e.forEach(i=>{i.classList.remove("tds-table__row--hidden")}),this.showNoResultsMessage=!1,this.disableAllSorting=!1,this.internalTdsSortingChange.emit([this.tableId,this.disableAllSorting])}tdsFilterListener(t){this.tableId===t.detail.tableId&&this.searchFunction(t.detail.query)}connectedCallback(){this.tableEl=this.host.closest("tds-table"),this.tableId=this.tableEl.tableId}componentWillLoad(){b.forEach(t=>{this[t]=this.tableEl[t]}),this.bodyData&&this.arrayDataWatcher(this.bodyData)}componentWillRender(){const t=this.host.parentElement.querySelector("tds-table-header").children.length;this.columnsNumber=this.multiselect||this.expandableRows?t+1:t}render(){return(0,a.h)(a.H,{"data-selected-rows":this.multiselectArrayJSON},this.bodyDataManipulated.map(t=>(0,a.h)("tds-table-body-row",null,Object.keys(t).map(e=>(0,a.h)("tds-body-cell",{"cell-key":e,"cell-value":t[e]})))),(0,a.h)("tr",{hidden:!this.showNoResultsMessage},(0,a.h)("td",{class:"tds-table__info-message",colSpan:this.columnsNumber},(0,a.h)("slot",{name:"no-result"}),this.noResultMessage)),(0,a.h)("slot",null))}get host(){return(0,a.g)(this)}static get watchers(){return{bodyData:["arrayDataWatcher"]}}};d.style=":host,tds-table-body{box-sizing:border-box;display:table-row-group}:host *,tds-table-body *{box-sizing:border-box}:host .tds-table__info-message,tds-table-body .tds-table__info-message{font:var(--tds-detail-02);letter-spacing:var(--tds-detail-02-ls);display:table-cell;box-sizing:border-box;color:var(--tds-table-color);padding:var(--tds-spacing-element-16);min-width:192px;vertical-align:top;background-color:transparent;transition:background-color 200ms ease}"}}]);