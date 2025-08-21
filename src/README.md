Project src structure (best-practices oriented)

This directory contains the application source code organized for scalability and clarity.

Recommended layout:

- App.tsx           Root app component, providers, and app-wide setup
- navigation/    React Navigation stacks, tabs, and navigators
- screens/       Screen components (one folder per screen)
- components/    Reusable UI components (presentational)
- hooks/         Reusable React hooks
- services/      API clients, network, storage, platform services
- store/         State management (Redux/Zustand/MobX), slices, selectors
- theme/         Colors, typography, spacing, theming utilities
- utils/         Utility functions and helpers
- types/         Global TypeScript types and interfaces
- config/        Environment/configuration helpers
- assets/        Static assets (images, fonts), or keep at project-level if preferred

Notes:
- Keep screen-level components under screens/, and split subcomponents into components/ when reusable.
- Avoid deep relative imports when possible; consider path aliases (tsconfig paths) when the project grows.
- Co-locate tests with implementation files or under __tests__ based on your preference/CI setup.
