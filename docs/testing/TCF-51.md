# TCF-51 — Amenity Filtering

## 1. Test Objective

Verify that users can filter cafés by amenities through the Django REST API and React frontend, and that the filtered results are displayed correctly in both the café browsing page and the interactive Leaflet map.

The tests also verify that multiple amenity filters use AND logic, inactive cafés are excluded, unsupported values are handled appropriately, and clearing filters restores unfiltered results.

## 2. Test Environment

- Frontend: React, JavaScript, Vite
- Backend: Django and Django REST Framework
- Database: PostgreSQL
- Maps: React Leaflet, Leaflet, OpenStreetMap
- Test data: 20 fictional cafés, 5 amenities, 57 café–amenity relationships
- Test database: Local PostgreSQL development database (`tbilisi_cafe_finder`)

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
| TC-11 | Temporarily deactivate a café and request filtered results | Inactive café excluded; original status restored after rollback | Passed |

Expected counts are based on the seeded dataset with all cafés initially active.

## 5. Backend Verification

The Django API was manually verified using the local PostgreSQL database.

### 5.1 Combined Amenity Filtering

**Request:**

`GET /api/cafes/?amenities=wifi,pet_friendly`

**Expected result:** Six cafés providing both amenities.

**Actual result:** Six matching cafés were returned.

**Status:** Passed.

### 5.2 Unsupported Amenity

**Request:**

`GET /api/cafes/?amenities=swimming_pool`

**Expected result:** HTTP 400 with an error describing the unsupported amenity.

**Actual result:** The API returned the expected validation response.

**Status:** Passed.

### 5.3 Inactive Café Exclusion (TC-11)

**Objective:** Verify that cafés with `is_active = False` are excluded from filtered API results.

**Test procedure:**

1. Retrieve Vake Corner from the existing PostgreSQL database.
2. Record its original `is_active` value.
3. Temporarily set `is_active = False` inside a Django database transaction.
4. Send a GET request to `/api/cafes/?amenities=wifi,pet_friendly` using Django's test client.
5. Verify that Vake Corner is absent from the response and that the matching café count decreases from six to five.
6. Roll back the transaction.
7. Refresh the café record and verify that its original active status is restored.

**Actual output:**

```text
Original active status: True
Vake Corner included: False
Matching cafes: 5
Restored active status: True
```

**Result:** Passed.

The test confirmed that inactive cafés are excluded by the API and that the original database state was successfully restored.

The test was executed using Django's test client and a database transaction against the local development database. It did not require deleting records, running migrations, or permanently modifying café data.

## 6. Automated Tests

Two Django unit tests verify the supported amenity identifiers and configuration.

**Command:**

```bash
cd backend
python manage.py test cafes
```

**Result:** 2 tests passed.

These automated tests validate the amenity configuration only. They do not yet test the complete database-backed filtering behavior.

The inactive-café exclusion test (TC-11) was executed separately as a manual integration test using Django's test client and a transaction rollback.

## 7. Frontend Build and Lint

### Production Build

**Command:**

```bash
npm run build
```

**Result:** Passed.

### ESLint Checks

**Command:**

```bash
npx eslint src/services/cafeService.js src/components/AmenityFilter.jsx src/pages/Cafe.jsx src/pages/Map.jsx src/components/map/CafeMap.jsx
```

**Result:** Passed.

## 8. Limitations and Future Improvements

- Automated database-backed API tests should be added for AND filtering, inactive cafés, duplicate amenities, unsupported values, and empty results.
- Neighborhood, price-level, and rating filtering are being developed through separate Linear issues. Their integration with amenity filtering will be verified when those features are available.
- The map currently reloads while applying filters; a smoother loading experience could be implemented later.
- The current integration tests use local seeded data. Additional tests should be executed against a dedicated test database once the team's Django migration strategy is finalized.

## 9. Conclusion

Manual testing confirms that amenity filtering works on both the café browsing page and the interactive Leaflet map using PostgreSQL data retrieved through Django.

Multiple selections correctly apply AND logic, clearing filters restores the original results, and unsupported amenity values are handled appropriately.

The inactive-café integration test also passed. Vake Corner was excluded from filtered results while inactive, reducing the matching café count from six to five. The database transaction was then rolled back, successfully restoring the original active status.

The React production build and ESLint checks passed, and the existing map functionality was preserved.

Overall, the implemented amenity-filtering functionality meets the tested requirements of TCF-51. Additional automated integration testing and compatibility testing with other search filters remain future improvements.