\echo 'Delete and recreate mealPlan db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mealPlan;
CREATE DATABASE mealPlan;
\connect mealPlan

\i mealPlan-schema.sql
\i mealPlan-seed.sql

\echo 'Delete and recreate mealPlan_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE mealPlan_test;
CREATE DATABASE mealPlan_test;
\connect mealPlan_test..bb.
  
\i mealPlan-schema.sql
