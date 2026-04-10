// Test Backend Connection Script
// Run this with: node test-backend.js

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

console.log('🔍 Testing Backend Connection...\n');

// Test 1: Check if backend is running
async function testBackendHealth() {
  try {
    console.log('1️⃣ Testing backend health...');
    const response = await axios.get(`${BASE_URL}/`);
    console.log('✅ Backend is running!');
    console.log('   Response:', response.data);
    return true;
  } catch (error) {
    console.log('❌ Backend is NOT running!');
    console.log('   Error:', error.message);
    console.log('   Make sure your backend server is running on port 5000');
    return false;
  }
}

// Test 2: Check reservations endpoint
async function testReservationsEndpoint() {
  try {
    console.log('\n2️⃣ Testing reservations endpoint...');
    const response = await axios.post(`${BASE_URL}/api/reservations`, {
      customer_name: 'Test User',
      customer_email: 'test@example.com',
      customer_phone: '01700000000',
      number_of_guests: 2,
      reservation_date: '2025-12-31',
      reservation_time: '19:00',
      special_requests: 'Test reservation'
    });
    console.log('✅ Reservations endpoint is working!');
    console.log('   Response:', response.data);
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('❌ Reservations endpoint NOT FOUND (404)');
      console.log('   The endpoint is commented out in your backend server.js');
      console.log('   Please uncomment the reservation routes and restart the server');
    } else {
      console.log('❌ Reservations endpoint error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Data:', error.response.data);
      }
    }
    return false;
  }
}

// Test 3: Check admin login endpoint
async function testAdminLoginEndpoint() {
  try {
    console.log('\n3️⃣ Testing admin login endpoint...');
    const response = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@crave.com',
      password: 'admin123'
    });
    console.log('✅ Admin login endpoint is working!');
    console.log('   Response:', response.data);
    return true;
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('❌ Admin login endpoint NOT FOUND (404)');
      console.log('   The endpoint might be commented out in your backend');
    } else if (error.response?.status === 401) {
      console.log('⚠️  Admin login endpoint exists but credentials are invalid');
      console.log('   This means the endpoint is working, but:');
      console.log('   - Admin user might not exist in database');
      console.log('   - Password might be incorrect');
      console.log('   Run: node generate-admin-hash.js to create admin user');
    } else {
      console.log('❌ Admin login endpoint error:', error.message);
      if (error.response) {
        console.log('   Status:', error.response.status);
        console.log('   Data:', error.response.data);
      }
    }
    return false;
  }
}

// Run all tests
async function runTests() {
  const backendRunning = await testBackendHealth();
  
  if (!backendRunning) {
    console.log('\n❌ Cannot continue tests - backend is not running');
    console.log('\n📝 To start your backend:');
    console.log('   1. Navigate to your backend directory');
    console.log('   2. Run: node server.js (or npm start)');
    console.log('   3. Make sure it starts on port 5000');
    return;
  }

  await testReservationsEndpoint();
  await testAdminLoginEndpoint();

  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary:');
  console.log('='.repeat(50));
  console.log('✅ = Working correctly');
  console.log('❌ = Needs fixing');
  console.log('⚠️  = Partially working');
  console.log('\nCheck the results above for specific issues.');
  console.log('\nFor detailed setup instructions, see:');
  console.log('   - BACKEND_SETUP_INSTRUCTIONS.md');
  console.log('   - ADMIN_SETUP_GUIDE.md');
}

// Execute tests
runTests().catch(error => {
  console.error('Unexpected error:', error);
});
