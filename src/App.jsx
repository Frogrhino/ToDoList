import "./App.css";
import ToDoList from "./components/ToDoList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ReactModal from "react-modal";
import { Routes, Route, Link } from "react-router-dom";
import ArchiveToDos from "./components/ArchiveToDos";

function App() {
  ReactModal.setAppElement("#root");

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todolist" element={<ToDoList />} />
        <Route path="archive-todolist" element={<ArchiveToDos />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
