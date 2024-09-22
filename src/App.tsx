import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import CreateEditNote from './components/CreateEditNote';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/notes/:id" element={<NoteDetail />} />
        <Route path="/create" element={<CreateEditNote />} />
        <Route path="/edit/:id" element={<CreateEditNote />} />
      </Routes>
    </Router>
  );
};

export default App;
