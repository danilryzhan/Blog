import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Activity, ActivityFormValues } from "../models/Activity";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/routes";
import { store } from "../stores/Store";

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody =     (response: AxiosResponse) => response.data;
axios.interceptors.request.use(config =>{
    const token = store.commonStore.token;
    if(token && config.headers ) config.headers.Authorization = `Bearer ${token}`
    return config;
})
axios.interceptors.response.use(async response =>{
    return response;


},(error:AxiosError) => {
    const {data,status,config} = error.response as AxiosResponse;
    switch(status){
        case 400:
            if(config.method ==='get'&& data.errors.hasOwnProprty('id'))
            {
                router.navigate('/not-found')
            }
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key]);
                    }
                }
                throw modalStateErrors.flat();
            }
            else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error('unauthorised')
            break;
        case 403:
            toast.error('forbidden')
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            router.navigate('/server-error');
            break;


    }
    return Promise.reject(error);
}
)
const requests = {
    get:<T>(url:string)=> axios.get<T>(url).then<T>(responseBody),
    post:<T>(url:string,body:{})=> axios.post<T>(url,body).then(responseBody),
    put:<T>(url:string,body:{})=> axios.put<T>(url,body).then(responseBody),
    del:<T>(url:string)=> axios.delete<T>(url).then(responseBody),
}

const Activities ={
    list:()=> requests.get<Activity[]>('/activities'),
    details:(id:string) => requests.get<Activity>(`/activities/${id}`),
    create:(activity:ActivityFormValues)=> requests.post<void>('/activities',activity),
    update:(activity:ActivityFormValues)=> requests.post<void>(`/activities/${activity.id}`,activity),
    delete: (id:string) =>requests.del<void>(`/activities/${id}`),    
    attend:(id:string) => requests.post<void>(`/activities/${id}/attend`,{ })
}
const Account = {
    current:()=> requests.get<User>('/account'),
    login:(user:UserFormValues) => requests.post<User>('/account/login',user),
    registre: (user: UserFormValues) => { console.log(user); return requests.post<User>('/account/register',user);}
}


const agent ={
    Activities,
    Account
}

export default agent;