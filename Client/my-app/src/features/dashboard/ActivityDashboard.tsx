import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../App/models/Activity";
import { useStore } from "../../App/stores/Store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import ActivityList from "./ActivityList";




export default observer ( function  ActivitiyDashvoard() {
    const {activityStore} = useStore();
    
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {activityStore.selectedActivity && !activityStore.editMode&&
        <ActivityDetails/>}
        {activityStore.editMode&&
        <ActivityForm  />}
      
      </Grid.Column>
    </Grid>
  );
})
