import React, { useCallback,useEffect } from "react";
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
export default function Index(props) {

    const nav = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const queryStr_ih = searchParams.get("ih");


    useEffect(() => {
        
        // Navigate to the iSaucers home page
        if(queryStr_ih == '1'){
            nav("/")
        }
        else{
         let LoginType = localStorage.getItem('isLogin') || '';
         if(LoginType === 'S'){
            localStorage.setItem('isLogin','');
            nav("/staff")
         }
         else{
            localStorage.setItem('isLogin','');
            nav("/login")
         }
        }
    }, []);
    return (

        <>
        </>

    );
}   