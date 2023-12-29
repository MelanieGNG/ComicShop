import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import RegistrarUsuarioTask from '../tasks/RegistrarUsuarioTask';

export default function FormularioRegistro() {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [verificarPassword, setVerificarPassword] = useState('');
    const navigate = useNavigate();

    async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const registrarUsuarioTask = new RegistrarUsuarioTask({
            nombreCompleto,
            nombreUsuario,
            password,
            verificarPassword
        });

        try {
            await registrarUsuarioTask.execute();
            navigate('/index');
        } catch (e) {
            console.error(e);

            const message = (e as Error).message;

            switch (message) {
                case 'ErrorFormularioIncompleto':
                    window.alert('Llenar todo el formulario.');
                    break;
                case 'ErrorPasswordsNoCoinciden':
                    window.alert('Las passwords no coinciden.');
                    break;
                case 'ErrorNombreUsuarioDuplicado':
                    window.alert('El nombre de usuario que eligio ya existe');
                    break;
                default:
                    window.alert('Ha ocurrido un error. Vuelva a intentarlo.')
            }
        }
    }

    function handleNombreCompletoChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreCompleto = event.target.value;
        setNombreCompleto(valorNombreCompleto);
    }

    function handleNombreUsuarioChange(event: ChangeEvent<HTMLInputElement>) {
        const valorNombreUsuario = event.target.value;
        setNombreUsuario(valorNombreUsuario);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorPassword = event.target.value;
        setPassword(valorPassword);
    }

    function handleVerificarPasswordChange(event: ChangeEvent<HTMLInputElement>) {
        const valorVerificarPassword = event.target.value;
        setVerificarPassword(valorVerificarPassword);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label htmlFor="txtNombreCompleto">Nombre Completo:</Form.Label>
                <Form.Control
                    type="text"
                    name="nombreCompleto"
                    id="txtNombreCompleto"
                    value={nombreCompleto}
                    onChange={handleNombreCompletoChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtNombreUsuario">Nombre de Usuario:</Form.Label>
                <Form.Control
                    type="text"
                    name="nombreUsuario"
                    id="txtNombreUsuario"
                    value={nombreUsuario}
                    onChange={handleNombreUsuarioChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtPassword">Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    id="txtPassword"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="txtVerificarPassword">Verificar Password:</Form.Label>
                <Form.Control
                    type="password"
                    name="verificarPassword"
                    id="txtVerificarPassword"
                    value={verificarPassword}
                    onChange={handleVerificarPasswordChange}
                />
            </Form.Group>
            <br></br>
            <Button type="submit" variant="primary">Registrarse</Button>
        </Form>
    );
}
