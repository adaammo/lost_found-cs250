# Test Cases: [Trystan M]

**Team number:** [04]
**My area:** [Back End / User Experience]

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
**From Part 6:** (old test number, or New)
**Written by:** Trystan McCutcheon
**Title:** Pins Clutter
**Traces to:** REQ-TM-01
**Test type:** System (Unit / Integration / System / Acceptance / Boundary Value / Negative / Security)
**Preconditions:** Pin exists on map already
**Test data:** Item Name: Wallet, Item Description: Lots of cash, Longitude: 37, Latitude: -118

**Steps:**
1. Mark pin on existing pin
2. Fill in test data
3. Submit pin

**Expected result:** Grouped pins, layered pins
**Actual result:** Pins clip over each other
**Status:** (Fail)
**Severity:** (Major)
**V or V:** (Validation)
**GitHub Issue:** #78

---

**Test ID: TM-02**
**From Part 6:** (old test number, or New)
**Written by:** Trystan McCutcheon
**Title:** No character limits on Item Report
**Traces to:** REQ-TM-02
**Test type:** Unit
**Preconditions:** Pin name is longer than frame width
**Test data:** Item Name: SuperLongNameOfASuperLongNamedItem, Item Description: Lots of cash, Longitude: 37, Latitude: -118

**Steps:**
1. Place item pin
2. Fill in test data
3. Submit the pin

**Expected result:** Character limit exceeded
**Actual result:** Pin created
**Status:** Fail
**Severity:** Minor
**V or V:** Validation
**GitHub Issue:** #90

---

**Test ID: TM-03**
**From Part 6:** (old test number, or New)
**Written by:** Trystan McCutcheon
**Title:** Contact Information
**Traces to:** REQ-TM-03
**Test type:** Acceptance
**Preconditions:** User is signed in
**Test data:** Item Name: Wallet, Item Description: Lots of cash, Longitude: 37, Latitude: -118

**Steps:**
1. Sign in using OAuth
2. Place a pin using Test data
3. Have information show in pin

**Expected result:** Email is shown in pin of owner
**Actual result:** Email is shown
**Status:** Pass
**Severity:** Minor
**V or V:** Verification
**GitHub Issue:** Pass Only

---

**Test ID: TM-04**
**From Part 6:** (New)
**Written by:** Trystan McCutcheon
**Title:** Completed Pins Stay
**Traces to:** REQ-TM-04
**Test type:** Unit
**Preconditions:** Pin owner marks the pin as found
**Test data:** Item Name: Wallet, Item Description: Lots of cash, Longitude: 37, Latitude: -118

**Steps:**
1. Create a pin
2. Input test data
3. Resolve the pin

**Expected result:** Pin is resolved and disapears
**Actual result:** Pin stays indefinetly
**Status:** Fail
**Severity:** Major
**V or V:** Verification
**GitHub Issue:** #91

---
