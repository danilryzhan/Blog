import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>

          {activities.map((act) => (
            <ActivityListItem key={act.id} act={act} />
          ))}
        </Fragment>
      ))}
    </> 
  );
});
