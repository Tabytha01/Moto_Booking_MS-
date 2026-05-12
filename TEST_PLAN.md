# SOFTWARE TEST PLAN
## MotoBook - Motorcycle Booking Management System

**Version:** 1.0  
**Date:** May 2026  
**Prepared by:** [Your Name]  
**Project:** MotoBook Motorcycle Transport System

---

## 1. INTRODUCTION

### 1.1 Purpose
This document describes the testing strategy, objectives, resources, and schedule for the MotoBook Motorcycle Booking Management System. It ensures the system meets all functional and non-functional requirements before deployment.

### 1.2 Scope
This test plan covers:
- Unit testing of individual components and functions
- Integration testing of API routes and database operations
- System testing of complete user workflows
- User acceptance testing (UAT)

### 1.3 Test Objectives
- Verify all functional requirements are implemented correctly
- Ensure data integrity and security
- Validate user authentication and authorization
- Test booking workflow from creation to completion
- Verify admin management capabilities
- Ensure system performance and reliability

---

## 2. TEST STRATEGY

### 2.1 Testing Levels

#### 2.1.1 Unit Testing
- **Purpose:** Test individual functions and components in isolation
- **Tools:** Jest, React Testing Library
- **Coverage Target:** 80% code coverage
- **Responsibility:** Development Team

#### 2.1.2 Integration Testing
- **Purpose:** Test interaction between components and database
- **Tools:** Jest, Prisma Test Client
- **Focus Areas:** API routes, database operations, authentication flow
- **Responsibility:** Development Team

#### 2.1.3 System Testing
- **Purpose:** Test complete end-to-end workflows
- **Tools:** Manual testing, Browser DevTools
- **Focus Areas:** User journeys, cross-browser compatibility
- **Responsibility:** QA Team

#### 2.1.4 User Acceptance Testing (UAT)
- **Purpose:** Validate system meets business requirements
- **Participants:** Stakeholders, End Users
- **Duration:** 1 week
- **Responsibility:** Business Analysts, End Users

### 2.2 Testing Types

- **Functional Testing:** Verify features work as specified
- **Security Testing:** Test authentication, authorization, data protection
- **Performance Testing:** Ensure acceptable response times
- **Usability Testing:** Validate user interface and experience
- **Compatibility Testing:** Test across different browsers and devices

---

## 3. TEST ENVIRONMENT

### 3.1 Hardware Requirements
- **Development:** Local machines (Windows/Mac/Linux)
- **Testing:** Docker containers
- **Production Simulation:** Cloud environment (optional)

### 3.2 Software Requirements
- **Operating System:** Windows 10+, macOS 12+, Ubuntu 20.04+
- **Node.js:** Version 20+
- **Database:** PostgreSQL 15
- **Browser:** Chrome 120+, Firefox 120+, Safari 17+, Edge 120+
- **Containerization:** Docker Desktop, Docker Compose

### 3.3 Test Data
- **Admin Account:** admin@motobook.com / admin123
- **Customer Accounts:** john@example.com, jane@example.com / password123
- **Rider Accounts:** mike@motobook.com, david@motobook.com / rider123
- **Sample Bookings:** 10+ test bookings with various statuses

---

## 4. TEST CASES

### 4.1 Authentication Module

| Test ID | Test Case | Input | Expected Output | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| AUTH-001 | User Registration - Valid Data | Name, Email, Password, Role | User created successfully | High | Pass |
| AUTH-002 | User Registration - Duplicate Email | Existing email | Error: Email already exists | High | Pass |
| AUTH-003 | User Registration - Missing Fields | Incomplete data | Error: Required fields missing | High | Pass |
| AUTH-004 | User Login - Valid Credentials | Email, Password, Role | Login successful, redirect to dashboard | High | Pass |
| AUTH-005 | User Login - Invalid Email | Wrong email | Error: Invalid credentials | High | Pass |
| AUTH-006 | User Login - Invalid Password | Wrong password | Error: Invalid credentials | High | Pass |
| AUTH-007 | User Login - Wrong Role | Customer tries Admin login | Error: Not registered as Admin | High | Pass |
| AUTH-008 | User Logout | Click logout | Session cleared, redirect to login | Medium | Pass |
| AUTH-009 | Protected Route Access | Access without login | Redirect to login page | High | Pass |
| AUTH-010 | JWT Token Validation | Expired/Invalid token | Unauthorized access denied | High | Pass |

### 4.2 Customer Module

| Test ID | Test Case | Input | Expected Output | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| CUST-001 | View Dashboard | Login as customer | Display bookings, stats | High | Pass |
| CUST-002 | Create Booking - Valid Data | Pickup, Destination | Booking created with PENDING status | High | Pass |
| CUST-003 | Create Booking - Missing Pickup | Only destination | Error: Pickup required | High | Pass |
| CUST-004 | Create Booking - Missing Destination | Only pickup | Error: Destination required | High | Pass |
| CUST-005 | View Booking History | Navigate to history | Display all past bookings | Medium | Pass |
| CUST-006 | View Booking Details | Click on booking | Show full booking information | Medium | Pass |
| CUST-007 | Cancel Pending Booking | Cancel action | Status changed to CANCELLED | Medium | Pass |
| CUST-008 | View Active Bookings | Dashboard view | Show PENDING/ACCEPTED bookings | High | Pass |
| CUST-009 | Download Receipt | Completed booking | Receipt file downloaded | Low | Pass |
| CUST-010 | View Rider Information | Accepted booking | Display assigned rider details | Medium | Pass |

### 4.3 Rider Module

| Test ID | Test Case | Input | Expected Output | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| RIDER-001 | View Dashboard | Login as rider | Display stats, earnings, active rides | High | Pass |
| RIDER-002 | View Ride Requests | Navigate to requests | List all PENDING bookings | High | Pass |
| RIDER-003 | Accept Ride Request | Click accept | Status changed to ACCEPTED, rider assigned | High | Pass |
| RIDER-004 | Complete Ride | Click complete | Status changed to COMPLETED, earnings updated | High | Pass |
| RIDER-005 | View Earnings - Daily | Dashboard view | Display today's earnings | High | Pass |
| RIDER-006 | View Earnings - Total | Dashboard view | Display total earnings | High | Pass |
| RIDER-007 | View Active Rides | Dashboard view | Show ACCEPTED bookings | High | Pass |
| RIDER-008 | View Profile | Navigate to profile | Display rider information | Medium | Pass |
| RIDER-009 | Update Profile | Edit profile data | Profile updated successfully | Medium | Pass |
| RIDER-010 | View Ride History | Navigate to history | Display completed rides | Medium | Pass |

### 4.4 Admin Module

| Test ID | Test Case | Input | Expected Output | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| ADMIN-001 | View Dashboard | Login as admin | Display system stats, recent activity | High | Pass |
| ADMIN-002 | View All Riders | Navigate to riders | List all riders with status | High | Pass |
| ADMIN-003 | Verify Rider | Click verify | Rider status changed to VERIFIED | High | Pass |
| ADMIN-004 | Unverify Rider | Click unverify | Rider status changed to PENDING | High | Pass |
| ADMIN-005 | View All Customers | Navigate to customers | List all customers | Medium | Pass |
| ADMIN-006 | View All Bookings | Navigate to bookings | List all bookings with filters | High | Pass |
| ADMIN-007 | Download Bookings Report | Select report type | CSV file downloaded | High | Pass |
| ADMIN-008 | Download Riders Report | Select report type | CSV file downloaded | High | Pass |
| ADMIN-009 | Download Customers Report | Select report type | CSV file downloaded | Medium | Pass |
| ADMIN-010 | Download Revenue Report | Select report type | CSV file with totals downloaded | High | Pass |
| ADMIN-011 | Filter Reports by Date | Select date range | Filtered data in report | Medium | Pass |
| ADMIN-012 | View System Alerts | Dashboard view | Display pending verifications | Medium | Pass |

### 4.5 Database Module

| Test ID | Test Case | Input | Expected Output | Priority | Status |
|---------|-----------|-------|-----------------|----------|--------|
| DB-001 | User Creation | Valid user data | User record created in database | High | Pass |
| DB-002 | Unique Email Constraint | Duplicate email | Database constraint error | High | Pass |
| DB-003 | Password Hashing | Plain password | Stored as bcrypt hash | High | Pass |
| DB-004 | Booking Creation | Valid booking data | Booking record created | High | Pass |
| DB-005 | Rider Profile Creation | Valid profile data | Profile linked to user | High | Pass |
| DB-006 | Cascade Delete | Delete user | Related records deleted | Medium | Pass |
| DB-007 | Foreign Key Constraints | Invalid user ID | Database constraint error | High | Pass |
| DB-008 | Enum Validation | Invalid role/status | Database validation error | High | Pass |
| DB-009 | Timestamp Auto-generation | Create record | createdAt, updatedAt set automatically | Medium | Pass |
| DB-010 | Transaction Rollback | Failed operation | No partial data saved | High | Pass |

---

## 5. TEST EXECUTION SCHEDULE

| Phase | Activities | Duration | Start Date | End Date |
|-------|-----------|----------|------------|----------|
| **Phase 1: Unit Testing** | Write and execute unit tests | 3 days | Week 1 | Week 1 |
| **Phase 2: Integration Testing** | Test API routes and database | 3 days | Week 1 | Week 2 |
| **Phase 3: System Testing** | End-to-end workflow testing | 4 days | Week 2 | Week 2 |
| **Phase 4: Bug Fixing** | Fix identified issues | 3 days | Week 2 | Week 3 |
| **Phase 5: Regression Testing** | Re-test after fixes | 2 days | Week 3 | Week 3 |
| **Phase 6: UAT** | User acceptance testing | 5 days | Week 3 | Week 4 |
| **Phase 7: Final Sign-off** | Documentation and approval | 1 day | Week 4 | Week 4 |

---

## 6. TEST DELIVERABLES

### 6.1 Before Testing
- Test Plan Document (this document)
- Test Cases Specification
- Test Data Preparation
- Test Environment Setup

### 6.2 During Testing
- Test Execution Reports
- Defect Reports
- Test Logs
- Code Coverage Reports

### 6.3 After Testing
- Test Summary Report
- Defect Summary Report
- Test Metrics and Statistics
- Lessons Learned Document

---

## 7. DEFECT MANAGEMENT

### 7.1 Defect Severity Levels
- **Critical:** System crash, data loss, security breach
- **High:** Major functionality broken, no workaround
- **Medium:** Functionality impaired, workaround available
- **Low:** Minor issues, cosmetic problems

### 7.2 Defect Priority Levels
- **P1 - Urgent:** Fix immediately
- **P2 - High:** Fix before release
- **P3 - Medium:** Fix in next release
- **P4 - Low:** Fix when time permits

### 7.3 Defect Lifecycle
1. New → Assigned → In Progress → Fixed → Verified → Closed
2. Rejected → Closed
3. Deferred → Backlog

---

## 8. ENTRY AND EXIT CRITERIA

### 8.1 Entry Criteria
- ✅ All code development completed
- ✅ Test environment set up and accessible
- ✅ Test data prepared
- ✅ Test cases documented and reviewed
- ✅ Required tools and resources available

### 8.2 Exit Criteria
- ✅ All planned test cases executed
- ✅ 90%+ test cases passed
- ✅ No critical or high severity defects open
- ✅ Code coverage ≥ 80%
- ✅ Performance benchmarks met
- ✅ UAT sign-off received
- ✅ Test summary report completed

---

## 9. RISKS AND MITIGATION

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Insufficient test data | High | Medium | Prepare comprehensive seed data |
| Environment unavailability | High | Low | Use Docker for consistent environments |
| Resource unavailability | Medium | Medium | Cross-train team members |
| Scope creep | Medium | High | Strict change control process |
| Time constraints | High | Medium | Prioritize critical test cases |
| Third-party dependencies | Medium | Low | Mock external services |

---

## 10. TEST METRICS

### 10.1 Metrics to Track
- **Test Coverage:** Percentage of code covered by tests
- **Test Execution Rate:** Tests executed vs. planned
- **Pass/Fail Rate:** Percentage of tests passing
- **Defect Density:** Defects per module
- **Defect Resolution Time:** Average time to fix defects
- **Test Effectiveness:** Defects found in testing vs. production

### 10.2 Target Metrics
- Code Coverage: ≥ 80%
- Test Pass Rate: ≥ 90%
- Critical Defects: 0
- High Defects: ≤ 2
- Average Defect Resolution: ≤ 2 days

---

## 11. TOOLS AND TECHNOLOGIES

| Category | Tool | Purpose |
|----------|------|---------|
| **Unit Testing** | Jest | JavaScript testing framework |
| **Component Testing** | React Testing Library | React component testing |
| **API Testing** | Jest, Postman | API endpoint testing |
| **Database Testing** | Prisma Test Client | Database operation testing |
| **Code Coverage** | Jest Coverage | Measure test coverage |
| **Bug Tracking** | GitHub Issues | Defect management |
| **Version Control** | Git, GitHub | Code versioning |
| **CI/CD** | GitHub Actions | Automated testing |
| **Containerization** | Docker, Docker Compose | Test environment |

---

## 12. RESPONSIBILITIES

| Role | Responsibilities |
|------|------------------|
| **Test Manager** | Overall test planning, coordination, reporting |
| **Test Lead** | Test case design, execution oversight |
| **Developers** | Unit testing, bug fixing, code reviews |
| **QA Engineers** | Test execution, defect reporting |
| **Business Analysts** | UAT coordination, requirements validation |
| **DevOps Engineer** | Test environment setup, CI/CD pipeline |

---

## 13. APPROVAL

| Name | Role | Signature | Date |
|------|------|-----------|------|
| [Your Name] | Developer/Tester | __________ | ______ |
| [Lecturer Name] | Project Supervisor | __________ | ______ |

---

## 14. APPENDICES

### Appendix A: Test Case Template
```
Test ID: [Unique identifier]
Test Title: [Brief description]
Module: [Authentication/Customer/Rider/Admin]
Priority: [High/Medium/Low]
Preconditions: [Setup required]
Test Steps:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
Expected Result: [What should happen]
Actual Result: [What actually happened]
Status: [Pass/Fail/Blocked]
Comments: [Additional notes]
```

### Appendix B: Defect Report Template
```
Defect ID: [Unique identifier]
Title: [Brief description]
Severity: [Critical/High/Medium/Low]
Priority: [P1/P2/P3/P4]
Module: [Affected module]
Steps to Reproduce:
  1. [Step 1]
  2. [Step 2]
Expected Result: [What should happen]
Actual Result: [What actually happened]
Environment: [Browser, OS, etc.]
Screenshots: [Attach if applicable]
Assigned To: [Developer name]
Status: [New/In Progress/Fixed/Closed]
```

### Appendix C: Test Execution Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

---

**END OF TEST PLAN**
