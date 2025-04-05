// const ImageToBase64 = async(image) => {
//     const reader = new FileReader();
//    reader.readAsDataURL(image);

//    const data = await new Promise((resolve, reject) => {
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
//    });

//    return data;
// }

// export default ImageToBase64;

const ImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  
  export default ImageToBase64;