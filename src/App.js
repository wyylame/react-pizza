import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Cart from "./components/pages/Cart";
import Home from "./components/pages/Home";
import NotFound from "./components/pages/NotFound";

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
