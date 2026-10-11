/** A practice self-checker, separate from the site's assessment service. */
import fs from 'node:fs';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {inspect,compare,form} from './inspect.mjs';
export function expected(){
 const full=inspect('https://books.example:8443/catalog/atlas?lang=tr&tag=network&tag=web#summary'),base='https://books.example/catalog/lesson.html?lang=tr#old',app='https://app.example.com/catalog',api=compare(app,'https://api.example.com/catalog'),port=compare(app,'https://app.example.com:8443/catalog');
 let error;try{inspect('/catalog/atlas');}catch(e){error=e.name;}
 return {hostname:full.hostname,host:full.host,port:full.port,tags:full.tags,httpOriginForm:full.httpOriginForm,normalizedDefaultPort:inspect('https://books.example:443/catalog').port,fileBaseHref:inspect('notes',base).href,directoryBaseHref:inspect('notes','https://books.example/catalog/lesson/').href,queryHref:inspect('?lang=en',base).href,fragmentHref:inspect('#new',base).href,apiSameOrigin:api.sameOrigin,apiSameSite:api.sameSite,portSameOrigin:port.sameOrigin,portSameSite:port.sameSite,schemeSameSite:compare(app,'http://app.example.com/catalog').sameSite,formSerialized:form('notlar ı').serialized,missingBaseError:error};
}
export function check(predictions){
 if(predictions===null||Array.isArray(predictions)||typeof predictions!=='object')throw new TypeError('Predictions must be a JSON object.');
 const target=expected(),rows=Object.entries(target).map(([key,value])=>{try{assert.deepEqual(predictions[key],value);return {key,status:'match'};}catch{return {key,status:Object.hasOwn(predictions,key)?'different':'missing'};}});
 return {kind:'manual-url-self-check',matched:rows.filter(r=>r.status==='match').length,total:rows.length,rows,unknownKeys:Object.keys(predictions).filter(k=>!Object.hasOwn(target,k)),networkExecuted:false,learnerUnderstandingMeasured:false};
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{if(process.argv.length!==3)throw new TypeError('Usage: node checker.mjs predictions.json');const result=check(JSON.parse(fs.readFileSync(process.argv[2],'utf8')));console.log(JSON.stringify(result,null,2));if(result.matched!==result.total||result.unknownKeys.length)process.exitCode=1;}
 catch(error){console.error(JSON.stringify({error:error.name,message:error.message}));process.exitCode=1;}
}
