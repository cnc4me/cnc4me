const l=/[O|:](\d+)/y;function a(t,r){let e=null;if(l.lastIndex=r,e=l.exec(t),e!==null){const n=e[0];e.payload=parseInt(n.slice(1))}return e}export{a as matchProgramNumber};
