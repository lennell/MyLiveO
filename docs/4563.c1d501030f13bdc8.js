"use strict";(self.webpackChunkMyAngularTegel=self.webpackChunkMyAngularTegel||[]).push([[4563],{4563:(r,a,s)=>{s.r(a),s.d(a,{tds_table:()=>i});var t=s(1879),n=s(813);const i=class{constructor(e){(0,t.r)(this,e),this.internalTdsTablePropChange=(0,t.c)(this,"internalTdsTablePropChange",6),this.verticalDividers=!1,this.compactDesign=!1,this.noMinWidth=void 0,this.multiselect=!1,this.expandableRows=!1,this.responsive=!1,this.modeVariant=null,this.tableId=(0,n.g)()}emitInternalTdsPropChange(e,l){this.internalTdsTablePropChange.emit({tableId:this.tableId,changed:[e],[e]:l})}enableMultiselectChanged(e){this.emitInternalTdsPropChange("multiselect",e)}enableExpandableRowsChanged(e){this.emitInternalTdsPropChange("expandableRows",e)}compactDesignChanged(e){this.emitInternalTdsPropChange("compactDesign",e)}verticalDividersChanged(e){this.emitInternalTdsPropChange("verticalDividers",e)}noMinWidthChanged(e){this.emitInternalTdsPropChange("noMinWidth",e)}modeVariantChanged(e){this.emitInternalTdsPropChange("modeVariant",e)}render(){return(0,t.h)(t.H,{class:{"tds-table--responsive":this.responsive,"tds-mode-variant-primary":"primary"===this.modeVariant,"tds-mode-variant-secondary":"secondary"===this.modeVariant}},(0,t.h)("table",{class:{"tds-table":!0,"tds-table--compact":this.compactDesign,"tds-table--divider":this.verticalDividers,"tds-table--no-min-width":this.noMinWidth,"tds-table--responsive":this.responsive}},(0,t.h)("slot",null)))}get host(){return(0,t.g)(this)}static get watchers(){return{multiselect:["enableMultiselectChanged"],expandableRows:["enableExpandableRowsChanged"],compactDesign:["compactDesignChanged"],verticalDividers:["verticalDividersChanged"],noMinWidth:["noMinWidthChanged"],modeVariant:["modeVariantChanged"]}}};i.style=":host,.tds-table{border-collapse:collapse;display:table;box-sizing:border-box}:host *,.tds-table *{box-sizing:border-box}:host(.tds-table--responsive),.tds-table--responsive{width:100%}"}}]);