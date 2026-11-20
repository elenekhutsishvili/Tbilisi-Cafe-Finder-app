-- =========================================================
-- TBILISI CAFE FINDER
-- DATABASE INTEGRITY TESTS
-- =========================================================
--
-- IMPORTANT:
-- Some tests in this file are EXPECTED TO FAIL.
-- Those errors demonstrate that PostgreSQL constraints
-- are working correctly.
--
-- Run tests individually.
-- Do NOT execute the entire file at once.
-- =========================================================


-- =========================================================
-- TEST SETUP
-- =========================================================
-- Create a temporary database test user if one does
-- not already exist.
--
-- The password below is NOT a real password hash.
-- Authentication is not being tested in this SQL file.
-- =========================================================

INSERT INTO users
    (full_name, email, password_hash, role_id)
SELECT
    'Database Test User',
    'dbtest@example.com',
    'TEST_HASH_NOT_REAL_PASSWORD',
    1
WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE email = 'dbtest@example.com'
);

-- Verify test user.

SELECT
    user_id,
    full_name,
    email,
    role_id,
    is_active,
    inactive_since,
    created_at
FROM users
WHERE email = 'dbtest@example.com';


-- =========================================================
-- DB-01
-- INVALID FOREIGN KEY: NONEXISTENT USER
-- =========================================================
--
-- Purpose:
-- Verify that a favorite cannot reference a user
-- that does not exist.
--
-- Expected:
-- ERROR - foreign key violation
-- SQLSTATE: 23503
--
-- Manual result:
-- PASS
-- =========================================================

-- INSERT INTO favorites (user_id, cafe_id)
-- VALUES (9999, 1);


-- =========================================================
-- DB-02
-- DUPLICATE FAVORITE
-- =========================================================
--
-- Purpose:
-- Verify that the same user cannot save the same
-- cafe more than once.
--
-- STEP 1 - valid favorite:
-- Expected: SUCCESS
-- =========================================================

-- INSERT INTO favorites (user_id, cafe_id)
-- SELECT user_id, 1
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- STEP 2 - repeat the same favorite:
--
-- Expected:
-- ERROR - duplicate primary key
-- SQLSTATE: 23505
--
-- Manual result:
-- PASS
-- =========================================================

-- INSERT INTO favorites (user_id, cafe_id)
-- SELECT user_id, 1
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- =========================================================
-- DB-03
-- DUPLICATE REVIEW
-- =========================================================
--
-- Purpose:
-- Verify that one user can have only one review
-- for the same cafe.
--
-- STEP 1 - valid review:
-- Expected: SUCCESS
-- =========================================================

-- INSERT INTO reviews
--     (user_id, cafe_id, rating, review_text)
-- SELECT
--     user_id,
--     1,
--     5,
--     'Excellent test cafe.'
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- STEP 2 - second review for same cafe:
--
-- Expected:
-- ERROR - unique constraint violation
-- SQLSTATE: 23505
--
-- Manual result:
-- PASS
-- =========================================================

-- INSERT INTO reviews
--     (user_id, cafe_id, rating, review_text)
-- SELECT
--     user_id,
--     1,
--     4,
--     'Second review should not be accepted.'
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- =========================================================
-- DB-04
-- DUPLICATE JUNCTION RELATIONSHIP
-- =========================================================
--
-- Purpose:
-- Verify that duplicate cafe-food-category
-- relationships cannot be created.
--
-- Cafe 1 / Category 1 already exists in seed.sql.
--
-- Expected:
-- ERROR - duplicate primary key
-- SQLSTATE: 23505
--
-- Manual result:
-- PASS
-- =========================================================

-- INSERT INTO cafe_food_categories
--     (cafe_id, category_id)
-- VALUES
--     (1, 1);


-- =========================================================
-- DB-05
-- NONEXISTENT AMENITY
-- =========================================================
--
-- Purpose:
-- Verify that a cafe cannot reference an amenity
-- that does not exist.
--
-- Expected:
-- ERROR - foreign key violation
-- SQLSTATE: 23503
--
-- Manual result:
-- PASS
-- =========================================================

-- INSERT INTO cafe_amenities
--     (cafe_id, amenity_id)
-- VALUES
--     (1, 9999);


-- =========================================================
-- DB-06
-- USER ACCOUNT DEACTIVATION
-- =========================================================
--
-- Purpose:
-- Verify that a user account can be logically
-- deactivated without deleting the user record.
--
-- Expected:
-- is_active = FALSE
-- inactive_since contains a timestamp.
-- User record remains stored.
-- =========================================================

-- UPDATE users
-- SET
--     is_active = FALSE,
--     inactive_since = CURRENT_TIMESTAMP
-- WHERE email = 'dbtest@example.com';


-- Verify deactivation.

-- SELECT
--     user_id,
--     email,
--     is_active,
--     inactive_since
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- =========================================================
-- DB-07
-- DEACTIVATED USER DATA PRESERVATION
-- =========================================================
--
-- Purpose:
-- Verify that deactivating an account does NOT delete
-- the user's related information.
--
-- Expected:
-- User remains stored.
-- Preferences remain stored.
-- Favorites remain stored.
-- Reviews remain stored.
-- =========================================================

-- SELECT
--     u.user_id,
--     u.email,
--     u.is_active,
--
--     (SELECT COUNT(*)
--      FROM favorites f
--      WHERE f.user_id = u.user_id)
--         AS favorite_count,
--
--     (SELECT COUNT(*)
--      FROM reviews r
--      WHERE r.user_id = u.user_id)
--         AS review_count,
--
--     (SELECT COUNT(*)
--      FROM user_preferences up
--      WHERE up.user_id = u.user_id)
--         AS preference_count,
--
--     (SELECT COUNT(*)
--      FROM preference_amenities pa
--      WHERE pa.user_id = u.user_id)
--         AS preference_amenity_count
--
-- FROM users u
-- WHERE u.email = 'dbtest@example.com';


-- =========================================================
-- DB-08
-- USER ACCOUNT REACTIVATION
-- =========================================================
--
-- Purpose:
-- Verify that a deactivated user can be restored
-- without creating a new account.
--
-- Expected:
-- is_active = TRUE
-- inactive_since = NULL
-- Same user_id remains.
-- Related data remains available.
-- =========================================================

-- UPDATE users
-- SET
--     is_active = TRUE,
--     inactive_since = NULL
-- WHERE email = 'dbtest@example.com';


-- Verify reactivation.

-- SELECT
--     user_id,
--     email,
--     is_active,
--     inactive_since
-- FROM users
-- WHERE email = 'dbtest@example.com';


-- =========================================================
-- DB-09
-- CAFE DEACTIVATION / REACTIVATION
-- =========================================================
--
-- Purpose:
-- Verify that deactivating a cafe does not delete
-- its reviews, favorites, amenities, or food categories.
--
-- Expected:
-- Cafe status changes while related records remain.
-- =========================================================


-- STEP 1
-- Inspect cafe before deactivation.

-- SELECT
--     cafe_id,
--     name,
--     is_active
-- FROM cafes
-- WHERE cafe_id = 1;


-- STEP 2
-- Count related records before deactivation.

-- SELECT
--     (SELECT COUNT(*)
--      FROM reviews
--      WHERE cafe_id = 1)
--         AS review_count,
--
--     (SELECT COUNT(*)
--      FROM favorites
--      WHERE cafe_id = 1)
--         AS favorite_count,
--
--     (SELECT COUNT(*)
--      FROM cafe_amenities
--      WHERE cafe_id = 1)
--         AS amenity_count,
--
--     (SELECT COUNT(*)
--      FROM cafe_food_categories
--      WHERE cafe_id = 1)
--         AS food_category_count;


-- STEP 3
-- Deactivate cafe.

-- UPDATE cafes
-- SET
--     is_active = FALSE,
--     updated_at = CURRENT_TIMESTAMP
-- WHERE cafe_id = 1;


-- STEP 4
-- Confirm cafe is inactive.

-- SELECT
--     cafe_id,
--     name,
--     is_active
-- FROM cafes
-- WHERE cafe_id = 1;


-- STEP 5
-- Confirm relationships remain.

-- SELECT
--     (SELECT COUNT(*)
--      FROM reviews
--      WHERE cafe_id = 1)
--         AS review_count,
--
--     (SELECT COUNT(*)
--      FROM favorites
--      WHERE cafe_id = 1)
--         AS favorite_count,
--
--     (SELECT COUNT(*)
--      FROM cafe_amenities
--      WHERE cafe_id = 1)
--         AS amenity_count,
--
--     (SELECT COUNT(*)
--      FROM cafe_food_categories
--      WHERE cafe_id = 1)
--         AS food_category_count;


-- STEP 6
-- Reactivate cafe.

-- UPDATE cafes
-- SET
--     is_active = TRUE,
--     updated_at = CURRENT_TIMESTAMP
-- WHERE cafe_id = 1;


-- STEP 7
-- Confirm cafe is active again.

-- SELECT
--     cafe_id,
--     name,
--     is_active
-- FROM cafes
-- WHERE cafe_id = 1;


-- =========================================================
-- OPTIONAL VERIFICATION QUERY
-- =========================================================
-- Display cafes with their amenities and food categories.
-- =========================================================

-- SELECT
--     c.cafe_id,
--     c.name AS cafe_name,
--     c.neighborhood,
--     c.price_level,
--     c.is_active,
--     STRING_AGG(DISTINCT a.name, ', ') AS amenities,
--     STRING_AGG(DISTINCT fc.name, ', ') AS food_categories
-- FROM cafes c
-- LEFT JOIN cafe_amenities ca
--     ON c.cafe_id = ca.cafe_id
-- LEFT JOIN amenities a
--     ON ca.amenity_id = a.amenity_id
-- LEFT JOIN cafe_food_categories cfc
--     ON c.cafe_id = cfc.cafe_id
-- LEFT JOIN food_categories fc
--     ON cfc.category_id = fc.category_id
-- GROUP BY
--     c.cafe_id,
--     c.name,
--     c.neighborhood,
--     c.price_level,
--     c.is_active
-- ORDER BY c.cafe_id;


-- =========================================================
-- TEST CLEANUP
-- =========================================================
--
-- OPTIONAL:
-- Run only when the temporary database test user is
-- no longer needed.
--
-- NOTE:
-- Cleanup permanently removes TEST DATA only.
-- It is NOT application account-deletion functionality.
-- =========================================================


-- DELETE FROM reviews
-- WHERE user_id = (
--     SELECT user_id
--     FROM users
--     WHERE email = 'dbtest@example.com'
-- );


-- DELETE FROM favorites
-- WHERE user_id = (
--     SELECT user_id
--     FROM users
--     WHERE email = 'dbtest@example.com'
-- );


-- DELETE FROM preference_amenities
-- WHERE user_id = (
--     SELECT user_id
--     FROM users
--     WHERE email = 'dbtest@example.com'
-- );


-- DELETE FROM user_preferences
-- WHERE user_id = (
--     SELECT user_id
--     FROM users
--     WHERE email = 'dbtest@example.com'
-- );


-- DELETE FROM users
-- WHERE email = 'dbtest@example.com';