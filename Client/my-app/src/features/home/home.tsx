import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";

export default function HomePage(){
    return(
        <Segment inverted textAlign="center" className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style = {{marginBottom: 12}} />
                    Reactivities
                </Header>
                <Header as = 'h2' inverted content='Welcom to Reactivities'></Header>
                <Button as={Link} to = '/activities' size="huge" inverted> Take me to the Activities</Button>
            </Container>

        </Segment>
    )
}