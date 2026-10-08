/* Family Church of San Diego, static preview script shared by every page.
   Everything marked SAMPLE or SIMULATED stands in for the real backend:
   /api/calendar (Google Calendar), /api/live and /api/sermons (YouTube), /api/subscribe (Brevo), Formspree.
   Address bar switches for testing: ?picnic=this-week  ?live=now  ?live=soon */
(function(){
  const $=id=>document.getElementById(id);
  const TZ="America/Los_Angeles";
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params=new URLSearchParams(location.search);

  /* ---------- Pacific wall clock and the next eight Sundays ---------- */
  const p=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",weekday:"short",hour12:false}).formatToParts(new Date()).map(x=>[x.type,x.value]));
  const today=new Date(Date.UTC(+p.year,+p.month-1,+p.day));
  const mins=(+p.hour%24)*60+(+p.minute);
  let add=(7-today.getUTCDay())%7; if(add===0&&mins>750) add=7;
  const first=new Date(today); first.setUTCDate(today.getUTCDate()+add);
  const mon=d=>d.toLocaleString("en-US",{month:"short",timeZone:"UTC"}).toUpperCase();
  const iso=d=>d.toISOString().slice(0,10);
  const sunday=i=>{const d=new Date(first);d.setUTCDate(first.getUTCDate()+7*i);return d};
  const addDays=(d,n)=>{const x=new Date(d);x.setUTCDate(x.getUTCDate()+n);return x};
  const longDate=s=>new Date(s+"T00:00:00Z").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",timeZone:"UTC"});

  /* ---------- SAMPLE calendar (real site: /api/calendar) ---------- */
  const firsts=[...Array(8).keys()].map(sunday).filter(d=>d.getUTCDate()<=7);
  const picnicDate=params.get("picnic")==="this-week"?sunday(0):firsts[0];
  const sample=[];
  if(picnicDate) sample.push({date:iso(picnicDate),title:"Church picnic",time:"12:00 PM",place:"Lake Murray Park",meta:"12:00 PM, Lake Murray Park. No service this Sunday"});
  sample.push({date:iso(sunday(6)),title:"No service: family retreat",meta:"No service this Sunday"});
  sample.push({date:iso(addDays(sunday(0),3)),title:"Midweek Bible study",meta:"7:00 PM, fellowship hall"});
  sample.push({date:iso(addDays(sunday(0),5)),title:"Youth game night",meta:"6:30 PM, youth room"});
  sample.push({date:iso(sunday(2)),title:"Guest speaker: Rev. [name]",meta:"11:00 AM, sanctuary"});
  sample.push({date:iso(addDays(sunday(3),6)),title:"Community service day",meta:"9:00 AM, Lake Murray Park"});
  sample.sort((a,b)=>a.date.localeCompare(b.date));
  const picnicDays=new Set(sample.filter(e=>/picnic/i.test(e.title)).map(e=>e.date));
  const cancelledDays=new Set(sample.filter(e=>/no service/i.test(e.title)).map(e=>e.date));
  /* THE RULE, in one place: a picnic Sunday is never a service day */
  const isServiceSunday=key=>!picnicDays.has(key)&&!cancelledDays.has(key);
  let nextServiceIdx=0; while(nextServiceIdx<7&&!isServiceSunday(iso(sunday(nextServiceIdx)))) nextServiceIdx++;
  const nextService=sunday(nextServiceIdx);
  const nextPicnic=sample.find(e=>/picnic/i.test(e.title))||null;
  const comingKey=iso(sunday(0));
  const picnicEvent=key=>sample.find(e=>e.date===key&&/picnic/i.test(e.title));

  /* ---------- SAMPLE sermons (real site: /api/sermons). Real videos from the channel. ---------- */
  const sermons=[
    {id:"7MTtL2mcXF8",title:"The Reality of a Spirit World that Wants to Help Us",speaker:"Co-Pastor Jasmine Santoro",date:"Aug 16, 2026"},
    {id:"CfCvVPRLyN8",title:"More to Physical Life",speaker:"Pastor Mikuni Santoro",date:"Aug 9, 2026"},
    {id:"lr6Mkm-LjjA",title:"National Parents' Day and “God as Our Heavenly Parent”",speaker:"Pastor Jasmine Santoro",date:"Jul 26, 2026"},
    {id:"Z-rgHzTkJEE",title:"Do You Believe?",speaker:"Pastor Mikuni Santoro",date:"Jul 19, 2026"},
    {id:"K_Ulk5cGRGg",title:"True Parents' Birthday Celebration, Hyojeong Nuri",speaker:null,date:"Feb 22, 2026"}
  ];
  const thumb=id=>`https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  /* ---------- SIMULATED live status (real site: /api/live) ---------- */
  const lp=params.get("live");
  const live={status:lp==="now"?"live":lp==="soon"?"upcoming":"offline",videoId:"VIDEO_ID",startsAt:"11:00 AM"};

  /* ---------- Sundays strip (Home) ---------- */
  const strip=$("strip");
  if(strip){
    for(let i=0;i<8;i++){
      const d=sunday(i), key=iso(d), next=i===nextServiceIdx, picnic=picnicDays.has(key), off=cancelledDays.has(key), ev=picnicEvent(key);
      const c=document.createElement("div"); c.className="cell"+(next?" next":"")+(off?" off":"");
      const top=next?`<span class="tag">${i===0&&add===0?"This Sunday":i===0?"Next Sunday":"Next service"}</span>`:picnic?`<span class="tag"><svg width="14" height="8"><use href="#rings"/></svg>Picnic</span>`:off?`<span class="tag">No service</span>`:`<span class="tag"></span>`;
      const bottom=next?`<span class="tag">11:00 AM</span>`:picnic?`<span class="tag">${ev.time}<br>No service</span>`:`<span class="tag"></span>`;
      c.innerHTML=`<div class="fill"></div>${top}<div><p class="label m">${mon(d)}</p><p class="d">${d.getUTCDate()}</p></div>${bottom}`;
      c.setAttribute("aria-label",longDate(key)+(next?", next service at 11 AM":"")+(picnic?`, church picnic at ${ev.time}, no service`:"")+(off?", no service":""));
      strip.appendChild(c);
    }
  }

  /* ---------- service bar picnic mode (every page with a bar) ---------- */
  const barWrap=document.querySelector(".bar .wrap");
  if(barWrap&&!isServiceSunday(comingKey)){
    const back=`No service this week. Back on ${longDate(iso(nextService))}.`;
    if(picnicDays.has(comingKey)){
      const ev=picnicEvent(comingKey);
      barWrap.children[0].innerHTML=`<p class="label">This Sunday</p><p class="t">Picnic, ${ev.time}</p>`;
      barWrap.children[1].innerHTML=`<p class="label">Where</p><a class="addr" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ev.place)}" target="_blank" rel="noopener">${ev.place}</a>`;
    } else barWrap.children[0].innerHTML=`<p class="label">This Sunday</p><p class="t">No service</p>`;
    barWrap.children[2].innerHTML=`<p class="label" style="color:#fff;max-width:26ch;line-height:1.6">${back}</p>`;
  }

  /* ---------- live status on the bar button (never from the clock) ---------- */
  const applyLive=()=>{
    if(!barWrap) return;
    let btn=$("liveBtn");
    if(!btn&&live.status!=="live") return;
    if(!btn){
      barWrap.children[2].innerHTML='<a class="btn btn-deep plain" id="liveBtn" target="_blank" rel="noopener"><span class="dot" id="liveDot"></span> <span id="liveLabel"></span></a>';
      btn=$("liveBtn");
    }
    $("liveDot").classList.toggle("live",live.status==="live"); $("liveDot").classList.toggle("soon",live.status==="upcoming");
    $("liveLabel").textContent=live.status==="live"?"Live now":live.status==="upcoming"?"Starts at "+live.startsAt:"Watch live";
    btn.href=live.status==="offline"?"https://www.youtube.com/@FamilyChurchofSanDiego/live":"https://www.youtube.com/watch?v="+live.videoId;
    btn.setAttribute("aria-label",live.status==="live"?"Live now on YouTube":live.status==="upcoming"?"Livestream starts at "+live.startsAt+" on YouTube":"Watch the livestream on YouTube");
  };
  setTimeout(applyLive,reduce?0:600);

  /* ---------- calendar-driven text anywhere on the site ---------- */
  if($("nextPicnic")) $("nextPicnic").textContent=nextPicnic?`Next picnic: ${longDate(nextPicnic.date)}, ${nextPicnic.time} at ${nextPicnic.place}.`:"";
  if(nextPicnic&&$("cta-h")){
    $("cta-h").innerHTML=`Picnic Sunday, ${longDate(nextPicnic.date).replace("Sunday, ","")}. Come for the <em>food</em>.`;
    $("cta-p").textContent=`There is no service that day. We meet at ${nextPicnic.place} at ${nextPicnic.time} instead. Bring your appetite and your family; newcomers are always welcome at the table.`;
  }
  if($("thisSunday")){
    const ev=picnicEvent(comingKey);
    $("thisSunday").textContent=ev?`This Sunday is a picnic, not a service: ${ev.time} at ${ev.place}.`:`Next service: ${longDate(iso(nextService))}.`;
  }
  if($("nextLivestream")) $("nextLivestream").textContent=`Next livestream: ${longDate(iso(nextService))}`;
  const ev=$("events");
  if(ev) sample.slice(0,6).forEach(r=>{const d=new Date(r.date+"T00:00:00Z"),pic=/picnic/i.test(r.title);const a=document.createElement("a");a.className="erow";a.href="#";a.dataset.reveal="";a.innerHTML=`<div><p class="label dm">${mon(d)}</p><p class="dd num">${d.getUTCDate()}</p></div><p class="tt">${pic?'<svg width="20" height="11" style="display:inline-block;margin-right:8px;vertical-align:middle"><use href="#rings"/></svg>':""}${r.title}</p><p class="meta">${r.meta}</p><svg width="20" height="20"><use href="#arrow-ur"/></svg>`;ev.appendChild(a);});

  /* ---------- Home sermon band: newest sermon ---------- */
  if($("homeSermonMeta")){
    const s=sermons[0];
    $("homeSermonMeta").textContent=`${s.date.toUpperCase()}${s.speaker?" · "+s.speaker.toUpperCase():""}`;
    $("homeSermonTitle").textContent=s.title;
    const img=document.querySelector("#poster img"); if(img){img.src=thumb(s.id);img.alt="";}
  }
  const mountPlayer=(target,src,title)=>{
    const f=document.createElement("iframe");
    f.className="player"; f.title=title; f.allow="autoplay; encrypted-media; picture-in-picture"; f.allowFullscreen=true; f.src=src;
    f.addEventListener("load",()=>f.classList.add("ready"));
    target.replaceWith(f); return f;
  };
  if($("poster")) $("poster").addEventListener("click",function(){mountPlayer(this,`https://www.youtube-nocookie.com/embed/${sermons[0].id}?autoplay=1`,"Latest sermon from Family Church of San Diego");});

  /* ---------- Sermons page: stage and list ---------- */
  const stage=$("stage"), list=$("sermonList");
  if(stage&&list){
    let current=0;
    const stageMeta=$("stageMeta"), stageTitle=$("stageTitle"), stageLink=$("stageLink");
    const setStage=(i,play)=>{
      current=i; const s=sermons[i];
      const slot=$("stageSlot");
      slot.innerHTML=`<button class="poster stage-poster" id="stagePoster" aria-label="Play ${s.title.replace(/"/g,"")}"><img src="${thumb(s.id)}" alt="" /><span class="play"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#1470AF"/></svg></span></button>`;
      $("stagePoster").addEventListener("click",function(){mountPlayer(this,`https://www.youtube-nocookie.com/embed/${s.id}?autoplay=1`,s.title);});
      [stageMeta,stageTitle].forEach(el=>{el.style.opacity="0"});
      setTimeout(()=>{
        stageMeta.textContent=`${s.date.toUpperCase()}${s.speaker?" · "+s.speaker.toUpperCase():""}`;
        stageTitle.textContent=s.title; stageLink.href=`https://www.youtube.com/watch?v=${s.id}`;
        [stageMeta,stageTitle].forEach(el=>{el.style.opacity="1"});
      },reduce?0:150);
      list.querySelectorAll(".srow").forEach((r,j)=>{r.classList.toggle("now",j===i);r.querySelector(".srow-date").textContent=j===i?"NOW SHOWING":sermons[j].date.toUpperCase();});
      if(play) $("stagePoster").focus({preventScroll:true});
    };
    sermons.forEach((s,i)=>{
      const b=document.createElement("button"); b.className="srow"; b.type="button"; b.dataset.reveal="";
      b.innerHTML=`<span class="srow-thumb"><img src="${thumb(s.id)}" alt="" loading="lazy" width="480" height="360" /></span><span class="srow-text"><span class="label srow-date">${s.date.toUpperCase()}</span><span class="srow-title">${s.title}</span><span class="srow-speaker">${s.speaker||"Family Church of San Diego"}</span></span><span class="srow-play" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span>`;
      b.setAttribute("aria-label",`Play ${s.title}${s.speaker?", by "+s.speaker:""}, ${s.date}`);
      b.addEventListener("click",()=>{setStage(i,true);$("watch").scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});});
      list.appendChild(b);
    });
    setStage(0,false);
    if(live.status==="live"){
      $("stageLive").hidden=false;
      $("stageSlot").innerHTML=`<div class="poster stage-poster live-frame"><img src="${thumb(sermons[0].id)}" alt="" /><span class="live-chip"><span class="dot live"></span> Live now (simulated)</span></div>`;
    }
  }
  /* Sermons live panel */
  if($("livePill")){
    const pill=$("livePill");
    if(live.status==="live"){pill.innerHTML='<span class="dot live"></span> Live now';pill.href="https://www.youtube.com/watch?v="+live.videoId;}
    if(live.status==="upcoming"&&$("liveSoon")){$("liveSoon").hidden=false;$("liveSoon").textContent="Starting at "+live.startsAt;}
  }

  /* ---------- Contact FAQ accordion ---------- */
  document.querySelectorAll(".faq-q").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const open=btn.getAttribute("aria-expanded")==="true";
      btn.setAttribute("aria-expanded",String(!open));
      btn.closest(".faq-item").classList.toggle("open",!open);
    });
  });

  /* ---------- Contact form (SIMULATED; real site posts to Formspree) ---------- */
  const cf=$("contactForm");
  if(cf){
    const em=$("cfEmail"), msg=$("cfMessage"), err=$("cfErr"), btn=cf.querySelector("button[type=submit]");
    cf.addEventListener("submit",e=>{
      e.preventDefault();
      const okEmail=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()), okMsg=msg.value.trim().length>0;
      em.setAttribute("aria-invalid",String(!okEmail)); msg.setAttribute("aria-invalid",String(!okMsg));
      if(!okEmail||!okMsg){err.textContent=!okEmail?"Please enter a full email address, like name@example.com.":"Please write a short message.";err.classList.add("show");(!okEmail?em:msg).focus();return;}
      err.classList.remove("show"); btn.disabled=true; btn.classList.add("busy"); btn.querySelector(".nl-btn-text").textContent="Sending";
      setTimeout(()=>{cf.style.opacity="0";setTimeout(()=>{cf.hidden=true;const d=$("cfDone");d.hidden=false;requestAnimationFrame(()=>d.classList.add("show"));d.focus();},reduce?0:250);},900);
    });
  }

  /* ---------- Donate copy button ---------- */
  const copyBtn=$("copyBtn");
  if(copyBtn){
    const label=$("copyLabel"), original=label.textContent, text=$("zelleEmail").textContent.trim(), status=$("copyStatus");
    copyBtn.addEventListener("click",async()=>{
      try{await navigator.clipboard.writeText(text);copyBtn.classList.add("copied");label.textContent="Copied";status.textContent="Email copied";}
      catch(e){const r=document.createRange();r.selectNodeContents($("zelleEmail"));const sel=getSelection();sel.removeAllRanges();sel.addRange(r);label.textContent=matchMedia("(pointer: coarse)").matches?"Long press to copy":"Press Ctrl+C";}
      setTimeout(()=>{copyBtn.classList.remove("copied");label.textContent=original;},2000);
    });
  }

  /* ---------- Contact: the Sunday card (calendar driven) ---------- */
  if($("sundayCard")){
    const key=comingKey, d=sunday(0), ev=picnicEvent(key), off=cancelledDays.has(key);
    $("scLabel").textContent=add===0?"This Sunday":"Next Sunday";
    $("scMon").textContent=mon(d); $("scDay").textContent=d.getUTCDate();
    if(ev){ $("scWhat").textContent="Church picnic, "+ev.time; $("scWhere").textContent=ev.place; $("scNo").hidden=false;
      $("scDir").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(ev.place); }
    else if(off){ $("scWhat").textContent="No service this week"; $("scWhere").textContent="Back on "+longDate(iso(nextService)); }
    $("icsBtn").addEventListener("click",()=>{
      const ymd=key.replace(/-/g,""); const startH=ev?"120000":"110000", endH=ev?"150000":"123000";
      const title=ev?"Church picnic (no service)":"Sunday service, Family Church of San Diego";
      const loc=ev?ev.place:"9754 Grosalia Ave, La Mesa, CA 91941";
      const ics=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Family Church of San Diego//EN","BEGIN:VEVENT","UID:"+ymd+"@familychurchofsandiego.org","DTSTAMP:"+ymd+"T000000Z","DTSTART;TZID=America/Los_Angeles:"+ymd+"T"+startH,"DTEND;TZID=America/Los_Angeles:"+ymd+"T"+endH,"SUMMARY:"+title,"LOCATION:"+loc.replace(/,/g,"\\,"),"END:VEVENT","END:VCALENDAR"].join("\r\n");
      const a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([ics],{type:"text/calendar"})); a.download="family-church-"+key+".ics"; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    });
  }
  /* Contact: coming up rows on navy */
  if($("comingUp")) sample.slice(0,4).forEach(r=>{const d=new Date(r.date+"T00:00:00Z"),pic=/picnic/i.test(r.title);const a=document.createElement("a");a.className="erow on-dark";a.href="#";a.dataset.reveal="";a.innerHTML=`<div><p class="label dm">${mon(d)}</p><p class="dd num">${d.getUTCDate()}</p></div><p class="tt">${pic?'<svg width="20" height="11" style="display:inline-block;margin-right:8px;vertical-align:middle"><use href="#rings"/></svg>':""}${r.title}</p><p class="meta">${r.meta}</p><svg width="20" height="20"><use href="#arrow-ur"/></svg>`;$("comingUp").appendChild(a);});
  /* Sermons: speaker message counts */
  document.querySelectorAll("[data-speaker]").forEach(el=>{const n=sermons.filter(s=>s.speaker&&s.speaker.includes(el.dataset.speaker)).length; if(n) el.innerHTML=`<a class="tlink" href="#recent">${n} recent message${n>1?"s":""}</a>`;});
  /* Sermons hero live pill */
  if($("heroLive")&&live.status==="live"){ $("heroLive").innerHTML='<span class="dot live" style="margin-right:10px"></span>Live now'; $("heroLive").href="https://www.youtube.com/watch?v="+live.videoId; }
  /* Newsletter confirmed: see you line */
  if($("seeYou")){ const ev=picnicEvent(comingKey); $("seeYou").textContent=ev?"See you at the picnic this Sunday, "+ev.time:(isServiceSunday(comingKey)?"See you this Sunday at 11:00 AM":"See you on "+longDate(iso(nextService))+" at 11:00 AM"); }
  /* About: timeline draws once */
  const tl=$("timeline");
  /* Privacy: index follows the section in view */
  const pidx=document.querySelectorAll(".pindex a");
  if(pidx.length){
    const pio=new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting) pidx.forEach(a=>{ if(a.getAttribute("href")==="#"+en.target.id) a.setAttribute("aria-current","location"); else a.removeAttribute("aria-current"); }); }),{rootMargin:"-30% 0px -60% 0px"});
    document.querySelectorAll(".note section[id]").forEach(sec=>pio.observe(sec));
  }

  /* ---------- reveal once, with stagger ---------- */
  document.querySelectorAll("[data-stagger]").forEach(g=>[...g.querySelectorAll(":scope > [data-reveal]")].forEach((el,i)=>el.style.setProperty("--d",Math.min(i,5)*60+"ms")));
  if(list) [...list.children].forEach((el,i)=>el.style.setProperty("--d",Math.min(i,5)*60+"ms"));
  const io=new IntersectionObserver(es=>es.forEach(en=>{
    if(!en.isIntersecting) return; io.unobserve(en.target);
    if(en.target===strip){
      const cells=[...strip.children];
      cells.forEach((c,i)=>setTimeout(()=>c.classList.add("in"),reduce?0:i*60));
      setTimeout(()=>(strip.querySelector(".cell.next")||cells[0]).classList.add("filled"),reduce?0:cells.length*60+150);
    } else if(en.target===tl){ en.target.classList.add("drawn"); } else en.target.classList.add("in");
  }),{threshold:.15,rootMargin:"0px 0px -60px 0px"});
  document.querySelectorAll("[data-reveal]").forEach(el=>io.observe(el));
  if(strip) io.observe(strip);
  if(tl) io.observe(tl);

  /* ---------- nav hairline, back to top ---------- */
  const nav=$("nav"), totop=$("totop");
  const onScroll=()=>{nav.classList.toggle("scrolled",scrollY>40);totop.classList.toggle("show",scrollY>innerHeight*1.5)};
  addEventListener("scroll",onScroll,{passive:true}); onScroll();
  totop.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}));

  /* ---------- mobile sheet ---------- */
  const sheet=$("sheet"), menuBtn=$("menuBtn"), closeBtn=$("closeBtn"), links=[...sheet.querySelectorAll("nav a")];
  const setOpen=open=>{
    sheet.classList.toggle("open",open); menuBtn.setAttribute("aria-expanded",open);
    document.body.style.overflow=open?"hidden":"";
    links.forEach((a,i)=>a.style.transitionDelay=open&&!reduce?(80+i*40)+"ms":"0ms");
    (open?closeBtn:menuBtn).focus();
  };
  menuBtn.addEventListener("click",()=>setOpen(true));
  closeBtn.addEventListener("click",()=>setOpen(false));
  addEventListener("keydown",e=>{if(e.key==="Escape"&&sheet.classList.contains("open"))setOpen(false)});

  /* ---------- newsletter band (SIMULATED; real site posts to /api/subscribe) ---------- */
  const nlForm=$("nlForm");
  if(nlForm){
    const nlEmail=$("nlEmail"), nlErr=$("nlErr"), nlDone=$("nlDone"), nlLive=$("nlLive"), nlBtn=nlForm.querySelector(".nl-btn");
    let shownError=false, busy=false;
    const validEmail=v=>v.length>0&&v.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const setErr=m=>{nlErr.textContent=m;nlErr.classList.toggle("show",!!m);nlEmail.setAttribute("aria-invalid",m?"true":"false");if(m)nlLive.textContent=m;};
    nlEmail.addEventListener("input",()=>{if(shownError)setErr(validEmail(nlEmail.value.trim().toLowerCase())?"":"Please enter a full email address, like name@example.com.")});
    nlForm.addEventListener("submit",e=>{
      e.preventDefault(); if(busy) return;
      const email=nlEmail.value.trim().toLowerCase();
      if(!validEmail(email)){shownError=true;setErr("Please enter a full email address, like name@example.com.");nlEmail.focus();return;}
      setErr(""); busy=true; nlBtn.disabled=true; nlBtn.classList.add("busy"); nlBtn.querySelector(".nl-btn-text").textContent="Signing up";
      setTimeout(()=>{
        busy=false; nlBtn.disabled=false; nlBtn.classList.remove("busy"); nlBtn.querySelector(".nl-btn-text").textContent="Sign me up";
        $("nlAddr").textContent=email; nlForm.style.opacity="0";
        setTimeout(()=>{nlForm.hidden=true;nlDone.hidden=false;requestAnimationFrame(()=>nlDone.classList.add("show"));nlDone.focus();nlLive.textContent="Almost there. Check your inbox to confirm.";},reduce?0:250);
      },900);
    });
    $("nlReset").addEventListener("click",()=>{nlDone.classList.remove("show");nlDone.hidden=true;nlForm.hidden=false;nlForm.style.opacity="1";nlForm.reset();shownError=false;setErr("");nlEmail.focus();});
  }
})();
