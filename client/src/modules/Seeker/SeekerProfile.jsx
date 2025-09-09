// src/pages/SeekerProfile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SeekerProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/seeker/1") // user_id = 1
      .then(res => setProfile(res.data));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{profile.first_name} {profile.last_name}</h1>
      <p>Email: {profile.user.email}</p>
      <p>Phone: {profile.phone}</p>
      <h3 className="font-semibold mt-4">Skills</h3>
      <ul>
        {profile.skills.map(s => (
          <li key={s.id}>{s.skill_name} ({s.proficiency})</li>
        ))}
      </ul>
    </div>
  );
}
