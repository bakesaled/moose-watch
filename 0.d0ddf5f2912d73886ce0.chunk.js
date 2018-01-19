webpackJsonp([0],{"4mKE":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("LMZF"),o=e("1YP/"),i=e("TanH"),r=e("EP/0"),a=e("d+MU"),u=function(){function n(n,t,e,l,o){void 0===n&&(n=a.a.create()),void 0===t&&(t="[text]"),void 0===e&&(e="Text"),void 0===l&&(l="MwEditorTextComponent"),void 0===o&&(o="text_fields"),this.id=n,this.value=t,this.name=e,this.type=l,this.icon=o}return n.prototype.toEditorModel=function(n){return this.id=n.id,this.value=n.value,this},n.prototype.toViewerModel=function(){var n=new i.a(this.id,this.value);return n.type=r.a.name,n},n}(),s=e("s0Sm"),c=function(){function n(n,t,e,l,o,i,r,u){void 0===n&&(n=a.a.create()),void 0===t&&(t=0),void 0===l&&(l=0),void 0===o&&(o="MwEditorCellComponent"),void 0===i&&(i=null),void 0===r&&(r="cell"),void 0===u&&(u=""),this.id=n,this.width=t,this.backgroundColor=e,this.margin=l,this.type=o,this.component=i,this.name=r,this.icon=u}return n.prototype.toEditorModel=function(n){if(this.id=n.id,this.backgroundColor=n.backgroundColor,this.width=n.width,n.component)switch(n.component.type){case"MwTextComponent":this.component=(new u).toEditorModel(n.component);break;default:throw new Error("Component type '"+n.component.type+"' is not supported by cell.")}return this},n.prototype.toViewerModel=function(){var n=new o.a(this.id);return n.type=s.a.name,this.component&&(n.component=this.component.toViewerModel()),n.backgroundColor=this.backgroundColor,n.width=this.width,n},n}(),d=e("MsJN"),p=e("y5eO"),h=function(){function n(n,t,e,l,o,i){void 0===n&&(n=a.a.create()),void 0===t&&(t=[]),void 0===e&&(e=""),void 0===l&&(l="MwEditorGridComponent"),void 0===o&&(o="Grid"),void 0===i&&(i="grid_on"),this.id=n,this.cells=t,this.backgroundColor=e,this.type=l,this.name=o,this.icon=i}return n.prototype.toEditorModel=function(n){var t=this;return this.id=n.id,this.backgroundColor=n.backgroundColor,n.cells&&n.cells.length&&n.cells.forEach(function(n){var e=(new c).toEditorModel(n);t.cells.push(e)}),this},n.prototype.toViewerModel=function(){var n=new d.a(this.id,[]);return n.type=p.a.name,this.cells.forEach(function(t){n.cells.push(t.toViewerModel())}),n.backgroundColor=this.backgroundColor,n},n}(),m=e("waXe"),_=e("6imR"),f=e("v3bY"),g=function(){function n(n,t,e,l,o,i){void 0===n&&(n=a.a.create()),void 0===t&&(t="NO_NAME"),void 0===e&&(e=!0),void 0===l&&(l=null),void 0===o&&(o=m.a.name),void 0===i&&(i=""),this.id=n,this.name=t,this.isNew=e,this.component=l,this.type=o,this.icon=i}return n.prototype.toEditorModel=function(n){if(this.id=n.id,this.name=n.name,this.isNew=n.isNew,!n.isNew&&n.component)switch(n.component.type){case p.a.name:this.component=(new h).toEditorModel(n.component);break;default:throw new Error("Component type '"+n.component.type+"' is not supported.")}return this},n.prototype.toViewerModel=function(){var n=new _.a(this.id,this.name,this.isNew);return n.component=this.component?this.component.toViewerModel():void 0,n.isNew=this.isNew,n.type=f.a.name,n},n}(),b=function(){function n(n){this.changeDetector=n,this.editorTextClass=!0,this.selected=!1}return Object.defineProperty(n.prototype,"model",{get:function(){return this.textModel},set:function(n){this.textModel=n,this.model.value="[text]",console.log("newValue",n),this.changeDetector.markForCheck()},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.model||(this.model=new u)},n.prototype.onclick=function(){this.selected=!this.selected,this.changeDetector.markForCheck()},n}(),w=e("kwyp"),y=e("WyYW"),v=e("x4E5"),x=(e("VWpA"),function(){}),k=(e("pxvt"),function(){}),C=e("u4GT"),M=e("ebyg"),S=function(){function n(n,t,e){this.flexShim=n,this.changeDetector=t,this.messageService=e,this.editorCellClass=!0,this.subscriptions=[],this.dropSuccessEmitter=new l.n}return Object.defineProperty(n.prototype,"model",{get:function(){return this.cellModel},set:function(n){this.cellModel=n,this.model.width=50,this.fxFlex=this.model.width,this.style=this.flexShim.getStyle("fxFlex",this.model.width),this.backgroundColor=this.model.backgroundColor,console.log("cellModel",n),this.changeDetector.markForCheck()},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){var n=this;this.model||(this.model=new c),this.subscriptions.push(this.messageService.channel(k).subscribe(function(t){return n.handleToolPanelMessage(t)}))},n.prototype.ngOnChanges=function(n){console.log("changes",n)},n.prototype.ngOnDestroy=function(){this.subscriptions.forEach(function(n){n.unsubscribe()})},n.prototype.handleDrop=function(n){switch(console.log("cell drop",n),n.dragData){case b.name:this.model.component=new u}this.messageService.publish(x,{command:v.a.drop,data:n})},n.prototype.handleToolPanelMessage=function(n){console.log("toolpanel msg",n,this.model.component),n.command===v.a.delete&&this.model.component&&this.model.component.id===n.data.componentId&&(this.model.component=void 0,this.factoryComponent.destroyComponent(),this.changeDetector.markForCheck(),console.log("delete cell component",this.model.component,n.data.componentId),this.messageService.publish(x,{command:v.a.delete}))},n}(),E=function(){function n(n,t){this.flexShim=n,this.changeDetector=t,this.editorGridClass=!0,this.fxLayout="row",this.dragEnabled=!1,this.afterViewInitEmitter=new l.n}return Object.defineProperty(n.prototype,"model",{get:function(){return this.gridModel},set:function(n){this.gridModel=n,this.style=this.flexShim.getStyle("fxLayout","row"),this.backgroundColor=this.gridModel.backgroundColor,this.changeDetector.markForCheck(),console.log("gridModel",this.gridModel)},enumerable:!0,configurable:!0}),n.prototype.ngOnInit=function(){this.model||(this.model=new h)},n.prototype.ngAfterViewInit=function(){this.afterViewInitEmitter.emit()},n.prototype.onMouseEnter=function(){this.dragEnabled=!0},n.prototype.onMouseOut=function(){this.dragEnabled=!1},n}(),D=function(){return function(){w.a.custom={MwEditorGridComponent:E,MwEditorTextComponent:b}}}(),j=e("KYtH"),O=e("Pvsr"),I=e("Abp8"),F=e("S0TE"),T=e("7mC/"),N=e("Un6q"),R=e("rci7"),A=e("4FLB"),V=e("FWX0"),P=l._6({encapsulation:2,styles:[[".mw-editor-cell{height:50px;background:none;border:1px dashed #898467;margin:10px}.mw-editor-cell .mw-editor-cell-message-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}.mw-editor-cell .mw-editor-cell-message-container .mw-editor-cell-message{text-align:center}"]],data:{}});function L(n){return l._30(0,[(n()(),l._8(0,0,null,null,5,"div",[["class","mw-editor-cell-message-container"],["dnd-droppable",""]],null,[[null,"onDropSuccess"]],function(n,t,e){var l=!0;return"onDropSuccess"===t&&(l=!1!==n.component.handleDrop(e)&&l),l},null,null)),l._7(1,16384,null,0,T.f,[l.l,T.c,T.b,l.h],null,{onDropSuccess:"onDropSuccess"}),(n()(),l._28(-1,null,["\n  "])),(n()(),l._8(3,0,null,null,1,"div",[["class","mw-editor-cell-message"]],null,null,null,null,null)),(n()(),l._28(-1,null,["[drop here]"])),(n()(),l._28(-1,null,["\n"]))],null,null)}function G(n){return l._30(2,[l._26(402653184,1,{factoryComponent:0}),(n()(),l._3(16777216,null,null,1,null,L)),l._7(2,16384,null,0,N.l,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(n()(),l._28(-1,null,["\n"])),(n()(),l._8(4,16777216,null,null,1,"mw-factory",[],null,null,null,R.b,R.a)),l._7(5,573440,[[1,4]],0,M.a,[A.a,l.R,l.j],{model:[0,"model"]},null),(n()(),l._28(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,2,0,!e.model.component),n(t,5,0,e.model.component)},null)}var X=l._4("mw-editor-cell",S,function(n){return l._30(0,[(n()(),l._8(0,0,null,null,1,"mw-editor-cell",[],[[2,"mw-editor-cell",null],[1,"fxFlex",0],[1,"style",2],[4,"backgroundColor",null]],null,null,G,P)),l._7(1,770048,null,0,S,[y.a,l.h,V.a],null,null)],function(n,t){n(t,1,0)},function(n,t){n(t,0,0,l._20(t,1).editorCellClass,l._20(t,1).fxFlex,l._20(t,1).style,l._20(t,1).backgroundColor)})},{model:"model"},{dropSuccessEmitter:"dropSuccessEmitter"},[]),Y=e("zQfh"),B=e("yxpl"),U=e("vgc3"),z=function(){function n(n,t){this.el=n,this.changeDetector=t,this.selectionTagClass=!0}return n.prototype.ngOnInit=function(){var n=this;this.parentEl=this.el.nativeElement.parentElement,this.parentEl.onmouseenter=function(t){if(!n.selected){var e=n.parentEl.getBoundingClientRect();e.width=e.width,e.height=e.height,n.borderRect=e,t.target===n.parentEl&&(n.visible=!0),n.changeDetector.markForCheck()}},this.parentEl.onmouseout=function(t){if(!n.selected){for(var e=!1,l=0;l<n.parentEl.children.length;l++)if(t.target===n.parentEl.children[l]){e=!0;break}n.visible=!(!e||t.toElement!==n.parentEl),n.changeDetector.markForCheck()}}},n}(),H=l._6({encapsulation:2,styles:[[".mw-selection-tag{display:none;position:absolute;top:-1px;left:-1px;cursor:pointer;pointer-events:none}.mw-selection-tag .mw-selection-tag-block{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:15px;min-width:30px;background:#4ab0d8;position:absolute;left:0;top:-15px;font-size:11px;padding-left:3px;padding-right:3px;pointer-events:all}.mw-selection-tag .mw-selection-tag-block mat-icon{font-size:11px;height:12px;width:12px;margin-right:3px}.mw-selection-tag .mw-selection-tag-border{border:1px solid #4ab0d8}.mw-selection-tag.mw-selection-tag--visible{display:block}"]],data:{}});function K(n){return l._30(0,[(n()(),l._8(0,0,null,null,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,B.b,B.a)),l._7(1,638976,null,0,U.b,[l.l,U.d,[8,null]],null,null),(n()(),l._28(2,0,["",""]))],function(n,t){n(t,1,0)},function(n,t){n(t,2,0,t.component.icon)})}function W(n){return l._30(2,[(n()(),l._8(0,0,null,null,5,"div",[["class","mw-selection-tag-block"]],null,null,null,null,null)),(n()(),l._28(-1,null,["\n  "])),(n()(),l._3(16777216,null,null,1,null,K)),l._7(3,16384,null,0,N.l,[l.R,l.O],{ngIf:[0,"ngIf"]},null),l._19(null,0),(n()(),l._28(-1,null,["\n"])),(n()(),l._28(-1,null,["\n"])),(n()(),l._8(7,0,null,null,0,"div",[["class","mw-selection-tag-border"]],[[4,"width","px"],[4,"height","px"]],null,null,null,null)),(n()(),l._28(-1,null,["\n"]))],function(n,t){n(t,3,0,t.component.icon)},function(n,t){var e=t.component;n(t,7,0,null==e.borderRect?null:e.borderRect.width,null==e.borderRect?null:e.borderRect.height)})}var q=l._6({encapsulation:2,styles:[[".mw-editor-grid{display:block;border:1px solid #898467;background:none;position:relative}"]],data:{}});function J(n){return l._30(0,[(n()(),l._8(0,0,null,null,1,"mw-editor-cell",[],[[2,"mw-editor-cell",null],[1,"fxFlex",0],[1,"style",2],[4,"backgroundColor",null]],null,null,G,P)),l._7(1,770048,[[1,4]],0,S,[y.a,l.h,V.a],{model:[0,"model"]},null)],function(n,t){n(t,1,0,t.context.$implicit)},function(n,t){n(t,0,0,l._20(t,1).editorCellClass,l._20(t,1).fxFlex,l._20(t,1).style,l._20(t,1).backgroundColor)})}function Z(n){return l._30(2,[l._26(671088640,1,{cellComponents:1}),(n()(),l._8(1,0,null,null,10,"div",[["dnd-draggable",""]],[[8,"style",2]],[[null,"mouseenter"],[null,"mouseout"]],function(n,t,e){var l=!0,o=n.component;return"mouseenter"===t&&(l=!1!==o.onMouseEnter()&&l),"mouseout"===t&&(l=!1!==o.onMouseOut()&&l),l},null,null)),l._7(2,737280,null,0,Y.f,[Y.i,l.l,l.F],{layout:[0,"layout"]},null),l._7(3,16384,null,0,T.e,[l.l,T.c,T.b,l.h],{draggable:[0,"draggable"],dragData:[1,"dragData"]},null),(n()(),l._28(-1,null,["\n  "])),(n()(),l._8(5,0,null,null,2,"mw-selection-tag",[],[[2,"mw-selection-tag",null],[2,"mw-selection-tag--visible",null]],null,null,W,H)),l._7(6,114688,null,0,z,[l.l,l.h],{icon:[0,"icon"]},null),(n()(),l._28(7,0,["",""])),(n()(),l._28(-1,null,["\n  "])),(n()(),l._3(16777216,null,null,1,null,J)),l._7(10,802816,null,0,N.k,[l.R,l.O,l.t],{ngForOf:[0,"ngForOf"]},null),(n()(),l._28(-1,null,["\n"])),(n()(),l._28(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,2,0,e.fxLayout),n(t,3,0,e.dragEnabled,e.model.id),n(t,6,0,e.model.icon),n(t,10,0,e.model.cells)},function(n,t){var e=t.component;n(t,1,0,e.style),n(t,5,0,l._20(t,6).selectionTagClass,l._20(t,6).visible),n(t,7,0,e.model.name)})}var $=l._4("mw-editor-grid",E,function(n){return l._30(0,[(n()(),l._8(0,0,null,null,1,"mw-editor-grid",[],[[2,"mw-editor-grid",null],[4,"backgroundColor",null]],null,null,Z,q)),l._7(1,4308992,null,0,E,[y.a,l.h],null,null)],function(n,t){n(t,1,0)},function(n,t){n(t,0,0,l._20(t,1).editorGridClass,l._20(t,1).backgroundColor)})},{model:"model"},{afterViewInitEmitter:"afterViewInitEmitter"},[]),Q=l._6({encapsulation:2,styles:[[".mw-editor-text{position:relative;display:block;color:#fff;cursor:pointer}"]],data:{}});function nn(n){return l._30(0,[(n()(),l._8(0,0,null,null,6,"div",[["class","mw-editor-text-drag-handle"],["dnd-draggable",""]],null,[[null,"click"]],function(n,t,e){var l=!0;return"click"===t&&(l=!1!==n.component.onclick()&&l),l},null,null)),l._7(1,16384,null,0,T.e,[l.l,T.c,T.b,l.h],{dragData:[0,"dragData"]},null),(n()(),l._28(-1,null,["\n  "])),(n()(),l._8(3,0,null,null,2,"mw-selection-tag",[],[[2,"mw-selection-tag",null],[2,"mw-selection-tag--visible",null]],null,null,W,H)),l._7(4,114688,null,0,z,[l.l,l.h],{selected:[0,"selected"],icon:[1,"icon"]},null),(n()(),l._28(5,0,["",""])),(n()(),l._28(6,null,["\n  ","\n"])),(n()(),l._28(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,1,0,e.model.id),n(t,4,0,e.selected,e.model.icon)},function(n,t){var e=t.component;n(t,3,0,l._20(t,4).selectionTagClass,l._20(t,4).visible),n(t,5,0,e.model.name),n(t,6,0,e.model.value)})}var tn=l._4("mw-text",b,function(n){return l._30(0,[(n()(),l._8(0,0,null,null,1,"mw-text",[],[[2,"mw-editor-text",null]],null,null,nn,Q)),l._7(1,114688,null,0,b,[l.h],null,null)],function(n,t){n(t,1,0)},function(n,t){n(t,0,0,l._20(t,1).editorTextClass)})},{model:"model"},{},[]),en=e("trMa"),ln=e("e0rv"),on=e("l6RC"),rn=e("8Xfy"),an=e("V8+5"),un=e("aayJ"),sn=e("dYU3"),cn=function(){function n(n){this.messageService=n,this.toolPanelClass=!0,this.tools=[new h,new u]}return n.prototype.ngOnInit=function(){},n.prototype.handleDropSuccess=function(n){console.log("deleted",n),this.messageService.publish(k,{command:v.a.delete,data:{componentId:n.dragData}})},n}(),dn=l._6({encapsulation:2,styles:[[".mw-tool-panel .mat-icon{vertical-align:middle;margin-right:5px;color:#a9bbbb}.mw-tool-panel .mat-tool-panel-container{height:100%}.mw-tool-panel .mat-tool-panel-trash{font-size:128px;width:128px;height:128px}.mw-tool-panel h3{border:none;font-size:10px;letter-spacing:1px;line-height:24px;text-transform:uppercase;font-weight:400;margin:0;padding:0 16px;background:rgba(0,0,0,.32);color:hsla(0,0%,100%,.87)}.mw-tool-panel .mat-list-item{color:#a9bbbb}"]],data:{}});function pn(n){return l._30(0,[(n()(),l._8(0,0,null,null,12,"mat-list-item",[["class","mat-list-item"]],null,[[null,"focus"],[null,"blur"]],function(n,t,e){var o=!0;return"focus"===t&&(o=!1!==l._20(n,1)._handleFocus()&&o),"blur"===t&&(o=!1!==l._20(n,1)._handleBlur()&&o),o},un.d,un.b)),l._7(1,1097728,null,2,sn.b,[l.l,[2,sn.e]],null,null),l._26(603979776,1,{_lines:1}),l._26(335544320,2,{_hasAvatar:0}),(n()(),l._28(-1,2,["\n      "])),(n()(),l._8(5,0,null,2,6,"div",[["dnd-draggable",""]],null,null,null,null,null)),l._7(6,16384,null,0,T.e,[l.l,T.c,T.b,l.h],{dragData:[0,"dragData"]},null),(n()(),l._28(-1,null,["\n        "])),(n()(),l._8(8,0,null,null,2,"mat-icon",[["class","mat-icon"],["role","img"]],null,null,null,B.b,B.a)),l._7(9,638976,null,0,U.b,[l.l,U.d,[8,null]],null,null),(n()(),l._28(10,0,["",""])),(n()(),l._28(11,null,["\n        ","\n      "])),(n()(),l._28(-1,2,["\n    "]))],function(n,t){n(t,6,0,t.context.$implicit.type),n(t,9,0)},function(n,t){n(t,10,0,t.context.$implicit.icon),n(t,11,0,t.context.$implicit.name)})}function hn(n){return l._30(0,[(n()(),l._8(0,0,null,null,21,"div",[["class","mat-tool-panel-container"],["fxLayout","column"],["fxLayoutAlign","space-between stretch"]],null,null,null,null,null)),l._7(1,737280,null,0,Y.f,[Y.i,l.l,l.F],{layout:[0,"layout"]},null),l._7(2,737280,null,0,Y.e,[Y.i,l.l,l.F,[2,Y.f]],{align:[0,"align"]},null),(n()(),l._28(-1,null,["\n  "])),(n()(),l._8(4,0,null,null,8,"mat-list",[["class","mat-list"]],null,null,null,un.e,un.a)),l._7(5,49152,null,0,sn.a,[],null,null),(n()(),l._28(-1,0,["\n    "])),(n()(),l._8(7,0,null,0,1,"h3",[],null,null,null,null,null)),(n()(),l._28(-1,null,["\n      Tool Panel\n    "])),(n()(),l._28(-1,0,["\n    "])),(n()(),l._3(16777216,null,0,1,null,pn)),l._7(11,802816,null,0,N.k,[l.R,l.O,l.t],{ngForOf:[0,"ngForOf"]},null),(n()(),l._28(-1,0,["\n  "])),(n()(),l._28(-1,null,["\n  "])),(n()(),l._8(14,0,null,null,6,"div",[["dnd-droppable",""]],null,[[null,"onDropSuccess"]],function(n,t,e){var l=!0;return"onDropSuccess"===t&&(l=!1!==n.component.handleDropSuccess(e)&&l),l},null,null)),l._7(15,16384,null,0,T.f,[l.l,T.c,T.b,l.h],null,{onDropSuccess:"onDropSuccess"}),(n()(),l._28(-1,null,["\n    "])),(n()(),l._8(17,0,null,null,2,"mat-icon",[["class","mat-tool-panel-trash mat-icon"],["role","img"]],null,null,null,B.b,B.a)),l._7(18,638976,null,0,U.b,[l.l,U.d,[8,null]],null,null),(n()(),l._28(-1,0,["delete"])),(n()(),l._28(-1,null,["\n  "])),(n()(),l._28(-1,null,["\n"])),(n()(),l._28(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,1,0,"column"),n(t,2,0,"space-between stretch"),n(t,11,0,e.tools),n(t,18,0)},null)}var mn=e("kY/3"),_n=e("UHIZ"),fn=e("AP4T"),gn=e("6Xbx"),bn=e("lI6h"),wn=e("qgI0"),yn=function(){function n(n,t){this.project=n,this.resultSelector=t}return n.prototype.call=function(n,t){return t.subscribe(new vn(n,this.project,this.resultSelector))},n}(),vn=function(n){function t(t,e,l){n.call(this,t),this.project=e,this.resultSelector=l,this.index=0}return Object(gn.b)(t,n),t.prototype._next=function(n){var t,e=this.index++;try{t=this.project(n,e)}catch(n){return void this.destination.error(n)}this._innerSub(t,n,e)},t.prototype._innerSub=function(n,t,e){var l=this.innerSubscription;l&&l.unsubscribe(),this.add(this.innerSubscription=Object(wn.a)(this,n,t,e))},t.prototype._complete=function(){var t=this.innerSubscription;t&&!t.closed||n.prototype._complete.call(this)},t.prototype._unsubscribe=function(){this.innerSubscription=null},t.prototype.notifyComplete=function(t){this.remove(t),this.innerSubscription=null,this.isStopped&&n.prototype._complete.call(this)},t.prototype.notifyNext=function(n,t,e,l,o){this.resultSelector?this._tryNotifyNext(n,t,e,l):this.destination.next(t)},t.prototype._tryNotifyNext=function(n,t,e,l){var o;try{o=this.resultSelector(n,t,e,l)}catch(n){return void this.destination.error(n)}this.destination.next(o)},t}(bn.a);fn.a.prototype.switchMap=function(n,t){return(e=n,l=t,function(n){return n.lift(new yn(e,l))})(this);var e,l},e("HECM");var xn=e("3iOE"),kn=e("1j/l"),Cn=e("Oryw"),Mn={},Sn=function(){function n(n){this.project=n}return n.prototype.call=function(n,t){return t.subscribe(new En(n,this.project))},n}(),En=function(n){function t(t,e){n.call(this,t),this.project=e,this.active=0,this.values=[],this.observables=[]}return Object(gn.b)(t,n),t.prototype._next=function(n){this.values.push(Mn),this.observables.push(n)},t.prototype._complete=function(){var n=this.observables,t=n.length;if(0===t)this.destination.complete();else{this.active=t,this.toRespond=t;for(var e=0;e<t;e++){var l=n[e];this.add(Object(wn.a)(this,l,l,e))}}},t.prototype.notifyComplete=function(n){0==(this.active-=1)&&this.destination.complete()},t.prototype.notifyNext=function(n,t,e,l,o){var i=this.values,r=this.toRespond?i[e]===Mn?--this.toRespond:this.toRespond:0;i[e]=t,0===r&&(this.project?this._tryProject(i):this.destination.next(i.slice()))},t.prototype._tryProject=function(n){var t;try{t=this.project.apply(this,n)}catch(n){return void this.destination.error(n)}this.destination.next(t)},t}(bn.a);fn.a.combineLatest=function(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];var e=null,l=null;return Object(xn.a)(n[n.length-1])&&(l=n.pop()),"function"==typeof n[n.length-1]&&(e=n.pop()),1===n.length&&Object(kn.a)(n[0])&&(n=n[0]),new Cn.a(n,l).lift(new Sn(e))};var Dn=e("0J28"),jn=e("EiAn"),On=function(){function n(n,t,e,l,o,i,r){this.factoryResolver=n,this.messageService=t,this.saveService=e,this.route=l,this.layoutService=o,this.layoutListService=i,this.changeDetector=r,this.workAreaClass=!0,this.subscriptions=[],this.allowedDropType=E.name}return n.prototype.ngOnInit=function(){var n=this;this.subscriptions.push(this.route.data.subscribe(function(t){n.factoryComponent&&n.factoryComponent.destroyComponent();var e=(new g).toEditorModel(t.layout);n.layoutModel=Object.assign(e,{}),n.changeDetector.markForCheck()})),this.subscriptions.push(this.messageService.channel(k).subscribe(function(t){return n.handleToolPanelMessage(t)})),this.subscriptions.push(this.messageService.channel(x).subscribe(function(t){t.command!==v.a.drop&&t.command!==v.a.delete||n.save(),console.log("cell msg",t)})),this.subscriptions.push(this.messageService.channel(jn.a).subscribe(function(t){return n.deleteLayout(t)}))},n.prototype.ngOnDestroy=function(){this.subscriptions.forEach(function(n){n.unsubscribe()})},n.prototype.handleDrop=function(n){if(console.log("drop",n),n.dragData===E.name){var t=new h;t.cells=[new c(a.a.create(),50),new c(a.a.create(),50)],this.layoutModel.component=t,this.changeDetector.markForCheck(),this.save()}},n.prototype.handleAllowDrop=function(n){return function(t){return t!==n&&console.log("drop not allowed",t),t===n}},n.prototype.save=function(){console.log("saving",this.layoutModel);var n=!1;this.layoutModel.isNew&&(n=!0,this.layoutModel.name=this.layoutListService.getUniqueLayoutName(C.a.newLayoutBaseName)),this.layoutModel.isNew=!1,this.saveService.save(this.layoutModel.toViewerModel()),this.messageService.publish(mn.a,{command:v.a.edit,data:n?{id:this.layoutModel.id,name:this.layoutModel.name}:void 0})},n.prototype.deleteLayout=function(n){n.command===v.a.delete&&(this.saveService.delete(this.layoutModel.id),this.messageService.publish(mn.a,{command:v.a.delete}))},n.prototype.handleToolPanelMessage=function(n){console.log("toolpanel msg",n,this.layoutModel.component),n.command===v.a.delete&&this.layoutModel.component&&this.layoutModel.component.id===n.data.componentId&&(this.layoutModel.component=void 0,this.factoryComponent&&this.factoryComponent.destroyComponent(),this.changeDetector.markForCheck(),console.log("delete layout component",this.layoutModel.component,n.data.componentId),this.save())},n}(),In=e("cOVX"),Fn=e("WHuQ"),Tn=l._6({encapsulation:2,styles:[[".mw-work-area{display:block;border:1px solid #5c5c5c;margin:20px;height:calc(100% - 42px)}.mw-work-area .mw-work-area-target{display:block;height:100%;width:100%;background-color:#1e1e1e;color:#e6e6e6}.mw-work-area .mw-work-area-message-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;height:calc(100% - 20px)}.mw-work-area .mw-work-area-message-container .mw-work-area-message{text-align:center;color:#898467}"]],data:{}});function Nn(n){return l._30(0,[(n()(),l._8(0,0,null,null,5,"div",[["class","mw-work-area-message-container"],["dnd-droppable",""]],null,[[null,"onDropSuccess"]],function(n,t,e){var l=!0;return"onDropSuccess"===t&&(l=!1!==n.component.handleDrop(e)&&l),l},null,null)),l._7(1,16384,null,0,T.f,[l.l,T.c,T.b,l.h],{allowdrop:[0,"allowdrop"]},{onDropSuccess:"onDropSuccess"}),(n()(),l._28(-1,null,["\n    "])),(n()(),l._8(3,0,null,null,1,"div",[["class","mw-work-area-message"]],null,null,null,null,null)),(n()(),l._28(-1,null,["Drag a Grid here!"])),(n()(),l._28(-1,null,["\n  "]))],function(n,t){var e=t.component;n(t,1,0,e.handleAllowDrop(e.allowedDropType))},null)}function Rn(n){return l._30(0,[(n()(),l._8(0,16777216,null,null,1,"mw-factory",[],null,null,null,R.b,R.a)),l._7(1,573440,[[3,4]],0,M.a,[A.a,l.R,l.j],{model:[0,"model"]},null),(n()(),l._3(0,null,null,0))],function(n,t){n(t,1,0,t.component.layoutModel.component)},null)}function An(n){return l._30(2,[l._26(402653184,1,{viewContainerRef:0}),l._26(671088640,2,{cellComponents:1}),l._26(671088640,3,{factoryComponent:0}),(n()(),l._8(3,0,null,null,8,"div",[["class","mw-work-area-target"]],null,null,null,null,null)),(n()(),l._28(-1,null,["\n  "])),(n()(),l._3(16777216,null,null,1,null,Nn)),l._7(6,16384,null,0,N.l,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(n()(),l._28(-1,null,["\n  "])),(n()(),l._28(-1,null,["\n  "])),(n()(),l._3(16777216,null,null,1,null,Rn)),l._7(10,16384,null,0,N.l,[l.R,l.O],{ngIf:[0,"ngIf"]},null),(n()(),l._28(-1,null,["\n"])),(n()(),l._28(-1,null,["\n"]))],function(n,t){var e=t.component;n(t,6,0,!e.layoutModel||!e.layoutModel.component),n(t,10,0,e.layoutModel.component)},null)}var Vn=function(){function n(){this.layoutEditorClass=!0}return n.prototype.ngOnInit=function(){},n}(),Pn=l._6({encapsulation:2,styles:[[".mw-layout-editor mat-sidenav-container{margin:0;width:100%;height:100%;background:#1e1e1e}.mw-layout-editor mat-sidenav{width:240px;background:#3c3f41}"]],data:{}});function Ln(n){return l._30(0,[(n()(),l._8(0,0,null,null,16,"mat-sidenav-container",[["class","mat-drawer-container mat-sidenav-container"]],null,null,null,en.d,en.b)),l._7(1,1490944,null,2,ln.f,[[2,on.c],l.l,l.A,l.h,ln.a],null,null),l._26(603979776,1,{_drawers:1}),l._26(335544320,2,{_content:0}),(n()(),l._28(-1,2,["\n  "])),(n()(),l._8(5,0,null,0,3,"mat-sidenav",[["class","mat-drawer mat-sidenav"],["mode","side"],["opened","true"],["position","end"],["tabIndex","-1"]],[[40,"@transform",0],[1,"align",0],[2,"mat-drawer-end",null],[2,"mat-drawer-over",null],[2,"mat-drawer-push",null],[2,"mat-drawer-side",null],[2,"mat-sidenav-fixed",null],[4,"top","px"],[4,"bottom","px"]],[["component","@transform.start"],["component","@transform.done"],[null,"keydown"]],function(n,t,e){var o=!0;return"component:@transform.start"===t&&(o=!1!==l._20(n,6)._onAnimationStart(e)&&o),"component:@transform.done"===t&&(o=!1!==l._20(n,6)._onAnimationEnd(e)&&o),"keydown"===t&&(o=!1!==l._20(n,6).handleKeydown(e)&&o),o},en.f,en.a)),l._7(6,3325952,[[1,4]],0,ln.e,[l.l,rn.g,rn.f,an.a,[2,N.d]],{position:[0,"position"],mode:[1,"mode"],opened:[2,"opened"]},null),(n()(),l._8(7,0,null,0,1,"mw-tool-panel",[],[[2,"mw-tool-panel",null]],null,null,hn,dn)),l._7(8,114688,null,0,cn,[V.a],null,null),(n()(),l._28(-1,2,["\n  "])),(n()(),l._8(10,0,null,1,5,"mat-sidenav-content",[["class","mat-drawer-content mat-sidenav-content"]],[[4,"margin-left","px"],[4,"margin-right","px"]],null,null,en.e,en.c)),l._7(11,1097728,[[2,4]],0,ln.g,[l.h,ln.f],null,null),(n()(),l._28(-1,0,["\n    "])),(n()(),l._8(13,0,null,0,1,"mw-work-area",[],[[2,"mw-work-area",null]],null,null,An,Tn)),l._7(14,245760,null,0,On,[l.j,V.a,In.a,_n.a,Dn.a,Fn.a,l.h],null,null),(n()(),l._28(-1,0,["\n  "])),(n()(),l._28(-1,2,["\n"])),(n()(),l._28(-1,null,["\n"]))],function(n,t){n(t,1,0),n(t,6,0,"end","side","true"),n(t,8,0),n(t,14,0)},function(n,t){n(t,5,0,l._20(t,6)._animationState,null,"end"===l._20(t,6).position,"over"===l._20(t,6).mode,"push"===l._20(t,6).mode,"side"===l._20(t,6).mode,l._20(t,6).fixedInViewport,l._20(t,6).fixedInViewport?l._20(t,6).fixedTopGap:null,l._20(t,6).fixedInViewport?l._20(t,6).fixedBottomGap:null),n(t,7,0,l._20(t,8).toolPanelClass),n(t,10,0,l._20(t,11)._margins.left,l._20(t,11)._margins.right),n(t,13,0,l._20(t,14).workAreaClass)})}var Gn=l._4("mw-layout-editor",Vn,function(n){return l._30(0,[(n()(),l._8(0,0,null,null,1,"mw-layout-editor",[],[[2,"mw-layout-editor",null]],null,null,Ln,Pn)),l._7(1,114688,null,0,Vn,[],null,null)],function(n,t){n(t,1,0)},function(n,t){n(t,0,0,l._20(t,1).layoutEditorClass)})},{},{},[]),Xn=e("9iV4"),Yn=e("Yq5T"),Bn=e("RyBE"),Un=e("4jwp"),zn=e("OFGE"),Hn=e("ZgUn"),Kn=e("rN87"),Wn=e("S53G"),qn=e("j5BN"),Jn=e("CZgk"),Zn=e("ki1d"),$n=e("YXpL"),Qn=e("ghl+"),nt=e("Cyyd"),tt=e("T2Au"),et=function(){},lt=function(){},ot=function(){},it=function(){},rt=function(){},at=function(){};e.d(t,"LayoutEditorModuleNgFactory",function(){return ut});var ut=l._5(D,[],function(n){return l._16([l._17(512,l.j,l._1,[[8,[j.a,O.a,I.a,F.a,$,X,tn,Gn]],[3,l.j],l.y]),l._17(4608,N.n,N.m,[l.v,[2,N.s]]),l._17(5120,Y.a,Y.c,[]),l._17(4608,Y.b,Y.b,[Y.a]),l._17(4608,Y.h,Y.h,[l.A,N.d]),l._17(5120,Y.i,Y.g,[[3,Y.i],Y.b,Y.h]),l._17(5120,Y.l,Y.k,[[3,Y.l],Y.h,Y.b]),l._17(4608,Xn.i,Xn.n,[N.d,l.D,Xn.l]),l._17(4608,Xn.o,Xn.o,[Xn.i,Xn.m]),l._17(5120,Xn.a,function(n){return[n]},[Xn.o]),l._17(4608,Xn.k,Xn.k,[]),l._17(6144,Xn.j,null,[Xn.k]),l._17(4608,Xn.h,Xn.h,[Xn.j]),l._17(6144,Xn.b,null,[Xn.h]),l._17(5120,Xn.g,Xn.p,[Xn.b,[2,Xn.a]]),l._17(4608,Xn.c,Xn.c,[Xn.g]),l._17(4608,Yn.a,Yn.a,[]),l._17(4608,Dn.a,Dn.a,[Xn.c,Yn.a]),l._17(4608,A.a,A.a,[]),l._17(4608,y.a,y.a,[Bn.c]),l._17(6144,on.b,null,[N.d]),l._17(4608,on.c,on.c,[[2,on.b]]),l._17(4608,an.a,an.a,[]),l._17(4608,rn.h,rn.h,[an.a]),l._17(4608,rn.g,rn.g,[rn.h,l.A,N.d]),l._17(136192,rn.c,rn.b,[[3,rn.c],N.d]),l._17(5120,rn.k,rn.j,[[3,rn.k],[2,rn.i],N.d]),l._17(5120,rn.f,rn.d,[[3,rn.f],l.A,an.a]),l._17(5120,Un.d,Un.b,[[3,Un.d],l.A,an.a]),l._17(5120,Un.g,Un.f,[[3,Un.g],an.a,l.A]),l._17(4608,zn.e,zn.e,[Un.d,Un.g,l.A]),l._17(5120,zn.b,zn.f,[[3,zn.b],N.d]),l._17(4608,zn.j,zn.j,[Un.g,N.d]),l._17(5120,zn.c,zn.i,[[3,zn.c],N.d]),l._17(4608,zn.a,zn.a,[zn.e,zn.b,l.j,zn.j,zn.c,l.g,l.r,l.A,N.d]),l._17(5120,zn.g,zn.h,[zn.a]),l._17(5120,U.d,U.a,[[3,U.d],[2,Xn.c],Bn.c,[2,N.d]]),l._17(4608,T.b,T.b,[]),l._17(5120,T.c,T.g,[]),l._17(5120,T.d,T.h,[T.b]),l._17(512,N.c,N.c,[]),l._17(512,Y.j,Y.j,[]),l._17(512,Y.d,Y.d,[]),l._17(512,Hn.a,Hn.a,[]),l._17(512,Xn.e,Xn.e,[]),l._17(512,Xn.d,Xn.d,[]),l._17(512,Kn.a,Kn.a,[]),l._17(512,Wn.a,Wn.a,[]),l._17(512,on.a,on.a,[]),l._17(256,qn.b,!0,[]),l._17(512,qn.h,qn.h,[[2,qn.b]]),l._17(512,an.b,an.b,[]),l._17(512,rn.a,rn.a,[]),l._17(512,Jn.b,Jn.b,[]),l._17(512,Un.c,Un.c,[]),l._17(512,zn.d,zn.d,[]),l._17(512,ln.h,ln.h,[]),l._17(512,qn.i,qn.i,[]),l._17(512,qn.r,qn.r,[]),l._17(512,qn.p,qn.p,[]),l._17(512,Zn.b,Zn.b,[]),l._17(512,sn.c,sn.c,[]),l._17(512,U.c,U.c,[]),l._17(512,$n.b,$n.b,[]),l._17(512,Qn.d,Qn.d,[]),l._17(512,nt.a,nt.a,[]),l._17(512,T.a,T.a,[]),l._17(512,tt.a,tt.a,[]),l._17(512,et,et,[]),l._17(512,lt,lt,[]),l._17(512,ot,ot,[]),l._17(512,it,it,[]),l._17(512,rt,rt,[]),l._17(512,_n.n,_n.n,[[2,_n.s],[2,_n.k]]),l._17(512,at,at,[]),l._17(512,D,D,[]),l._17(256,Xn.l,"XSRF-TOKEN",[]),l._17(256,Xn.m,"X-XSRF-TOKEN",[]),l._17(256,ln.a,!1,[]),l._17(1024,_n.i,function(){return[[{path:"",component:Vn},{path:"**",redirectTo:"",pathMatch:"full"}]]},[])])})}});