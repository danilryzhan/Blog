import {ErrorMessage, Form, Formik} from 'formik';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../App/common/form/MyTextInput';
import { useStore } from '../../App/stores/Store';
import * as Yup from 'yup';
import ValidationError from '../errors/ValidationError';


export default observer( function RegisterForm  ()
 {
   const {userStore} = useStore();
    return ( 
        <Formik 
        initialValues={{displayName:"",username:"",email:"", password:'',error:null}}
        onSubmit={(values,{setErrors}) =>userStore.register(values).catch(error => 
            setErrors({error}))}
        validationSchema = {Yup.object({
            displayName:Yup.string().required(),
            username:Yup.string().required(),
            password:Yup.string().required(),
            email:Yup.string().required(),
        })}
        >
            {({handleSubmit, isSubmitting,errors,isValid,dirty}) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete = 'off'>
                    <Header as='h2' content='Sing up to Reactivities' color='teal' textAlign='center'/>
                    <MyTextInput placeholder='Display Name' name='displayName' ></MyTextInput>
                    <MyTextInput placeholder='Username' name='username' ></MyTextInput>
                    <MyTextInput placeholder='Email' name='email' ></MyTextInput>
                    <MyTextInput placeholder='Password' name = 'password' type = 'password'/>
                    <ErrorMessage name = 'error' render={()=>
                    <ValidationError errors={errors.error}/>
                    }/>
                    <Button 
                    disabled={!isValid||!dirty|| isSubmitting}
                    loading={isSubmitting}
                    positive content = 'Register' type='submit' fluid/>
                </Form>
            )}

        </Formik>
     );
})
 
