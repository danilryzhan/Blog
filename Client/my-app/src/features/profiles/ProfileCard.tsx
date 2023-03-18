import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card ,Icon,Image} from "semantic-ui-react";
import { Profile } from "../../App/models/profile";

interface Props{
    profile:Profile;
}

export default observer(function ProfileCard({profile}:Props){
    return (
        <Card as ={Link} to = {`/profile/${profile.username}`}>
            <Image src={profile.image || '/assets/user.png'}/>
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>Bio here</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name="user"/>
                20 folowers
            </Card.Content>
        </Card>
    )

}
)