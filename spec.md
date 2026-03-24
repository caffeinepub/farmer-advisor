# Farmer Advisor

## Current State
Full-stack Farmer Advisor app with Dashboard, AI Advisor chat, Crop Library, Pest & Disease Alerts, Seasonal Calendar, and Farm Log. Camera component is available via `useCamera` hook.

## Requested Changes (Diff)

### Add
- New page: Soil Snap Analyzer (`/soil-snap`)
  - Opens device camera (rear-facing by default)
  - User taps "Capture" to take a photo of their soil
  - App analyzes image color/tone using canvas pixel data to derive simulated NPK (Nitrogen, Phosphorus, Potassium in mg/kg) and Moisture (%) readings
  - Displays results as gauge/progress bars with interpretation labels (Low/Medium/High)
  - Shows fertilizer and irrigation recommendations based on the readings
  - Option to save result to Farm Log
  - Option to retake photo
- Navigation link to Soil Snap page in Header

### Modify
- `App.tsx`: Add route `/soil-snap` → `SoilSnap` page
- `Header.tsx`: Add "Soil Snap" nav item

### Remove
- N/A

## Implementation Plan
1. Create `src/frontend/src/pages/SoilSnap.tsx` with camera integration, pixel-based analysis, result display, and save-to-log action
2. Add route in `App.tsx`
3. Add nav link in `Header.tsx`
