import {  useField } from "formik";
import React, { FunctionComponent } from "react";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder:string;
    name:string;
    label?:string;

}
 
const MyTextArea :  FunctionComponent<Props> = (props) => {
  const [field, meta] = useField(props.name);
  
    return ( 
       <Form.Field error={meta.touched && !!meta.error}>
        <label>{props.label}</label>
        <textarea  {...field} {...props}/>
        {meta.touched && meta.error ? (
            <Label basic color="red">{meta.error}</Label>
        ):null}
       </Form.Field>
     )
}
 
export default MyTextArea ;