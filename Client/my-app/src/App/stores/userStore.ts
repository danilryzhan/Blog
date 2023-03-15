import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/routes";
import { store } from "./Store";

export default class UserStore{
    user:User| null = null;

    constructor () {
        makeAutoObservable(this)
    }

    get isLoggedIn(){
        return !!this.user;
    }
    register=  async (creds:UserFormValues) =>{
        try{
            console.log(creds);
            const user = await agent.Account.registre(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user = user)
            router.navigate('/activities');
            store.modalStore.closeModel();
           
         } catch(error){
         throw error;
        }
    }
    login =  async (creds:UserFormValues) =>{
        try{
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(()=>this.user = user)
            router.navigate('/activities');
            store.modalStore.closeModel();
           
         } catch(error){
         throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user= null;
        router.navigate('/')
    }
    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            
        } catch (error) {
            console.log(error); 
        }
    }
 

} 