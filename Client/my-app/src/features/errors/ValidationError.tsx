import React from "react"
import { Link } from "react-router-dom";
import { Button, Header, Icon, Message, Segment } from "semantic-ui-react";
interface Props {
    errors:string[];
}
 
function ValidationError ({errors}:Props)  {
    return ( 
        <Segment placeholder>
            <Message error>
                {errors&&(
                    <Message.List>
                        {errors.map((err:string,i)=>(
                            <Message.Item key={i}>{err}</Message.Item>
                        ))}
                    </Message.List>
                )}
            </Message>
            
        </Segment>
     );
}
 
export default ValidationError;