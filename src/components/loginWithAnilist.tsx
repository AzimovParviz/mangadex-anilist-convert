export default function LoginWithAnilist() {
  return (
    <div>
      <p>You need to log in with your AniList account to get the access token for this app to be able to add entries to your manga list</p>
      <p>After getting the token and logging into your mangadex account, </p>
      <a href="https://anilist.co/api/v2/oauth/authorize?client_id=10892&response_type=token">
        Login with AniList
      </a>
    </div>
  );
}
