# Performance Testing Methodology

## Overview
This document outlines the comprehensive performance testing methodology used for the EaaS platform, including testing strategies, tools, environments, and best practices for maintaining consistent performance benchmarks.

## Testing Strategy

### Testing Pyramid
```
                /\
               /  \    Load Testing (1000+ users)
              /    \
             /      \
            /        \
           /          \
          /            \
         /              \
        /________________\
       /                  \
      /  Integration       \
     /   Testing          \
    /______________________\
   /                        \
  /  Unit Performance        \
 /   Testing                \
/____________________________\
```

### Testing Types
| Type | Frequency | Scope | Tools | Environment |
|------|-----------|-------|-------|-------------|
| **Unit** | Every PR | Functions | Jest | Local |
| **Integration** | Daily | APIs | Artillery | Staging |
| **Load** | Weekly | System | K6 | Staging |
| **Stress** | Monthly | Limits | Locust | Staging |
| **Endurance** | Quarterly | Stability | Custom | Production |
| **Spike** | As needed | Burst | Cloud-based | Production-like |

## Testing Environments

### Environment Matrix
| Environment | Purpose | Data Size | Users | Duration |
|-------------|---------|-----------|-------|----------|
| **Local** | Development | 1K records | 1-5 | Minutes |
| **Staging** | Pre-production | 100K records | 10-100 | Hours |
| **Performance** | Load testing | 1M records | 100-1000 | Days |
| **Production** | Monitoring | 10M+ records | 1000+ | Continuous |

### Environment Configuration
```yaml
# Staging Environment
api:
  replicas: 2
  cpu: 2 cores
  memory: 4GB
  
database:
  type: postgresql
  size: 100GB
  connections: 50
  
cache:
  type: redis
  size: 1GB
  
load_balancer:
  type: nginx
  algorithm: round_robin
```

## Testing Tools

### Backend Testing Tools

#### Artillery Configuration
```yaml
config:
  target: 'https://api.staging.eaas.com'
  phases:
    - duration: 60
      arrivalRate: 10
      rampTo: 50
    - duration: 300
      arrivalRate: 50
    - duration: 60
      arrivalRate: 50
      rampTo: 10
  processor: './load-test-processor.js'
  
scenarios:
  - name: "API Load Test"
    weight: 70
    flow:
      - post:
          url: "/api/auth/login"
          json:
            email: "{{ email }}"
            password: "{{ password }}"
      - get:
          url: "/api/energy/consumption"
          headers:
            Authorization: "Bearer {{ token }}"
```

#### K6 Test Scripts
```javascript
import http from 'k6/http';
import { check, sleep, group } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '2m', target: 100 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 200 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    errors: ['rate<0.1'],
  },
};

export default function () {
  group('Authentication Flow', function () {
    const loginRes = http.post('https://api.staging.eaas.com/api/auth/login', {
      email: 'test@eaas.com',
      password: 'testpassword123',
    });
    
    check(loginRes, {
      'login successful': (r) => r.status === 200,
      'response time OK': (r) => r.timings.duration < 500,
    }) || errorRate.add(1);
    
    const token = JSON.parse(loginRes.body).token;
    
    const energyRes = http.get('https://api.staging.eaas.com/api/energy/consumption', {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    check(energyRes, {
      'energy data retrieved': (r) => r.status === 200,
      'valid data format': (r) => JSON.parse(r.body).data !== undefined,
    }) || errorRate.add(1);
  });
  
  sleep(1);
}
```

### Frontend Testing Tools

#### Lighthouse CI Configuration
```json
{
  "ci": {
    "collect": {
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/dashboard",
        "http://localhost:3000/billing",
        "http://localhost:3000/profile"
      ],
      "numberOfRuns": 3,
      "settings": {
        "preset": "desktop",
        "throttling": {
          "rttMs": 40,
          "throughputKbps": 10240,
          "cpuSlowdownMultiplier": 1
        }
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.9}],
        "categories:seo": ["warn", {"minScore": 0.9}],
        "largest-contentful-paint": ["warn", {"maxNumericValue": 2500}],
        "first-contentful-paint": ["warn", {"maxNumericValue": 1800}],
        "interactive": ["warn", {"maxNumericValue": 3900}]
      }
    }
  }
}
```

#### WebPageTest Configuration
```yaml
test_settings:
  location: 'Mumbai, India'
  connection: '4G'
  device: 'Moto G4'
  runs: 3
  first_view_only: false
  capture_video: true
  lighthouse: true
  label: 'EaaS Performance Test'
```

### Database Testing Tools

#### pgbench Configuration
```bash
# Initialize test database
pgbench -i -s 100 -d eaas_test

# Run performance test
pgbench -c 50 -j 4 -T 300 -P 60 -d eaas_test \
  -f tests/performance/sql/energy_queries.sql
```

#### Custom Database Tests
```sql
-- Performance monitoring queries
CREATE OR REPLACE FUNCTION monitor_query_performance()
RETURNS TABLE(query text, avg_time float, calls bigint) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    query,
    mean_time,
    calls
  FROM pg_stat_statements
  WHERE mean_time > 100
  ORDER BY mean_time DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;
```

## Test Data Management

### Data Generation Strategy
| Data Type | Volume | Generation Method | Refresh Frequency |
|-----------|--------|-------------------|-------------------|
| **Users** | 100K | Faker.js | Weekly |
| **Energy Data** | 10M | Time-series generator | Daily |
| **Billing** | 1M | Business rules | Weekly |
| **Notifications** | 5M | Event simulator | Daily |

### Data Generation Scripts
```javascript
// User data generator
const generateUsers = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    email: `user${i}@test.com`,
    password: bcrypt.hashSync('password123', 10),
    role: faker.helpers.arrayElement(['user', 'admin']),
    created_at: faker.date.past(2),
  }));
};

// Energy data generator
const generateEnergyData = (userId, days) => {
  const data = [];
  for (let day = 0; day < days; day++) {
    for (let hour = 0; hour < 24; hour++) {
      data.push({
        user_id: userId,
        consumption: Math.random() * 10 + 2,
        created_at: new Date(Date.now() - day * 24 * 60 * 60 * 1000 - hour * 60 * 60 * 1000),
      });
    }
  }
  return data;
};
```

## Performance Benchmarks

### API Response Time Benchmarks
| Endpoint | Target | Warning | Critical |
|----------|--------|---------|----------|
| **GET /health** | < 50ms | < 100ms | > 200ms |
| **POST /auth/login** | < 500ms | < 1000ms | > 2000ms |
| **GET /energy/consumption** | < 200ms | < 500ms | > 1000ms |
| **POST /billing/payment** | < 1000ms | < 2000ms | > 5000ms |

### Frontend Performance Budgets
| Metric | Budget | Warning | Critical |
|--------|--------|---------|----------|
| **LCP** | < 2.5s | < 4s | > 4s |
| **FID** | < 100ms | < 200ms | > 300ms |
| **CLS** | < 0.1 | < 0.25 | > 0.25 |
| **TTI** | < 3.9s | < 5s | > 7s |

### Database Performance Thresholds
| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| **Query Time** | < 50ms | < 100ms | > 200ms |
| **Connection Pool** | < 80% | < 90% | > 95% |
| **CPU Usage** | < 70% | < 85% | > 95% |
| **Memory Usage** | < 80% | < 90% | > 95% |

## Testing Execution

### Test Schedule
| Test Type | Frequency | Duration | Environment |
|-----------|-----------|----------|-------------|
| **Unit Performance** | Every PR | 5 minutes | Local |
| **API Load** | Daily | 30 minutes | Staging |
| **Frontend** | Daily | 15 minutes | Staging |
| **Database** | Weekly | 1 hour | Staging |
| **End-to-end** | Weekly | 2 hours | Staging |
| **Production** | Monthly | 4 hours | Production |

### Test Execution Checklist
- [ ] Environment setup validation
- [ ] Test data preparation
- [ ] Baseline measurement
- [ ] Load test execution
- [ ] Results collection
- [ ] Performance analysis
- [ ] Report generation
- [ ] Recommendations

## Results Analysis

### Performance Metrics Collection
```javascript
// Performance monitoring middleware
const performanceMiddleware = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    // Log performance metrics
    logger.info({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration,
      userAgent: req.get('User-Agent'),
    });
    
    // Send to monitoring
    metrics.histogram('http_request_duration_ms', duration, {
      method: req.method,
      route: req.route?.path,
      status_code: res.statusCode,
    });
  });
  
  next();
};
```

### Performance Regression Detection
```javascript
// Performance regression test
const regressionTest = async (current, baseline) => {
  const threshold = 1.2; // 20% degradation
  
  const regressions = [];
  
  for (const [metric, value] of Object.entries(current)) {
    const baselineValue = baseline[metric];
    const ratio = value / baselineValue;
    
    if (ratio > threshold) {
      regressions.push({
        metric,
        current: value,
        baseline: baselineValue,
        ratio,
      });
    }
  }
  
  return regressions;
};
```

## Reporting and Documentation

### Performance Report Template
```markdown
# Performance Test Report - [Date]

## Test Summary
- **Test Type**: [Load/Stress/Endurance]
- **Duration**: [X minutes/hours]
- **Environment**: [Staging/Production]
- **Test Data**: [X users, Y records]

## Results
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| [Metric 1] | [Target] | [Actual] | [✅/❌] |
| [Metric 2] | [Target] | [Actual] | [✅/❌] |

## Issues Identified
1. [Issue 1 with impact]
2. [Issue 2 with impact]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]
```

### Performance Dashboard
```yaml
# Grafana dashboard configuration
dashboard:
  name: "EaaS Performance"
  panels:
    - name: "API Response Times"
      type: "graph"
      query: "avg(http_request_duration_ms)"
    - name: "Error Rates"
      type: "singlestat"
      query: "rate(http_requests_total{status=~'5..'}[5m])"
    - name: "Database Connections"
      type: "graph"
      query: "pg_stat_activity_count"
```

## Best Practices

### Testing Guidelines
1. **Always test against production-like data**
2. **Use consistent test environments**
3. **Automate performance regression detection**
4. **Document all performance optimizations**
5. **Test both average and peak loads**
6. **Monitor performance in production**
7. **Set realistic performance budgets**
8. **Test across different network conditions**

### Common Pitfalls to Avoid
- Testing with insufficient data
- Ignoring cold start performance
- Not testing mobile devices
- Overlooking database connection limits
- Neglecting CDN cache invalidation
- Forgetting to test error scenarios
- Not accounting for third-party dependencies

## Continuous Performance Monitoring

### CI/CD Integration
```yaml
# GitHub Actions workflow
name: Performance Tests
on:
  pull_request:
    paths:
      - 'src/**'
      - 'package.json'

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run performance tests
        run: npm run test:performance
      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: performance-results
          path: performance-results/
```

### Performance Budget Enforcement
```json
{
  "budgets": [
    {
      "resourceSizes": [
        {
          "resourceType": "script",
          "budget": 500
        },
        {
          "resourceType": "image",
          "budget": 500
        }
      ],
      "resourceCounts": [
        {
          "resourceType": "third-party",
          "budget": 10
        }
      ]
    }
  ]
}
```

---
**Document Version**: 1.0  
**Last Updated**: 2025-11-16  
**Next Review**: 2025-12-16