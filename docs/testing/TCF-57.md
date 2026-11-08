# TCF-57 — Café Map Markers: Test Report

**Feature:** Display café map markers  
**Related issue:** TCF-57  
**Test type:** Manual functional testing, responsive testing, static analysis, and build verification  
**Environment:** Local development environment, React/Vite, React Leaflet, OpenStreetMap

## 1. Objective

Verify that café markers are displayed correctly on the interactive Leaflet map using sample café data, and that invalid coordinates, loading failures, and responsive layouts are handled without breaking existing functionality.

## 2. Test Cases

| ID | Test case | Expected result | Status |
|---|---|---|---|
| T01 | Load `/map` with sample data | All five café markers appear in their expected locations | Pass |
| T02 | Check marker icons | Blue Leaflet markers display without broken images | Pass |
| T03 | Drag and zoom the map | Map and markers respond correctly | Pass |
| T04 | Set one café's latitude to `null` | Invalid café is skipped; four valid markers remain | Pass |
| T05 | Test at 360px viewport width | Map remains interactive without horizontal overflow | Pass |
| T06 | Test at 1280px viewport width | Map and markers display correctly | Pass |
| T07 | Simulate delayed data loading | Loading message appears, followed by the map | Pass |
| T08 | Simulate data-loading failure | Fallback error message appears | Pass |
| T09 | Restore the café service | All five markers reappear | Pass |
| T10 | Run feature-specific ESLint | No errors reported | Pass |
| T11 | Run production build | Vite build succeeds | Pass |

## 3. Test Procedure

### Marker Rendering

1. Start the development server using `npm run dev`.
2. Open `http://localhost:5173/map`.
3. Verify that markers appear at the coordinates supplied by `getCafesForMap()`.
4. Confirm marker icons display correctly.
5. Test zooming and dragging.

### Invalid Coordinate Handling

1. Temporarily change one café's latitude to `null` in `sampleCafes.js`.
2. Refresh the map.
3. Verify that the invalid café is skipped.
4. Restore the original coordinate.

### Loading and Error Handling

1. Temporarily delay the response from `getCafesForMap()`.
2. Verify that "Loading map..." appears before the map.
3. Temporarily make the service throw an error.
4. Verify that the fallback message is displayed.
5. Restore the original service implementation.

### Responsive Testing

Use Chrome DevTools to test the map at 360px and 1280px widths. Verify that markers remain visible, controls are usable, and there is no unintended horizontal overflow.

## 4. Static Analysis and Build

**Feature-specific lint command:**

`npx eslint src/components/map/ src/pages/Map.jsx`

**Production build command:**

`npm run build`

Record the command outputs or screenshots as evidence.

## 5. Test Results

All listed scenarios are expected to pass before TCF-57 is merged. Any failed tests should be updated in the table with the observed behavior and associated issue.

## 6. Scope and Limitations

- Tests use temporary sample café data rather than the production database.
- Café marker popups are not included in TCF-57.
- Backend API integration will be tested separately.
- Testing OpenStreetMap tile-server outages is outside the scope of this ticket.