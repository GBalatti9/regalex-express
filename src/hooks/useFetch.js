import { useEffect, useRef, useState } from "react";


export const useFetch = ( formSubmitted, userData ) => {
    const [ data, setData ] = useState({
        isLoading: false,
        info: [],
        formCompleted: false,
    });

    // Primero va a preguntar si hay información en localStorage. En caso de que sea verdad significa que el usuario no terminó de completar el formulario

    const dataInStorage = JSON.parse(localStorage.getItem('info')) || [];

    const setDataFromStorage = () => {
        // console.log('estamo activo: ', dataInStorage);
        if (dataInStorage.length > 0) {
            setData(( prevData ) => ({
                ...prevData,
                info: dataInStorage,
            }))
            // console.log(data, {dataInStorage});
        }
    };

    useEffect(() => {
        setDataFromStorage();
    }, [])
    
    // Se va a utilizar una variable para chequear si el usuario ya completó el formulario o no. La idea es que si un usuario ya completó el formulario, no se le permita volver a completarlo. 
    const [ userHasAlreadyCompletedForm, setUserHasAlreadyCompletedForm ] = useState( true );
    const [ checkDone, setCheckDone ] = useState( false );

    const checkUserSheets = async ( formSubmitted ) => {
        if (formSubmitted !== true) return;
        
        setData((prevData) => ({
            ...prevData,
            isLoading: true,
        }))
        try {
            const response = await fetch('https://docs.google.com/spreadsheets/d/1m7eu6I6-cr83E2Uq9QwO7BJIUk3oeW22C7O4eJoiJIY/pub?output=csv&gid=38100828');
            const data = await response.text();

            const formattedData = data.split('\n').slice(2).map((row) => {
                const [ fullName, email ] = row.split(',');
                
                return { fullName, email }
            });
            const findUser = formattedData.find( user => userData.fullName === user.fullName || userData.email === user.email );
            
            // console.log('me estoy ejecutando...', findUser);
            if ( findUser ) {
                setData(( prevData ) => ({
                    ...prevData,
                    isLoading: false,
                    formCompleted: true
                }))
                setUserHasAlreadyCompletedForm( true );
                // console.log('EL USUARIO YA COMPLETO EL FORMULARIO');
            } else {
                setUserHasAlreadyCompletedForm( false );
                setCheckDone( true );
            }

        } catch (error) {
            console.log('Error: ', error);
        }
    }


    const fetchApi = async () => {

        setData((prevData) => ({
            ...prevData,
            isLoading: true
        }))

        try {
            
            
            // Se hace un fetch a la hoja de cálculo para obtener los datos
            const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vRAg9ixh_C_E4aYbeJDmPO_X99xpvsCQMyGhggqoSZ2hSH-KIvkYEY3AjIHpuIlRVYEGNgJ0Zvc208b/pub?output=csv');
            
            // Se transforman los datos obtenidos en texto
            const data = await response.text();
            
            // Data contiene toda la información del google sheets que viene escrita en filas igual que como sería una tabla. Es decir nombre de tabla, nombre de columnas, elementos. Entonces se va a armar un array (split) con todos los elementos que trae la tabla y se va a indicar que separe los elementos por salto de línea '\n'. 
            // Se arma un array con los elementos separados por salto de línea y luego se va toman únicamente los elementos a partir de la posición 2 para evitar titulo y columnas.
            // Luego se hace un map para recorrer el array y ordenar los elementos. Para cada línea, utiliza split(',') para dividir la línea en un array de columnas, usando la coma como delimitador. Luego, utiliza la desestructuración para asignar esas columnas a las variables nombre, cantidad e imagen. Por último se arma un objeto con las variables.
            const formattedData = data.split('\n').slice(2).map((row) => {
                const [ nombre, cantidad, imagen ] = row.split(',');
                
                return { nombre, cantidad: Number(cantidad), imagen }
            });
            
            // Se establece la variable filter data para filtrar la información que viene del google sheets por cantidad. Aquel producto cuya cantidad sea 0 no se va a utilizar. Del mismo modo se le va a agregar a cada objeto la propiedad 'isSelected' en false para luego actualizarla a true cuando se cliquea.

            let filterData = formattedData.filter(( element ) => element.cantidad > 0);
            filterData = filterData.map(( element ) => ({
                ...element,
                isSelected: false,
            }));

            // console.log({ filterData });
            localStorage.setItem('info', JSON.stringify(filterData));

            setData((prevData) => ({
                ...prevData,
                isLoading: false,
                info: filterData,
            }));


        } catch (error) {
            console.error('Hay un error en el fetch para obtener los datos, hooks/useFetch: ', error);
        }

    }

    useEffect(() => {
        if ( !checkDone ) {
            // console.log('estoy aca');
            checkUserSheets(formSubmitted);
        }
    }, [ formSubmitted ]);

    useEffect(() => {
        if ( checkDone && !userHasAlreadyCompletedForm) {
            // console.log("Ejecutando el use effect...: ", userHasAlreadyCompletedForm);
            fetchApi();
        }
    }, [ checkDone ])

    return { data };
}
