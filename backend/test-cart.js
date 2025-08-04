import fetch from 'node-fetch';

async function testCartEndpoint() {
  try {
    const response = await fetch('http://localhost:4000/api/v1/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'test123',
        product_id: 1,
        category: 'fish',
        quantity: 1
      })
    });

    const data = await response.json();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testCartEndpoint(); 