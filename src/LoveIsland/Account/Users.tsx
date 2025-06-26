import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert, Spinner } from 'react-bootstrap';

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  followers: string[];
  following: string[];
};

type Post = {
  _id: string;
  message: string;
  datetime: string;
  // add other fields you want
};

export default function Users() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('token');

        // Fetch user info
        const userRes = await fetch(`http://localhost:4000/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');

        const userData: User = await userRes.json();
        setUser(userData);

        // Fetch user posts
        const postsRes = await fetch(`http://localhost:4000/api/users/${username}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!postsRes.ok) throw new Error('Failed to fetch posts');

        const postsData: Post[] = await postsRes.json();
        setPosts(postsData);

        // Check if current user follows this user
        const currentUsername = localStorage.getItem('username');
        setIsFollowing(userData.followers.includes(currentUsername || ''));

      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  const handleFollowToggle = async () => {
    if (!user) return;
    setFollowLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const endpoint = isFollowing
        ? `http://localhost:4000/api/users/${username}/unfollow`
        : `http://localhost:4000/api/users/${username}/follow`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to update follow status');
      }

      setIsFollowing(!isFollowing);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!user) return <p>User not found</p>;

  return (
    <div className="container py-4">
      <h2>{user.firstName} {user.lastName} ({user.username})</h2>
      <p>Email: {user.email}</p>
      <p>DOB: {user.dob}</p>
      <p>Role: {user.role}</p>

      <Button onClick={handleFollowToggle} disabled={followLoading}>
        {followLoading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          isFollowing ? 'Unfollow' : 'Follow'
        )}
      </Button>

      <hr />

      <h3>Posts by {user.username}</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p>{post.message}</p>
            <small>{new Date(post.datetime).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}