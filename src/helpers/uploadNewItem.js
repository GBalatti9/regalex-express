

export const uploadNewItem = async ( data ) => {

    const url = 'https://script.google.com/macros/s/AKfycbzwuStmESDry6-PDaUVnplf2Cpen6wh3GOyIGFJvyg-h9GUB0ul8cYrpkP3UCjRHu2l/exec';

    const formattedData = new URLSearchParams({
        Producto: data.Producto,
        // Cantidad: data.Cantidad,
        Cantidad: 'Estirar de la celda de arriba para activar el funcionamiento',
        Imagen: data.Imagen,
        Estado: 'Estirar de la celda de arriba para activar el funcionamiento',
        SheetName: 'Hoja1'
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
}
