import { API_BASE_URL } from "../../config/api";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert, Spinner, Card } from 'react-bootstrap';

type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  role: string;
  followers?: string[];
  following?: string[];
};

type Post = {
  _id: string;
  message: string;
  datetime: string;
};

type Like = {
  _id: string;
  message: string;
  datetime: string;
};

type BookmarkedVideo = {
  id: string;
  title: string;
  description: string;
};

export default function Users() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState<BookmarkedVideo[]>([]);
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
        const userRes = await fetch(`${API_BASE_URL}/api/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error('Failed to fetch user');
        const userData: User = await userRes.json();
        setUser(userData);

        // Fetch user posts
        const postsRes = await fetch(`${API_BASE_URL}/api/users/${username}/posts`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!postsRes.ok) throw new Error('Failed to fetch posts');
        const postsData: Post[] = await postsRes.json();
        setPosts(postsData);

        // Fetch user likes
        const likesRes = await fetch(`${API_BASE_URL}/api/users/${username}/likes`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!likesRes.ok) throw new Error('Failed to fetch likes');
        const likesData: Like[] = await likesRes.json();
        setLikes(likesData);

        // Check if current user follows this user
        const currentUsername = localStorage.getItem('username') || '';
        const followersArray = Array.isArray(userData.followers) ? userData.followers : [];
        setIsFollowing(followersArray.includes(currentUsername));

        // Load bookmarked videos from localStorage
        const saved = localStorage.getItem('bookmarkedVideos');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setBookmarkedVideos(parsed);
          }
        }
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
        ? `${API_BASE_URL}/api/users/${username}/unfollow`
        : `${API_BASE_URL}/api/users/${username}/follow`;

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '2rem',
        }}
      >

        <div style={{ flex: 1 }}>
          <h2>
            {user.firstName} {user.lastName} ({user.username})
          </h2>
          <p>Email: {user.email}</p>
          <p>DOB: {user.dob}</p>
          <p>Role: {user.role}</p>
        </div>

 
        <div
          style={{
            minWidth: '250px',
            border: '1px solid #ddd',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <p>
            <strong>Followers:</strong> {user.followers?.length ?? 0}
          </p>

          <div>
            <strong>Following ({user.following?.length ?? 0}):</strong>
            {user.following && user.following.length > 0 ? (
              <ul style={{ paddingLeft: '1.2rem' }}>
                {user.following.map((followedUser) => (
                  <li key={followedUser}>{followedUser}</li>
                ))}
              </ul>
            ) : (
              <p>This user is not following anyone yet.</p>
            )}
          </div>

          <Button
            onClick={handleFollowToggle}
            disabled={followLoading}
            style={{ marginTop: '1rem', width: '100%' }}
          >
            {followLoading ? (
              <Spinner animation="border" size="sm" />
            ) : isFollowing ? (
              'Unfollow'
            ) : (
              'Follow'
            )}
          </Button>
        </div>
      </div>

      <hr />

      <h3>Posts by {user.username}</h3>
      {posts.length === 0 && <p>No posts yet.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post) => (
          <li key={post._id} style={{ marginBottom: '1rem' }}>
            <Card style={{ backgroundColor: 'white' }}>
              <Card.Body>
                <Card.Text style={{ color: 'black' }}>{post.message}</Card.Text>
                <small style={{ color: 'black' }}>
                  {new Date(post.datetime).toLocaleString()}
                </small>
              </Card.Body>
            </Card>
          </li>
        ))}
      </ul>

      <hr />

      <h3>Likes by {user.username}</h3>
      {likes.length === 0 ? (
        <p>No liked posts yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {likes.map((like) => (
            <li key={like._id} style={{ marginBottom: '1rem' }}>
              <Card style={{ backgroundColor: '#f9f9f9' }}>
                <Card.Body>
                  <Card.Text style={{ color: 'black' }}>{like.message}</Card.Text>
                  <small style={{ color: 'black' }}>
                    {new Date(like.datetime).toLocaleString()}
                  </small>
                </Card.Body>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <h3>Bookmarked Videos</h3>
      {bookmarkedVideos.length === 0 ? (
        <p>No videos bookmarked yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem',
          }}
        >
          {bookmarkedVideos.map((video) => (
            <div key={video.id}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  title={video.title}
                  src={`https://www.youtube.com/embed/${video.id}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowFullScreen
                />
              </div>
              <p style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>{video.title}</p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>{video.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}