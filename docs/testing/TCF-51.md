# TCF-XXX — Amenity Filtering

## 1. Test Objective

Verify that users can filter cafés by amenities through the Django REST API and React frontend, and that the filtered results are displayed correctly in both the café browsing page and the interactive Leaflet map.

## 2. Test Environment

- Frontend: React, JavaScript, Vite
- Backend: Django and Django REST Framework
- Database: PostgreSQL
- Maps: React Leaflet, Leaflet, OpenStreetMap
- Test data: 20 fictional cafés, 5 amenities, 57 café–amenity relationships

## 3. Implementation Summary

- Implemented amenity filtering using the existing PostgreSQL tables.
- Added the Django endpoint `GET /api/cafes/`.
- Supported five amenities: Wi-Fi, Quiet Atmosphere, Laptop Friendly, Outdoor Seating, and Pet Friendly.
- Implemented AND filtering for multiple selections.
- Excluded inactive cafés from public results.
- Added validation for unsupported amenity identifiers.
- Connected the React café browsing page to the Django API.
- Created a reusable amenity filter component.
- Integrated amenity filtering with the Leaflet map.
- Preserved the existing map markers and functionality.

## 4. Manual Test Cases

| ID | Test Scenario | Expected Result | Status |
|---|---|---|---|
| TC-01 | Browse cafés without filters | 20 cafés displayed | Passed |
| TC-02 | Select Wi-Fi | 20 matching cafés | Passed |
| TC-03 | Select Wi-Fi and Pet Friendly | 6 matching cafés | Passed |
| TC-04 | Select Wi-Fi, Quiet, and Laptop Friendly | 4 matching cafés | Passed |
| TC-05 | Clear selected filters | All 20 cafés displayed again | Passed |
| TC-06 | Open map without filters | All 20 café markers displayed | Passed |
| TC-07 | Select Wi-Fi and Pet Friendly on map | 6 matching markers displayed | Passed |
| TC-08 | Select Quiet and Laptop Friendly on map | 4 matching markers displayed | Passed |
| TC-09 | Select all five amenities on map | No matching markers | Passed |
| TC-10 | Clear map filters | All 20 markers displayed again | Passed |

Expected counts are based on the seed data with all cafés active.

## 5. Backend Verification

The Django API was manually verified using the local PostgreSQL database.

### Combined amenity filtering

Request:

`GET /api/cafes/?amenities=wifi,pet_friendly`

Expected result: Six cafés providing both amenities.

**Status:** Passed.

### Unsupported amenity

Request:

`GET /api/cafes/?amenities=swimming_pool`

Expected result: HTTP 400 with an error describing the unsupported amenity.

**Status:** Passed.

## 6. Automated Tests

Two Django tests verify the supported amenity identifiers and configuration.

Command:

```bash
cd backend
python manage.py test cafes
```

**Result:** 2 tests passed.

Note: These tests validate amenity configuration only. Automated database-backed API tests have not yet been added.

## 7. Frontend Build and Lint

Production build:

```bash
npm run build
```

**Result:** Passed.

ESLint checks:

```bash
npx eslint src/services/cafeService.js src/components/AmenityFilter.jsx src/pages/Cafe.jsx src/pages/Map.jsx src/components/map/CafeMap.jsx
```

**Result:** Passed.

## 8. Limitations and Future Improvements

- Automated database-backed API tests are still needed for AND filtering, inactive cafés, duplicate amenities, and empty results.
- Additional filters, including neighborhood, price level, and rating, will need integration when implemented.
- The map currently reloads while filtering; a smoother loading experience could be implemented later.

## 9. Conclusion

Manual testing confirms that amenity filtering works on both the café browsing page and the interactive map using PostgreSQL data retrieved through Django.

The frontend build and lint checks passed, and the existing map functionality was preserved.