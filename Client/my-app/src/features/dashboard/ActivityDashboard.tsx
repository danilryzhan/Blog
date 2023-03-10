import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../App/layout/LoudingComponent";
import { useStore } from "../../App/stores/Store";
import ActivityFilters from "./ActivityFiltres";
import ActivityList from "./ActivityList";




export default observer ( function  ActivitiyDashvoard() {
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry}= activityStore;
    useEffect(()=>{
      if(activityRegistry.size<= 1)loadActivities();
      
    },[loadActivities,activityRegistry.size])
  
  
    if (activityStore.loadingInitial) return <LoadingComponent content='Loadong app '/>
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList 
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
       <ActivityFilters/>
      </Grid.Column>
    </Grid>
  );
})
