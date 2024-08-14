import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Movies from './components/Movies.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import DisplayShows from './components/DisplayShows.js'
import BookSeats from './components/BookSeats.js'

function AppLayout() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Movies />
        },
        {
            path: '/signup',
            element: <Signup />
        },
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/:id/shows',
            element: <DisplayShows />
        },
        {
            path: '/:id/bookseats',
            element: <BookSeats />
        },
        {
            path: '/addmovies',
            //{element: <AddMovie />}
        },
        {
            path: '/addshoes',
            //{element: <AddShow />}
        },
    ])
    return(
        <RouterProvider router = {router}/>
    )
}

export default AppLayout