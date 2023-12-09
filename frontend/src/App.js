
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="container dark">
          <div className="app">
            <Header />

            <Routes>
              <Route exact path="/" Component={NotesListPage}  />
              <Route path="/notes/:noteid" Component={NotePage} />
            </Routes>

          </div>
        </div>
      
    </Router>

  );
}

export default App;