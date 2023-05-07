export default function LoginWithAnilist() {
  return (
    <div>
      <p>You need to log in with your AniList account to get the access for this app to be able to add entries to your manga list</p>
      <a  className="loginAnilist" href="https://anilist.co/api/v2/oauth/authorize?client_id=10892&response_type=token">
        Login with AniList
      </a>
    </div>
  );
}
