# Automatic Sunday sermon syncing

The public Sunday Sermons playlist is PLU5UEuYXVWS4. Keep its newest sermon first. The player follows playlist order; the two cards display the second and third public videos. Private and deleted videos are skipped. Newest-first ordering is managed in YouTube, not inferred from video upload dates.

One-time activation:

1. In Google Cloud Console, select or create a project and enable YouTube Data API v3.
2. Create an API key and restrict its API access to YouTube Data API v3. The workflow uses the key server-side, so do not use browser/referrer restrictions. GitHub-hosted runner addresses vary.
3. In this GitHub repository, Settings > Secrets and variables > Actions > New repository secret: name YOUTUBE_API_KEY and paste the key as its value. Never put it in a source file or chat.
4. In Settings > Pages, change Source to GitHub Actions. Keep familychurchofsandiego.org as the custom domain and enable HTTPS when the certificate is ready.
5. If the github-pages environment has branch deployment restrictions, permit fix/preview-photo-paths, the source branch this workflow checks out.
6. Open Actions > Sync sermons and publish website > Run workflow. Select main and run. Verify the publish job succeeds before claiming automatic syncing is active.

The scheduled workflow lives on main because GitHub schedules only run workflows on the default branch. It checks out the maintained fix/preview-photo-paths website branch, fetches metadata, and deploys that entire website through the GitHub Pages deployment API. The generated sermons-data.json is public video metadata only; no API key is published. Generated data is deployed as an artifact and is not committed to the repository. The job runs hourly (GitHub schedules can be delayed), on website pushes, or manually. GitHub may disable schedules after 60 days of repository inactivity; check Actions if syncing stops.

If the API fails or returns no public videos, the workflow attempts to retain the previous public sermon metadata and continues publishing the website. If previous metadata is unavailable, the playlist player remains usable and cards show a fallback link. Inspect the refresh step in Actions to verify whether new metadata was fetched. Errors deliberately omit request URLs and credentials. Check the key, API enablement/restrictions, quota and playlist visibility in GitHub Actions. Missing data on the existing branch-deployed site shows a link to the playlist rather than fabricated titles. This job does not filter arbitrary uploads by weekday: keep the playlist limited to Sunday messages.
