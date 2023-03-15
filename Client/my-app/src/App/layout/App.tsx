import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/home";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/Store";
import LoadingComponent from "./LoudingComponent";
import ModalContainer from "../common/modals/ModalContainer";
function App() {
  const location = useLocation();
  const {commonStore,userStore} = useStore();
  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setApploaded())
    }else{
      commonStore.setApploaded()
    }

    
  }, [commonStore,userStore])
  if(!commonStore.appLoaded){
    <LoadingComponent content="Loadin activiteis..."/>
  } 

  return (
    <>
    <ModalContainer/>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </> 
  );
}

export default observer(App);
