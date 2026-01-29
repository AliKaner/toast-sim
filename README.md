# 🍞 Toast Notification Builder

A premium, highly customizable toast notification configuration tool built with **Vue 3**, **TypeScript**, and **Pinia**. Design, preview, and export perfect notification styles for your application with real-time feedback.

![Open Graph Banner](./docs/og-image.png)

## 🚀 Live Demo & Visuals

> [!TIP]
> **Live Demo:** [Check it out here!](https://your-demo-url.vercel.app)

### � Walkthrough Video
![Project Walkthrough](./docs/walkthrough.mp4)

### �📱 Preview
| Desktop View | Mobile View |
| :---: | :---: |
| ![Desktop Preview](./docs/desktop-preview.png) | ![Mobile Preview](./docs/mobile-preview.png) |

### 📊 Performance & SEO
| Google Lighthouse | Accessibility |
| :---: | :---: |
| ![Lighthouse Score](./docs/lighthouse.png) | ![A11y Score](./docs/a11y.png) |

---

## ✨ Features

### 🛠 Core Configuration
- **Notification Types:** Success, Error, Warning, Info (with smart defaults).
- **Content:** Dynamic Title and Message input with real-time validation.
- **Timing:** 1-10s duration slider or **Persistent** mode.
- **Positioning:** 6-way selector (Top/Bottom x Left/Center/Right).
- **Style Customization:** 
  - RGB Color pickers for background and text.
  - Toggleable icons and close buttons.

### 🌟 Bonus Features (Included)
- **Animation Styles:** Choose between `Fade`, `Slide`, and `Bounce`.
- **Progress Bar:** Visual countdown for auto-dismiss notifications.
- **Custom Icons:** Upload and use your own SVG/Emoji icons.
- **Code Export:** One-click copy to clipboard with **Syntax Highlighting** (Highlight.js).
- **Guided Tour:** Integrated onboarding experience using **Driver.js**.
- **Theming:** Full **Dark Mode** / **Light Mode** support with smooth transitions.
- **Localization:** Multi-language support (English/Turkish) using **Vue-I18n**.

### 💾 Preset Management
- **Persistence:** Save your favorite configurations to `localStorage`.
- **Organization:** Filter presets by type and sort by creation date.
- **Management:** Load, delete, and list all your saved designs instantly.

---

## 🛠 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **State Management:** [Pinia](https://pinia.vuejs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [SCSS](https://sass-lang.com/) (Vanilla CSS approach with variables)
- **Validation:** [Zod](https://zod.dev/)
- **Testing:** [Jest](https://jestjs.io/) + [Vue Test Utils](https://test-utils.vuejs.org/)
- **Documentation/UI Dev:** [Storybook](https://storybook.js.org/)
- **Utilities:** `nanoid`, `dompurify`, `highlight.js`, `driver.js`, `vue-i18n`.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/      # Header, Footer, Hero sections
│   └── ui/          # Atomic components (Button, Input, Switch, etc.)
├── composables/     # Shared logic (useTheme, useToastStore, useTouchTarget)
├── constants/       # App-wide constants (Default colors, timings)
├── helpers/         # Logic helpers (localStorage, color utils)
├── i18n/            # Localization config and translation files
├── pages/           # Main route components
├── router/          # Vue Router configuration
├── types/           # TypeScript interfaces and types
└── utils/           # Utility functions (validators, formatters)
tests/
└── unit/            # Comprehensive unit tests for components and stores
```

---

## 🏗 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/toast-builder.git
   cd toast-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm run test
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **View Component Library (Storybook):**
   ```bash
   npm run storybook
   ```

---

## 🧠 Development Journey: Challenges & Solutions

### 1. Real-time Preview vs Stacking Logic
- **Challenge:** The requirements asked for both a "Live Preview" (static update) and a "Triggered Behavior" (dynamic list).
- **Solution:** I implemented a dual-notification system. The `ToastPreviewCard` displays a single reactivity-tracked notification that doesn't expire, while the "Show Notification" button triggers a "real" notification in the `ToastList` managed by Pinia with unique IDs and auto-dismiss logic.

### 2. Multi-Directional Stacking Transitions
- **Challenge:** Toasts need to stack vertically but slide in differently depending on the quadrant (e.g., slide from left for `top-left`, slide from right for `top-right`).
- **Solution:** Created dynamic SCSS classes for `<transition-group>` names. Based on the `position` prop, the app applies specific transform origins and entry paths, ensuring a polished "premium" feel across all positions.

### 3. State Persistence and Sanitization
- **Challenge:** Presets needed to be stored in `localStorage`, but manual edits to storage could break the app.
- **Solution:** Used **Zod** schemas to validate the data coming out of `localStorage`. If the data is corrupted or outdated, the app gracefully falls back to default values.

### 4. Accessibility (A11y)
- **Challenge:** Color pickers and custom styles can lead to low-contrast notifications.
- **Solution:** Integrated a contrast-checking logic that subtly warns the user or adjusts the text color if the background/text pair doesn't meet AA standards.

---

## 🔮 Future Roadmap

- [ ] **Drag & Drop Reordering:** Allow users to manually reorder toast priority.
- [ ] **Multi-Color Gradients:** Add support for gradient backgrounds.
- [ ] **Icon Library Integration:** Built-in picker for Lucide or FontAwesome icons.
- [ ] **Web Component Export:** Export the toast logic as a standalone `.js` file to use in any framework.
- [ ] **Sound Effects:** Add optional subtle audio cues for different notification types.

---

## 📄 License

MIT License - feel free to build something awesome!
