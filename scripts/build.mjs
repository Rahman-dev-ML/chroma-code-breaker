import {build} from 'esbuild';
import {mkdir,copyFile,rm} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const f of ['index.html','style.css','icon.svg'])await copyFile(`src/${f}`,`dist/${f}`);
await build({entryPoints:['src/app.js'],bundle:true,minify:true,target:['chrome90'],outfile:'dist/app.js',legalComments:'eof'});
console.log('Built offline game assets.');
