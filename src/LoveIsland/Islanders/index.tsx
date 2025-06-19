// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles.css';
// import './styles.css';

// interface Islander {
//   _id: string;
//   first_name: string;
//   last_name: string;
// }

// export default function Islanders() {
//   const [islanders, setIslanders] = useState<Islander[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetch('http://localhost:4000/api/islanders')
//       .then((res) => {
//         if (!res.ok) throw new Error('Network response was not ok');
//         return res.json();
//       })
//       .then((data: Islander[]) => {
//         setIslanders(data);
//         setLoading(false);
//       })
//       .catch((error: Error) => {
//         setError(error.message);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading islanders...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div id="wd-islander" className="wd-content-layer">
//       <h2 className="islanders-title">Islanders</h2>
//       <div className="islander-cards-container">
//         {islanders.map((islander) => (
//           <Link
//             to={`/LoveIsland/Islanders/${islander._id}`}
//             key={islander._id}
//             className="islander-card"
//           >
//             <h3>
//               {islander.first_name} {islander.last_name}
//             </h3>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import './styles.css';

interface Islander {
  _id: string;
  first_name: string;
  last_name: string;
  image?: string;
}

export default function Islanders() {
  const [islanders, setIslanders] = useState<Islander[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/api/islanders')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((data: Islander[]) => {
        setIslanders(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading islanders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="wd-islander" className="wd-content-layer">
      <h2 className="islanders-title">Islanders</h2>
      <div className="islander-cards-container">
        {islanders.map((islander) => (
          <Link
            to={`/LoveIsland/Islanders/${islander._id}`}
            key={islander._id}
            className="islander-card"
          >
            {islander.image && (
              <img
                src={`/${islander.image}`}
                alt={`${islander.first_name} ${islander.last_name}`}
                className="islander-card-image"
                style={{ maxWidth: "150px", borderRadius: "8px", marginBottom: '8px' }}
              />
            )}
            <h3>
              {islander.first_name} {islander.last_name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}









