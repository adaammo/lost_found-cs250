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
**Actual result:** The automated backend test returned HTTP 201 for valid item data, confirming that one item report was successfully created with the authenticated user's owner ID.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

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
Longitude: -117.07720
Latitude: 32.76788

**Steps:**
1. Submit the item report using the test data.
2. Submit the exact same item report again.
3. Check the map or database for duplicate records.

**Expected result:** The system prevents the duplicate submission, displays an error or ignores the second request, and stores only one matching record.
**Actual result:** The system accepted a second Black Backpack report with the same item name and description within one minute. The second report appeared on the map and in the item list without showing a duplicate warning.
**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** Add the issue number after creating the issue.

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
**Actual result:** After logging out, the Create Item Report option was not available. The unauthenticated user could not open or submit an item report, and no item was created.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---

**Test ID:** AR-04
**From Part 6:** New
**Written by:** Amber Rama
**Title:** A student can submit a report and locate it on the map
**Traces to:** G-AR-01, REQ-AR-01
**Test type:** Acceptance
**Preconditions:** A student is logged in and viewing the campus map.
**Test data:**

Item name: Blue Water Bottle
Description: Blue Stanley water bottle with Mac Miller sticker.
Map location: Near SDSU campus center.
Latitude: 32.77602
Longitude: -117.07076

**Steps:**
1. Open the Create Item Report form.
2. Enter the item name and description.
3. Select the test location on the map.
4. Submit the report.
5. View the campus map after submission.

**Expected result:** The report is submitted successfully and a visible marker appears at the selected location so another student can locate the reported item.
**Actual result:** A missing Blue Water Bottle report was submitted successfully. After the page refreshed, a marker appeared at the selected location and the item appeared in Recent Items with its description.
**Status:** Pass
**Severity:** N/A
**V or V:** N/A
**GitHub Issue:** N/A

---
