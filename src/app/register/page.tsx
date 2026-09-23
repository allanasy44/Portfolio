"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState("member");
  const [submitted, setSubmitted] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="auth-page">
      <header className="auth-header"><Link className="directory-brand" href="/"><span className="brand-mark">C</span><span>Creator / Hub</span></Link><Link className="auth-back" href="/">← Back to browse</Link></header>
      <main className="auth-layout">
        <section className="auth-intro"><p className="directory-kicker">WELCOME TO THE NETWORK</p><h1>Make space for<br /><i>good connections.</i></h1><p>Join a private directory for developers, creators, and collaborators. Build a profile, share only what feels right, and meet people around shared work.</p><div className="benefit-list"><div><span>✓</span><strong>Build your public profile</strong><small>Show your specialty, work, and broad area.</small></div><div><span>⌖</span><strong>Find people by interest</strong><small>Browse profiles with useful filters and availability.</small></div><div><span>♧</span><strong>Keep contact private</strong><small>Messages and contact sharing stay opt-in.</small></div></div><div className="privacy-card"><strong>Private by design</strong><p>Your email and phone number are never displayed publicly. Exact addresses and live location are not collected.</p></div></section>
        <section className="auth-card"><p className="directory-kicker">CREATE YOUR ACCOUNT</p><h2>Join Creator / Hub</h2><p className="auth-subtitle">Free to join. No card required.</p><div className="account-switch"><button className={accountType === "member" ? "selected" : ""} onClick={() => setAccountType("member")} type="button">Member</button><button className={accountType === "creator" ? "selected" : ""} onClick={() => setAccountType("creator")} type="button">Creator profile</button></div><form onSubmit={submit}><label>Email address<input type="email" required placeholder="you@example.com" /></label><label>Password<input type="password" required minLength={8} placeholder="At least 8 characters" /></label><label>Confirm password<input type="password" required minLength={8} placeholder="Repeat your password" /></label><label className="check-row"><input type="checkbox" required /> <span>I agree to the <a href="#terms">terms</a> and privacy policy.</span></label><button className="auth-submit" type="submit">Create free account <span>→</span></button>{submitted && <p className="form-success" role="status">Account form received. Email verification will be added when authentication is connected.</p>}</form><p className="auth-login">Already have an account? <a href="#login">Log in</a></p></section>
      </main>
      <footer className="auth-footer"><span>Creator / Hub</span><span>For adults 18+ · Profiles are opt-in and moderated</span><span>Privacy · Safety · Terms</span></footer>
    </div>
  );
}
