"""Generate directory index pages for GitHub Pages extensionless routes."""
from pathlib import Path
ROUTES = {**{name: name for name in ['about', 'sermons', 'contact', 'donate', 'privacy']},
          'newsletter-confirmed': 'newsletter/confirmed'}
for source, route in ROUTES.items():
    destination = Path(route) / 'index.html'
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(Path(source + '.html').read_text())
Path('index.html').write_text(Path('home-preview.html').read_text())
