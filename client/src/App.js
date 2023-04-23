import './App.css';
import CardItem from './components/CardItem';
import Sidebar from './components/Sidebar';
import Board from './components/Board'

function App() {
  return (
  <div className="App flex flex-row flex-auto overflow-hidden h-full">
    <Sidebar className="flex-none"/>
    <Board className="flex-none"/>
  </div>
      
  //  Hola como estas 
  );
}

export default App;
