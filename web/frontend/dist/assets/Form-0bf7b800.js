import{H as C,a as j,j as r,T as y,e as I}from"./index-885978b8.js";function F({acceptCharset:t,action:s,autoComplete:o,children:u,encType:i,implicitSubmit:l=!0,method:c="post",name:m,noValidate:d,preventDefault:n=!0,target:p,onSubmit:e}){const f=C(),b=j.useCallback(a=>{n&&(a.preventDefault(),e(a))},[e,n]),h=T(o),x=l?r(y,{as:"span",visuallyHidden:!0,children:r("button",{type:"submit","aria-hidden":"true",tabIndex:-1,children:f.translate("Polaris.Common.submit")})}):null;return I("form",{acceptCharset:t,action:s,autoComplete:h,encType:i,method:c,name:m,noValidate:d,target:p,onSubmit:b,children:[x,u]})}function T(t){return t==null?t:t?"on":"off"}export{F};