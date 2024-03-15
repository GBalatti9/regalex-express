import { useState } from "react";


const initialState = {
    fullName: '',
    email: '',
    wapp: ''
}

export const useForm = () => {
    const [ userData, setUserData ] = useState(initialState);

    const handleInputChange = ({ name, value, checked, type }) => {
        console.log({ name, value });
        if (type === 'checkbox' ) {
            setUserData(( prevUserData ) => {
                let newState = { ...prevUserData }
                
                if ( checked ) {
                    newState.answer = name;
                }
                // else {
                //     console.log('SE DESELECCIONO');
                //     const [ fullName, wapp, email ] = Object.values(newState);
                //     newState = {
                //         fullName,
                //         wapp,
                //         email
                //     }
                // }
                return newState;
            })
        } else {

            setUserData(( prevUserData ) => ({
                ...prevUserData,
                [ name ]: value,
            }))
        }
    }

    return { userData, setUserData, handleInputChange }
}
