import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../App/stores/Store";
import LoginForm from "../users/LoginForm";
import RegiesterForm from "../users/RegiesterForm";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as="h2" inverted content="Welcom to Reactivities"></Header>
            <Button as={Link} to="/activities" size="huge" inverted>
              GO to activities!
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => modalStore.openModal(<LoginForm />)}
              as={Link}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => modalStore.openModal(<RegiesterForm/>)}
              as={Link}
              size="huge"
              inverted
            >
              Register
            </Button>
          </>
        )}
      </Container>
    </Segment>
  );
});
