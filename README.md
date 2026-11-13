# Adverse Campus (Hush) ⚡📱

> **A dark luxury, real-time social & living operating system for campus life.**  
> Built with React Native, Expo SDK 58, TypeScript, and modern glassmorphic UI architecture.

---

## 🎨 Visual Identity & Design System

Inspired by high-end dark luxury glassmorphism (**Adverse** design language):
* **OLED Obsidian Palette**: Pitch black deep void backgrounds (`#08080a`), elevated graphite card containers (`#14141c`), and frosted translucent overlays.
* **Frosted Glass Components**: Native blur filters (`expo-blur`), iridescent gradient borders, and glowing active auras.
* **Floating Glass Dock**: Floating pill bottom navigation with central glowing rainbow gem action button for instant camera drops.
* **Stories & Hero Cards**: Squircle story circles with pulsing neon online badges and full-bleed live broadcast cards with frosted author chips.

---

## 🚀 Key Features

### 1. 📍 Campus HeatMap & Radar
* **Live Zone Glow**: Visual satellite radar displaying campus hubs:
  * *Central Library (3rd floor study lock-in)*
  * *Main Food Court & Chai Adda*
  * *Tech Block Alpha (Labs)*
  * *Student Activity & Sports Complex*
  * *Grand Auditorium & Amphitheater*
  * *Hostel Quadrangle*
* **Dynamic Spawn Beacons**: Zones dynamically intensify their glow as students check in and spawn.
* **In-App Location Privacy Switch**:
  * **Live Broadcasting**: Presence lights up zones and shows active avatar.
  * **Ghost Mode**: Map remains browsable, but your location and presence are completely hidden from others.
* **Spawn Action**: Tap *"Spawn in this Zone"* to check in and increase zone density.

---

### 2. 📸 Get to Give (Instant Candid Drops)
* **Random Drop Window**: Unpredictable campus-wide notification alarm with a 3-minute live countdown timer.
* **Post-to-Unlock Gate**: You **cannot** see what other students posted until you upload your own snapshot! Prevents lurkers.
* **Dual-Camera Viewfinder Simulation**: Simultaneous front & back camera capture with picture-in-picture view.
* **Floating Emoji Reaction Bar**: React with `🔥`, `💀`, `☕`, `🚀` with live animated counters.

---

### 3. 👀 Spotted & 24-Hour Temporary Match Chat
* **Campus Spotted Feed**: Anonymous spotting posts (e.g., *"Spotted at Library 3rd floor wearing navy hoodie and Arch Linux sticker..."*).
* **"Is that me? 🙋‍♂️" Workflow**: Students can claim a spotted post if they believe they are the subject.
* **Private 24-Hour Temporary Chat**: Once the poster confirms the claim:
  * A dedicated temporary pair chat unlocks.
  * Live 24-hour self-destruct countdown timer.
  * Chat messages, media, and room history permanently delete once time expires.

---

### 4. 🌙 Hostel Mode (12:00 AM – 4:00 AM)
* **Midnight Curfew Atmosphere**: Dedicated night-owl lounge accessible during late-night hours (with a demo override switch to test anytime).
* **Automatic 8:00 AM Self-Destruction**: Every single confession, message, and media post in this lounge auto-wipes clean at 8:00 AM.
* **Segregated Lounges**:
  * 🟣 **Girls Hostel**: Passcode-protected room for verified residents (Demo passcode: `2025` or `hostel`).
  * 🔵 **Boys Hostel**: Late-night gaming lobbies, maggi alerts, and banter.
  * 🟢 **Common Lounge**: Campus-wide night conversations.

---

### 5. 🏛️ Batch & Branch Channels
* **Segmented Filter Navigation**: Filter by **Batch** (*Class of '24, '25, '26, '27, All*) and **Branch** (*CSE, ECE, Mech, Civil, Biotech, Design, All*).
* **Academic Sharing**: Post and download semester notes, previous year exam papers, formulas, and placement alerts.
* **Clean Categorization**: Tags for *#Notes*, *#Announcement*, *#ExamAlert*, and *#ChitChat*.

---

### 6. 🗳️ Random Pollings by Student Volunteers
* **Randomly Selected Volunteer Roster**: 3–4 student volunteers are chosen at random each day to run polling duty.
* **Lucky Draw Reroll Wheel**: Interactive random selection generator.
* **Live Dynamic Polls**: Vote on campus issues with real-time percentage recalculation and vote confirmation feedback.

---

### 7. 🔥 Streak Records & In-App Pomodoro Timer
* **In-App Pomodoro Study Timer**:
  * 25-minute Study / 5-minute Break cycles.
  * Animated circular progress countdown ring.
  * Ambient focus sound toggle: *Lofi Rain*, *Library Ambience*, *White Noise*, or *Mute*.
  * Completed sessions automatically log toward your *Library Resident* streak.
* **Campus Life Streaks**:
  * Bunk & Chai Streaks
  * Canteen Adda Streaks
  * Sports & Gym Streaks
* **Plugged Coding Matrix**:
  * Connected Codeforces handle & LeetCode solved counter.
  * 35-day interactive GitHub commit heatmap grid.
* **Trophies & Badges**:
  * ☕ *Chai Maestro (Tier 3)*
  * 👻 *Ghost Attendance (Tier 5)*
  * 💻 *Code Ninja Master (Tier 4)*
  * 📚 *Library Resident (Tier 2)*
  * 🌙 *Midnight Owl (Tier 3)*

---

### 8. 🤫 Private Tea & "Guess Who I Am" Game
* **Safe, Verified Anonymity**: Account is verified by college email (`student@campus.edu`) under the hood to ensure security and prevent abuse, but public display names are 100% anonymous.
* **Daily Regenerating Pseudonym**: Every 24 hours, users receive a fresh anonymous alias (e.g., `NeonPhantom #402`, `CyberFalcon #119`) so past posts can never be backtracked.
* **"Guess Who I Am" Challenge**:
  * Authors provide 3 progressive cryptic hints (*Hint 1: Location, Hint 2: Vehicle/Item, Hint 3: Quirk*).
  * Campus students guess in the comments.
  * The author has an exclusive **"Reveal My Identity"** button to dramatically unmask themselves whenever they choose.
* **Burn & Report Safety Tools**:
  * **"Burn this Tea"**: Counts up to 5 burns. Once reached, the post burns away into ash and disappears.
  * **Safety Report**: Instant report modal to dismiss offensive content.

---

### 9. ⚡ Club Directory & Event Coordination
* **Official Club Hubs**: Google Developer Group, The Midnight Jam Music Guild, Velocity Robotics Society, and more.
* **Verified Club Heads**: Official gold shield badges to verify announcements.
* **Anti-WhatsApp Spam**: Coordinated RSVPs with live attendee counters, calendar schedules, and official audition announcements.

---

## 📂 Project Architecture

```
code/
├── assets/                    # App icons, splash screens, and images
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── GlassTabBar.tsx    # Frosted floating dock navigation
│   │   ├── Header.tsx         # Inspo header with star gem & alerts
│   │   ├── InspoHeroCard.tsx  # Inspo squircle live broadcast cards
│   │   ├── NotificationModal  # Live alert center drawer
│   │   ├── ProfileModal.tsx   # Verified ID & daily alias manager
│   │   └── StoryCircle.tsx    # Stories row with live online rings
│   ├── context/
│   │   └── AppContext.tsx     # Centralized state store & dispatchers
│   ├── data/
│   │   └── mockData.ts        # Realistic campus data & initial feeds
│   ├── screens/
│   │   ├── CampusHomeScreen   # Feed, Batch/Branch, Clubs, Polls
│   │   ├── GetToGiveScreen    # Candid photo drop & unlock gate
│   │   ├── HeatMapScreen.tsx  # Campus satellite radar & zones
│   │   ├── StreaksAndHostel   # Pomodoro, streaks, 12-4 AM lounge
│   │   └── TeaAndSpottedScreen# Anonymous tea, Guess Who, 24h chat
│   ├── theme/
│   │   └── theme.ts           # Adverse obsidian & neon color tokens
│   └── types/
│       └── index.ts           # Complete TypeScript interface models
├── App.tsx                    # Root navigation & safe area provider
├── app.json                   # Expo application manifest
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🛠️ Tech Stack

* **Framework**: React Native 0.88 with React 19
* **Platform Tooling**: Expo SDK 58
* **Language**: TypeScript 6
* **Navigation**: `@react-navigation/bottom-tabs` (v7), `@react-navigation/native` (v7)
* **Glassmorphism & Graphics**: `expo-blur`, `expo-linear-gradient`, `react-native-svg`
* **Icons**: `lucide-react-native`
* **Layout & Safe Area**: `react-native-safe-area-context`, `react-native-screens`

---

## 💻 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or newer recommended)
* [Expo Go](https://expo.dev/go) on your iOS or Android device

### 1. Installation
Navigate to the `code` directory:
```bash
cd code
npm install
```

### 2. Run the Development Server
```bash
npx expo start
```
*(or `npm start`)*

### 3. Open the App
* **Physical Device (Expo Go)**:
  * **Android**: Scan the terminal QR code from within the Expo Go app.
  * **iOS**: Open the native Camera app, scan the QR code, and tap the Expo notification.
* **Android Emulator**: Press `a` in the terminal.
* **iOS Simulator** *(macOS)*: Press `i` in the terminal.
* **Web Browser**: Press `w` in the terminal.
* **Different Network / Hotspot**: Run `npx expo start --tunnel`.

### 4. Verify Code Quality
To run the TypeScript type checker:
```bash
npx tsc --noEmit
```

---

## 📄 License
This project is licensed under the MIT License.
