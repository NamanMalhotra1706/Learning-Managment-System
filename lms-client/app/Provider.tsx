import React from "react";
import {store} from "../redux/store"
import { Provider } from "react-redux";

interface ProviderProps{
    children: any;
}

export function Providers({children}:ProviderProps){
    return <Provider store={store}>{children}</Provider>
};