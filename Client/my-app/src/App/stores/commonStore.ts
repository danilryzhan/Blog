import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/serverError";

export default class CommonStore{
    error:ServerError | null = null;
    token: string| null = localStorage.getItem('jwt');
    appLoaded = false;

    constructor(){
        makeAutoObservable(this);
        reaction(
            ()=>this.token,
            token => {
                if(token){
                    localStorage.setItem('jwt',token)
                }else{
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setServerError(error:ServerError){
        this.error = error
    }

    setToken = (token: | null )=>{
        this.token = token;
    }
    setApploaded=()=> {
        this.appLoaded=true;
    }
}