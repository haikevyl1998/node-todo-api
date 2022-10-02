import { Route, BrowserRouter, Routes } from "react-router-dom";
import routes from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route path={route.path} element={route.element} key={route.key}>
            {route.isGroup &&
              route.children.map((it) => (
                <Route
                  index={it.index}
                  path={it.path}
                  element={it.element}
                  key={it.key}
                />
              ))}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
