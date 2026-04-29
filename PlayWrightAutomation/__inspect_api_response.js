const fetch = require('node-fetch');
(async () => {
  const loginPayLoad = { userEmail:'celvarajan.m@gmail.com', userPassword:'cQRjfsyErt4aA@z' };

  const loginResp = await fetch('https://rahulshettyacademy.com/api/ecom/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayLoad),
  });
  const loginJson = await loginResp.json();
  console.log('login', JSON.stringify(loginJson, null, 2));

  const productsResp = await fetch('https://rahulshettyacademy.com/api/ecom/product/get-all-products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: loginJson.token,
    },
    body: JSON.stringify({}),
  });
  const productsJson = await productsResp.json();
  console.log('products', JSON.stringify(productsJson?.data?.slice(0, 3), null, 2));

  const firstProductId = productsJson?.data?.[0]?._id;
  if (!firstProductId) {
    throw new Error('No valid product ID found from get-all-products');
  }

  const orderPayLoad = {
    orders: [
      {
        country: 'India',
        productOrderedId: firstProductId,
      },
    ],
  };

  const orderResp = await fetch('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': loginJson.token },
    body: JSON.stringify(orderPayLoad),
  });
  const orderJson = await orderResp.json();
  console.log('order', JSON.stringify(orderJson, null, 2));
})();
