# Test Cases: javier-r

**Team number:** [04]
**My area:** Front-End

<!--
HOW TO USE THIS FILE
1. Copy this file. Name the copy with your first name and last initial, like  maria-g.md
2. Leave TEMPLATE.md untouched for your teammates.
3. If a Part 6 test belongs to your area, upgrade it first and put it in the first block.
   Write at least 4 test cases using at least 3 test types. Include 1 Acceptance test that traces to your Stakeholder Goal.
   Run every test on the inherited system. Every Fail gets a GitHub Issue.
4. Copy the block between the lines for each new test case.
5. Test IDs: use your initials plus a number, like  MG-01, MG-02. This keeps IDs unique across your team.
   "Traces to" must name one of YOUR requirement IDs, like REQ-MG-02.
6. See docs/TESTING_FIELD_GUIDE.md for the sample test case TC-00.
-->

---

**Test ID:** TC-JR-01
**From Part 6:** TC-2 (old test number, or New)
**Written by:** Javier Rivera
**Title:** Submitted lost-item reports appear on the campus map
**Traces to:** REQ-JR-01, REQ-JR-04, G-JR-01
**Test type:** Acceptance (Unit / Integration / System / Acceptance / Boundary Value / Negative / Security)
**Preconditions:** User is logged in and opened the Create Item Report form.
**Test data:**
Item Name: Backpack
Description: Red backpack
[Location data is selected by click an area on the map]
Latitude: 32.77591
Longitude: -117.07188

**Steps:**
1. Open the Create Item Report form.
2. Submit the test data with a selected location.
3. View the campus map.

**Expected result:** A visible map marker appears at the submitted location representing the lost item.
**Actual result:** PENDING 
**Status:** PENDING (Pass / Fail)
**Severity:** PENDING (Critical / Major / Minor, Fail only)
**V or V:** PENDING (Verification / Validation, Fail only)
**GitHub Issue:** PENDING (#number, Fail only)

---

**Test ID:** TC-JR-02
**From Part 6:** TC-3 (old test number, or New)
**Written by:** Javier Rivera
**Title:** Reject coordinates outside valid map boundaries
**Traces to:** REQ-JR-02
**Test type:** Boundary Value
**Preconditions:** User is logged in and opened the Create Item Report form.
**Test data:**
Item Name: Glass Bottle
Description: The bottle has a scroll inside of it.
[Location data is selected by click an area on the map]
Latitude: -28.85991
Longitude: 23.90625

**Steps:**
1. Open the Create Item Report form.
2. Enter the test data.
3. Click Submit Report.

**Expected result:** The system rejects the coordinates and prevents report submission.
**Actual result:** PENDING 
**Status:** PENDING (Pass / Fail)
**Severity:** PENDING (Critical / Major / Minor, Fail only)
**V or V:** PENDING (Verification / Validation, Fail only)
**GitHub Issue:** PENDING (#number, Fail only)

---

**Test ID:** TC-JR-03
**From Part 6:** TC-3 (old test number, or New)
**Written by:** Javier Rivera
**Title:** Submission is blocked when required fields are empty
**Traces to:** REQ-JR-03
**Test type:** System
**Preconditions:** User is logged in and opened the Create Item Report form.
**Test data:**
Item Name: [blank]
Description: [blank]
[Location data is selected by click an area on the map]
Latitude: 32.77591
Longitude: -117.07188

**Steps:**
1. Open the Create Item Report form.
2. Leave all required fields blank.
3. Click Submit Report.

**Expected result:** The system prevents the submission and displays validation feedback for what fields are required to be completed.
**Actual result:** PENDING 
**Status:** PENDING (Pass / Fail)
**Severity:** PENDING (Critical / Major / Minor, Fail only)
**V or V:** PENDING (Verification / Validation, Fail only)
**GitHub Issue:** PENDING (#number, Fail only)

---

**Test ID:** TC-JR-04
**From Part 6:** New (old test number, or New)
**Written by:** Javier Rivera
**Title:** Newly submitted marker appears within two seconds
**Traces to:** NFR-JR-01
**Test type:** Integration
**Preconditions:** User is logged in and opened the Create Item Report form.
**Test data:**
Item Name: Pokemon cards
Description: Collection book with Pokémon cards in it.
[Location data is selected by click an area on the map]
Latitude: 32.775
Longitude: -117.071

**Steps:**
1. Submit the report using the test data.
2. Start timing when Submit Report is clicked.
3. Observe the map for the new marker.

**Expected result:** The marker appears on the campus map within 5 seconds of successful submission.
**Actual result:** PENDING 
**Status:** PENDING (Pass / Fail)
**Severity:** PENDING (Critical / Major / Minor, Fail only)
**V or V:** PENDING (Verification / Validation, Fail only)
**GitHub Issue:** PENDING (#number, Fail only)

---
