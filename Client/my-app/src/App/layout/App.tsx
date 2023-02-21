import React, { Fragment, useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import ActivitiyDashvoard from '../../features/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoudingComponent';
function App() {
  const[activities,setActivities] =useState<Activity[]>([]);
  const[selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
  const [editMode,setEditMode] = useState(false);
  const [loading, setloading] = useState(true); 
  const [submiting, setsubmiting] = useState(false);
  
  useEffect(()=>{
    agent.Activities.list().then(response=>{
      response.forEach(activity => {
        activity.date = activity.date.split("T")[0];
      });
      setActivities(response);
      setloading(false);
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
    setsubmiting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities.filter(x=>x.id!==activity.id),activity]);
        console.log(activity);
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmiting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities ,activity]);
        
      }); 
      setSelectedActivity(activity);
        setEditMode(false);
        setsubmiting(false);
          
    }
    activity.id ? setActivities([...activities.filter(x=>x.id!=activity.id),activity]) 
    : setActivities([...activities,{...activity,id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }
  
  function handleDeleteActivity(id:string){
    setsubmiting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id!==id)])
      setsubmiting(false); 
    })
  }
  if (loading) return <LoadingComponent content='Loadong app '/>
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
      submiting = {submiting}
      />
     </Container>
     </Fragment>
  );
}

export default App;
