import{a as c,G as e,S as u}from"./index-885978b8.js";const f=()=>{const o=c.useMemo(()=>[{label:"Inputs",fields:[{id:"text",title:"Text",icon:e.text,type:"text",attributes:{label:"Text",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"email",title:"Email",icon:e.email,type:"email",attributes:{label:"Email",placeholder:"Email",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"name",title:"Name",icon:e.name,type:"text",attributes:{label:"Name",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"textarea",title:"Textarea",icon:e.textarea,type:"textarea",attributes:{label:"Textarea",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%",resizeTextarea:!1}},{id:"phone",title:"Phone",icon:e.phone,type:"text",attributes:{label:"Phone",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"number",title:"Number",icon:e.number,type:"number",attributes:{label:"Number",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"password",title:"Password",icon:e.password,type:"password",attributes:{label:"Password",placeholder:"Enter Your Password",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,confirmPassword:!1,confirmPasswordLabel:"Confirm Password",confirmPasswordPlaceholder:"Confirm your password",confirmPasswordDescription:"",column_width:"50%"}},{id:"file",title:"File",icon:e.file,type:"file",attributes:{label:"File",description:"",hideLabel:!1,required:!1,column_width:"50%",allowedExtensions:[{label:"jpg",value:"jpg"},{label:"jpeg",value:"jpeg"},{label:"pdf",value:"pdf"}],allowMultiple:!1}},{id:"url",viewAccess:["premium","enterprise"],title:"Url",icon:e.url,type:"text",attributes:{label:"Url",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"date_time",viewAccess:["premium","enterprise"],title:"Date Time",icon:e.date_time,type:"date",attributes:{label:"Date Time",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,required:!1,dateTimeFormat:"2",dateFormat:"d-m-Y",timeFormat:"12h",column_width:"50%"}},{id:"hidden",title:"Hidden",icon:e.hidden,type:"hidden",attributes:{label:"Hidden",data_type:"",hiddenValue:"",column_width:"100%"}}]},{label:"Select",fields:[{id:"checkbox",title:"Checkboxes",icon:e.checkbox,type:"checkbox",attributes:{label:"Checkboxes",placeholder:"",description:"",required:!1,hideLabel:!1,options:[{label:"Option 1",value:"Option 1"}],radio_options:[],dropdown_options:[],default_value:"",no_of_options:"1",column_width:"50%"}},{id:"accept_terms",title:"Accept Terms",icon:e.accept_terms,type:"checkbox",attributes:{label:"I agree <a href='#'>Terms and Conditions</a>",description:"",isDefaultSelected:!1,required:!1,column_width:"50%"}},{id:"radio",title:"Radio Buttons",icon:e.radio,type:"radio",attributes:{label:"Radio Buttons",placeholder:"",description:"",required:!1,hideLabel:!1,options:[],radio_options:[{label:"Option 1",value:"Option 1"}],dropdown_options:[],default_value:"",no_of_options:"1",column_width:"50%"}},{id:"dropdown",title:"Dropdown",icon:e.dropdown,type:"select",attributes:{label:"Dropdown",placeholder:"Please Select",description:"",required:!1,hideLabel:!1,options:[],radio_options:[],dropdown_options:[],default_value:"",no_of_options:"1",column_width:"50%"}}]},{label:"Static Text",fields:[{id:"heading",title:"Heading",type:"heading",icon:e.heading,attributes:{heading:"Heading",caption:"",column_width:"50%"}},{id:"paragraph",title:"Paragraph",type:"editor",icon:e.paragraph,attributes:{text:"Paragraph",column_width:"50%"}},{id:"html",viewAccess:["premium","enterprise"],title:"HTML",icon:e.html,type:"HTML",attributes:{htmlCode:"<div>Enter your code</div>",column_width:"50%"}}]},{label:"premium only",viewAccess:"free",fields:[{id:"url",premiumOnly:!0,title:"Url",icon:e.url,type:"text",attributes:{label:"Url",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,limit_chars_count:"20",required:!1,column_width:"50%"}},{id:"date_time",premiumOnly:!0,title:"Date Time",icon:e.date_time,type:"date",attributes:{label:"Date Time",placeholder:"",description:"",hideLabel:!1,limit_chars:!1,required:!1,dateTimeFormat:"2",dateFormat:"d-m-Y",timeFormat:"12h",column_width:"50%"}},{id:"html",premiumOnly:!0,title:"HTML",icon:e.html,type:"HTML",attributes:{htmlCode:"<div>Enter your code</div>",column_width:"50%"}}]}],[e]),n=(l,r,s)=>s?r.filter(t=>{var a;return t!=null&&t.viewAccess?(a=t==null?void 0:t.viewAccess)!=null&&a.includes(l)?t:null:t}):r.map(t=>{var a;return{...t,fields:(a=t==null?void 0:t.fields)==null?void 0:a.filter(i=>{var d;return i!=null&&i.viewAccess?(d=i==null?void 0:i.viewAccess)!=null&&d.includes(l)?i:null:i})}});return{customElements:o,elements:(l=u.FREE,r=o,s)=>l?n(l,r,s):[]}};export{f as u};