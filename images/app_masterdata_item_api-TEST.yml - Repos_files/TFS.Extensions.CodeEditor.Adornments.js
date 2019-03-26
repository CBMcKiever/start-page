// Copyright (C) Microsoft Corporation. All rights reserved.
define("BuiltInExtensions/Scripts/TFS.Extensions.CodeEditor.Adornments",["require","exports","Presentation/Scripts/TFS/TFS.Adornment.Common","BuiltInExtensions/Scripts/TFS.Extension"],function(n,t,i,r){var u,f,e,o;Object.defineProperty(t,"__esModule",{value:!0});u=function(){function n(n,t){this._adornment=n;this._editor=t.getEditor(n.isOriginalSide)}return n.prototype.show=function(){var n=this;this._decorationId||(this._decorationId=this._editor.changeDecorations(function(t){return t.addDecoration({startLineNumber:n._adornment.startLine,startColumn:n._adornment.startColumn,endLineNumber:n._adornment.endLine,endColumn:n._adornment.endColumn},{isWholeLine:Boolean(n._adornment.isWholeLine),inlineClassName:n._adornment.className,className:n._adornment.actualClassName,glyphMarginClassName:n._adornment.glyphMarginClassName,hoverMessage:n._adornment.glyphMarginText,linesDecorationsClassName:n._adornment.linesDecorationsClassName,overviewRuler:n._adornment.overviewRuler})}),this._adornment.scrollToAdornment&&this.scrollIntoAdornmentViewByRange())},n.prototype.dispose=function(){var n=this;this._decorationId&&(this._editor.changeDecorations(function(t){t.removeDecoration(n._decorationId)}),this._decorationId=null)},n.prototype.scrollIntoAdornmentView=function(){this._editor.revealPosition({lineNumber:this._adornment.startLine,column:this._adornment.endColumn},!0,!0)},n.prototype.scrollIntoAdornmentViewByRange=function(){this._editor.revealRangeInCenterIfOutsideViewport({startLineNumber:this._adornment.startLine,startColumn:this._adornment.startColumn,endLineNumber:this._adornment.startLine,endColumn:this._adornment.endColumn})},n}();t.MonacoAdornmentDecorationControl=u;f=function(){function n(n,t){this.adornment=n;this.gutterAdornmentWidget=t}return n.prototype.show=function(){this.gutterAdornmentWidget.addAdornment(this.adornment)},n.prototype.dispose=function(){this.gutterAdornmentWidget.removeAdornment(this.adornment)},n}();e=function(){function n(n,t){this._editor=n;this._isDiffEditor=t;this._adornmentControls=[];this._initializeGutterAdornmentWidgets()}return n.prototype.dispose=function(){this.removeAdornments()},n.prototype.getEditor=function(n){return this._isDiffEditor?n?this._editor.originalEditor:this._editor.modifiedEditor:this._editor},n.prototype.setAdornments=function(n){this.removeAdornments();this.addAdornments(n)},n.prototype.addAdornments=function(n){var t=this;n&&n.length&&$.each(n,function(n,i){if(i.isOriginalSide||t._isDiffEditor){var r=t._createAdornmentControl(i);t._adornmentControls.push(r);r.show()}})},n.prototype.removeAdornments=function(){$.each(this._adornmentControls,function(n,t){t.dispose()});this._adornmentControls=[]},n.prototype.onSetAdornmentStatus=function(n,t){r.sendMessage(r.Adornment.ActionIds.SET_STATUS,{adornmentId:n,statusId:t})},n.prototype._createAdornmentControl=function(n){if(n.adornmentType===i.AdornmentType.COMMENTSTYLE)throw new Error("Implementation of AdornmentCommon.AdornmentType.COMMENTSTYLE has been removed because it is not known to be used.");else{if(n.adornmentType===i.AdornmentType.DECORATION)return new u(n,this);if(n.adornmentType===i.AdornmentType.GUTTER){var t=n.isOriginalSide?this._originalEditorGutterWidget:this._modifiedEditorGutterWidget;return new f(n,t)}}},n.prototype._initializeGutterAdornmentWidgets=function(){this._isDiffEditor?(this._originalEditorGutterWidget=this._addGutterAdornmentWidgetToEditor(!0),this._modifiedEditorGutterWidget=this._addGutterAdornmentWidgetToEditor(!1)):this._originalEditorGutterWidget=this._addGutterAdornmentWidgetToEditor(!0)},n.prototype._addGutterAdornmentWidgetToEditor=function(n){var t=this.getEditor(n),i=new o(t,n);return t.addOverlayWidget(i),i},n}();t.MonacoAdornmentControlManager=e;o=function(){function n(n,t){this._editor=n;this._isOriginal=t;this._$domNode=null;this._editorFontInfo=this._editor.getConfiguration().fontInfo;this._lineNumberWidth=this._editor.getLayoutInfo().lineNumbersWidth;this._adornmentCollection={};this._adornmentElementCollection={};this._subscribeToEditorEvents()}return n.prototype.getId=function(){return"gutter-adornment-zone-widget-"+this._isOriginal?"original":"modified"},n.prototype.getDomNode=function(){return this._$domNode||(this._$domNode=$("<div />").addClass("gutter-adornments-container")),this._$domNode[0]},n.prototype.getPosition=function(){return null},n.prototype.removeAdornment=function(n){this._adornmentCollection[n.id]===n&&(this._adornmentElementCollection[n.id].remove(),delete this._adornmentCollection[n.id],delete this._adornmentElementCollection[n.id])},n.prototype.addAdornment=function(n){var i=n.startLine>0?n.startLine:1,r=n.endLine,t,u;i<r&&(t=$("<div />").addClass(n.className).css({position:"absolute",top:this._editor.getTopForLineNumber(n.startLine)+"px","line-height":this._editorFontInfo.lineHeight+"px","font-family":this._editorFontInfo.fontFamily,"font-size":this._editorFontInfo.fontSize,"font-weight":this._editorFontInfo.fontWeight,"letter-spacing":this._editorFontInfo.letterSpacing,width:this._lineNumberWidth+"px","text-align":"right",height:(this._editor.getTopForLineNumber(r)-this._editor.getTopForLineNumber(i)).toString()+"px"}),u=$("<div />").addClass("line-number-container"),n.showLineNumber&&(this._appendAdornmentLineNumbers(i,r,u),t=t.append(u)),n.htmlDecoration&&(t=t.append(n.htmlDecoration)),this._$domNode=this._$domNode.append(t),this._adornmentCollection[n.id]=n,this._adornmentElementCollection[n.id]&&this._adornmentElementCollection[n.id].remove(),this._adornmentElementCollection[n.id]=t)},n.prototype._subscribeToEditorEvents=function(){var n=this;this._editor.onDidChangeViewZones(function(){n._updateAdornments()});this._editor.onDidScrollChange(function(t){var i=t.scrollTop||0,r=n._editor.getTopForLineNumber(0)-i;n.getDomNode().style.top=r.toString()+"px"});this._editor.onDidLayoutChange(function(t){t.lineNumbersWidth!=n._lineNumberWidth&&(n._lineNumberWidth=t.lineNumbersWidth,n._updateAdornmentsLayout())})},n.prototype._updateAdornmentsLayout=function(){var n,t;for(n in this._adornmentElementCollection)this._adornmentElementCollection.hasOwnProperty(n)&&(t=this._adornmentElementCollection[n],t.css({width:this._lineNumberWidth+"px"}))},n.prototype._updateAdornments=function(){var n,i;for(n in this._adornmentElementCollection)if(this._adornmentElementCollection.hasOwnProperty(n)){var t=this._adornmentCollection[n],r=this._adornmentElementCollection[n],u=t.startLine>0?t.startLine:1,f=t.endLine,e=this._editor.getTopForLineNumber(u);r.css({top:e+"px",height:(this._editor.getTopForLineNumber(f-1)-e+this._editorFontInfo.lineHeight).toString()+"px"});i=r.find(".line-number-container");i.empty();t.showLineNumber===!0&&this._appendAdornmentLineNumbers(u,f,i)}},n.prototype._appendAdornmentLineNumbers=function(n,t,i){for(var f,e,r=n,u=void 0;r<t;r++)f=this._editor.getTopForLineNumber(r),u&&u+this._editorFontInfo.lineHeight!=f&&(i=i.append($("<div />").addClass("view-zone-block").css({height:(f-u-this._editorFontInfo.lineHeight).toString()+"px"}))),e=$("<div />").css({height:this._editorFontInfo.lineHeight+"px"}).html(r.toString()),i=i.append(e),u=f},n}()});

