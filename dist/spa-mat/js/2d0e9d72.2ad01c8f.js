(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["2d0e9d72"],{"8ef5":function(s,e,t){"use strict";t.r(e);var i=function(){var s=this,e=s.$createElement,i=s._self._c||e;return i("div",[i("div",{staticStyle:{margin:"100px 0 0 100px",color:"gray"}},[i("h4",[i("img",{staticClass:"img-item",attrs:{src:t("f948")}}),i("b",[s._v(s._s(s.lesson.thecourse)+" Lesson Planner\n          ")])]),s._m(0)]),i("hr",{staticClass:"line"}),i("div",{staticClass:"row courseplan"},[i("transition",{attrs:{name:"slide-fade"}},[s.isShow?s._e():i("div",{staticClass:"col-3",staticStyle:{"padding-right":"10px"}},[i("app-couser-reminder",{attrs:{coursename:s.lesson.thecourse,selectedarea:s.lesson.thearea,selectedcourse:s.lesson.thesubject,selectedstage:s.lesson.thestage}})],1)]),i("div",{class:s.isShow?"col-9":"col-6"},s._l(s.lessons,function(e,t){return i("div",{key:t,staticClass:"editor",style:e.isDisplay?"display:block":"display:none"},[i("q-editor",{attrs:{"toolbar-text-color":"white","toolbar-outline":"","toolbar-bg":"deep-purple-4","min-height":"40rem",toolbar:[["bold","italic","underline"],["token","hr","link","custom_btn"],[{label:s.$q.i18n.editor.formatting,icon:s.$q.icon.editor.formatting,list:"no-icons",options:["p","h1","h2","h3","h4","h5","h6","code"]},{label:s.$q.i18n.editor.defaultFont,icon:s.$q.icon.editor.font,fixedIcon:!0,list:"no-icons",options:["default_font","arial","arial_black","comic_sans","courier_new","impact","lucida_grande","times_new_roman","verdana"]},"removeFormat"],[{label:s.$q.i18n.editor.align,icon:s.$q.icon.editor.align,fixedLabel:!0,options:["left","center","right","justify"]}],["fullscreen"],["undo","redo"]],fonts:{arial:"Arial",arial_black:"Arial Black",comic_sans:"Comic Sans MS",courier_new:"Courier New",impact:"Impact",lucida_grande:"Lucida Grande",times_new_roman:"Times New Roman",verdana:"Verdana"}},model:{value:e.editcontent,callback:function(t){s.$set(e,"editcontent",t)},expression:"lesson.editcontent"}}),i("q-list",{staticClass:"bottom-tips"},[i("q-item",[i("q-item-side",[i("p",[s._v("Title: "+s._s(e.summary))])]),i("q-item-main",{staticStyle:{"text-align":"center"},attrs:{"text-color":"dark"}},[i("p",{staticStyle:{"font-size":"14px"}},[i("i",{staticClass:"far fa-smile",staticStyle:{"margin-right":"10px"}}),s._v("Please remeber click save button, when you make any changes.")])]),i("q-item-side",{attrs:{right:""}},[i("p",[s._v("Lesson No."+s._s(t+1))])])],1)],1),i("div",{staticStyle:{float:"right",margin:"30px 0"}},[i("q-btn",{attrs:{label:"Save this lesson",outline:"",rounded:"",color:"deep-purple-9",icon:"save"},on:{click:function(e){s.save(t)}}})],1)],1)})),i("div",{staticClass:"col-3",staticStyle:{"padding-left":"10px"}},[i("q-chips-input",{staticClass:"search-input",attrs:{inverted:"",color:"deep-purple-4","chips-color":"dark","chips-bg-color":"white","float-label":"Enter the key words"},on:{keyup:s.search},model:{value:s.keywords,callback:function(e){s.keywords=e},expression:"keywords"}}),i("div",{staticClass:"search"},[i("q-list",{staticClass:"searchResult"},s._l(s.searchResult,function(e){return i("q-item",{key:e.URL},[i("q-item-side",[i("q-checkbox",{attrs:{color:"deep-purple-6",val:e},model:{value:s.seletedurl,callback:function(e){s.seletedurl=e},expression:"seletedurl"}})],1),i("q-item-main",[i("a",{staticClass:"urllink",attrs:{href:e.URL,target:"_blank"}},[s._v(s._s(e.Name))]),i("q-tooltip",{staticClass:"tip",attrs:{anchor:"bottom middle",self:"top middle",offset:[10,10]}},[s._v("\n                        "+s._s(e.Snippet)+"\n                      ")])],1)],1)})),i("q-list",{staticClass:"bottom-tips"},[i("q-item",[i("q-item-side",{staticStyle:{"text-align":"center"}},[i("i",{staticClass:"far fa-smile"})]),i("q-item-main",[i("p",{staticClass:"tips"},[s._v("Please remeber click save button when you make any change in each lesson.")])])],1)],1)],1)],1),i("q-card",{staticClass:"col-9 l list-of-lesson"},[i("q-card-title",{staticClass:"relative-position q-ma-sm"},[i("b",{staticStyle:{color:"gray"}},[s._v("List of "+s._s(s.lesson.thecourse)+" Lesson")]),i("q-btn",{staticClass:"absolute",staticStyle:{right:"8px"},attrs:{icon:"fas fa-plus",outline:"",rounded:"",flat:"",color:"deep-purple-9"},on:{click:s.add}}),i("q-card-separator",{staticStyle:{"margin-top":"15px","margin-bottom":"15px"}}),i("span",{attrs:{slot:"subtitle"},slot:"subtitle"},[i("img",{staticClass:"lesson-sequence-logo",attrs:{src:t("6e2c")}}),i("q-field",{attrs:{"label-width":2,label:"Lesson Sequence"}},[i("q-input",{attrs:{color:"deep-purple-9"},model:{value:s.lesson.thedescription,callback:function(e){s.$set(s.lesson,"thedescription",e)},expression:"lesson.thedescription"}})],1)],1)],1),i("q-item-separator"),i("q-card-main",{staticClass:"lesson-list"},[i("draggable",{staticClass:"row",staticStyle:{"text-align":"center",position:"relative"},attrs:{options:{handle:".my-handle"}},model:{value:s.lessons,callback:function(e){s.lessons=e},expression:"lessons"}},s._l(s.lessons,function(e,t){return i("div",{key:t,staticClass:"col-lg-2 col-md-4 col-sm-6 col-xs-12"},[i("q-list",{staticClass:"q-ma-xs addLesson"},[i("q-item",[i("q-item-side",{attrs:{left:""}},[i("q-icon",{staticClass:"my-handle q-ma-sm",attrs:{name:"fas fa-bars","aria-hidden":"true",size:"18px",color:"blue-grey-3"}})],1),i("q-item-main"),i("q-item-side",{attrs:{right:""}},[i("q-btn",{staticClass:"q-ma-xs",attrs:{icon:"fas fa-trash-alt",size:"8px",outline:"",round:""},on:{click:function(e){s.removeLesson(t)}}})],1)],1),i("q-item",[i("q-btn",{staticStyle:{color:"#4527a0",width:"100%"},attrs:{outline:""},on:{click:function(e){s.selectedLesson(t)}}},[s._v("Lesson "+s._s(t+1))])],1),i("q-item",[i("div",[i("q-input",{staticClass:"q-ma-sm",attrs:{color:"deep-purple-5",placeholder:"Lesson title"},model:{value:e.summary,callback:function(t){s.$set(e,"summary",t)},expression:"lesson.summary"}})],1)])],1)],1)}))],1),i("q-item-separator"),i("q-card-title",{staticClass:"relative-position q-ma-sm"},[i("b",{staticStyle:{color:"gray"}},[s._v("Learning Arae: "+s._s(s.lesson.thearea)+" | Subject: "+s._s(s.lesson.thesubject)+" | Stage: "+s._s(s.lesson.thestage))]),i("div",{staticClass:"row items-center",attrs:{slot:"right"},slot:"right"},[i("q-btn",{attrs:{flat:"",outline:"",color:"deep-purple-5",label:"Submit All Lessons"},on:{click:s.submit}})],1)])],1),i("q-card",{staticClass:"col-3 l list-of-link"},[i("q-card-title",{staticClass:"relative-position q-ma-sm"},[i("img",{staticClass:"img-item link-logo",attrs:{src:t("e03b")}}),i("b",{staticStyle:{color:"gray"}},[s._v("Related Resouse Link")]),i("q-card-separator",{staticStyle:{"margin-top":"15px","margin-bottom":"15px"}})],1),i("q-card-main",{staticClass:"link-list q-ma-xs",staticStyle:{color:"gray"}},s._l(s.seletedurl,function(e,t){return i("q-item",{key:t},[i("q-item-side",[i("q-btn",{attrs:{flat:"",round:"",icon:"fas fa-minus-circle",outline:"",color:"deep-purple-5"},on:{click:function(e){s.deletelink(t)}}})],1),i("a",{staticClass:"urllink",attrs:{href:e.URL,target:"_blank"}},[s._v(s._s(e.Name))])],1)}))],1)],1),i("div",{staticClass:"left-btn"},[i("q-btn",{attrs:{push:"",icon:"fas fa-info-circle",align:"between",label:"Get lesson inforamtion",color:"deep-purple-9"},on:{click:function(e){s.isShow=!s.isShow}}})],1)])},a=[function(){var s=this,e=s.$createElement,t=s._self._c||e;return t("p",[t("i",[s._v("Design the lesson in the editor, add the lesson by clicking the add button, and delete the lesson by clicking the delete button")])])}];i._withStripped=!0;var l=t("1d7a"),n=t("1516"),o=t.n(n),r=t("77e2"),c={props:{lesson:{type:Object,default:function(){}}},components:{appCouserReminder:l["a"],draggable:o.a},data:function(){return{lessonId:void 0,username:void 0,lessons:[{courseid:0,summary:"A",editcontent:"",isDisplay:!0,url:""}],isShow:!0,blockRemoval:!0,coursename:"",keywords:[],searchResult:[],seletedurl:[]}},watch:{lessons:function(){this.blockRemoval=this.lessons.length<=1}},created:function(){this.username=this.lesson.userId,this.lessonId=this.lesson.lessonId,this.lessons=this.lesson.lesson,this.j=this.lessons.length},methods:{save:function(s){this.lessons[s].url=this.seletedurl,console.log(this.lessons[s].url)},add:function(){var s,e=this.lessons.length;for(s=0;s<this.lessons.length;s++)this.lessons[s].isDisplay=!1;this.seletedurl=[],this.lessons.push({courseid:e++,editcontent:"",summary:"",isDisplay:!0,url:"",start:{dateTime:""},end:{dateTime:""}})},selectedLesson:function(s){var e;for(e=0;e<this.lessons.length;e++)this.lessons[e].isDisplay=!1;this.lessons[s].isDisplay=!0,""===this.lessons[s].url?this.seletedurl=[]:this.seletedurl=this.lessons[s].url},submit:function(){var s=this,e=this.lessonId,t=this.username,i=this.lesson.thedescription,a=this.lessons,l=this.lesson.thearea,n=this.lesson.thecourse,o=this.lesson.thesubject,c=this.lesson.thestage;this.$q.loading.show({spinner:r["a"],spinnerColor:"amber",spinnerSize:100,message:"Updating the content..."}),setTimeout(function(){s.$q.loading.hide(),s.$store.dispatch("user/post",{submitLessons:a,area:l,course:n,subject:o,stage:c,description:i,userid:t,lessonId:e})},3e3)},removeLesson:function(s){this.blockRemoval||(s===this.lessons.length-1?(this.lessons[s-1].isDisplay=!0,this.lessons.splice(s,1)):this.lessons.splice(s,1))},deletelink:function(s){this.seletedurl.splice(s,1)},search:function(){var s=this,e=t("bc3a");e({url:"http://localhost:1330/search/graphql",method:"post",data:{query:"query SearchQuery($terms: SearchInput) {\n            searchRequest(terms: $terms) {\n              WebPages {\n                Value {\n                  Name\n                  URL\n                  DisplayURL\n                  Snippet\n                }\n              }\n            }\n          }",variables:{terms:{learning_area:"hise",subject:this.selectedcourse,stage:this.selectedstage,course_name:this.coursename,content_area:this.selectedarea,keywords:this.keywords}}}}).then(function(e){s.searchResult=e.data.data.searchRequest.WebPages.Value})}}},d=c,u=t("2877"),h=Object(u["a"])(d,i,a,!1,null,null,null);h.options.__file="Coursemodify.vue";e["default"]=h.exports}}]);