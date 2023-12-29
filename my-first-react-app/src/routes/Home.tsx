import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <>
            <p>Welcome!!</p>
            <Container fluid>
                <Outlet />
            </Container>
        </>
    );
}

