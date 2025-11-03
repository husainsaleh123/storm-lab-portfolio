// src/pages/User/AuthPage/AuthPage.jsx

// import { useState } from 'react';
// import styles from '../AuthPage/AuthPage.module.scss';
// import LoginForm from '../../../components/User/LoginForm/LoginForm';
// import SignupForm from '../../../components/User/SignupForm/SignupForm';
// import logo from "../../../assets/images/logo.png";

// export default function AuthPage({ setUser }) {
//   const [showLogin, setShowLogin] = useState(true);  // Default to show login

//   return (
//     <main className={styles.page}>
//       <div className={styles.authLeft}>
//         <img src={logo} alt="Storm Lab Logo" className={styles.logo} />
//       </div>

//       <div className={styles.authRight}>
//         <div className={styles.card}>
//           <div className={styles.tabs}>
//             <button
//               type="button"
//               className={`${styles.tab} ${showLogin ? styles.active : ""}`}
//               onClick={() => setShowLogin(true)}
//               aria-pressed={showLogin}
//             >
//               Log in
//             </button>
//             <button
//               type="button"
//               className={`${styles.tab} ${!showLogin ? styles.active : ""}`}
//               onClick={() => setShowLogin(false)}
//               aria-pressed={!showLogin}
//             >
//               Sign up
//             </button>
//           </div>

//           <div className={styles.formWrap}>
//             {showLogin ? (
//               <LoginForm setUser={setUser} />  // Login Form
//             ) : (
//               <SignupForm setUser={setUser} />  // Signup Form
//             )}
//           </div>

//           <div className={styles.switchLine}>
//             {showLogin ? (
//               <span>
//                 Don’t have an account?{" "}
//                 <span
//                   className={styles.switchBtn}
//                   onClick={() => setShowLogin(false)}
//                 >
//                   Sign up
//                 </span>
//               </span>
//             ) : (
//               <span>
//                 Already have an account?{" "}
//                 <span
//                   className={styles.switchBtn}
//                   onClick={() => setShowLogin(true)}
//                 >
//                   Log in
//                 </span>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }