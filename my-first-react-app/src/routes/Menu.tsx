import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import FormularioRegistro from '../components/FormularioRegistro';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import Carousel from 'react-bootstrap/Carousel';



export default function Menu() {
    return (
        <>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="http://www.abysscompany.com/assets/img/artist/movie/sunmi/top/SM_210806_YCSWU_top.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/1200px-Marvel_Logo.svg.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cn.i.cdn.ti-platform.com/cnlatam/content/8/showpage/hora-de-aventura/ar/showpano.png"
          alt="Third slide"
        />

        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

            
            <br></br>
            <Row>
            <Col md={{ span: 4, offset: 5 }}>
        <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src="https://images.squarespace-cdn.com/content/v1/571abd61e3214001fb3b9966/1b0f0c7b-7b0c-412a-8de3-f131c1e07f94/One+Piece+100.jpg/100px180" />
        <Card.Body>
        <Card.Title>Mangas</Card.Title>
        <Card.Text>
            Adentrate en la aventura pirata de Luffy y su tripulación, desde tan solo 
            $89
        </Card.Text>
        <Button variant="primary"> <Link to='/mangas'>Ir al sitio</Link> </Button>
        </Card.Body>
        </Card>
        </Col>
        </Row>
            <br />
            <Row>
            <Col md={{ span: 4, offset: 5 }}>
        <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src="https://m.media-amazon.com/images/I/91a97u0fSFL.jpg" />
        <Card.Body>
        <Card.Title>Comics</Card.Title>
        <Card.Text>
            Encuentra comics de para poder estar al día con tus superhéroes favoritos, caricaturas o cualquier serie que estés buscando desde $20
        </Card.Text>
        <Button variant="primary"> <Link to='/comics'>Ir al sitio</Link> </Button>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        <br />
        <br />
        <Row>
            <Col md={{ span: 4, offset: 5 }}>
        <Card style={{ width: '18rem' }} >
        <Card.Img variant="top" src="https://ih1.redbubble.net/image.1016236908.5282/flat,750x,075,f-pad,750x1000,f8f8f8.jpg" />
        <Card.Body>
        <Card.Title>Posters</Card.Title>
        <Card.Text>
            Compra posters para adornar tu habitación, sala de estar o regalarle un detalle a algún amigo desde 
            $30
        </Card.Text>
        <Button variant="primary"> <Link to='/posters'>Ir al sitio</Link></Button>
        </Card.Body>
        </Card>
        </Col>
        </Row>
        
        
        </>
    );
}
