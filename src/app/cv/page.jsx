import { profile } from "../../content/portfolio";

export const metadata = { title: "CV" };

function ResumeSection({ title, entries, type }) {
  return (
    <section className="resume-section">
      <h2>{title}</h2>
      <div>
        {entries.length ? (
          entries.map((entry, i) => (
            <article className="resume-entry" key={i}>
              <p className="resume-period">{entry.period}</p>
              <h3>
                {type === "experience" ? entry.role : entry.qualification}
              </h3>
              <p>{type === "experience" ? entry.company : entry.institution}</p>
              {entry.description && (
                <p className="resume-description">{entry.description}</p>
              )}
            </article>
          ))
        ) : (
          <p className="placeholder">
            {title} details have not been added yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default function CV() {
  return (
    <main id="main" className="page-shell cv-page">
      <div className="page-heading">
        <div>
          <p className="kicker">
            <span className="square" />
            03 / Curriculum vitae
          </p>
          <h1>
            CV<span className="title-dot">.</span>
          </h1>
        </div>
        {profile.cvUrl ? (
          <a className="download-button" href={profile.cvUrl} download>
            Download CV <span aria-hidden="true">↓</span>
          </a>
        ) : (
          <p className="heading-note">
            CV draft
            <br />
            Personal details pending.
          </p>
        )}
      </div>
      <div className="section-rule">
        <span>Experience & qualifications</span>
        <span>Curriculum vitae</span>
      </div>
      <div className="resume">
        <div className="resume-identity">
          <div>
            <h2>{profile.name}</h2>
            {profile.role && <p className="resume-role">{profile.role}</p>}
          </div>
          <div className="resume-contact">
            {profile.location && <span>{profile.location}</span>}
            {profile.email && (
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            )}
            {!profile.role && !profile.email && (
              <span className="placeholder">
                Name, role, and contact details pending.
              </span>
            )}
          </div>
        </div>
        <ResumeSection
          title="Experience"
          entries={profile.experience}
          type="experience"
        />
        <ResumeSection
          title="Education"
          entries={profile.education}
          type="education"
        />
        <section className="resume-section">
          <h2>Skills</h2>
          {profile.skills.length ? (
            <ul className="tags">
              {profile.skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="placeholder">Skills have not been added yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
