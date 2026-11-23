# Test Cases: trystan-m

**Team number:** [4]
**My area:** [from REQUIREMENTS.md]

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

**Test ID: TM-01**
**From Part 6:** (old test number)
**Written by:** Trystan McCutcheon
**Title:** Tracing ItemReport
**Traces to:** src/lib/type.ts
**Test type:** (System)
**Preconditions:** User is Logged in, User has info for lost item
**Test data:** Item name: Wallet, Item description: lots of cash, Latitude: 32.7, Longitude: -117

**Steps:**
1. Sign in using OAuth
2. Click at Latitude and Longitude from data
3. Type name and description from data and submit

**Expected result:** Pin Created
**Actual result:** Pin Created
**Status:** (Pass)
**Severity:** (Minor)
**V or V:** (Verification)
**GitHub Issue:** N/A Pass Only

---

**Test ID: TM-02**
**From Part 6:** (old test number)
**Written by:** Trystan McCutcheon
**Title:** Pins clutter
**Traces to:** CampusMap.tsx
**Test type:**  Unit
**Preconditions:** Pin is already created, new pin is same coordinates
**Test data:** Item name: Wallet, Item description: lots of cash, Latitude: 32.7, Longitude: -117; Item2 name: Bag, Item description: blue, Latitude: 32.7, Longitude: -117

**Steps:**
1. Have a pin already placed
2. Place a new pin on top of the pin
3. Submit the pin

**Expected result:** Layered pins so you can click to see which are grouped in the same area
**Actual result:** Pins clip over each other
**Status:** Fail
**Severity:** Major
**V or V:** Validation 
**GitHub Issue:** #78

---

**Test ID: TM-03**
**From Part 6:** (New)
**Written by:** Trystan McCutcheon
**Title:** No characters limits on Item report
**Traces to:** insertItemReport()
**Test type:** Unit
**Preconditions:** Have an item report
**Test data:** Item name: SuperLongNameNoEndToThisName, Item description: lots of cash and words and word and words, Latitude: 32.7, Longitude: -117

**Steps:**
1. Click to place a pin
2. Insert the Item name and description test data
3. Submit

**Expected result:** No typing past character limits
**Actual result:** Submitted
**Status:** Fail
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:** #90

---

**Test ID: TM-04**
**From Part 6:** (New)
**Written by:** Trystan McCutcheon
**Title:** Completed Pins Stay
**Traces to:** CampusMap.tsx
**Test type:** System
**Preconditions:** The pin's creator marks it found
**Test data:** Item name: Wallet, Item description: lots of cash, Latitude: 32.7, Longitude: -117

**Steps:**
1. Create a pin using the test data
2. Submit the data
3. Mark the pin as completed

**Expected result:** Pin disapears or filters out after a day
**Actual result:** Pin stays indefinetly
**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** #91

---
