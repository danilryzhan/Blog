import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivitiyDashvoard from '../features/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
function App() {
  const[activities,setActivities] =useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  useEffect(()=>{
    axios.get<any>('http://localhost:5000/api/Activities').then(response=>{
      console.log(response);
      setActivities(response.data);
    })
  },[])

  function handleSelectedAactivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id))
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id?:string)
  {
    id?handleSelectedAactivity(id):handleCancelSelectActivity();
    setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateOrEditActivity(activity:Activity){
    activity.id ? setActivities([...activities.filter(x=>x.id!=activity.id),activity]) 
    : setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  
  function handleDeleteActivity(id:string){
    setActivities([...activities.filter(x=>x.id!==id)])
  }
  return (
    
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}} >
      <ActivitiyDashvoard activities = {activities}
      selectedActivity={selectedActivity}
      selectActivity = {handleSelectedAactivity}
      cancelSelectActivity = {handleCancelSelectActivity}
      editMode={editMode}
      openForm={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit ={handleCreateOrEditActivity}
      deleteActivity ={handleDeleteActivity}
      />
     </Container>
     </Fragment>
  );
}

export default App;
