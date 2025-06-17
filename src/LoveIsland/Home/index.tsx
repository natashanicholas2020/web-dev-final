// import React from "react";
// import Countdown from "./Countdown";

// export default function Home() {
//   return (
//     <div id="wd-home" >
//       <h1>Welcome to Love Island Home</h1>
//       <Countdown />
//     </div>
//   );
// }


import React from "react";
import Countdown from "./Countdown";

export default function Home() {
  return (
    <>
      <div className="wd-background-layer" />
      <div id="wd-home" className="wd-content-layer">
        <h1>Welcome to Love Island Home</h1>
        <Countdown />
      </div>
    </>
  );
}
