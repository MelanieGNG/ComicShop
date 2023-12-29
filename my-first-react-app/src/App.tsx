import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Home from './routes/Home';
import InicioSesion from './routes/InicioSesion';
import Registro from './routes/Registro';
import Comics from './routes/Comics';
import Posters from './routes/Posters';
import Mangas from './routes/Mangas';
import ListaMangas from './routes/ListaMangas';
import ListaComics from './routes/ListaComics';
import ListaPosters from './routes/ListaPosters';
import RegistrarManga from './routes/RegistrarManga';
import RegistrarComic from './routes/RegistrarComic';
import RegistrarPoster from './routes/RegistrarPoster';
import DetallePoster from './routes/DetallePoster';
import DetalleManga from './routes/DetalleManga';
import DetalleComic from './routes/DetalleComic';
import Menu from './routes/Menu';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/',
        index: true,
        element: <Navigate to='/registro' />
      },
      {
        path: '/inicioSesion',
        element: <InicioSesion />
      },
      {
        path: '/registro',
        element: <Registro />
      }
    ]
  },
  {
    path: '/index',
    element: <Menu />,
    index: true
  },
  {
    path: '/comics',
    element: <Comics />,
    children: [
      {
        path: '/comics',
        element: <ListaComics />,
        index: true
      },
      {
        path: '/comics/registrar',
        element: <RegistrarComic />
      },
      {
        path: '/comics/:idComic',
        element: <DetalleComic />
      }
    ]
  },
  {
    path: '/mangas',
    element: <Mangas />,
    children: [
      {
        path: '/mangas',
        element: <ListaMangas />,
        index: true
      },
      {
        path: '/mangas/registrar',
        element: <RegistrarManga />
      },
      {
        path: '/mangas/:idManga',
        element: <DetalleManga />
      }
    ]
  },
  {
    path: '/posters',
    element: <Posters />,
    children: [
      {
        path: '/posters',
        element: <ListaPosters />,
        index: true
      },
      {
        path: '/posters/registrar',
        element: <RegistrarPoster />
      },
      {
        path: '/posters/:idPoster',
        element: <DetallePoster />
      }
    ]
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
