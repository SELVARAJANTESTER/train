class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {
        if (this.token) {
            return this.token;
        }
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        if (!token) {
            throw new Error(`Login failed: ${JSON.stringify(loginResponseJson)}`);
        }
        this.token = token;
        return token;
    }

    async getFirstProductId() {
        const token = await this.getToken();
        const productResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products", {
            data: {},
            headers: {
                Authorization: token,
                "Content-Type": "application/json"
            }
        });
        const productResponseJson = await productResponse.json();
        const products = productResponseJson.data || [];
        if (!products.length) {
            throw new Error(`No products returned from get-all-products: ${JSON.stringify(productResponseJson)}`);
        }
        return products[0]._id;
    }

    async createOrder(orderPayLoad) {
        const response = {};
        response.token = await this.getToken();

        if (!orderPayLoad?.orders?.length || !orderPayLoad.orders[0].productOrderedId) {
            orderPayLoad = {
                orders: [
                    {
                        country: orderPayLoad?.orders?.[0]?.country || "India",
                        productOrderedId: await this.getFirstProductId()
                    }
                ]
            };
        }

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: orderPayLoad,
            headers: {
                Authorization: response.token,
                "Content-Type": "application/json"
            }
        });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);

        if (!orderResponse.ok()) {
            if (orderResponseJson?.message?.toString().toLowerCase().includes("wrong product id")) {
                orderPayLoad.orders[0].productOrderedId = await this.getFirstProductId();
                const retryResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
                    data: orderPayLoad,
                    headers: {
                        Authorization: response.token,
                        "Content-Type": "application/json"
                    }
                });
                const retryJson = await retryResponse.json();
                console.log("Retry order response", retryJson);
                if (!retryResponse.ok() || !retryJson.orders?.length) {
                    throw new Error(`Order creation retry failed: ${retryResponse.status()} ${JSON.stringify(retryJson)}`);
                }
                response.orderId = retryJson.orders[0];
                return response;
            }
            throw new Error(`Order creation failed: ${orderResponse.status()} ${JSON.stringify(orderResponseJson)}`);
        }

        if (!orderResponseJson.orders?.length) {
            throw new Error(`Unexpected order response: ${JSON.stringify(orderResponseJson)}`);
        }

        response.orderId = orderResponseJson.orders[0];
        return response;
    }
}
module.exports = { APiUtils };




