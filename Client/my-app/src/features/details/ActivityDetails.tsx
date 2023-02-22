import React from "react";
import { Button, Card,Image} from "semantic-ui-react";
import LoadingComponent from "../../App/layout/LoudingComponent";
import { useStore } from "../../App/stores/Store";


export default function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity:activity,cancelSelectedActivity,openForm} = activityStore;
  
  if(!activity) return <LoadingComponent/>;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className={activity.date}>Joined in 2015</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={()=>openForm(activity.id)} basic color="blue" content="Edit" />
        <Button onClick={cancelSelectedActivity} basic color="grey" content="Cancel" />
      </Card.Content>
    </Card>
  );
}
