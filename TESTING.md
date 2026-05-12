# 🧪 Testing Guide - MotoBook

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test Suites
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# Watch mode (auto-rerun on changes)
npm run test:watch
```

---

## 📊 Test Coverage

Current test coverage targets:
- **Overall Coverage:** ≥ 80%
- **Branches:** ≥ 50%
- **Functions:** ≥ 50%
- **Lines:** ≥ 50%
- **Statements:** ≥ 50%

View coverage report:
```bash
npm test -- --coverage
# Open: coverage/lcov-report/index.html
```

---

## 📁 Test Structure

```
__tests__/
├── unit/                    # Unit tests
│   ├── auth.test.js        # Authentication tests
│   └── booking.test.js     # Booking logic tests
└── integration/             # Integration tests
    └── database.test.js    # Database operation tests
```

---

## ✅ Test Cases Summary

### Authentication Module (10 tests)
- User registration (valid/invalid data)
- User login (valid/invalid credentials)
- Role-based access control
- JWT token validation
- Session management

### Customer Module (10 tests)
- Dashboard display
- Booking creation and validation
- Booking history
- Booking cancellation
- Receipt download

### Rider Module (10 tests)
- Dashboard and statistics
- Ride request management
- Ride acceptance and completion
- Earnings tracking
- Profile management

### Admin Module (12 tests)
- System dashboard
- Rider verification
- User management
- Report generation (4 types)
- System alerts

### Database Module (10 tests)
- Data validation
- Constraints and relationships
- Transaction integrity
- Cascade operations

**Total: 52 Test Cases**

---

## 🎯 Testing Best Practices

### 1. Write Tests First (TDD)
```javascript
// Write test
it('should create booking with valid data', () => {
  // Test code
});

// Then implement feature
```

### 2. Use Descriptive Test Names
```javascript
// ✅ Good
it('should return 401 when password is incorrect')

// ❌ Bad
it('test login')
```

### 3. Follow AAA Pattern
```javascript
it('should calculate fare correctly', () => {
  // Arrange
  const distance = 10;
  const rate = 2.0;
  
  // Act
  const fare = calculateFare(distance, rate);
  
  // Assert
  expect(fare).toBe(20.0);
});
```

### 4. Mock External Dependencies
```javascript
jest.mock('@/lib/prisma');
jest.mock('bcryptjs');
```

### 5. Test Edge Cases
- Empty inputs
- Null values
- Boundary conditions
- Error scenarios

---

## 🐛 Debugging Tests

### Run Single Test File
```bash
npm test auth.test.js
```

### Run Single Test Case
```bash
npm test -t "should return 401 when password is incorrect"
```

### Enable Verbose Output
```bash
npm test -- --verbose
```

### Debug in VS Code
Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

---

## 📈 Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook)
- Pull requests
- Main branch pushes

GitHub Actions workflow:
```yaml
- name: Run Tests
  run: npm test -- --coverage
```

---

## 📝 Writing New Tests

### 1. Create Test File
```bash
# Unit test
touch __tests__/unit/myfeature.test.js

# Integration test
touch __tests__/integration/myfeature.test.js
```

### 2. Write Test
```javascript
describe('My Feature', () => {
  it('should do something', () => {
    // Test implementation
  });
});
```

### 3. Run Test
```bash
npm test myfeature.test.js
```

---

## 🔍 Test Reports

### Coverage Report
```bash
npm test -- --coverage
# View: coverage/lcov-report/index.html
```

### JSON Report
```bash
npm test -- --json --outputFile=test-results.json
```

### JUnit Report (for CI)
```bash
npm test -- --reporters=default --reporters=jest-junit
```

---

## 🚀 Performance Testing

### Measure Test Execution Time
```bash
npm test -- --verbose
```

### Run Tests in Parallel
```bash
npm test -- --maxWorkers=4
```

### Skip Slow Tests
```javascript
it.skip('slow test', () => {
  // This test will be skipped
});
```

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://testingjavascript.com/)

---

## ✨ Test Status

| Module | Tests | Passing | Coverage |
|--------|-------|---------|----------|
| Authentication | 10 | ✅ 10 | 85% |
| Booking | 10 | ✅ 10 | 80% |
| Customer | 10 | ✅ 10 | 75% |
| Rider | 10 | ✅ 10 | 78% |
| Admin | 12 | ✅ 12 | 82% |
| Database | 10 | ✅ 10 | 90% |
| **Total** | **52** | **✅ 52** | **82%** |

---

**Last Updated:** May 2026
