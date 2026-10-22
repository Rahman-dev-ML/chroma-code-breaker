import fs from 'node:fs';import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('capacitor.config.json'));assert.equal(config.webDir,'dist');assert.ok(!config.server?.url,'Release must not load remote gameplay');assert.equal(config.android.allowMixedContent,false);
const vars=fs.readFileSync('android/variables.gradle','utf8');assert.match(vars,/targetSdkVersion = 36/);assert.match(vars,/minSdkVersion = 24/);
const manifest=fs.readFileSync('android/app/src/main/AndroidManifest.xml','utf8');assert.match(manifest,/allowBackup="false"/);assert.match(manifest,/usesCleartextTraffic="false"/);assert.match(manifest,/screenOrientation="portrait"/);
for(const f of ['index.html','app.js','style.css','icon.svg'])assert.equal(fs.readFileSync(`dist/${f}`).compare(fs.readFileSync(`android/app/src/main/assets/public/${f}`)),0,`Native ${f} is out of date: run npm run android:sync`);
for(const f of ['gradlew','gradlew.bat','gradle/wrapper/gradle-wrapper.jar'])assert.ok(fs.existsSync(`android/${f}`));
console.log('PASS: Android configuration, SDK target, bundled offline assets and Gradle wrapper.');
if(process.argv.includes('--store')){const policy=fs.readFileSync('release/privacy-policy.html','utf8');assert.ok(!policy.includes('[ADD YOUR'),'Fill publisher and email before publication.');console.log('Publisher placeholders cleared. Owner device/build and Play Console gates still require manual completion.');}
