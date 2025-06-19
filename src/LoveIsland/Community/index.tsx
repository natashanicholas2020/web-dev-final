import { Routes, Route, Link } from "react-router-dom";
import Post from "./Post";

export default function Community() {
  return (
    <div id="wd-community-screen">
      <h2>Community</h2>

      <Link to="post">Create a Post</Link>

      <Routes>
        <Route
          index
          element={<p>Welcome to the Community! Click above to make a post.</p>}
        />
        <Route path="post" element={<Post />} />
      </Routes>
    </div>
  );
}
