# Traceability Matrix

**Team number:** [04]
**Filled in by (captain):** [Trystan McCutcheon]

Fill this in **after** everyone's work is merged. One row per requirement.

## Requirements to Tests

| Requirement ID | From Part 5 | Owner | Test case IDs | Result | GitHub Issue # |
|---|---|---|---|---|---|
| REQ-MG-01 *(example)* | CR-3 | Maria | MG-01, MG-02 | 1 Pass, 1 Fail | #12 |
| REQ-JR-01 | CR-2 | Javier | JR-01 | 1 Pass, 0 Fail | None |
| REQ-JR-02 | CR-4 | Javier | JR-02 | 0 Pass, 1 Fail | #87 |
| REQ-JR-03 | CR-3 | Javier | JR-03 | 1 Pass, 0 Fail | #83 |
| REQ-JR-04 | CR-2 | Javier | JR-01 | 1 Pass, 0 Fail | None |
| REQ-AR-01 | CR-1 | Amber | AR-03 | 1 Pass, 0 Fail | None |
| REQ-AR-02 | CR-5 | Amber | AR-02 bug | 0 Pass, 1 Fail | None |
| REQ-AR-03 | New | Amber | AR-02 | 0 Pass, 1 Fail  | None |
| REQ-AR-04 | New | Amber |AR-01 | 1 Pass, 0 Fail | None |
| REQ-TM-03 | New | Trystan | TM-01 | 1 Pass, 0 Fail | None |
| REQ-TM-01 | New | Trystan | TM-01 | 0 Pass, 1 Fail | #78 |
| REQ-TM-04 | New | Trystan | TM-02 | 0 Pass, 1 Fail | #91 |
| REQ-TM-02 | New | Trystan | TM-01 | 0 Pass, 1 Fail | #90 |

## Gaps

None

-

## Test Type Coverage

Put a Test ID next to each type. Team minimum: all 7.

| Test type | Test ID |
|---|---|
| Unit | TM-02 | TM-04 | AR-01 |
| Integration | JR-04 | AR-02 |
| System (E2E) | TM-01 | JR-03 |
| Acceptance | TM-03 | JR-01 | AR-04 |
| Boundary Value | JR-02 |
| Negative | |
| Security | AR-03 |

## Validation Findings

A Validation finding means the system does what the requirement says, but the requirement does not serve the Stakeholder Goal. Remember the alphabetical leaderboard.

| Requirement ID | Goal it fails | Why | Issue # |
|---|---|---|---|
| AR-04 | G-JR-01 | While it is still viewable there is no limit to where the campus map can go leading to it fitting the requirement while still not matching stakeholder goals  | N/A |

**If you found none,** explain in 2 to 3 sentences why every requirement truly serves its Goal:

>

## Summary

| | Count |
|---|---|
| Part 5 requirements carried over | 3 |
| New requirements added | 9 |
| Part 6 tests upgraded (out of 3) | 3 |
| Total requirements | 12 |
| Total test cases | 12 |
| Passed | 6 |
| Failed | 6 |
| Issues opened | 7 |
| Critical issues | 0 |

**In one sentence, would you ship this system today? Why or why not?**
No, this system has issues that will grow with the user base growing meaning it's not ready for shipment.
>
