// // // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // // import Account from "./Account";
// // // import Home from "./Home";
// // // import Community from "./Community";
// // // import Islanders from "./Islanders";
// // // import Navigation from "./Header/Navigation";
// // // import Logo from "./Header/Logo";
// // // import IslanderDetails from "./Islanders/IslanderDetails";

// // // import './styles.css';

// // // export default function LoveIsland() {
// // //   return (
// // //     <BrowserRouter>
// // //       <div className="wd-background-layer" />
// // //       <div className="wd-content-layer" id="wd-loveisland">
// // //         <div className="wd-blue-bg">
// // //           <Logo />
// // //           <Navigation />
// // //           <div className="wd-content">
// // //             <Routes>
// // //               <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />
// // //               <Route path="/LoveIsland/Home" element={<Home />} />
// // //               <Route path="/LoveIsland/Account/*" element={<Account />} />
// // //               <Route path="/LoveIsland/Community/*" element={<Community />} />
// // //               <Route path="/LoveIsland/Islanders" element={<Islanders />} />
// // //               <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />
// // //               <Route path="*" element={<div>Page not found</div>} />
// // //             </Routes>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </BrowserRouter>
// // //   );
// // // }


// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // import Account from "./Account";
// // import Home from "./Home";
// // import Community from "./Community";
// // import Islanders from "./Islanders";
// // import IslanderDetails from "./Islanders/IslanderDetails";

// // import Logo from "./Header/Logo";
// // import Navigation from "./Header/Navigation";

// // import './styles.css';

// // export default function LoveIsland() {
// //   return (
// //     <BrowserRouter>
// //       <div className="wd-background-layer" />
// //       <div className="wd-content-layer" id="wd-loveisland">
// //         <div className="wd-blue-bg">
// //         <Navigation />
// //           <Logo />
// //           <div className="wd-content">
// //             <Routes>
// //               <Route path="/" element={<Navigate to="/LoveIsland/Home" replace />} />
// //               <Route path="/LoveIsland/Home" element={<Home />} />
// //               <Route path="/LoveIsland/Account/*" element={<Account />} />
// //               <Route path="/LoveIsland/Community/*" element={<Community />} />
// //               <Route path="/LoveIsland/Islanders" element={<Islanders />} />
// //               <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />
// //               <Route path="*" element={<div>Page not found</div>} />
// //             </Routes>
// //           </div>
// //         </div>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }



// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Account from "./Account";
// import Home from "./Home";
// import Community from "./Community";
// import Islanders from "./Islanders";
// import IslanderDetails from "./Islanders/IslanderDetails";
// import Header from "./Header";

// import './styles.css';

// export default function LoveIsland() {
//   return (
//     <BrowserRouter>
//       <div>
//         <Header />

//         <div>
//           <Routes>
//             <Route path="/LoveIsland/" element={<Navigate to="/Home" replace />} />
//             <Route path="/LoveIsland/Home" element={<Home />} />
//             <Route path="/LoveIsland/Account/*" element={<Account />} />
//             <Route path="/LoveIsland/Community/*" element={<Community />} />
//             <Route path="/LoveIsland/Islanders" element={<Islanders />} />
//             <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} />
//             <Route path="*" element={<div>Page not found</div>} />
//           </Routes>
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Account from "./Account";
import Home from "./Home";
import Community from "./Community";
import Islanders from "./Islanders";
import IslanderDetails from "./Islanders/IslanderDetails";
import Header from "./Header";

import './styles.css';

export default function LoveIsland() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        
        <div className="wd-content-container">
          <Routes>
            <Route path="/LoveIsland/" element={<Navigate to="/Home" replace />} />
            <Route path="/LoveIsland/Home" element={<Home />} />
            <Route path="/LoveIsland/Account/*" element={<Account />} />
            <Route path="/LoveIsland/Community/*" element={<Community />} />
            <Route path="/LoveIsland/Islanders" element={<Islanders />} />
            {/* <Route path="/LoveIsland/Islanders/:id" element={<IslanderDetails />} /> */}
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
