
// import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home.jsx'
import Prof from './Prof.jsx';
import Flag from './Flag.jsx';
import Intro from './Intro.jsx'
import Pacman from './Pacman.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Prof" element={<Prof />} />
            <Route path="Flag" element={<Flag />} />
            <Route path="Intro" element={<Intro />} />
            <Route path="Pacman" element={<Pacman />} />
            {/* <Route path="Ground" element={<Ground />} /> */}
            {/* <Route path="Easy" element={<Easy />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
