import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card ,Header,Icon,Image, Tab} from "semantic-ui-react";
import { Profile } from "../../App/models/profile";

interface Props{
    profile:Profile;
}

export default observer(function ProfilePfotos({profile}:Props){
    return (
       <Tab.Pane>
        <Header icon='image' content='Photos'/>
        <Card.Group itemsPerRow={5}>
            {profile.photos?.map(item=>(
            <Card key={item.id}>
                 <Image src ={ item.url||'/assets/user.png'} />
            </Card>
            ))}
            
        </Card.Group>
       </Tab.Pane>
    )

}
)