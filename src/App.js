
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Route, Routes } from "react-router-dom";



function App() {





  return <>
  <BrowserRouter>
    <Navbar/>
<Routes>
<Route
              exact path="/"
              element={<News country="pk" category="top"/>}
            />
<Route
              exact path="/top"
              element={<News country="pk" category="top"/>}
            />
<Route
              exact path="/business"
              element={<News country="pk" category="business"/>}
            />
<Route
              exact path="/entertainment"
              element={<News country="pk" category="entertainment"/>}
            />
<Route
              exact path="/environment"
              element={<News country="pk" category="environment"/>}
            />
<Route
              exact path="/health"
              element={<News country="pk" category="health"/>}
            />
<Route
              exact path="/politics"
              element={<News country="pk" category="politics"/>}
            />
<Route
              exact path="/science"
              element={<News country="pk" category="science"/>}
            />
<Route
              exact path="/sports"
              element={<News country="pk" category="sports"/>}
            />
<Route
              exact path="/technology"
              element={<News country="pk" category="technology"/>}
            />
<Route
              exact path="/tourism"
              element={<News country="pk" category="tourism"/>}
            />
<Route
              exact path="/world"
              element={<News country="pk" category="world"/>}
            />

</Routes>


  
  </BrowserRouter>
  </>;
}

export default App;
