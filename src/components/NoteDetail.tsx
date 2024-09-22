import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNoteById, deleteNote } from '../services/api';

interface Note {
  id: string;
  title: string;
  content: string;
}

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  // Fetch the note details when the component mounts
  useEffect(() => {
    if (id) {
      getNoteById(id)
        .then(response => setNote(response.data))
        .catch(error => console.error('Error fetching note:', error));
    }
  }, [id]);

  // Handle the delete action
  const handleDelete = () => {
    if (id) {
      deleteNote(id)
        .then(() => {
          alert('Note deleted successfully');
          navigate('/');
        })
        .catch(error => console.error('Error deleting note:', error));
    }
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <div style={{ marginTop: '20px' }}>
        <Link to={`/edit/${id}`}>
          <button style={{ marginRight: '10px' }}>Edit</button>
        </Link>
        <button onClick={handleDelete} style={{ backgroundColor: '#dc3545' }}>
          Delete
        </button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/">
          <button style={{ backgroundColor: '#6c757d' }}>Back to Notes</button>
        </Link>
      </div>
    </div>
  );
};

export default NoteDetail;
