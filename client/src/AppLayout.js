import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import Movies from './components/Movies.js'
import Signup from './components/Signup.js'
import Login from './components/Login.js'
import DisplayShows from './components/DisplayShows.js'
import BookSeats from './components/BookSeats.js'
import AddMovie from './components/AddMovie.js'
import AddShow from './components/AddShow.js'
import EditMovie from './components/EditMovie.js'
import EditShow from './components/EditShow.js'

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
            path: '/addmovie',
            element: <AddMovie />
        },
        {
            path: '/editmovie/:movieId',
            element: <EditMovie />
        },
        {
            path: '/addshow',
            element: <AddShow />
        },
        {
            path: '/editshow/:showId',
            element: <EditShow />
        },
    ])
    return(
        <RouterProvider router = {router}/>
    )
}

export default AppLayout