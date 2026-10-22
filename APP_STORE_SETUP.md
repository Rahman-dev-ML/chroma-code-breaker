# Chroma → Apple App Store (checklist)

## Already done in this folder
- Capacitor iOS project (`ios/`)
- `codemagic.yaml` workflow **Chroma iOS (App Store)**
- Bundle ID: `com.chroma.codebreaker` (same as Android)

## You do in Apple (same flow as PrepTra)

### 1) Register Bundle ID
[developer.apple.com → Identifiers](https://developer.apple.com/account/resources/identifiers/list)
- Explicit: `com.chroma.codebreaker`
- Description: `Chroma`
- Capabilities: none for now → Register

### 2) Create app in App Store Connect
- Platforms: iOS
- Name: `Chroma Code Breaker` (plain "Chroma" is taken on the App Store)
- Primary Language: English (U.S.)
- Bundle ID: `com.chroma.codebreaker`
- SKU: `chroma`
- Full Access → Create
- Copy **Apple ID** number from App Information

### 3) Put Apple ID into Codemagic yaml
Edit `codemagic.yaml`:
```yaml
APP_STORE_APPLE_ID: YOUR_NUMBER_HERE
```

### 4) Push to GitHub + Codemagic
This folder had no git remote. Options:
- Create repo e.g. `Rahman-dev-ML/chroma` and push this project
- Or add as a new Codemagic app from that repo

Codemagic:
- Integration name must be `codemagic` (reuse PrepTra API key)
- Code signing: certificate + **App Store** profile for `com.chroma.codebreaker`
- Start build → **Chroma iOS**

### 5) Store listing (after build uploads)
- Screenshots (iPhone Dynamic Island medium 1206×2622 + iPad 13" 2064×2752)
- Description / keywords
- Privacy URL, Age Rating, Category (Games), Price Free
- Content Rights, then Add for Review
