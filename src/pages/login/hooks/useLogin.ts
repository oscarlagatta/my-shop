import {ChangeEvent, useState} from "react";

export function useLogin() {
    const [formData, setFormData] = useState({username: '', password: ''});

    function changeHandler(e: ChangeEvent<HTMLInputElement>) {
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;

        setFormData((state) => ({...state, [name]: value}));

    }
    const isValid = formData.username.length && formData.password.length;

    return {
        formData,
        isValid,
        changeHandler
    }
}