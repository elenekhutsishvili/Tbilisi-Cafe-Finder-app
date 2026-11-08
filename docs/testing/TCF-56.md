# TCF-56 — Leaflet Map Foundation: Test Report

**Feature:** Integrate Leaflet and OpenStreetMap  
**Related issue:** TCF-56  
**Test type:** Manual functional testing, responsive testing, error handling, static analysis, and build verification  
**Environment:** Local development environment, React/Vite, React Leaflet, OpenStreetMap

## 1. Objective

Verify that the application successfully integrates Leaflet and OpenStreetMap, displays an interactive map centered on Tbilisi, supports responsive layouts, and handles café data-loading failures without affecting other application pages.

## 2. Test Cases

| ID | Test Case | Expected Result | Status |
|---|---|---|---|
| T01 | Navigate to `/map` | Map page loads successfully | Pass |
| T02 | Verify map center | Map initially centers on Tbilisi (41.7151, 44.8271) | Pass |
| T03 | Verify map tile rendering | OpenStreetMap tiles display correctly | Pass |
| T04 | Check map attribution | OpenStreetMap attribution is visible | Pass |
| T05 | Drag the map | Map can be moved interactively | Pass |
| T06 | Zoom in and out | Zoom controls work correctly | Pass |
| T07 | Test at 360px viewport width | Map fits the mobile screen without horizontal overflow | Pass |
| T08 | Test at 1280px viewport width | Map displays correctly on desktop | Pass |
| T09 | Simulate café data-loading failure | Fallback error message appears | Pass |
| T10 | Navigate to other pages during map failure | Other application pages remain accessible | Pass |
| T11 | Restore café data service | Map loads normally again | Pass |
| T12 | Run feature-specific ESLint | No lint errors in TCF-56 files | Not recorded |
| T13 | Run production build | Application builds successfully | Pass |

## 3. Test Procedures

### Map Initialization and Interaction

1. Start the frontend using `npm run dev`.
2. Navigate to `http://localhost:5173/map`.
3. Confirm that the map initially displays Tbilisi.
4. Verify that OpenStreetMap tiles load correctly.
5. Confirm that the attribution is visible.
6. Drag the map and test zoom controls.

### Responsive Layout

1. Open Chrome DevTools.
2. Enable device emulation using `Ctrl + Shift + M`.
3. Set the viewport width to 360px.
4. Verify that the map, heading, navigation, and attribution fit within the screen.
5. Repeat the test at 1280px.

### Error Handling

1. Temporarily modify `getCafesForMap()` to throw an error.
2. Refresh `/map`.
3. Verify that the application displays:

   "Map data could not be loaded. You can still browse cafés in the list."

4. Confirm that other application pages remain accessible.
5. Restore the original `getCafesForMap()` implementation.
6. Verify that the interactive map loads normally.

## 4. Static Analysis and Build Verification

**Feature-specific ESLint command:**

`npx eslint src/components/map/ src/pages/Map.jsx src/services/cafeService.js src/data/sampleCafes.js`

**Production build command:**

`npm run build`

During development, the full-project ESLint command reported 15 unused-import errors in unrelated page components.

These errors were associated with unused `Header` and `Footer` imports.

The feature-specific ESLint result should be recorded separately from the full-project result.

## 5. Results and Observations

The Leaflet map foundation was implemented and merged into `main`.

Manual testing confirmed that the map rendered correctly, supported interactive navigation, and adapted to mobile and desktop layouts.

The café data service provided a separate interface for loading map data, allowing the frontend to use temporary sample data before backend integration.

**Known issue identified later:** Unresolved Git merge conflict markers in `src/App.css` caused a production build failure during subsequent TCF-57 work. The CSS was corrected in a separate commit. This issue was related to stylesheet integration rather than Leaflet functionality.

## 6. Scope and Limitations

- TCF-56 implemented the basic interactive map foundation.
- Café markers were excluded and implemented separately under TCF-57.
- Café marker popups are outside the scope of TCF-56.
- The map uses OpenStreetMap's public tile server.
- Café data comes from temporary sample data through the service layer.
- Automated component tests were not implemented for this ticket.
- Real backend API integration will be tested separately.