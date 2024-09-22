// NotesListPage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotes } from '../services/api';

const NotesListPage: React.FC = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await getNotes();
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="container">
      <h1>Notes</h1>
      <Link to="/create">
        <button>Create New Note</button>
      </Link>
      <ul>
        {notes.map((note: any) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesListPage;
