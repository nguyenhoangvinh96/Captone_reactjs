import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from './app/routes'
import NotFoundPage from "./components/NotFoundPage";
import Dashboard from "./features/Admin/Dashboard";
import ListFilms from "./features/Admin/Listfilms";
import { fetchProfile } from "./features/Auth/thunk";
import RouteComponent from "./HOCs/AppRoute";
import User from "./features/Admin/User";
import NewFilms from "./features/Admin/NewFilms";
import Editfilms from "./features/Admin/Editfilms";
import Showtime from "./features/Admin/Showtime";
import RouteAdmin from "./HOCs/AppRouteAdmin";

 
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile);
  }, [])
  return (
    <BrowserRouter>

      <Routes>
        {routes.map(({ path, component: Component, isPrivate , isAuth, redirectPath , }) =>
          <Route key={path} path={path} element={<RouteComponent isPrivate={isPrivate} isAuth={isAuth} Component={Component} redirectPath={redirectPath}  />}/>
        )}
        <Route path='/*' element={<NotFoundPage />} />
        <Route path="/admin" element={<RouteAdmin isAdmin={true} Component={Dashboard} redirectPath={"/signin"}/>} >
            <Route index element={<User/>} />
            <Route  path="films" element={<ListFilms/>} />
            <Route  path="films/addnew" element={<NewFilms/>} /> 
            <Route path="films/edit/:id" element={<Editfilms/>}/>
            <Route path="films/showtime/:id" element={<Showtime/>} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
