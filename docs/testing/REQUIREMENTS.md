# Testable Requirements: Lost & Found

**Team number:** [04]
**Inherited from:** Team [03]

## Who Owns What

| Area of the system | Owner | ID prefix |
|---|---|---|
| [example: Accounts and login] | [name] | [initials, like MG] |
| Front End | Javier | JR |
| Item Reporting / Submission | Amber Rama | AR |
| | | |
| | | |

<!--
RULES
- Only edit YOUR OWN section below. This keeps merge conflicts away.
- Categories: G = Stakeholder Goal, REQ = Functional, NFR = Non-Functional.
- "From Part 5": write the original CR ID and its text from SYSTEM_MAP.md. Write "New" if you added it this sprint.
- Status: Confirmed or Suspected bug. No Unconfirmed allowed. Every Suspected bug needs a GitHub Issue.
- The test: could a stranger write a Pass or Fail test without asking you a question?
-->

---

## Section: Front-End (Javier Rivera)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-JR-01 | Student | View lost-item reports on the campus map so they can locate reported items. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-JR-01 | The system shall display submitted Lost-Item pointers on the campus map. | Confirmed | CR-2 |
| REQ-JR-02 | The system shall reject coordinates outside valid map boundaries. | Suspected bug | CR-4 |
| REQ-JR-03 | The system shall prevent report submission when required fields are empty. | Confirmed | CR-3 |
| REQ-JR-04 | The system shall indicate the location of each submitted item using a visible map marker. | Confirmed | CR-2 |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-JR-01 | The campus map shall display a newly submitted lost-item marker within 5 seconds of successful submission. | Confirmed | CR-2 |

### Example of a Good Rewrite

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-MG-01 | The system shall reject a profile bio longer than 280 characters with the error "Bio must be 280 characters or fewer." | Suspected bug | CR-3 (Unconfirmed): The system shall limit the bio to 280 characters. |
| NFR-MG-01 | The profile page loads in under 2 seconds with 100 profiles in the database. | Confirmed | New |

---

## Section: Item Reporting / Submission (Amber Rama)

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| G-AR-01 | SDSU student | Submit an accurate lost-item report so another student can locate and recover the item. |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| REQ-AR-01 | The system shall create exactly one lost-item record when an authenticated user submits a valid item name, description, latitude, and longitude. The record shall include the authenticated user as its owner. | Confirmed | CR-1 |
| REQ-AR-02 | The system shall prevent an authenticated user from submitting a second lost-item report with the same item name and description within one minute. | Suspected bug | CR-5 |
| REQ-AR-03 | The system shall ignore any client-supplied owner ID and assign ownership using the authenticated user's account. | Confirmed | New |
| REQ-AR-04 | The system shall return an error and create no record when an unauthenticated user attempts to submit an item report. | Confirmed | New |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| NFR-AR-01 | The item-report endpoint shall reject unauthenticated requests with HTTP 401 before creating or modifying an item record. | Confirmed | New |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |

---

## Section: [Your Area] ([Your Name])

### Stakeholder Goals

| ID | Stakeholder | Goal |
|---|---|---|
| | | |

### Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

### Non-Functional Requirements

| ID | Requirement | Status | From Part 5 |
|---|---|---|---|
| | | | |
