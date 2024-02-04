export const fetchToSheets = async (data) => {
    // const url = 'https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbz5YWDhs9-L5Kh4ZWSKtvBubnjKStklDHSJQMvR3CGwcxvhIEFW-hgGrMzY5lQYCOu4Dw/exec';

    // 'https://script.google.com/macros/s/AKfycbz5YWDhs9-L5Kh4ZWSKtvBubnjKStklDHSJQMvR3CGwcxvhIEFW-hgGrMzY5lQYCOu4Dw/exec'
//  const url = 'https://script.google.com/macros/s/AKfycbz6fv6utTcnMbq7mvcxYwEX-jHmL1cmqg7ZjW6_ylJ5S5BkES8zOMKETEncn4xNPO2P/exec'
    // const url = 'https://script.google.com/macros/s/AKfycbxiFduCRazkcxPGJM3gCstD7uGTtdHqta2nbINu6_COkcbtIDgSeGYZWGk04lM876gr/exec'
    const url = 'https://script.google.com/macros/s/AKfycbyi6iB9LOEGe0XgteS-ZLYUULOzijbvoyRj0KhKumXLBN9kog6MJRI2QX4fhbE7wgvO/exec'
    const { fullName, email, wapp, answer } = data;

    const formattedData = new URLSearchParams({
        Nombre: fullName,
        Mail: email,
        Whatsapp: wapp,
        Regalo: answer,
        Cantidad: "1",
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
