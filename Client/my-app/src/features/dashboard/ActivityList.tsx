import { observer } from "mobx-react-lite";
import React, { SyntheticEvent, useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";



export default observer( function ActivityList()
{
    const {activityStore} = useStore();
    const [target, settarget] = useState('');
    const {deleteActivity,activitiesByDate,loading}=activityStore;

    function handlerDelete(e: SyntheticEvent<HTMLButtonElement> ,id:string)
    {
         settarget(e.currentTarget.name);
         deleteActivity(id);
    }
    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(act=>(
                    <Item key={act.id }>
                        <Item.Content>
                            <Item.Header as="a">{act.title}</Item.Header>
                            <Item.Meta>{act.date}</Item.Meta>
                            <Item.Description>
                                <div>{act.description}{act.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                            <Button onClick={()=>activityStore.selectActivity(act.id)} floated="right" content='View' color="blue"/>
                            <Button
                            name={act.id} 
                            loading={loading && target == act.id} 
                            onClick={(e)=>handlerDelete(e,act.id)}
                            floated="right" content='Delete' color="red"/>
                                <Label basic content ={act.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
                }
            </Item.Group>
        </Segment>

    )
})