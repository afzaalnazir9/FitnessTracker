import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Navbar';
import ExerciseList from './components/exercise/ExerciseList';
import CreateExercise from './components/exercise/CreateExercise';
import EditExercise from './components/exercise/EditExercise';
import CreateUser from './components/exercise/CreateUser';
import './App.css';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<ExerciseList/>} />
          <Route path="/edit/:id" element={<EditExercise/>} />
          <Route path="/create" element={<CreateExercise/>} />
          <Route path="/user" element={<CreateUser/>} />
      </Routes>
      {/* <Footer /> */}
    </Router>
    </div>
  );
}

export default App;
