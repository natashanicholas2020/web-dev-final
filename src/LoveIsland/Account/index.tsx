import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useState } from "react";

function Signin({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div>
      <h3>Sign in</h3>
      {/* Your signin inputs/buttons here */}
      <button onClick={onSignIn}>Sign in (simulate)</button>
      <br />
      <Link to="signup">Don't have an account? Sign up</Link>
    </div>
  );
}

function Signup() {
  return (
    <div>
      <h3>Sign up</h3>
      {/* Your signup inputs/buttons here */}
      <Link to="signin">Already have an account? Sign in</Link>
    </div>
  );
}

export default function Account({ onSignIn }: { onSignIn: () => void }) {
  return (
    <Routes>
      {/* Default route redirects to signin */}
      <Route path="" element={<Navigate to="signin" replace />} />

      {/* Signin route */}
      <Route path="signin" element={<Signin onSignIn={onSignIn} />} />

      {/* Signup route */}
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
}
