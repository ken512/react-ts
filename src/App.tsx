import './App.css';
import { Routes, Route } from 'react-router-dom';
import PostsList from './PostsList';
import DetailsPage from './DetailsPage';
import InquiryPage from './InquiryPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostsList />} />
      <Route path="/post/:id" element={<DetailsPage  />} />
      <Route path="/inquiry" element={<InquiryPage />} />
    </Routes>
  );
};

export default App;