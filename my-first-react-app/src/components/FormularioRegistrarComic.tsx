import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Comic from '../models/Comic';
import RegistrarComicTask from '../tasks/RegistrarComicTask';

export default function FormularioRegistrarComic() {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0);
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent) {
        event.preventDefault();
        
        try {
            const registrarComicTask = new RegistrarComicTask(
                new Comic(undefined, nombre, precio)
            );

           
            
            await registrarComicTask.execute();
            navigate('/comics');
        } catch (e) {
            switch((e as Error).message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Olvidaste llenar todos los campos del formulario');
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
            <Form onSubmit={handleFormSubmit}>
                <Card>
                    <Card.Body>
                        <Form.Group>
                            <Form.Label htmlFor="txtNombre">
                                Nombre
                            </Form.Label>
                            <Form.Control
                                id="txtNombre"
                                type="text"
                                name="nombre"
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
                        <Button variant="primary" type="submit">
                            Registrar
                        </Button>
                    </Card.Footer>
                </Card>
            </Form>
        </>
    );
}
