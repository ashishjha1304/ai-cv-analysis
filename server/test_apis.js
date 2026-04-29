const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('\n🔍 AI Resume Analyzer — API Test Suite\n');
console.log('='.repeat(50));

// ─── TEST 1: Base API ───────────────────────────────
function test1() {
  return new Promise((resolve) => {
    const req = http.request('http://localhost:5000/', (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const pass = res.statusCode === 200 && data.includes('running');
        console.log(`\nTEST 1 [GET /] Base API Health:`);
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${pass ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`  Body   : ${data.trim()}`);
        resolve(pass);
      });
    });
    req.on('error', e => {
      console.log(`\nTEST 1 [GET /] Base API Health: ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.end();
  });
}

// ─── TEST 2: Upload route exists ───────────────────
function test2() {
  return new Promise((resolve) => {
    const boundary = 'TestBoundary999';
    const fileContent = Buffer.from('%PDF-1.4 fake pdf content');
    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="resume"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, fileContent, footer]);

    const options = {
      hostname: 'localhost', port: 5000,
      path: '/api/upload-resume',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        // Route is reachable if we get ANY JSON back (even an error is fine)
        let parsed = {};
        try { parsed = JSON.parse(data); } catch(e) {}
        const routeReachable = [200, 400, 500].includes(res.statusCode);
        console.log(`\nTEST 2 [POST /api/upload-resume] Route Reachable:`);
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${routeReachable ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`  Body   : ${data.substring(0,150)}`);
        resolve(routeReachable);
      });
    });
    req.on('error', e => {
      console.log(`\nTEST 2 [POST /api/upload-resume]: ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.write(body);
    req.end();
  });
}

// ─── TEST 3: Groq API via verify-candidate ─────────
function test3() {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      name: 'Ashish Jha',
      github: 'https://github.com/ashishjha1304'
    });
    const options = {
      hostname: 'localhost', port: 5000,
      path: '/api/verify-candidate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    console.log('\nTEST 3 [POST /api/verify-candidate] Groq API:');
    console.log('  ⏳ Calling Groq... (may take 3-10s)');

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        let parsed = {};
        try { parsed = JSON.parse(data); } catch(e) {}
        const pass = res.statusCode === 200 && parsed.result && parsed.result.length > 10;
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${pass ? '✅ PASS' : '❌ FAIL'}`);
        if (pass) {
          console.log(`  Preview: ${parsed.result.substring(0, 120)}...`);
        } else {
          console.log(`  Body   : ${data.substring(0, 200)}`);
        }
        resolve(pass);
      });
    });
    req.on('error', e => {
      console.log(`  Result : ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.write(body);
    req.end();
  });
}

// ─── TEST 4: MongoDB (check via server log) ────────
function test4() {
  return new Promise((resolve) => {
    // We already saw the MongoDB error in server logs
    // Try a simple mongoose ping via a separate node call
    const mongoose = require('mongoose');
    const uri = process.env.MONGO_URI;

    if (!uri) {
      console.log('\nTEST 4 [MongoDB Atlas]: ❌ FAIL — MONGO_URI not set in env');
      resolve(false);
      return;
    }

    console.log('\nTEST 4 [MongoDB Atlas] Connection:');
    console.log('  ⏳ Connecting to Atlas...');

    mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then(() => {
        console.log('  Result : ✅ PASS — Connected!');
        mongoose.connection.close();
        resolve(true);
      })
      .catch(err => {
        console.log('  Result : ❌ FAIL');
        console.log('  Error  :', err.message.split('\n')[0]);
        resolve(false);
      });
  });
}

// ─── RUN ALL TESTS ──────────────────────────────────
async function runAll() {
  require('dotenv').config();

  const r1 = await test1();
  const r2 = await test2();
  const r3 = await test3();
  const r4 = await test4();

  console.log('\n' + '='.repeat(50));
  console.log('📊 FINAL RESULTS SUMMARY:');
  console.log('='.repeat(50));
  console.log(`  Base API (GET /)              : ${r1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Upload Route Reachable        : ${r2 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Groq AI (verify-candidate)    : ${r3 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  MongoDB Atlas Connection       : ${r4 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(50));

  if (!r4) {
    console.log('\n⚠️  MongoDB FIX NEEDED:');
    console.log('   Go to: https://cloud.mongodb.com');
    console.log('   → Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)');
  }
  if (!r3) {
    console.log('\n⚠️  Groq API FIX NEEDED:');
    console.log('   Check GROQ_API_KEY in server/.env');
    console.log('   Get new key at: https://console.groq.com/keys');
  }

  process.exit(0);
}

runAll();
