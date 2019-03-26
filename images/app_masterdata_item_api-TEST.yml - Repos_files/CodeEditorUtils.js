// Copyright (C) Microsoft Corporation. All rights reserved.
define("CodeEditor/CodeEditorUtils",["require","exports","VSS/Context","VSS/Utils/UI"],function(n,t,i,r){function o(){if(!window.MonacoEnvironment){var n=i.getPageContext();window.MonacoEnvironment={getWorkerUrl:function(){var t=n.webAccessConfiguration.paths.cdnFallbackStaticRootTfs,i=n.diagnostics.debugMode?"debug/":"min/";return t+"_scripts/TFS/"+i+"CodeEditor/WorkerLoader/EditorWorkerLoader.js"}}}}function s(){h||window.require.config({paths:{vs:"../../../../../3rdParty/_content/"+f+"/vs"}})}var f,e;Object.defineProperty(t,"__esModule",{value:!0});f="Extensions/CodeEditor/0.13.1.1";e=function(){function n(){}return n.setDiffEditorContent=function(n,t,i,r){var u=this.getMonacoMode(r),f=monaco.editor.createModel(t,u),e=monaco.editor.createModel(i,u);this.setDiffEditorModels(n,f,e);n.setPosition({lineNumber:1,column:1});n.layout()},n.setEditorContent=function(n,t,i){var r=this.getMonacoMode(i),u=monaco.editor.createModel(t,r);n.setModel(u);n.setPosition({lineNumber:1,column:1});n.layout()},n.updateEditorContent=function(n,t){var i=n.getModel(),r;return i&&(r=i.getValue(),r!==t)?(i.setValue(t),!0):!1},n.getEditorTheme=function(n){var i,t,r;return n=n?n:"vs",i="tfs-extension-"+n,this.isEdgeWithWindowsHighContrastTheme()&&(n="vs"),t=[],n==="vs"?t=c:n==="vs-dark"?t=l:n==="hc-black"&&(t=a),r={base:n,inherit:!0,rules:t,colors:{}},monaco.editor.defineTheme(i,r),i},n.getMonacoMode=function(n,t){var r="text/plain",i,u,t,f;return typeof n!="string"?(i=n,i&&i.name&&(i.name=i.name.toLowerCase().replace(/[^a-z]/g,""),i.tokenPostfix=i.tokenPostfix||"",monaco.languages.register({id:i.name}),monaco.languages.setMonarchTokensProvider(i.name,i),r=i.name)):(u=n,u==="text/x-objective-c"||!t||(t=t,f=(""+t).lastIndexOf("."),f>=0&&(r=this.getMonacoContentTypeOverride(t.substr(f+1))||u)),r=u||r),r},n.setDiffEditorModels=function(n,t,i){var r=n.getOriginalEditor().getModel(),u=n.getModifiedEditor().getModel();n.setModel({original:t,modified:i});this.disposeModel(r);this.disposeModel(u)},n.disposeModel=function(n){n&&!n.isDisposed()&&n.dispose()},n.isEdgeWithWindowsHighContrastTheme=function(){return r.BrowserCheckUtils.isEdge()&&window.matchMedia&&window.matchMedia("(-ms-high-contrast:active)").matches?!0:!1},n.getMonacoContentTypeOverride=function(n){return this._monacoContentTypesByExtension===null&&(this._monacoContentTypesByExtension={},this._monacoContentTypesByExtension.bat="text/x-bat",this._monacoContentTypesByExtension.c="text/x-cpp",this._monacoContentTypesByExtension.cc="text/x-cpp",this._monacoContentTypesByExtension.cmd="text/x-bat",this._monacoContentTypesByExtension.coffee="text/x-coffeescript",this._monacoContentTypesByExtension.config="text/xml",this._monacoContentTypesByExtension.cpp="text/x-cpp",this._monacoContentTypesByExtension.cs="text/x-csharp",this._monacoContentTypesByExtension.cshtml="text/x-cshtml",this._monacoContentTypesByExtension.csproj="text/xml",this._monacoContentTypesByExtension.css="text/css",this._monacoContentTypesByExtension.cxx="text/x-cpp",this._monacoContentTypesByExtension.fs="text/x-fsharp",this._monacoContentTypesByExtension.fsx="text/x-fsharp",this._monacoContentTypesByExtension.go="text/x-go",this._monacoContentTypesByExtension.h="text/x-cpp",this._monacoContentTypesByExtension.handlebars="text/x-handlebars-template",this._monacoContentTypesByExtension.hpp="text/x-cpp",this._monacoContentTypesByExtension.htm="text/html",this._monacoContentTypesByExtension.html="text/html",this._monacoContentTypesByExtension.ini="text/ini",this._monacoContentTypesByExtension.jade="text/x-jade",this._monacoContentTypesByExtension.java="text/x-java-source",this._monacoContentTypesByExtension.js="text/javascript",this._monacoContentTypesByExtension.json="application/json",this._monacoContentTypesByExtension.less="text/x-less",this._monacoContentTypesByExtension.lua="text/x-lua",this._monacoContentTypesByExtension.m="text/x-objective-c",this._monacoContentTypesByExtension.markdown="text/x-markdown",this._monacoContentTypesByExtension.md="text/x-markdown",this._monacoContentTypesByExtension.mdown="text/x-markdown",this._monacoContentTypesByExtension.php="application/x-php",this._monacoContentTypesByExtension.ps1="text/x-powershell",this._monacoContentTypesByExtension.psm1="text/x-powershell",this._monacoContentTypesByExtension.py="text/x-python",this._monacoContentTypesByExtension.r="text/x-r",this._monacoContentTypesByExtension.rb="text/x-ruby",this._monacoContentTypesByExtension.rc="text/x-cpp",this._monacoContentTypesByExtension.rhistory="text/x-r",this._monacoContentTypesByExtension.rt="text/x-r",this._monacoContentTypesByExtension.sass="text/x-scss",this._monacoContentTypesByExtension.scss="text/x-scss",this._monacoContentTypesByExtension.sql="text/x-sql",this._monacoContentTypesByExtension.strada="text/strada",this._monacoContentTypesByExtension.swift="text/swift",this._monacoContentTypesByExtension.ts="text/typescript",this._monacoContentTypesByExtension.tsx="text/typescript",this._monacoContentTypesByExtension.vb="text/x-vb",this._monacoContentTypesByExtension.xaml="application/xaml+xml",this._monacoContentTypesByExtension.xml="text/xml"),this._monacoContentTypesByExtension[(""+n).toLowerCase()]},n._monacoContentTypesByExtension=null,n}();t.CodeEditorUtils=e;t.setMonacoEnvironment=o;t.setInitialRequire=s;var h=!1,u=[{token:"debug-token",foreground:"9966FF"},{token:"error-token",foreground:"E92D3D"},{token:"info-token",foreground:"888888"},{token:"warn-token",foreground:"FF8C00"},{token:"command-token",foreground:"0078D4"},{token:"section-token",foreground:"1FAE3E"},],c=u.concat([{token:"comment",foreground:"007200"},{token:"number",foreground:"007200"},]),l=[{token:"",foreground:"FFFFFF",background:"000000"}].concat(u,[{token:"comment",foreground:"13A10E"},{token:"number",foreground:"13A10E"},]),a=u.slice()});

