export const fileUpload = async( file ) => {
    
    if( !file ) return null;
    console.log({ file });
    const cloudURL = 'https://api.cloudinary.com/v1_1/dsadgfahr/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'regalex-express');
    formData.append('file', file);

    try {
        const resp = await fetch( cloudURL, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) {
            throw new Error(resp)
        }

        const cloudResponse = await resp.json();
        
        return cloudResponse.secure_url;
    } catch (error) {
        // throw new Error( error );
        return null;
    }
}