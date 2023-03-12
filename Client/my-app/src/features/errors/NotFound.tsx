
import React from "react"
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
interface Props {
    
}
 
function NotFound ()  {
    return ( 
        <Segment placeholder>
            <Header icon>
                <Icon name="search"></Icon>
                Oops - we've looked everywhere but could not fing what you are looking for!
                
            </Header>
            <Segment.Inline>
                <Button as={Link} to = '/activities'>
                    Return to acrivities page
                </Button>
            </Segment.Inline>
            
        </Segment>
     );
}
 
export default NotFound ;