import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
