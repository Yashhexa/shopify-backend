
// get user 
const axios = require('axios');

const shopifyStoreUrl = 'hexa-test-store.myshopify.com';

const accessToken = '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'

const getShopifyProduct = async () => {
    let productData
    try {
        const response = await axios.get(
            `https://${shopifyStoreUrl}/admin/api/2023-10/products/6966590603342.json`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token':accessToken,
                },
            }
        )
        console.log('Product Details:', response.status);
        productData = response.data
    } catch (error) {
    console.error('Error creating product:', error.response ? error.response.data : error.message);
  }

    try {
        const response = await axios.post(
            `https://${shopifyStoreUrl}/admin/api/2023-10/products.json`,productData,
            {
                headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token':accessToken,
                },
            }
        );

        console.log('Product created:', response.status);
    } catch (error) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
    }
}



module.exports = {
    getShopifyProduct,
}
