/** Local URL observations only. No network, eval, or navigation. */
import {pathToFileURL} from 'node:url';
export const registrableFixtures=Object.freeze({'app.example.com':'example.com','api.example.com':'example.com','app.example.org':'example.org'});
export function inspect(reference,base){
 const u=base===undefined?new URL(reference):new URL(reference,base);
 const fields=Object.fromEntries(['href','protocol','hostname','host','port','pathname','search','hash','origin'].map(key=>[key,u[key]]));
 return {...fields,queryPairs:[...u.searchParams],tags:u.searchParams.getAll('tag'),httpOriginForm:['http:','https:'].includes(u.protocol)?u.pathname+u.search:null,networkExecuted:false};
}
export function compare(left,right){
 const a=new URL(left),b=new URL(right);
 if(![a,b].every(u=>['http:','https:'].includes(u.protocol)))throw new TypeError('This comparison supports only ordinary HTTP(S) tuple origins.');
 const site=u=>registrableFixtures[u.hostname]?u.protocol+'//'+registrableFixtures[u.hostname]:null;
 const sa=site(a),sb=site(b);
 return {leftOrigin:a.origin,rightOrigin:b.origin,sameOrigin:a.origin===b.origin,leftSite:sa,rightSite:sb,sameSite:sa!==null&&sb!==null?sa===sb:null,siteScope:'Selected declared com/org fixtures only; unlisted hosts are not guessed.',networkExecuted:false};
}
export function form(value){const p=new URLSearchParams();p.set('q',value);return {raw:value,serialized:p.toString(),roundTrip:new URLSearchParams(p.toString()).get('q'),networkExecuted:false};}
function args(argv){
 const allowed=new Set(['--reference','--base','--left','--right','--form-value']),out={};
 for(let i=0;i<argv.length;i+=2){const key=argv[i];if(!allowed.has(key)||Object.hasOwn(out,key)||argv[i+1]===undefined)throw new TypeError('Use exactly one mode: --reference VALUE [--base VALUE], --left URL --right URL, or --form-value VALUE.');out[key]=argv[i+1];}
 const keys=Object.keys(out);if(keys.length===0)throw new TypeError('A mode and input are required.');
 if(Object.hasOwn(out,'--reference')&&keys.every(k=>['--reference','--base'].includes(k)))return inspect(out['--reference'],out['--base']);
 if(keys.length===2&&Object.hasOwn(out,'--left')&&Object.hasOwn(out,'--right'))return compare(out['--left'],out['--right']);
 if(keys.length===1&&Object.hasOwn(out,'--form-value'))return form(out['--form-value']);
 throw new TypeError('Mixed or incomplete modes are not accepted.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{console.log(JSON.stringify(args(process.argv.slice(2)),null,2));}
 catch(error){console.error(JSON.stringify({error:error.name,message:error.message,networkExecuted:false}));process.exitCode=1;}
}
