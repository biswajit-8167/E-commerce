
// const url =`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;
// const UploadImage = async (image) => {
     
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('upload_preset',Mern_Products);
    

//   const dataResponse = await fetch(url, {
//     method: 'POST',
//     body: formData,
//   });

//   return dataResponse.json();
// }

// export default UploadImage;


import { CLOUDINARY_CONFIG } from '../healper/config';

const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;

const UploadImage = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);

    try {
        const dataResponse = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!dataResponse.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await dataResponse.json();
        return data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default UploadImage;