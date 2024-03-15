

export const uploadNewItem = async ( data ) => {

    // const url = 'https://sheets.googleapis.com/v4/spreadsheets?key=AIzaSyCgXQ2cadEZdqlKgWCliRvB14mpc25fCdk';
    const url = 'https://script.google.com/macros/s/AKfycbzwuStmESDry6-PDaUVnplf2Cpen6wh3GOyIGFJvyg-h9GUB0ul8cYrpkP3UCjRHu2l/exec';

    const formattedData = new URLSearchParams({
        Producto: data.Producto,
        Cantidad: data.Cantidad,
        Imagen: data.Imagen,
    });

    try {
        console.log({formattedData});
        const response = fetch(url, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'POST',
            body: formattedData,
        })
        const data = await response;
        return data;
    } catch (error) {
        console.log(error);
    }

    // return {}
}
