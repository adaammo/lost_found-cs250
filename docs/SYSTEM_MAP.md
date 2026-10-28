# System Map

## Team Information

**Team Name:** pressPlay() - Group 4

**Inherited Project:** Lost & Found - Group 3

| Role | Name |
|--------|--------|
| Product Analyst | Amber |
| Architect | Javier |
| Frontend Tracer | Ray |
| Backend Tracer | Trystan |

---

# Part 1: Purpose

The lost and found website is meant for anyone who lost or found an item on the SDSU campus so 
that they can return the item to the rightful owner or find their lost item.

## User Action Traced

TRACING: “Submit/Close lost item” button

---

# Part 2: Architecture Diagram

![Architecture Diagram](architecture-diagram.png)

## Architecture Summary

User submits item information through the CampusMap interface. The request is processed through the FastAPI client and backend before being stored in Supabase. Data is then returned to the frontend and displayed on the map.

---

# Part 3: Trace the Click

| Step | Layer | File and Function | Data In / Data Out | Notes |
|--------|--------|--------|--------|--------|
| 1 | Frontend | CampusMap.tsx → insertItemReport() | Form data → POST request | None |
| 2 | API Route | fastapiClient.ts → insertItemReport() | Form data → FastAPI | More complicated API preparation than expected |
| 3 | Backend Logic | types.ts → ItemCreate | Item data object → FastAPI | None |
| 4 | Database | Supabase | FastAPI → Database | Need clarification on Supabase/FastAPI relationship |
| 5 | Response Back | CampusMap.tsx | Supabase → Frontend | None |

---

# Part 4: Reality Check and Open Questions

## Handoff Documentation Issues

- No mismatches were identified between the code and documentation.

## Questions for the Original Team

### Question 1 (Design)

Why was supabase used with fastapi?, A: Supabase handles only the user backend since it's 
faster. 

### Question 2 (Design)

Clarification on Front-end inputs and how they’re stored in the database? 

### Question 3 (Intent)

Where is the anchor placement and how do we edit? 

---

# Part 5: Candidate Requirements

| ID | Candidate Requirement | Type | Source | Status | Acceptance Criterion |
|------|------|------|------|------|------|
| CR- 1 | The system shall create a lost item report when a user submits valid item information. | Functional | Trace Steps 1-4 | Confirmed | Valid item information is stored successfully. |
| CR-2 | The system shall display submitted items on the campus map. | Functional | Trace Step 5 | Confirmed | Newly submitted item appears on the map. |
| CR-3 | The system shall reject reports with an empty item name. | Functional | ItemCreate data model | Unconfirmed | Empty item name returns an error. |
| CR-4 | The system shall reject coordinates outside valid map boundaries. | Functional | ItemCreate data model | Unconfirmed | Invalid coordinates return an error. |
| CR-5 | The system shall prevent duplicate item reports from being submitted. | Non-Functional | No duplicate validation observed | Suspected Bug | Duplicate submissions result in only one stored record. |

---

# Part 6: Unit Test Cases

| ID | Requirement | Kind | Unit Under Test | Input | Expected Output | Predicted Result Today |
|------|------|------|------|------|------|------|
| TC-1 | CR-1 | Positive | fastapiClient.ts → insertItemReport() | Valid pointer form item record | Successful report creation | Pass |
| TC-2 | CR-3 | Negative | fastapiClient.ts → insertItemReport() | Empty item name | Error response | Unknown |
| TC-3 | CR-4 | Boundary | fastapiClient.ts → insertItemReport() | longitude=99999, latitude=99999 | Error response | Likely Fail |

(Some of the behaviors of the test cases are anticipated from from demo experience, by project parent group)




AI use for GitHub Template format.