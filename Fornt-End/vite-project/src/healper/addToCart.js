import { toast } from "react-toastify";
import SummaryApi from "../common/index";
const addToCart = async (e, id) => {
   e?.stopPropagation();
   e?.preventDefault();
 
   try {
     const response = await fetch(SummaryApi.addToCartProduct.url, {
       method: SummaryApi.addToCartProduct.method,
       credentials: "include",
       headers: {
         "content-type": "application/json",
       },
       body: JSON.stringify({ productId: id }),
     });
 
     const dataResponse = await response.json();
 
     if (!response.ok) {
       throw new Error(dataResponse.message || "Failed to add to cart");
     }
 
     // More explicit response handling
     if (dataResponse.success && !dataResponse.error) {
       toast.success(dataResponse.message);
     } else if (dataResponse.error) {
       toast.warning(dataResponse.message); // Using warning for "already in cart"
     }
 
     return dataResponse;
     
   } catch (error) {
     toast.error(error.message || "Failed to add to cart. Please try again.");
   }
 };

 

 export default addToCart