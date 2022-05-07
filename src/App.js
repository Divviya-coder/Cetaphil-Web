import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "./Components/Login";
import StoreScreen from "./Components/StoreScreen";
import Shelf from './Components/Shelf'
// import Photos from './Components/Photos'
// import Pasas from './Components/Pasas'
// import Position from './Components/Position'
// import Allocation from './Components/Allocation'
// import Segmentation from './Components/Segmentation'
// import Adjacency from './Components/Adjacency'
// import Sequencing from './Components/Sequencing'
import './App.css';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/storescreen" element={<StoreScreen />} />
        <Route path="/shelf" element={<Shelf />} />
        {/* <Route path="/photos" element={<Photos />} />
        <Route path="/pasas" element={<Pasas />} />
        <Route path="/position" element={<Position />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/segmentation" element={<Segmentation />} />
        <Route path="/adjacency" element={<Adjacency />} />
        <Route path="/sequencing" element={<Sequencing />} /> */}
      </Routes>
    </div>
  );
}