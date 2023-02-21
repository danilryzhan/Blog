import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../App/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../forms/ActivityForm";
import ActivityList from "./ActivityList";


interface Props {
    activities:Activity[];
    selectedActivity:Activity|undefined;
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity) => void;
    deleteActivity:(id:string)=>void;
    submiting:boolean;
}

export default function ActivitiyDashvoard({activities,selectedActivity ,selectActivity,cancelSelectActivity,
  editMode,openForm,closeForm,createOrEdit,deleteActivity,submiting}:Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} 
        deleteActivity ={deleteActivity}
        selectActivity={selectActivity}
        submiting={submiting}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity&& !editMode&&
        <ActivityDetails 
        activity={selectedActivity} 
        cancelSelectActivity={cancelSelectActivity}
        openForm={openForm}
        
        />}
        {editMode&&
        <ActivityForm createOrEdit={createOrEdit} 
        closeForm={closeForm}
        activity={selectedActivity}
        submiting = {submiting}
        />}
      
      </Grid.Column>
    </Grid>
  );
}
