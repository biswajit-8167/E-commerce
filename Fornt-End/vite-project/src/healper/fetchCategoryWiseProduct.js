// const {default: SummmaryApi} = require("../common/index");
import SummmaryApi from "../common";

const fetchCategoryWiseProduct = async (category) => {
    
    const response = await fetch(SummmaryApi.categoryWiseProduct.url,{
        method:SummmaryApi.categoryWiseProduct.method,
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({category:category})
    })

    console.log("response",response)
    const dataResponse = await response.json();

    console.log("dataResponse",dataResponse)

    return dataResponse;
}

export default fetchCategoryWiseProduct;