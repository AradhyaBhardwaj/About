(() => {
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loader=$('.loader');
  const finish=()=>loader?.classList.add('done');
  addEventListener('load',()=>setTimeout(finish,650));setTimeout(finish,2200);

  // Navigation panel
  const menu=$('.menu-btn'),panel=$('.index-panel'),close=$('.close-index');
  function toggleMenu(open){panel.classList.toggle('open',open);panel.setAttribute('aria-hidden',String(!open));menu.setAttribute('aria-expanded',String(open));menu.querySelector('b').textContent=open?'×':'＋';document.body.classList.toggle('menu-open',open)}
  menu?.addEventListener('click',()=>toggleMenu(!panel.classList.contains('open')));
  close?.addEventListener('click',()=>toggleMenu(false));
  document.addEventListener('click',e=>{if(panel?.classList.contains('open')&&!panel.contains(e.target)&&!menu?.contains(e.target))toggleMenu(false)});
  $$('.index-panel a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));

  // Scroll progress + local clock
  const meter=$('#scrollMeter'),clock=$('#clock');
  const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(meter)meter.style.width=(max>0?scrollY/max*100:0)+'%'};
  addEventListener('scroll',update,{passive:true});update();
  function tick(){if(clock)clock.textContent='LOCAL TIME — '+new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())}
  tick();setInterval(tick,30000);

  // Reveal-on-entry
  if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.1});$$('.reveal').forEach(el=>io.observe(el))}else $$('.reveal').forEach(el=>el.classList.add('visible'));

  // Cursor follows pointer, with a tactile hover state
  if(matchMedia('(pointer:fine)').matches&&!reduce){
    let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;document.documentElement.style.setProperty('--mx',tx+'px');document.documentElement.style.setProperty('--my',ty+'px')},{passive:true});
    const ring=$('.cursor-ring');function follow(){x+=(tx-x)*.18;y+=(ty-y)*.18;if(ring){ring.style.left=x+'px';ring.style.top=y+'px'}requestAnimationFrame(follow)}follow();
    $$('a,button,.work-card').forEach(el=>{el.addEventListener('pointerenter',()=>ring?.classList.add('hover'));el.addEventListener('pointerleave',()=>ring?.classList.remove('hover'))});
  }

  // Living particle field, repelled gently by pointer
  const canvas=$('#field'),ctx=canvas?.getContext('2d');let w=0,h=0,dpr=1,pts=[],pointer={x:-1000,y:-1000};
  function resize(){if(!canvas||!ctx)return;dpr=Math.min(devicePixelRatio||1,1.5);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);const n=Math.min(145,Math.floor(w/10));pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.7+.4,hue:Math.random()<.5?165:260}))}
  function draw(){if(!ctx)return;ctx.clearRect(0,0,w,h);for(let i=0;i<pts.length;i++){const p=pts[i];if(!reduce){p.x+=p.vx;p.y+=p.vy;let dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);if(d<145&&d>0){p.x+=dx/d*.85;p.y+=dy/d*.85}}if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`hsla(${p.hue},90%,75%,.7)`;ctx.fill();for(let j=i+1;j<pts.length;j++){const q=pts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<105){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(142,130,255,${(1-d/105)*.15})`;ctx.lineWidth=.7;ctx.stroke()}}}if(!reduce)requestAnimationFrame(draw)}
  addEventListener('resize',resize);addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY},{passive:true});resize();draw();

  // Tilt cards, with touch/reduced-motion fallback
  if(!reduce&&matchMedia('(pointer:fine)').matches){$$('.work-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*3}deg) rotateY(${x*3}deg) translateY(-5px)`});card.addEventListener('pointerleave',()=>card.style.removeProperty('transform'))})}


  // Magnetic actions and subtle 3D portrait response (desktop only)
  if(!reduce&&matchMedia('(pointer:fine)').matches){
    $$('.pill-link,.repo-link,.menu-btn').forEach(el=>{
      el.addEventListener('pointermove',e=>{
        const r=el.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
        el.style.transform=`translate3d(${dx*.10}px,${dy*.13}px,0)`;
      });
      el.addEventListener('pointerleave',()=>el.style.removeProperty('transform'));
    });
    const hero=$('.hero-object'),portrait=$('.portrait-shell');
    hero?.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      if(portrait)portrait.style.transform=`rotate(3deg) rotateY(${x*12}deg) rotateX(${-y*10}deg) translate3d(${x*9}px,${y*8}px,0)`;
    });
    hero?.addEventListener('pointerleave',()=>{if(portrait)portrait.style.removeProperty('transform')});
  }

  // Quick command palette: "/" or Ctrl/Cmd + K
  const modal=$('#commandModal'),input=$('#commandInput'),options=$('#commandOptions');
  function openPalette(){modal?.classList.add('open');input?.focus()}
  function closePalette(){modal?.classList.remove('open');if(input)input.value='';filterCommands('')}
  function filterCommands(q){$$('button',options).forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(q.toLowerCase()))}
  $('#paletteBtn')?.addEventListener('click',openPalette);
  input?.addEventListener('input',()=>filterCommands(input.value));
  options?.addEventListener('click',e=>{const b=e.target.closest('button[data-target]');if(b){$(b.dataset.target)?.scrollIntoView({behavior:reduce?'auto':'smooth'});closePalette()}});
  modal?.addEventListener('click',e=>{if(e.target===modal)closePalette()});

  // Surprise me: jump to a random case study
  const toast=$('#toast');let toastTimer;
  function notify(msg){if(!toast)return;toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2100)}
  $('#surpriseBtn')?.addEventListener('click',()=>{const cards=$$('.work-card');const card=cards[Math.floor(Math.random()*cards.length)];card.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});card.animate?.([{filter:'brightness(1)'},{filter:'brightness(1.8)'},{filter:'brightness(1)'}],{duration:900});notify('A RANDOM BUILD, JUST FOR YOU ✳')});

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){toggleMenu(false);closePalette()}if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();openPalette()}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPalette()}});
})();