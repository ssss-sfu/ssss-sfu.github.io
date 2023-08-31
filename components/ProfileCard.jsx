export const ProfileCard = ({ profile }) => {
  return (
    <div key={profile.id} className="profile-card">
      <img src={profile.imgSrc}></img>
      <div className="description">
        <div className="description-title">
          <p className="profile-role">{profile.role}</p>
          <p className="profile-name">{profile.name}</p>
          <p className="profile-pronoun">({profile.pronoun})</p>
        </div>

        <p className="profile-description">{profile.description}</p>
      </div>
    </div>
  );
};
