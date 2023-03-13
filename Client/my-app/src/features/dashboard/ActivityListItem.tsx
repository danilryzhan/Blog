import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemDescription, ItemImage, Segment } from "semantic-ui-react";
import { Activity } from "../../App/models/Activity";

interface Props {
  act: Activity;
}
export default function ActivityListItem({ act }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <ItemImage size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${act.id}`}>
                {act.title}
              </Item.Header>
              <ItemDescription>Hosted by Bob</ItemDescription>
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
        Attendees go here
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
