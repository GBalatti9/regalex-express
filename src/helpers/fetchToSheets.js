export const fetchToSheets = async ( userData, choiceData ) => {
    const url = 'https://script.google.com/macros/s/AKfycbzwuStmESDry6-PDaUVnplf2Cpen6wh3GOyIGFJvyg-h9GUB0ul8cYrpkP3UCjRHu2l/exec';

    const { fullName, email, wapp } = userData;
    const { nombre } = choiceData;

    const formattedData = new URLSearchParams({
        Fecha: new Date(),
        Nombre: fullName,
        Mail: email,
        Whatsapp: wapp,
        Regalo: nombre,
        Cantidad: "1",
        SheetName: 'Hoja2'
    });

    try {
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
        return error;
    }
}
