# Test Cases: Amber Rama

**Team number:** 04
**My area:** Item Reporting / Submission


---

**Test ID:** AR-01
**From Part 6:** TC-1
**Written by:** Amber Rama
**Title:** Valid item information creates one item report
**Traces to:** REQ-AR-01
**Test type:** Unit
**Preconditions:** The API and database test environment are running. A valid authenticated user is available.
**Test data:**

Item name: Black Backpack
Description: Black Jansport backpack with a blue keychain.
Longitude: -117.0719
Latitude: 32.7757

**Steps:**
1. Call the item-report creation function with the valid test data.
2. Submit the request as an authenticated user.
3. Check the response and saved item record.

**Expected result:** The request returns a successful result, one item record is created, and the record contains the submitted information and authenticated owner ID.
**Actual result:** Write exactly what happened when you ran it.
**Status:** Pass or Fail
**Severity:** N/A if Pass; Critical, Major, or Minor if Fail
**V or V:** N/A if Pass; Verification if Fail
**GitHub Issue:** N/A if Pass; issue number if Fail

---

**Test ID:** AR-02
**From Part 6:** New
**Written by:** Amber Rama
**Title:** Duplicate item reports are prevented
**Traces to:** REQ-AR-02
**Test type:** Integration
**Preconditions:** An authenticated user is logged in and the item-report form is available.
**Test data:**

Item name: Black Backpack
Description: Black Jansport backpack with a blue keychain.
Longitude: -117.0719
Latitude: 32.7757

**Steps:**
1. Submit the item report using the test data.
2. Submit the exact same item report again.
3. Check the map or database for duplicate records.

**Expected result:** The system prevents the duplicate submission, displays an error or ignores the second request, and stores only one matching record.
**Actual result:** Write what actually happened.
**Status:** Pass or Fail
**Severity:** N/A if Pass; Critical, Major, or Minor if Fail
**V or V:** N/A if Pass; Verification if Fail
**GitHub Issue:** N/A if Pass; issue number if Fail

---

**Test ID:** AR-03
**From Part 6:** New
**Written by:** Amber Rama
**Title:** Unauthenticated users cannot submit item reports
**Traces to:** REQ-AR-04, NFR-AR-01
**Test type:** Security
**Preconditions:** The API is running and no valid login session or authorization token is available.
**Test data:**

Item name: Blue Water Bottle
Description: Blue bottle with a sticker.
Longitude: -117.0719
Latitude: 32.7757
Authorization: None

**Steps:**
1. Send a POST request to the item-report endpoint without an Authorization header.
2. Check the response status.
3. Check that no item record was created.

**Expected result:** The API returns HTTP 401 Unauthorized and does not create an item record.
**Actual result:** Write what actually happened.
**Status:** Pass or Fail
**Severity:** N/A if Pass; Critical, Major, or Minor if Fail
**V or V:** N/A if Pass; Verification if Fail
**GitHub Issue:** N/A if Pass; issue number if Fail

---

**Test ID:** AR-04
**From Part 6:** New
**Written by:** Amber Rama
**Title:** A student can submit a report and locate it on the map
**Traces to:** G-AR-01, REQ-AR-01
**Test type:** Acceptance
**Preconditions:** A student is logged in and viewing the campus map.
**Test data:**

Item name: Black Backpack
Description: Black Jansport backpack with a blue keychain.
Map location: Near SDSU campus center.
Latitude: 32.7757
Longitude: -117.0719

**Steps:**
1. Open the Create Item Report form.
2. Enter the item name and description.
3. Select the test location on the map.
4. Submit the report.
5. View the campus map after submission.

**Expected result:** The report is submitted successfully and a visible marker appears at the selected location so another student can locate the reported item.
**Actual result:** Write what actually happened.
**Status:** Pass or Fail
**Severity:** N/A if Pass; Critical, Major, or Minor if Fail
**V or V:** N/A if Pass; Verification or Validation if Fail
**GitHub Issue:** N/A if Pass; issue number if Fail

---
