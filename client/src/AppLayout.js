import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Header from './components/partials/Header.js'

function AppLayout() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Header />
        },
        {
            path: '/signup',
            // {element: <Signup />>}
        },
        {
            path: '/login',
            // {element: <Login />}
        },
        {
            path: '/movie/:id',
            // {element: <Shows />}
        },
        {
            path: '/show/:id',
            // {element: <BookSeats />}
        }
    ])
    return(
        <RouterProvider router = {router}/>
    )
}

export default AppLayout