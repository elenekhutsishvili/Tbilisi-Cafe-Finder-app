-- =========================================================
-- TBILISI CAFE FINDER
-- SEED DATA
-- =========================================================
-- This file populates the database with initial roles,
-- amenities, food categories, fictional cafes,
-- and their relationships.
--
-- Run schema.sql before running this file.
-- =========================================================


-- =========================================================
-- 1. ROLES
-- =========================================================

INSERT INTO roles (role_id, role_name)
VALUES
    (1, 'Regular User'),
    (2, 'Administrator'),
    (3, 'Moderator');


-- =========================================================
-- 2. AMENITIES
-- =========================================================

INSERT INTO amenities (name)
VALUES
    ('Wi-Fi'),
    ('Quiet Atmosphere'),
    ('Laptop Friendly'),
    ('Outdoor Seating'),
    ('Pet Friendly');


-- =========================================================
-- 3. FOOD CATEGORIES
-- =========================================================

INSERT INTO food_categories (name)
VALUES
    ('Georgian'),
    ('Asian'),
    ('Mexican'),
    ('Italian');


-- =========================================================
-- 4. FICTIONAL CAFES
-- =========================================================

INSERT INTO cafes
(
    name,
    description,
    neighborhood,
    address,
    latitude,
    longitude,
    price_level,
    opening_hours
)
VALUES

(
    'Rustaveli Brew',
    'Modern city cafe suitable for coffee, studying, and casual meetings.',
    'Rustaveli',
    '12 Rustaveli Avenue, Tbilisi',
    41.700600,
    44.795900,
    2,
    '08:00-22:00'
),

(
    'Vake Corner',
    'Relaxed neighborhood cafe with comfortable seating and a calm atmosphere.',
    'Vake',
    '34 Chavchavadze Avenue, Tbilisi',
    41.710500,
    44.764900,
    2,
    '08:00-22:00'
),

(
    'Old Town Coffee House',
    'Cozy cafe inspired by the atmosphere of historic Tbilisi.',
    'Old Tbilisi',
    '15 Kote Abkhazi Street, Tbilisi',
    41.691600,
    44.806100,
    2,
    '09:00-23:00'
),

(
    'Saburtalo Beans',
    'Casual cafe designed for students, remote workers, and coffee lovers.',
    'Saburtalo',
    '28 Pekini Avenue, Tbilisi',
    41.724800,
    44.770900,
    1,
    '08:00-21:00'
),

(
    'Vera Coffee Lab',
    'Contemporary coffee shop with a quiet and minimalist interior.',
    'Vera',
    '21 Barnovi Street, Tbilisi',
    41.706100,
    44.786700,
    2,
    '08:30-22:00'
),

(
    'Freedom Cup',
    'Central cafe offering coffee, snacks, and a lively city atmosphere.',
    'Sololaki',
    '8 Leonidze Street, Tbilisi',
    41.692900,
    44.799800,
    2,
    '09:00-23:00'
),

(
    'Mziuri Cafe',
    'Bright cafe near green spaces with indoor and outdoor seating.',
    'Vake',
    '18 Chavchavadze Avenue, Tbilisi',
    41.708900,
    44.773300,
    2,
    '09:00-21:00'
),

(
    'Tbilisi Roasters',
    'Specialty-style fictional coffee shop focused on freshly prepared coffee.',
    'Marjanishvili',
    '42 Aghmashenebeli Avenue, Tbilisi',
    41.709100,
    44.797800,
    2,
    '08:00-22:00'
),

(
    'Garden Beans',
    'Peaceful cafe with a garden-inspired environment.',
    'Vake',
    '7 Paliashvili Street, Tbilisi',
    41.711700,
    44.775800,
    3,
    '09:00-22:00'
),

(
    'Metro Mug',
    'Affordable cafe convenient for students and commuters.',
    'Saburtalo',
    '16 Vazha-Pshavela Avenue, Tbilisi',
    41.727500,
    44.766300,
    1,
    '07:30-21:00'
),

(
    'Avlabari Coffee Point',
    'Friendly local cafe with a casual atmosphere and city views nearby.',
    'Avlabari',
    '11 Ketevan Tsamebuli Avenue, Tbilisi',
    41.691900,
    44.815500,
    1,
    '08:30-21:30'
),

(
    'Vera Garden Cafe',
    'Comfortable neighborhood cafe with outdoor seating.',
    'Vera',
    '9 Petriashvili Street, Tbilisi',
    41.707600,
    44.784100,
    2,
    '09:00-22:30'
),

(
    'Liberty Beans',
    'Busy central cafe suitable for quick coffee stops and informal meetings.',
    'City Center',
    '5 Pushkin Street, Tbilisi',
    41.694000,
    44.802000,
    2,
    '08:00-23:00'
),

(
    'Dighomi Brew House',
    'Spacious cafe with a relaxed suburban atmosphere.',
    'Dighomi',
    '24 Ljubljana Street, Tbilisi',
    41.769000,
    44.771000,
    2,
    '09:00-22:00'
),

(
    'University Coffee Spot',
    'Budget-friendly cafe designed for students and laptop users.',
    'Saburtalo',
    '10 University Street, Tbilisi',
    41.718900,
    44.718900,
    1,
    '08:00-20:00'
),

(
    'Sololaki Hideaway',
    'Small quiet cafe located among the historic streets of Sololaki.',
    'Sololaki',
    '17 Lado Asatiani Street, Tbilisi',
    41.689900,
    44.799500,
    2,
    '10:00-22:00'
),

(
    'Riverside Cup',
    'Modern cafe with a relaxed atmosphere near the Mtkvari river.',
    'Chughureti',
    '63 Aghmashenebeli Avenue, Tbilisi',
    41.713000,
    44.799000,
    2,
    '08:30-22:30'
),

(
    'Green Door Cafe',
    'Pet-friendly neighborhood cafe with a casual garden-style setting.',
    'Vake',
    '29 Abashidze Street, Tbilisi',
    41.711000,
    44.769800,
    2,
    '09:00-22:00'
),

(
    'Morning Owl',
    'Early-opening cafe aimed at commuters, students, and remote workers.',
    'Marjanishvili',
    '18 Marjanishvili Street, Tbilisi',
    41.710600,
    44.795300,
    1,
    '07:00-21:00'
),

(
    'Mtatsminda View Cafe',
    'Premium cafe with a relaxed atmosphere inspired by views over Tbilisi.',
    'Mtatsminda',
    '20 Chonkadze Street, Tbilisi',
    41.695000,
    44.788000,
    3,
    '09:00-23:00'
);


-- =========================================================
-- 5. CAFE AMENITIES
-- =========================================================
--
-- Amenity IDs:
-- 1 = Wi-Fi
-- 2 = Quiet Atmosphere
-- 3 = Laptop Friendly
-- 4 = Outdoor Seating
-- 5 = Pet Friendly
-- =========================================================

INSERT INTO cafe_amenities (cafe_id, amenity_id)
VALUES

-- Rustaveli Brew
(1, 1), (1, 2), (1, 3),

-- Vake Corner
(2, 1), (2, 2), (2, 4), (2, 5),

-- Old Town Coffee House
(3, 1), (3, 4),

-- Saburtalo Beans
(4, 1), (4, 3),

-- Vera Coffee Lab
(5, 1), (5, 2), (5, 3),

-- Freedom Cup
(6, 1), (6, 4),

-- Mziuri Cafe
(7, 1), (7, 4), (7, 5),

-- Tbilisi Roasters
(8, 1), (8, 2), (8, 3),

-- Garden Beans
(9, 1), (9, 2), (9, 4), (9, 5),

-- Metro Mug
(10, 1), (10, 3),

-- Avlabari Coffee Point
(11, 1), (11, 4),

-- Vera Garden Cafe
(12, 1), (12, 2), (12, 4), (12, 5),

-- Liberty Beans
(13, 1), (13, 3),

-- Dighomi Brew House
(14, 1), (14, 3), (14, 4), (14, 5),

-- University Coffee Spot
(15, 1), (15, 2), (15, 3),

-- Sololaki Hideaway
(16, 1), (16, 2),

-- Riverside Cup
(17, 1), (17, 3), (17, 4),

-- Green Door Cafe
(18, 1), (18, 2), (18, 4), (18, 5),

-- Morning Owl
(19, 1), (19, 3),

-- Mtatsminda View Cafe
(20, 1), (20, 2), (20, 4);


-- =========================================================
-- 6. CAFE FOOD CATEGORIES
-- =========================================================
--
-- Category IDs:
-- 1 = Georgian
-- 2 = Asian
-- 3 = Mexican
-- 4 = Italian
-- =========================================================

INSERT INTO cafe_food_categories (cafe_id, category_id)
VALUES

-- Rustaveli Brew
(1, 1), (1, 4),

-- Vake Corner
(2, 1), (2, 4),

-- Old Town Coffee House
(3, 1),

-- Saburtalo Beans
(4, 2), (4, 4),

-- Vera Coffee Lab
(5, 4),

-- Freedom Cup
(6, 1), (6, 4),

-- Mziuri Cafe
(7, 1),

-- Tbilisi Roasters
(8, 1), (8, 4),

-- Garden Beans
(9, 2), (9, 4),

-- Metro Mug
(10, 2),

-- Avlabari Coffee Point
(11, 1),

-- Vera Garden Cafe
(12, 1), (12, 4),

-- Liberty Beans
(13, 2), (13, 4),

-- Dighomi Brew House
(14, 1),

-- University Coffee Spot
(15, 2), (15, 3),

-- Sololaki Hideaway
(16, 1),

-- Riverside Cup
(17, 1), (17, 4),

-- Green Door Cafe
(18, 2), (18, 4),

-- Morning Owl
(19, 3), (19, 4),

-- Mtatsminda View Cafe
(20, 1), (20, 4);