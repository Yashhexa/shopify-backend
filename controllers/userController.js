
// get user 
const axios = require('axios');
require('dotenv').config();

const shopifyStoreUrl = process.env.SHOPIFY_STORE_URL

const accessToken = process.env.SHOPIFY_ACCESS_TOKEN

const getShopifyProduct = async (req,res,next) => {
    let productData
    let finalResponse
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
    console.error('Error getting product:', error.response ? error.response.data : error.message);
    next(error)
  }

    try {
        const response2 = await axios.post(
            `https://${shopifyStoreUrl}/admin/api/2023-10/products.json`,productData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Shopify-Access-Token':accessToken,
                },
            }
        );

        console.log('Product created:', response2.status);
        finalResponse = response2.data
    } catch (error) {
        console.error('Error creating product:', error.response ? error.response2.data : error.message);
        next(error)
    }

    res.status(200).send(finalResponse)
}



module.exports = {
    getShopifyProduct,
}
