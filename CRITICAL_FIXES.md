# 🔥 CRITICAL FIXES - Implementation Guide

**Priority:** MUST implement before production launch  
**Time Estimate:** 1-2 hours  
**Complexity:** Low-Medium

---

## FIX #1: Security Headers with Helmet (5 min)

**File:** `server/server.js`

```bash
npm install helmet
```

Add at top of server.js after imports:

```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## FIX #2: CORS Restriction (5 min)

**File:** `server/server.js`

Change from:
```javascript
app.use(cors());
```

To:
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
```

Add to `.env`:
```env
CORS_ORIGIN=http://localhost:3000
```

---

## FIX #3: Rate Limiting (10 min)

**Step 1: Install**
```bash
npm install express-rate-limit
```

**Step 2:** `server/server.js`

Add after imports:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

---

## FIX #4: Request Size Limit (3 min)

**File:** `server/server.js`

Change:
```javascript
app.use(express.json());
```

To:
```javascript
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
```

---

## FIX #5: Environment Validation (5 min)

**File:** `server/server.js`

Add at top (after require statements):

```javascript
const required = ['MONGO_URI', 'GROQ_API_KEY'];
const missing = required.filter(v => !process.env[v]);
if (missing.length) {
  console.error(`Missing: ${missing.join(', ')}`);
  process.exit(1);
}
```

---

## FIX #6: Input Validation (10 min)

**Step 1: Install**
```bash
npm install express-validator
```

**Step 2:** `server/routes/verifyRoutes.js`

```javascript
const { body, validationResult } = require('express-validator');

router.post("/verify-candidate", [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('github').isURL()
], verifyCandidate);
```

---

## FIX #7: Global Error Handler (5 min)

**File:** `server/server.js`

Add at END (before app.listen):

```javascript
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'An error occurred' 
      : err.message
  });
});
```

---

## FIX #8: Request Timeout (3 min)

**File:** `server/server.js`

```javascript
app.use((req, res, next) => {
  res.setTimeout(30000, () => {
    res.status(408).json({ error: 'Request timeout' });
  });
  next();
});
```

---

## FIX #9: File Upload Limits (5 min)

**File:** `server/routes/uploadRoutes.js`

```javascript
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});
```

---

## FIX #10: Compression (2 min)

**Step 1: Install**
```bash
npm install compression
```

**Step 2:** `server/server.js`

```javascript
const compression = require('compression');
app.use(compression());
```

---

## Quick Installation

Run all at once:

```bash
cd server
npm install helmet compression express-rate-limit express-validator
```

---

## Total Time: 1-2 hours ✅

All fixes are provided above with exact code.
