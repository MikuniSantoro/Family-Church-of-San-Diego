from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,xml.etree.ElementTree as ET
class Page(HTMLParser):
 def __init__(self,s):
  super().__init__();self.tags=[];self.ids=set();self.feed(s)
 def handle_starttag(self,t,a):
  d=dict(a);self.tags.append((t,d))
  if 'id'in d:self.ids.add(d['id'])
files=['index.html','home-preview.html','about.html','sermons.html','contact.html','donate.html','privacy.html','newsletter-confirmed.html']
parsed={n:Page(Path(n).read_text()) for n in files}
issues=[]
for name,p in parsed.items():
 assert len([1 for t,a in p.tags if t=='h1'])==1,name
 assert len([1 for t,a in p.tags if t=='link' and a.get('rel')=='canonical'])==1,name
 assert len([1 for t,a in p.tags if t=='meta' and a.get('name')=='description'])==1,name
 assert not any('noindex' in a.get('content','') for t,a in p.tags if t=='meta' and a.get('name')=='robots') or name=='newsletter-confirmed.html',name
 for t,a in p.tags:
  if t=='img':assert 'alt' in a,(name,a)
  key='href' if t in ['a','link'] else 'src' if t in ['img','script'] else None
  if not key or not a.get(key):continue
  u=urlsplit(a[key])
  if u.scheme or u.netloc:continue
  path=unquote(u.path);target='index.html' if path in ['.','./','/'] else path.removeprefix('./') if path else name
  if not Path(target).is_file():issues.append((name,a[key],'missing file'));continue
  if u.fragment and target in parsed and u.fragment not in parsed[target].ids:issues.append((name,a[key],'missing anchor'))
print('Link issues:',issues)
assert not issues
urls=ET.parse('sitemap.xml').findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc');assert len(urls)==6
schema=json.loads(Path('index.html').read_text().split('<script type="application/ld+json">')[1].split('</script>')[0]);assert schema['@type']=='Church'
assert 'http-equiv="refresh"' not in Path('index.html').read_text()
print('PASS: eight pages, metadata, H1, local links and anchors, alt attributes, six sitemap URLs, Church JSON-LD, direct root content')
