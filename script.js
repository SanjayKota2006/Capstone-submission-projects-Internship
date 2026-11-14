const initialJobs = [
 {id:1,title:"Senior Product Designer",company:"Goodside Studio",initial:"G",tone:"pink",location:"Remote",category:"Design",type:"Full-time",salary:"₹12–18 LPA",description:"Shape simple, thoughtful experiences for products used by thousands. Work closely with product and engineering to turn complex problems into clear, useful experiences.",email:"careers@goodside.example"},
 {id:2,title:"Frontend Engineer",company:"Northstar Labs",initial:"N",tone:"green",location:"Bengaluru",category:"Engineering",type:"Full-time",salary:"₹14–22 LPA",description:"Build fast, accessible interfaces with React and modern web technologies. Partner with design and backend teams to ship high-quality product experiences.",email:"jobs@northstar.example"},
 {id:3,title:"Brand Marketing Lead",company:"Layers",initial:"L",tone:"lilac",location:"Mumbai",category:"Marketing",type:"Full-time",salary:"₹10–15 LPA",description:"Own campaigns that introduce our product to new audiences. Bring a clear point of view, strong storytelling, and a test-and-learn mindset.",email:"talent@layers.example"},
 {id:4,title:"Data Analyst",company:"Orbit Finance",initial:"O",tone:"blue",location:"Hyderabad",category:"Business",type:"Full-time",salary:"₹7–11 LPA",description:"Turn data into decisions. Build dashboards, investigate trends, and work with teams across the business to answer important questions.",email:"careers@orbit.example"},
 {id:5,title:"Product Design Intern",company:"Goodside Studio",initial:"G",tone:"pink",location:"Chennai",category:"Design",type:"Internship",salary:"₹25k–35k / month",description:"Learn by doing alongside a supportive design team. Help with research, wireframes, prototypes, and thoughtful product details.",email:"careers@goodside.example"},
 {id:6,title:"Backend Developer",company:"Northstar Labs",initial:"N",tone:"green",location:"Bengaluru",category:"Engineering",type:"Full-time",salary:"₹12–19 LPA",description:"Design and maintain reliable APIs and services. We value clean code, practical problem solving, and a collaborative approach.",email:"jobs@northstar.example"},
 {id:7,title:"People Operations Associate",company:"Orbit Finance",initial:"O",tone:"blue",location:"Remote",category:"Business",type:"Full-time",salary:"₹6–9 LPA",description:"Help create a welcoming employee experience across the full people journey, from onboarding to learning and development.",email:"careers@orbit.example"},
 {id:8,title:"Content Strategist",company:"Layers",initial:"L",tone:"lilac",location:"Delhi",category:"Marketing",type:"Contract",salary:"₹8–12 LPA",description:"Develop a clear editorial voice and content strategy across web, social, and campaigns. Make complex ideas feel simple and compelling.",email:"talent@layers.example"}
];
let jobs = [...initialJobs];
let activeCategory = "All";
const grid = document.getElementById("jobGrid");
const keyword = document.getElementById("keyword");
const locationFilter = document.getElementById("location");
const toast = document.getElementById("toast");
let toastTimer;
function notify(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800)}
function safe(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderJobs(){
 const q=keyword.value.trim().toLowerCase(),loc=locationFilter.value;
 const filtered=jobs.filter(j=>(activeCategory==="All"||j.category===activeCategory)&&(!loc||j.location===loc)&&(`${j.title} ${j.company} ${j.category} ${j.description}`.toLowerCase().includes(q)));
 document.getElementById("allCount").textContent=jobs.length;
 document.getElementById("resultsCount").textContent=`Showing ${filtered.length} of ${jobs.length} roles`;
 grid.innerHTML=filtered.map(j=>`<article class="job-card"><div class="job-card-top"><div class="company-avatar ${safe(j.tone||"")}">${safe(j.initial||j.company.charAt(0).toUpperCase())}</div><button class="save-job" aria-label="Save ${safe(j.title)}" data-save="${j.id}">♡</button></div><h3>${safe(j.title)}</h3><div class="job-company">${safe(j.company)}</div><div class="job-tags"><span class="job-tag">${safe(j.location)}</span><span class="job-tag">${safe(j.type)}</span><span class="job-tag">${safe(j.category)}</span></div><div class="job-card-bottom"><span class="salary">${safe(j.salary||"Salary not listed")}</span><button data-view="${j.id}">View role ↗</button></div></article>`).join("");
 document.getElementById("emptyState").classList.toggle("hidden",filtered.length!==0);
 grid.classList.toggle("hidden",filtered.length===0);
}
function setCategory(category){activeCategory=category;document.querySelectorAll(".filter-pill").forEach(b=>b.classList.toggle("active",b.dataset.category===category));renderJobs()}
document.getElementById("categoryFilters").addEventListener("click",e=>{const button=e.target.closest("[data-category]");if(button)setCategory(button.dataset.category)});
document.getElementById("searchButton").addEventListener("click",renderJobs);
keyword.addEventListener("input",renderJobs);locationFilter.addEventListener("change",renderJobs);
document.getElementById("clearFilters").addEventListener("click",()=>{keyword.value="";locationFilter.value="";setCategory("All")});
document.getElementById("showAll").addEventListener("click",()=>{keyword.value="";locationFilter.value="";setCategory("All");document.getElementById("jobs").scrollIntoView({behavior:"smooth"})});
grid.addEventListener("click",e=>{
 const save=e.target.closest("[data-save]");if(save){save.classList.toggle("saved");save.textContent=save.classList.contains("saved")?"♥":"♡";notify(save.classList.contains("saved")?"Role saved in this session":"Removed from saved roles");return}
 const view=e.target.closest("[data-view]");if(view){const job=jobs.find(j=>j.id===Number(view.dataset.view));if(job)showJob(job)}
});
function showJob(job){
 const backdrop=document.getElementById("modalBackdrop");
 document.getElementById("modalKicker").textContent=`${job.company.toUpperCase()} · ${job.location.toUpperCase()}`;
 document.getElementById("modalTitle").textContent=job.title;
 document.getElementById("modalIntro").textContent=`${job.type} · ${job.salary||"Salary not listed"}`;
 document.getElementById("jobForm").classList.add("hidden");document.getElementById("loginForm").classList.add("hidden");
 let detail=document.getElementById("roleDetail");if(!detail){detail=document.createElement("div");detail.id="roleDetail";document.querySelector(".modal").insertBefore(detail,document.getElementById("jobForm"))}
 detail.classList.remove("hidden");detail.innerHTML=`<p style="font-size:13px;line-height:1.8;color:#657068">${safe(job.description)}</p><p style="font-size:11px;color:#657068">Interested? Contact <a style="color:#648b1c;text-decoration:underline" href="mailto:${safe(job.email||"")}">${safe(job.email||"the employer")}</a> to apply.</p><button class="btn btn-primary form-submit" id="applyEmail">Apply by email ↗</button>`;
 document.getElementById("applyEmail").onclick=()=>{location.href=`mailto:${encodeURIComponent(job.email||"")}?subject=${encodeURIComponent("Application for "+job.title)}`};
 document.getElementById("modalBackdrop").classList.remove("hidden");
}
const backdrop=document.getElementById("modalBackdrop");
function openModal(mode){
 document.getElementById("roleDetail")?.classList.add("hidden");
 document.getElementById("jobForm").classList.toggle("hidden",mode!=="post");
 document.getElementById("loginForm").classList.toggle("hidden",mode!=="login");
 document.getElementById("modalKicker").textContent=mode==="post"?"FOR EMPLOYERS":"WELCOME BACK";
 document.getElementById("modalTitle").textContent=mode==="post"?"Post a new role":"Log in to Jobly";
 document.getElementById("modalIntro").textContent=mode==="post"?"Tell great people what you're building.":"Sign in to continue your career journey.";
 backdrop.classList.remove("hidden");
}
function closeModal(){backdrop.classList.add("hidden")}
["postOpen","heroPost","ctaPost"].forEach(id=>document.getElementById(id).addEventListener("click",()=>openModal("post")));
document.getElementById("loginOpen").addEventListener("click",()=>openModal("login"));
document.getElementById("modalClose").addEventListener("click",closeModal);
backdrop.addEventListener("click",e=>{if(e.target===backdrop)closeModal()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
document.getElementById("jobForm").addEventListener("submit",e=>{
 e.preventDefault();const data=Object.fromEntries(new FormData(e.currentTarget).entries());
 jobs.unshift({id:Date.now(),...data,initial:data.company.charAt(0).toUpperCase(),tone:"green"});
 e.currentTarget.reset();closeModal();setCategory("All");keyword.value="";locationFilter.value="";renderJobs();notify("Your job has been published in this demo.");
 document.getElementById("jobs").scrollIntoView({behavior:"smooth"});
});
document.getElementById("loginForm").addEventListener("submit",e=>{e.preventDefault();notify("Demo only — connect a backend to enable accounts.");e.currentTarget.reset();closeModal()});
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false")}));
document.getElementById("year").textContent=new Date().getFullYear();
renderJobs();
