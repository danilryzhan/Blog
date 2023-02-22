import React, { Fragment, useEffect, useState } from 'react';
import { Activity } from '../models/Activity';
import NavBar from './NavBar';
import {  Container } from 'semantic-ui-react';
import ActivitiyDashvoard from '../../features/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoudingComponent';
import { useStore } from '../stores/Store';
import { observer } from 'mobx-react-lite';
function App() {

  const {activityStore} = useStore();
  
  useEffect(()=>{
    activityStore.loadActivities();
  },[activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='Loadong app '/>
  return (
    
    <Fragment>
      <NavBar />
      <Container style={{marginTop: '7em'}} >
      <ActivitiyDashvoard />
     </Container>
     </Fragment>
  );
}

export default observer(App);
