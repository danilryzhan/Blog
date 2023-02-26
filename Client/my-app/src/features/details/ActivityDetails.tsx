import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Card,Image} from "semantic-ui-react";
import LoadingComponent from "../../App/layout/LoudingComponent";
import { useStore } from "../../App/stores/Store";


export default observer (function ActivityDetails() {
  const {activityStore} = useStore();
  const {selectedActivity:activity,loadActivity,loadingInitial} = activityStore;
  const {id} = useParams()
  useEffect(() => {
   if (id) loadActivity(id);
  
    
  }, [id, loadActivity])
  
  
  if(loadingInitial || !activity) return <LoadingComponent/>;

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
        <Button as = {Link} to= {`/manage/${activity.id}`} basic color="blue" content="Edit" />
        <Button as = {Link} to = '/activities' basic color="grey" content="Cancel" />
      </Card.Content>
    </Card>
  );
})
