import {  useField } from "formik";
import React, { FunctionComponent } from "react";
import { Form, Label, Select } from "semantic-ui-react";
import DatePicker ,{ReactDatePickerProps} from 'react-datepicker'

interface Props {
    placeholder:string;
    name:string;
    options:any;
    label?:string;
}
 
const MyDateInput :  FunctionComponent<Partial<ReactDatePickerProps>> = (props) => {
  const [field, meta,helpers] = useField(props.name!);
  
    return ( 
       <Form.Field error={meta.touched && !!meta.error}>
       <DatePicker 
       {...field}
       {...props}
       selected = {(field.value && new Date (field.value)) || null}
       onChange = {value => helpers.setValue(value)}
       
       />
        {meta.touched && meta.error ? (
            <Label basic color="red">{meta.error}</Label>
        ):null}
       </Form.Field>
     )
}
 
export default MyDateInput ;