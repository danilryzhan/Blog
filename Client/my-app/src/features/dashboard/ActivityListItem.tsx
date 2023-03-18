import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemDescription, ItemImage, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../App/models/Activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
  act: Activity;
}
export default function ActivityListItem({ act }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {act.isCancelled && 
        <Label attached="top" color="red" content='Canclled' style = {{textAlign:'center'}}/>
        }
        <Item.Group>
          <Item>
            <ItemImage style={{marginBottom:3}}  size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${act.id}`}>
                {act.title}
              </Item.Header>
              <ItemDescription>Hosted by {act.host?.displayName}</ItemDescription>
              
              {act.isHost && (
                <Item.Description>
                  <Label basic color="orange">You are hosting this activity</Label>
                </Item.Description>
              )}
               {act.isGoing && !act.isHost && (
                <Item.Description>
                  <Label basic color="green">You are going this activity</Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
            <Icon name="clock"/> {format( act.date!,'dd MMM yyyy h:mm aa')}
            <Icon name="marker"/> {act.venue}
        </span>
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendee attendees={act.attendees!}/>
      </Segment>
      <Segment clearing>
        <span>{act.description}</span>
        <Button 
        
        as = {Link}
        to ={`/activities/${act.id}`}
        color='teal'
        floated="right"
        content='View'
         />
      </Segment>
    </Segment.Group>
  );
}
