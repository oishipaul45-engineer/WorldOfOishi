import MorphCursor from "./components/MorphCursor";
import FinalContact from "./components/FinalContact";
import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { Group } from 'three';
import { ArrowUpRight, ArrowDown, ExternalLink, Code2, FileText, BookOpen, GitCommit, Wrench, MoveUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import './App.css';

type Chapter = { name: string; eyebrow: string; title: string; description: string; stack: string[]; accent: string; github?: string; live?: string };
const base = 'https://github.com/oishipaul45-engineer/';
const chapters: Chapter[] = [
  { name:'INTRO', eyebrow:'A PERSONAL EXPERIMENT / 2026', title:'I build things that refuse to be ordinary.', description:'Oishi Paul  -  aspiring AI engineer, full-stack developer, and maker of expressive digital experiences. Scroll to explore six things I brought to life.', stack:['DESIGN','ENGINEERING','CURIOSITY'], accent:'#ff5a1f' },
  { name:'AETHERA', eyebrow:'01 / IMMERSIVE STORYTELLING', title:'A library for the stories we carry.', description:'An explorable 3D library for memories, letters, stories, and moments worth keeping.', stack:['INTERACTIVE 3D','STORYTELLING','CREATIVE WEB'], accent:'#c895ff', github:base+'AETHERA', live:'https://aethera-nine.vercel.app/' },
  { name:'CAMPVERSE', eyebrow:'02 / CAMPUS DISCOVERY', title:'Campus life, reimagined.', description:'A connected campus experience for discovering events, organizations, schedules, and places.', stack:['REACT','TYPESCRIPT','INTERACTIVE UI'], accent:'#ffbb4b', github:base+'Campverse', live:'https://campverse-d5016.web.app/' },
  { name:'SONORA', eyebrow:'03 / MUSIC & EXPERIENCE', title:'Your sound. Your space.', description:'An expressive music streaming application where sound, discovery, and visual design come together.', stack:['REACT','TYPESCRIPT','MUSIC'], accent:'#ff4eaa', github:base+'sonora', live:'https://sonora-two-psi.vercel.app/' },
  { name:'SKILLORBIT', eyebrow:'04 / LEARNING & COMMUNITY', title:'Everything we know connects.', description:'A peer-to-peer skill exchange platform for people who want to teach, learn, and grow together.', stack:['JAVASCRIPT','FIREBASE','COMMUNITY'], accent:'#c7ff39', github:base+'SkillOrbit', live:'https://oishipaul45-engineer.github.io/SkillOrbit/' },
  { name:'CREDORA', eyebrow:'05 / FULL-STACK PRODUCT', title:'Identity, built with intention.', description:'A professional workspace for skills, identity, career direction, and personal growth.', stack:['REACT','FASTAPI','POSTGRESQL'], accent:'#ff895a', github:base+'Credora', live:'https://credora-connect.vercel.app/' },
  { name:'FINOVA', eyebrow:'06 / FINANCIAL TECHNOLOGY', title:'Make sense of the numbers.', description:'A personal finance dashboard with budgets, expenses, analytics, savings goals, and cloud data.', stack:['JAVASCRIPT','FIREBASE','ANALYTICS'], accent:'#5edbff', github:base+'Finova-Financial-Dashboard', live:'https://finova-a6602.web.app/' },
  { name:'CONTACT', eyebrow:'07 / WHAT COMES NEXT', title:'The next idea starts here.', description:'Thanks for exploring. Let us make something ambitious, beautiful, and useful.', stack:['AVAILABLE TO CONNECT'], accent:'#ff5a1f' }
];

function Artwork({ index, progress }: { index: number; progress: number }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.10;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * .3) * .07;
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, progress * .20, .06);
  });
  const accent = chapters[index].accent;
  const chrome = '#dce2e7';
  const material = (color: string, glass = false) => ({
    color, metalness: glass ? .18 : .82, roughness: glass ? .09 : .22,
    transmission: glass ? .66 : 0, transparent: glass,
    thickness: 1.2, clearcoat: 1, clearcoatRoughness: .08
  });
  const shine = <meshStandardMaterial color={accent} metalness={.38} roughness={.23} emissive={accent} emissiveIntensity={.35} />;

  return <group ref={group} scale={1.12}>
    <Float speed={1.1} floatIntensity={.21} rotationIntensity={.09}>
      {(index === 0 || index === 7) && <group>
        {/* Asymmetric sculptural ribbon: the artist's signature */}
        <mesh rotation={[.58,.32,.56]}><torusKnotGeometry args={[1.0,.28,230,32,3,7]}/><meshPhysicalMaterial {...material(chrome)}/></mesh>
        <mesh rotation={[-.5,.6,-.3]}><torusGeometry args={[1.44,.035,12,120]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.6}/></mesh>
        <mesh position={[.7,.25,.6]} rotation={[.3,.2,.5]}><octahedronGeometry args={[.38,0]}/><meshPhysicalMaterial {...material(accent,true)}/></mesh>
      </group>}

      {index === 1 && <group rotation={[.12,-.28,-.08]}>
        {/* AETHERA: opened book with separated pages and illuminated spine */}
        {Array.from({length:7}, (_,i) => <mesh key={i} position={[-.59+i*.09, .05, -.17+i*.035]} rotation={[0,-.25-i*.052,-.09-i*.045]}>
          <boxGeometry args={[.84,2.16,.026]}/><meshPhysicalMaterial {...material(i===0?accent:chrome, i===0)}/>
        </mesh>)}
        {Array.from({length:7},(_,i)=><mesh key={'r'+i} position={[.57-i*.075,.05,-.17+i*.035]} rotation={[0,.25+i*.055,.09+i*.045]}>
          <boxGeometry args={[.84,2.16,.026]}/><meshPhysicalMaterial {...material(i===0?accent:chrome,i===0)}/>
        </mesh>)}
        <mesh position={[0,.04,.04]}><cylinderGeometry args={[.075,.075,2.33,18]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.2}/></mesh>
        <mesh position={[0,1.46,.3]}><icosahedronGeometry args={[.20,1]}/><meshPhysicalMaterial {...material(accent,true)}/></mesh>
      </group>}

      {index === 2 && <group>
        {/* CAMPVERSE: miniature campus atrium with hovering roof and colonnade */}
        <mesh position={[0,-1.15,0]}><cylinderGeometry args={[1.65,1.86,.19,6]}/><meshPhysicalMaterial {...material('#767b83')}/></mesh>
        {[-1,0,1].map((i)=><group key={i} position={[i*.83,0,0]}>
          <mesh position={[0,-.1,.15]}><cylinderGeometry args={[.115,.16,1.72,8]}/><meshPhysicalMaterial {...material(i===0?accent:chrome)}/></mesh>
          <mesh position={[0,.82,.15]}><boxGeometry args={[.45,.15,.43]}/><meshPhysicalMaterial {...material(chrome)}/></mesh>
        </group>)}
        <mesh position={[0,1.05,.12]} rotation={[0,0,0]}><cylinderGeometry args={[1.45,1.45,.19,3]}/><meshPhysicalMaterial {...material(accent,true)}/></mesh>
        <mesh position={[0,1.32,.12]}><octahedronGeometry args={[.22,0]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1}/></mesh>
      </group>}

      {index === 3 && <group rotation={[.16,.1,0]}>
        {/* SONORA: audio vinyl disc, stylus and wave loops */}
        <mesh rotation={[Math.PI/2,0,.2]}><cylinderGeometry args={[1.23,1.23,.1,96]}/><meshPhysicalMaterial {...material('#4d5260')}/></mesh>
        {[.55,.83,1.07].map((r)=><mesh key={r} rotation={[Math.PI/2,0,0]}><torusGeometry args={[r,.015,8,110]}/><meshStandardMaterial color={r===.83?accent:chrome} metalness={.6} roughness={.26}/></mesh>)}
        <mesh rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.28,.28,.13,50]}/><meshPhysicalMaterial {...material(accent)}/></mesh>
        <mesh position={[1.22,.72,.4]} rotation={[0,0,-.6]}><cylinderGeometry args={[.055,.055,1.35,12]}/><meshPhysicalMaterial {...material(chrome)}/></mesh>
        <mesh position={[.65,.2,.39]}><sphereGeometry args={[.12,20,20]}/>{shine}</mesh>
        {[0,1,2].map(i=><mesh key={i} rotation={[.48+i*.17,.3+i*.25,.6+i*.3]}><torusGeometry args={[1.43+i*.16,.022,10,125,Math.PI*1.27]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.5}/></mesh>)}
      </group>}

      {index === 4 && <group>
        {/* SKILLORBIT: six skill nodes, supported by luminous connecting struts */}
        {Array.from({length:6},(_,i)=>{
          const a=i*Math.PI/3;
          const x=Math.cos(a)*1.38, y=Math.sin(a)*1.13;
          return <group key={i}>
            <mesh position={[x/2,y/2,0]} rotation={[0,0,a-Math.PI/2]}><cylinderGeometry args={[.027,.027,1.48,9]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={.45}/></mesh>
            <mesh position={[x,y,.12]} rotation={[.2,i*.55,.18]}><icosahedronGeometry args={[.26,1]}/><meshPhysicalMaterial {...material(i%2?chrome:accent,true)}/></mesh>
          </group>
        })}
        <mesh><dodecahedronGeometry args={[.60,1]}/><meshPhysicalMaterial {...material(accent)}/></mesh>
        <mesh rotation={[.4,0,.3]}><torusGeometry args={[1.65,.022,9,96]}/><meshStandardMaterial color={chrome} metalness={.7} roughness={.22}/></mesh>
      </group>}

      {index === 5 && <group rotation={[.06,-.2,.06]}>
        {/* CREDORA: stacked, offset glass identity plates framing a faceted core */}
        {Array.from({length:5},(_,i)=><mesh key={i} position={[(i-2)*.14,(i-2)*.12,(i-2)*.28]} rotation={[0,(i-2)*.15,(i-2)*.055]}>
          <boxGeometry args={[1.67,2.17,.045]}/><meshPhysicalMaterial {...material(i===2?accent:chrome,true)}/>
        </mesh>)}
        <mesh position={[0,.12,.85]} rotation={[.2,.3,0]}><icosahedronGeometry args={[.55,1]}/><meshPhysicalMaterial {...material(accent)}/></mesh>
        <mesh position={[0,-.78,.91]}><boxGeometry args={[.78,.038,.04]}/><meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1}/></mesh>
      </group>}

      {index === 6 && <group>
        {/* FINOVA: dynamic metallic bar-chart sculpture with a suspended trend line */}
        {[.7,1.18,1.65,1.08,2.45,1.84,2.08].map((h,i)=><mesh key={i} position={[(i-3)*.43,-1.22+h/2,0]}>
          <boxGeometry args={[.27,h,.38]}/><meshPhysicalMaterial {...material(i===4?accent:chrome)}/>
        </mesh>)}
        <mesh position={[0,-1.26,0]}><boxGeometry args={[3.4,.08,.67]}/><meshPhysicalMaterial {...material('#6c737e')}/></mesh>
        {[[ -1.29,-.2],[-.86,.26],[-.43,.61],[0,.22],[.43,1.08],[.86,.75],[1.29,.96]].map(([x,y],i)=><mesh key={i} position={[x,y,.32]}><sphereGeometry args={[.085,14,14]}/>{shine}</mesh>)}
      </group>}
    </Float>
  </group>;
}

function Scene({ index, progress }: {index:number;progress:number}) {
  return <Canvas camera={{position:[0,0,6.8],fov:40}} dpr={[1,1.7]} gl={{antialias:true,alpha:true}}>
    <ambientLight intensity={.8}/>
    <directionalLight position={[4,5,6]} intensity={3.1} color="#fff5e8" />
    <pointLight position={[-3,0,4]} intensity={42} color={chapters[index].accent} distance={11}/>
    <pointLight position={[2,-3,-1]} intensity={22} color="#aa9fff" distance={10}/>
    <Environment preset="city" environmentIntensity={.45}/>
    <Artwork index={index} progress={progress}/>
  </Canvas>;
}

const toolGroups = [
  {label:'Frontend / Experiences', items:[{name:'React + TypeScript',used:'CampVerse Â· Sonora Â· Credora'},{name:'3D + Interaction',used:'Aethera Â· CampVerse'},{name:'JavaScript + CSS',used:'Finova Â· SkillOrbit'}]},
  {label:'Backend / Cloud',items:[{name:'FastAPI + Python',used:'Credora'},{name:'Firebase + Firestore',used:'Finova Â· SkillOrbit'},{name:'PostgreSQL + SQLAlchemy',used:'Credora'}]},
  {label:'Creative Practice',items:[{name:'Interface Design',used:'All six projects'},{name:'Experimental Storytelling',used:'Aethera Â· Sonora'},{name:'Analytics & Data Visualisation',used:'Finova'}]}
];
const ideaNotes = [
  {label:'WHAT IF...',body:'The interface tells a story without asking the visitor to click through menus.',tone:'orange',rotate:-5},
  {label:'BUILD BETTER',body:'Beautiful is good. Functional, accessible and beautiful is better.',tone:'lime',rotate:4},
  {label:'NEXT EXPERIMENT',body:'Mix real interaction, surprising motion and useful software.',tone:'violet',rotate:-3},
  {label:'REMINDER',body:'Every project has its own personality. Let the work speak.',tone:'blue',rotate:5},
];

type PublicRepo = {name:string; html_url:string; pushed_at:string; description:string|null; fork:boolean};
type PublicEvent = {id:string;type:string;created_at:string;repo:{name:string}};
function Activity(){
 const [repos,setRepos] = useState<PublicRepo[]>([]);
 const [events,setEvents] = useState<PublicEvent[]>([]);
 const [loading,setLoading] = useState(true);
 const [error,setError] = useState(false);
 useEffect(()=>{
  const ctrl = new AbortController();
  Promise.all([
   fetch('https://api.github.com/users/oishipaul45-engineer/repos?per_page=100&sort=pushed', {signal:ctrl.signal}),
   fetch('https://api.github.com/users/oishipaul45-engineer/events/public?per_page=30', {signal:ctrl.signal})
  ]).then(async ([a,b])=>{
    if(!a.ok || !b.ok) throw Error('GitHub API unavailable');
    const [all,activity] = await Promise.all([a.json(), b.json()]);
    setRepos((all as PublicRepo[]).filter(r=>!r.fork).slice(0,4));
    setEvents((activity as PublicEvent[]).slice(0,5));
  }).catch(()=>{if(!ctrl.signal.aborted)setError(true)}).finally(()=>{if(!ctrl.signal.aborted)setLoading(false)});
  return ()=>ctrl.abort();
 },[]);
 const date=(iso:string)=>new Intl.DateTimeFormat('en-IN',{day:'numeric',month:'short',year:'numeric'}).format(new Date(iso));
 return <section id="activity" className="extra-section activity-section">
   <div className="extra-heading"><span>08 / LIVE SIGNAL</span><h2>CODE IN <em>MOTION.</em></h2><p>A live snapshot from my public GitHub activity, not invented contribution counts.</p></div>
   {loading?<div className="api-state">Connecting to public GitHub activityâ€¦</div>:error?<div className="api-state">GitHub activity is unavailable right now. <a href="https://github.com/oishipaul45-engineer" target="_blank" rel="noreferrer">View my GitHub <ArrowUpRight size={14}/></a></div>:<div className="activity-grid">
     <div className="activity-panel"><div className="panel-kicker"><GitCommit size={18}/> RECENT PUBLIC EVENTS</div>{events.length?events.map(event=><div className="activity-line" key={event.id}><span className="event-dot"/><div><strong>{event.type.replace('Event','').replace(/([a-z])([A-Z])/g,'$1 $2')}</strong><small>{event.repo.name.split('/').pop()}</small></div><time>{date(event.created_at)}</time></div>):<p>No recent public events returned by GitHub.</p>}</div>
     <div className="activity-panel"><div className="panel-kicker"><Code2 size={18}/> RECENTLY UPDATED REPOSITORIES</div>{repos.map(repo=><a className="repo-line" key={repo.name} href={repo.html_url} target="_blank" rel="noreferrer"><span>{repo.name}<small>Updated {date(repo.pushed_at)}</small></span><MoveUpRight size={18}/></a>)}</div>
   </div>}
   <p className="extra-footnote">Public API data may be delayed or rate-limited. Private repositories and private commits are not shown.</p>
 </section>;
}
function ExtendedSections(){
 const [tool,setTool] = useState<string|null>(null);
 const [mediumPosts,setMediumPosts] = useState<Array<{title:string;link:string;pubDate:string}>>([]);
 // Add a personal Medium username here only when supplied. Empty means no invented stories.
 const mediumHandle = '';
 useEffect(()=>{if(!mediumHandle)return; const c=new AbortController();fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://medium.com/feed/@'+mediumHandle)}`,{signal:c.signal}).then(r=>r.json()).then(j=>{if(j.status==='ok')setMediumPosts((j.items||[]).slice(0,4))}).catch(()=>{});return()=>c.abort()},[]);
 return <div className="extras" id="beyond">
   <div className="extras-intro"><span>BEYOND THE SIX PROJECTS</span><h2>THE PERSON <em>BEHIND</em> THE PIXELS.</h2><p>The sculptures tell the project stories. These sections show my tools, activity, thoughts and next steps.</p></div>
   <section className="extra-section toolbox-section" id="toolbox"><div className="extra-heading"><span>07 / THE TOOLBOX</span><h2>WHAT I <em>BUILD WITH.</em></h2><p>Explore a technology to see where I've used it.</p></div><div className="tool-columns">{toolGroups.map(group=><div className="tool-group" key={group.label}><div className="panel-kicker"><Wrench size={17}/>{group.label}</div>{group.items.map(t=><button key={t.name} className={'tool-row '+(tool===t.name?'selected':'')} onClick={()=>setTool(tool===t.name?null:t.name)} aria-expanded={tool===t.name}><span>{t.name}</span><ArrowUpRight size={16}/>{tool===t.name&&<small>Used in: {t.used}</small>}</button>)}</div>)}</div></section>
   <Activity/>
   <section className="extra-section notes-section" id="notes"><div className="extra-heading"><span>09 / CREATIVE SCRAPS</span><h2>THE <em>PINBOARD.</em></h2><p>Little ideas from my creative process. Drag the notes around.</p></div><div className="notes-stage">{ideaNotes.map((note,i)=><motion.div key={note.label} className={'idea-note '+note.tone} drag dragMomentum={false} dragElastic={.12} initial={{rotate:note.rotate}} whileDrag={{scale:1.06,zIndex:5,cursor:'grabbing'}} style={{rotate:note.rotate}}><span>PINNED NOTE 0{i+1}</span><h3>{note.label}</h3><p>{note.body}</p><span className="note-pin"/></motion.div>)}</div></section>
   <section className="extra-section writing-section" id="writing"><div className="extra-heading"><span>10 / WRITING & DOCUMENTS</span><h2>WORDS, <em>TOO.</em></h2><p>A home for articles, technical stories and my rÃ©sumÃ©.</p></div><div className="writing-grid"><div className="writing-panel"><BookOpen size={30}/><h3>Writing / Articles</h3>{mediumPosts.length?mediumPosts.map(p=><a key={p.link} href={p.link} target="_blank" rel="noreferrer">{p.title} <ArrowUpRight size={14}/></a>):<p>Articles will appear here once I connect my own blog or Medium profile. No sample posts or someone else's writing.</p>}</div><div className="writing-panel">
  <FileText size={30}/>
  <h3>Beyond the Code.</h3>
  <p>
    A closer look at my journey, the skills I've developed,
    and the experiences shaping what I create.
  </p>
  <a
    href="/resume/Oishi_Paul_Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    EXPLORE MY STORY <ArrowUpRight size={16}/>
  </a>
</div></div></section>
   <div className="extra-end"><span>THAT'S MY CREATIVE PROCESS, SO FAR.</span><a href="#intro">BACK TO THE BEGINNING â†‘</a></div>
 </div>
}

export default function App(){
  const [index,setIndex]=useState(0);
  const [progress,setProgress]=useState(0);
  useEffect(()=>{
    let raf=0;
    const update=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
      const p=Math.max(0,window.scrollY/Math.max(1,window.innerHeight));
      setIndex(Math.min(chapters.length-1,Math.floor(p+.38)));
      setProgress(p%1);
    })};
    update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
    return()=>{window.removeEventListener('scroll',update);window.removeEventListener('resize',update);cancelAnimationFrame(raf)};
  },[]);
  return <div className="app" style={{'--accent':chapters[index].accent} as React.CSSProperties}>
    <div className="glow"/>
    <MorphCursor />
<header className="nav"><a href="#intro" className="brand">OISHI<span> / </span>PAUL</a><span className="nav-center">THE SHAPE OF IDEAS</span><a href="#beyond">MORE ABOUT ME <ArrowUpRight size={15}/></a></header>
    <div className="scene" aria-hidden="true"><Scene index={index} progress={progress}/></div>
    <div className="progress"><span>{String(index).padStart(2,'0')} / 07</span><div className="progress-track"><div style={{height:`${(index+progress)/(chapters.length-1)*100}%`}}/></div><span>SCROLL TO EXPLORE</span></div>
    <main>{chapters.map((ch,i)=><section key={ch.name} id={i===0?'intro':i===7?'contact':ch.name.toLowerCase()} className={`chapter ${i===index?'is-active':''}`}>
      <div className="content">
        <span className="eyebrow"><span className="indicator"/> {ch.eyebrow}</span>
        {i===0?<><h1>OISHI <em>PAUL.</em></h1><p className="intro-tag">NOT MADE TO BLEND IN.</p></>:<><span className="number">{String(i).padStart(2,'0')}</span><h2>{ch.name==='CONTACT'?"LET'S BUILD.":ch.name}</h2></>}
        <h3>{ch.title}</h3><p className="description">{ch.description}</p>
        <div className="tags">{ch.stack.map(t=><span key={t}>{t}</span>)}</div>
        {ch.github&&<div className="links"><a href={ch.live} target="_blank" rel="noreferrer">LIVE EXPERIENCE <ExternalLink size={16}/></a><a href={ch.github} target="_blank" rel="noreferrer">SOURCE CODE <Code2 size={16}/></a></div>}
        {i===7&&<div className="links"><a href="https://github.com/oishipaul45-engineer" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={16}/></a><a href="https://www.linkedin.com/in/oishi-paul-328a37399" target="_blank" rel="noreferrer">LINKEDIN <ArrowUpRight size={16}/></a></div>}
        {i===0&&<a className="discover" href="#aethera">SCROLL TO BEGIN <ArrowDown size={16}/></a>}
      </div>
      <div className="chapter-mark">{ch.name} <span> / EXPERIMENT {String(i).padStart(2,'0')}</span></div>
    </section>)}<ExtendedSections/></main>
    <FinalContact />
<footer>DESIGNED TO BE EXPLORED. BUILT BY OISHI PAUL. Â© 2026</footer>
  </div>
}

