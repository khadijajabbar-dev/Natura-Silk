import { Route } from 'react-router-dom';
import Blog from '../pages/Blog';
import BlogPost from '../pages/BlogPost';

export const blogRoutes = (
  <>
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
  </>
);
