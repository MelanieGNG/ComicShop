import { Form, Card, Button , Modal} from 'react-bootstrap';
import { ChangeEvent, FormEvent, useState } from 'react';
import Poster from '../models/Poster';
import PostersService from '../services/PostersService';
import ActualizarPosterTask from '../tasks/ActualizarPosterTask';
import { useNavigate } from 'react-router-dom';


interface FormularioActualizarPosterProps {
    poster: Poster
}

export default function FormularioActualizarPoster(
    { poster }: FormularioActualizarPosterProps
) {
    const [nombre, setNombre] = useState(poster.nombre);
    const [precio, setPrecio] = useState(poster.precio);
    const idPoster = poster.id;
    const navigate = useNavigate();

    {/*Funcion eliminar*/}
    async function handleFormEliminar(
        event: FormEvent
    ){
        event.preventDefault();

       

            try {
                const postersService= new PostersService();
                await postersService.eliminarPoster(idPoster);
                navigate('/posters');
            } catch (e) {
                switch((e as Error).message) {
                    case 'ErrorFormularioIncompleto':
                        window.alert('Faltan campos por llenar');
                        break;
                    default:
                        window.alert('Ha ocurrido un error desconocido');
                }
            }
        
    }

    const[show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    function acAlert(){
        window.alert('Se ha actualizado este registro.')
    }

    {/*Funcion actualizar*/}
    async function handleFormActualizar(
        event: FormEvent
    ){
        event.preventDefault();

        try {
            const actualizarPosterTask = new ActualizarPosterTask(
                new Poster(idPoster, nombre, precio)
            );

            acAlert();

            await actualizarPosterTask.execute();
            navigate('/posters');
        } catch (e) {
            switch((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Faltan campos por llenar');
                    break;
                default:
                    window.alert('Ha ocurrido un error desconocido');
            }
        }
    }

    function handleFormControlChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        const valor = event.target.value;

        switch (event.target.name) {
            case 'nombre':
                setNombre(valor);
                break;
            case 'precio':
                setPrecio(parseFloat(valor));
                break;
            default:
                return;
        }
    }

    return (
        <>
            <Form>
                <Card>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label htmlFor="txtNombre">
                                Nombre
                            </Form.Label>
                            <Form.Control
                                id="txtNombre"
                                type="text"
                                name="modelo"
                                value={nombre}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="txtPrecio">
                                Precio
                            </Form.Label>
                            <Form.Control
                                id="txtPrecio"
                                type="number"
                                name="precio"
                                value={precio}
                                onChange={handleFormControlChange}
                            />
                        </Form.Group>
                    </Card.Body>

                    <br></br>
                    <Card.Footer>
                        <Button onClick={handleFormActualizar} variant="ligth" type="submit">
                            Actualizar
                        </Button>
                        {/* Boton eliminar*/}
                        <Button onClick={handleShow} id='eliminar' className='float-end' variant="secondary" >
                            Eliminar
                        </Button>

                        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Pavlitoh Shop
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                ¿Seguro de que quieres eliminar este Poster?
                            </Modal.Body>
                            <Modal.Footer> 
                                <Button variant="secondary" onClick={handleFormEliminar}>
                                    Aceptar
                                </Button>
                                <Button variant="light" onClick={handleClose}>
                                    Cancelar
                                </Button>
                                </Modal.Footer> 
                            </Modal>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}