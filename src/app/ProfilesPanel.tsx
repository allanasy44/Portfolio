"use client";

import { useMemo, useState } from "react";

type Profile = {
  id: string;
  name: string;
  city: string;
  area: string;
  age: number;
  specialty: string;
  availability: string;
  status: "online" | "away";
  verified: boolean;
  initials: string;
};

const profiles: Profile[] = [
  { id: "mara", name: "Mara Vale", city: "London", area: "Greater London", age: 29, specialty: "Independent creator", availability: "Selected weekends", status: "online", verified: true, initials: "MV" },
  { id: "lina", name: "Lina Osei", city: "Manchester", area: "Manchester area", age: 31, specialty: "Visual storyteller", availability: "Availability shared with connections", status: "away", verified: true, initials: "LO" },
  { id: "noah", name: "Noah Chen", city: "Bristol", area: "Bristol area", age: 27, specialty: "Frontend developer", availability: "Weekday evenings", status: "online", verified: true, initials: "NC" },
  { id: "aya", name: "Aya Brooks", city: "London", area: "South London area", age: 34, specialty: "Motion designer", availability: "By arrangement", status: "away", verified: false, initials: "AB" },
];

export default function ProfilesPanel() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All areas");
  const [area, setArea] = useState("All suburbs");
  const [minAge, setMinAge] = useState("18");
  const [maxAge, setMaxAge] = useState("60");
  const [style, setStyle] = useState("Any style");
  const [specialty, setSpecialty] = useState("Any specialty");
  const [sort, setSort] = useState("Recent");
  const [selected, setSelected] = useState<Profile | null>(null);
  const [liked, setLiked] = useState<string[]>([]);

  const visibleProfiles = useMemo(() => profiles.filter((profile) => {
    const matchesQuery = `${profile.name} ${profile.specialty}`.toLowerCase().includes(query.toLowerCase());
    const matchesCity = city === "All areas" || profile.city === city;
    const matchesArea = area === "All suburbs" || profile.area === area;
    const matchesStyle = style === "Any style" || (style === "Independent" && profile.verified) || (style === "Available now" && profile.status === "online");
    const matchesSpecialty = specialty === "Any specialty" || profile.specialty === specialty;
    return matchesQuery && matchesCity && matchesArea && matchesStyle && matchesSpecialty && profile.age >= Number(minAge) && profile.age <= Number(maxAge);
  }), [area, city, maxAge, minAge, query, specialty, style]);

  function toggleLike(id: string) {
    setLiked((current) => current.includes(id) ? current.filter((profileId) => profileId !== id) : [...current, id]);
  }

  return (
    <>
      <section className="directory-tools" aria-label="Profile directory filters">
        <div className="directory-search">⌕ <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search profiles or specialties" /></div>
        <select value={city} onChange={(event) => setCity(event.target.value)} aria-label="Area"><option>All areas</option><option>London</option><option>Manchester</option><option>Bristol</option></select>
        <select value={area} onChange={(event) => setArea(event.target.value)} aria-label="Suburb"><option>All suburbs</option><option>Greater London</option><option>Manchester area</option><option>Bristol area</option><option>South London area</option></select>
        <select value={minAge} onChange={(event) => setMinAge(event.target.value)} aria-label="Minimum age"><option value="18">18+</option><option value="25">25+</option><option value="30">30+</option></select>
        <select value={maxAge} onChange={(event) => setMaxAge(event.target.value)} aria-label="Maximum age"><option value="60">Any age</option><option value="35">Up to 35</option><option value="30">Up to 30</option></select>
        <select value={style} onChange={(event) => setStyle(event.target.value)} aria-label="Profile style"><option>Any style</option><option>Independent</option><option>Available now</option></select>
        <select value={specialty} onChange={(event) => setSpecialty(event.target.value)} aria-label="Specialty"><option>Any specialty</option><option>Independent creator</option><option>Visual storyteller</option><option>Frontend developer</option><option>Motion designer</option></select>
        <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort profiles"><option>Recent</option><option>Online now</option><option>Verified first</option></select>
      </section>
      <div className="directory-tabs"><button className="directory-tab active">Discover</button><button className="directory-tab">Recently active</button><button className="directory-tab">Verified</button><span>{visibleProfiles.length} profiles</span></div>
      <section className="profile-grid directory-grid">{visibleProfiles.map((profile) => <article className="profile-card" key={profile.id}><div className={`profile-avatar ${profile.id === "lina" ? "alt" : ""}`}>{profile.initials}</div><div className="profile-info"><h3>{profile.name} <span className={profile.status === "online" ? "online" : "away"}>● {profile.status}</span></h3><p>{profile.age} · {profile.area}</p><p className="profile-bio">{profile.specialty}</p><small>{profile.verified ? "✓ Identity verified · " : ""}{profile.availability}</small></div><div className="profile-actions"><button className="outline-button" onClick={() => setSelected(profile)}>View profile</button><button className={`like-button ${liked.includes(profile.id) ? "liked" : ""}`} onClick={() => toggleLike(profile.id)} aria-label={`Like ${profile.name}`}>{liked.includes(profile.id) ? "♥" : "♡"}</button></div></article>)}</section>
      <nav className="pagination" aria-label="Profile pages"><button className="page-active">1</button><button>2</button><button>3</button><button>4</button><span>…</span><button>10</button><button>→</button><small>Page 1 of 10 · 2,481 profiles</small></nav>
      {selected && <div className="profile-modal-backdrop" role="presentation" onClick={() => setSelected(null)}><section className="profile-modal" role="dialog" aria-modal="true" aria-label={`${selected.name} profile`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close profile">×</button><div className="profile-avatar large">{selected.initials}</div><p className="kicker">{selected.verified ? "VERIFIED PROFILE" : "CREATOR PROFILE"}</p><h2>{selected.name}</h2><p className="modal-location">{selected.age} · {selected.area} · {selected.status}</p><p>{selected.specialty}. {selected.availability}.</p><div className="privacy-note">Contact details are private. Like this profile to start a mutual connection; contact sharing requires both people to opt in.</div><button className="primary-button" onClick={() => { toggleLike(selected.id); setSelected(null); }}>{liked.includes(selected.id) ? "Liked" : "Like profile"}</button></section></div>}
    </>
  );
}
