"""Refresh public sermon metadata using YouTube Data API v3."""
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import urlopen

PLAYLIST_ID = 'PLU5UEuYXVWS4'


def select_messages(items):
    messages = []
    for item in items:
        snippet = item.get('snippet', {})
        video_id = item.get('contentDetails', {}).get('videoId')
        title = snippet.get('title', '')
        if not video_id or not snippet.get('thumbnails') or title in ('Deleted video', 'Private video'):
            continue
        messages.append({'id': video_id, 'title': title,
                         'publishedAt': item.get('contentDetails', {}).get('videoPublishedAt', '')})
        if len(messages) == 3:
            break
    return messages


def main():
    key = os.environ.get('YOUTUBE_API_KEY')
    if not key:
        raise SystemExit('Add the YOUTUBE_API_KEY repository Actions secret before running sync.')
    query = urlencode({'part': 'snippet,contentDetails', 'playlistId': PLAYLIST_ID,
                       'maxResults': 50, 'key': key})
    try:
        with urlopen('https://www.googleapis.com/youtube/v3/playlistItems?' + query, timeout=30) as response:
            data = json.load(response)
    except Exception:
        # Never log request URLs: they contain the API key.
        raise SystemExit('YouTube API request failed. Check the key, API restrictions, quota, and playlist ID.')
    messages = select_messages(data.get('items', []))
    if not messages:
        raise SystemExit('No public videos found; existing published data was preserved.')
    output = Path('sermons-data.json')
    temporary = output.with_suffix('.tmp')
    temporary.write_text(json.dumps({'playlistId': PLAYLIST_ID, 'messages': messages}, indent=2) + '\n')
    temporary.replace(output)
    print(f'Synced {len(messages)} public playlist videos.')


if __name__ == '__main__':
    main()
