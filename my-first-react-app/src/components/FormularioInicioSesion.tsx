import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import IniciarSesionUsuarioTask from '../tasks/IniciarSesionUsuarioTask';

export default function FormularioInicioSesion() {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const iniciarSesionUsuarioTask = new IniciarSesionUsuarioTask({
            nombreUsuario,
            password
        });

        try {
            await iniciarSesionUsuarioTask.execute();
            navigate('/index');
        } catch (e) {
            console.error(e);

            const message = (e as Error).message;

            if (message === 'ErrorFormularioIncompleto') {
                window.alert('Llenar todos los campos del formulario.');
            } else {
                window.alert('Error de usuario o password.');
            }
        }
    }

    function handleNombreUsuarioChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label htmlFor="txtNombreUsuario">
                    Nombre de Usuario:
                </Form.Label>
                <Form.Control
                    type="text"
                    id="txtNombreUsuario"
                    name="nombreUsuario"
                    value={nombreUsuario}
                    onChange={handleNombreUsuarioChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPassword">
                    Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    id="txtPassword"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            
            <br></br>
            <Button
                type="submit"
                variant="primary"
            >
                Iniciar Sesion
            </Button>
        </Form>
    );
}
