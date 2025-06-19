// // //import React from "react";
// // import Countdown from "./Countdown";

// // export default function Home() {
// //   return (
// //     <>
// //       <div className="wd-background-layer" />
// //       <div id="wd-home" className="wd-content-layer">
// //         <h1>Welcome to Love Island USA</h1>
// //         <Countdown />
// //         <h2 className="wd-updates-heading">New Updates:</h2>

// //         <section className="new-updates-section">

// //         <p>
// //   VILLA UPDATES:{" "}
// //   <a
// //     href="https://www.instagram.com/p/DLBnQ1pPgvc/"
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     style={{ color: "blue", textDecoration: "underline" }}
// //   >
// //     Jalen
// //   </a>{" "}
// //   has been dumped from the villa.
// // </p>

// //   <p>VILLA UPDATES: There will be a recoupling tonight.</p>

// //   <p>
// //   Paige DeSorbo Reveals Medical Emergency Led to Sudden Love Island USA Exit. Read more{" "}
// //     <a
// //       href="https://www.eonline.com/news/1418835/paige-desorbos-medical-emergency-led-to-love-island-usa-exit"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       style={{ color: "blue", textDecoration: "underline" }}
// //     >
// //       here
// //     </a>.
// //   </p>

// //   <p>Serena Page and JaNa Craig from Love Island USA's Season 6 will be on Aftersun this weekend. Be sure to tune in only on {" "}
// //     <a
// //       href="https://www.peacocktv.com/"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       style={{ color: "blue", textDecoration: "underline" }}
// //     >
// //       Peacock
// //     </a>!</p>

// //   <p>  Love Island USA's Belle-A on the Powerful Family Story Behind Her Unique Name — and Why the Dash Matters. Read more{" "}
// //     <a
// //       href="https://people.com/love-island-usa-belle-a-shares-family-story-behind-unique-name-exclusive-11755642"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       style={{ color: "blue", textDecoration: "underline" }}
// //     >
// //       here
// //     </a>.</p>

// //     <p>
// //   VILLA UPDATES:{" "}
// //   <a
// //     href="https://www.instagram.com/p/DK8e2thBboZ/"
// //     target="_blank"
// //     rel="noopener noreferrer"
// //     style={{ color: "blue", textDecoration: "underline" }}
// //   >
// //     Charlie
// //   </a>{" "}
// //   has been dumped from the villa.
// // </p>

// //   <p>VILLA UPDATES: There will be a recoupling tonight based on America's votes. Who do YOU think the bombshells will be paired up with?</p>
// // </section>

// // <h2 className="wd-updates-heading">Current Islanders:</h2>

// //       </div>
// //     </>
// //   );
// // }















// import { useEffect, useState } from "react";
// import Countdown from "./Countdown";
// import { Link } from "react-router-dom";
// import Updates from "./Updates"; //

// interface Islander {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   episode_left: number | null;
// }

// export default function Home() {
//     const [islanders, setIslanders] = useState<Islander[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
  
//     useEffect(() => {
//       fetch("http://localhost:4000/api/islanders")
//         .then((res) => {
//           if (!res.ok) throw new Error("Failed to fetch islanders");
//           return res.json();
//         })
//         .then((data: Islander[]) => {
//           const filtered = data.filter((islander) => islander.episode_left === null);
//           setIslanders(filtered);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           setLoading(false);
//         });
//     }, []);
  
//     return (
//       <>
//         <div className="wd-background-layer" />
//         <div id="wd-home" className="wd-content-layer">
//           <h1>Welcome to Love Island USA</h1>
//           <Countdown />
//           <div></div>
//           <h2 className="wd-updates-heading">New Updates</h2>
  
//           <Updates />
  
//           <h2 className="wd-updates-heading">Current Islanders:</h2>
//           {loading && <p>Loading current islanders...</p>}
//           {error && <p>Error: {error}</p>}
  
//           <div className="islander-cards-container">
//             {islanders.map((islander) => (
//               <Link
//                 to={`/LoveIsland/Islanders/${islander._id}`}
//                 key={islander._id}
//                 className="islander-card"
//               >
//                 <h3>{islander.first_name} {islander.last_name}</h3>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </>
//     );
//   }

import { useEffect, useState } from "react";
import Countdown from "./Countdown";
import { Link } from "react-router-dom";
import Updates from "./Updates";

interface Islander {
  _id: string;
  first_name: string;
  last_name: string;
  episode_left: number | null;
  image?: string;
}

export default function Home() {
  const [islanders, setIslanders] = useState<Islander[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/islanders")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch islanders");
        return res.json();
      })
      .then((data: Islander[]) => {
        const filtered = data.filter((islander) => islander.episode_left === null);
        setIslanders(filtered);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="wd-background-layer" />
      <div id="wd-home" className="wd-content-layer">
        <h1>Welcome to Love Island USA</h1>
        <Countdown />
        <div></div>
        <h2 className="wd-updates-heading">New Updates</h2>

        <Updates />

        <h2 className="wd-updates-heading">Current Islanders:</h2>
        {loading && <p>Loading current islanders...</p>}
        {error && <p>Error: {error}</p>}

        <div className="islander-cards-container">
          {islanders.map((islander) => (
            <Link
              to={`/LoveIsland/Islanders/${islander._id}`}
              key={islander._id}
              className="islander-card"
            >
              {islander.image && (
                <img
                  src={`/${islander.image}`} // Leading slash for public folder images
                  alt={`${islander.first_name} ${islander.last_name}`}
                  className="islander-card-image"
                  style={{ maxWidth: "150px", borderRadius: "8px", marginBottom: "8px" }}
                />
              )}
              <h3>
                {islander.first_name} {islander.last_name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
