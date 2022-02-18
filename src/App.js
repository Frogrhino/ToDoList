import "./App.css";
import ToDoList from "./components/ToDoList";
import ReactModal from "react-modal";

function App() {
  ReactModal.setAppElement('#root');

  return <ToDoList />;
  
}

export default App;
