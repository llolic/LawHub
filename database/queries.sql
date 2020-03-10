-- LAM-10: Filter students
SELECT AppUser.uid, firstName, lastName FROM AppUser RIGHT JOIN Student ON AppUser.uid=Student.uid WHERE studyLevel={} OR school={} OR country={} OR stateOrProvince={} OR city={};

-- Notes: The query takes in a studyLevel, school, country, stateOrProvince, and city, and returns all students that satisfy that criteria (uid, firstName, lastName)