import {ErrorMessage, Form, Formik} from 'formik';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FunctionComponent } from 'react';
import { Button, Header, Label } from 'semantic-ui-react';
import MyTextInput from '../../App/common/form/MyTextInput';
import { useStore } from '../../App/stores/Store';

interface  Props {
    
}
 
export default observer( function LoginForm  ()
 {
   const {userStore} = useStore();
    return ( 
        <Formik 
        initialValues={{email:"", password:'',error:null}}
        onSubmit={(values,{setErrors}) =>userStore.login(values).catch(error => 
            setErrors({error:'Invalid email or password'}))}
        >
            {({handleSubmit, isSubmitting,errors}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete = 'off'>
                    <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center'/>
                    <MyTextInput placeholder='Email' name='email' ></MyTextInput>
                    <MyTextInput placeholder='Password' name = 'password' type = 'password'/>
                    <ErrorMessage name = 'error' render={()=>
                    <Label style = {{marginBottom:10}} 
                    basic 
                    color='red'
                    content = {errors.error}/> 
                    }/>
                    <Button loading={isSubmitting} positive content = 'Login' type='submit' fluid/>
                </Form>
            )}

        </Formik>
     );
})
 
