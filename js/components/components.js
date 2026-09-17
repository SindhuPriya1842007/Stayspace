const S = window.STAYSCAPE_DATA;

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function currentUser(){try{return JSON.parse(localStorage.getItem("ss_user")||"null")}catch{return null}}
function setUser(u){localStorage.setItem("ss_user",JSON.stringify(u))}
function logout(){localStorage.removeItem("ss_user");location.href=base("pages/auth/login.html")}
function base(path){return location.pathname.includes("/pages/") ? "../../"+path : path}
function link(path){return base(path)}

function navbar(active="Explore"){
 const u=currentUser();
 return `<header class="navbar"><div class="container nav-inner">
  <a class="logo" href="${link("index.html")}">Stay<span>Scape</span></a>
  <nav class="nav-center">
   <a class="${active==="Explore"?"active":""}" href="${link("index.html")}">Explore</a>
   <a class="${active==="Homes"?"active":""}" href="${link("pages/public/homes.html")}">Homes</a>
   <a class="${active==="Experiences"?"active":""}" href="${link("pages/public/experiences.html")}">Experiences</a>
   <a class="${active==="Services"?"active":""}" href="${link("pages/public/services.html")}">Services</a>
  </nav>
  <div class="nav-actions">
   ${u ? `<a class="host-link" href="${link(u.role==="host"?"pages/host/dashboard.html":"pages/host/dashboard.html")}">Switch to Hosting</a>` : `<button class="host-link" id="becomeHost">Become a host</button>`}
   ${u ? `<div class="nav-relative"><button class="profile-menu" id="profileMenu"><span class="hamb">☰</span><span class="person">◯</span></button><div id="profileDropdown" class="dropdown hidden">
      <a href="${link("pages/traveller/profile.html")}">Profile</a><a href="${link("pages/traveller/trips.html")}">Trips</a><a href="${link("pages/traveller/wishlist.html")}">Wishlists</a><a href="${link("pages/traveller/messages.html")}">Messages</a><a href="${link("pages/traveller/notifications.html")}">Notifications</a><a href="${link("pages/traveller/payments.html")}">Payments</a><a href="${link("pages/traveller/settings.html")}">Settings</a>${u.role==="admin"?`<a href="${link("pages/admin/dashboard.html")}">Admin</a>`:""}<button id="logoutBtn">Logout</button>
   </div></div>` : `<a class="btn btn-dark btn-pill" href="${link("pages/auth/login.html")}">Login</a>`}
  </div>
 </div></header>`;
}

function footer(){
 return `<footer class="footer"><div class="container"><div class="footer-grid">
  <div><h4>StayScape</h4><a href="${link("index.html")}">Explore</a><a href="${link("pages/public/homes.html")}">Homes</a><a href="${link("pages/public/experiences.html")}">Experiences</a></div>
  <div><h4>Support</h4><a href="${link("pages/public/help.html")}">Help Center</a><a href="#">Safety</a><a href="#">Cancellation</a></div>
  <div><h4>Hosting</h4><a href="${link("pages/host/dashboard.html")}">Become a host</a><a href="#">Hosting resources</a><a href="#">Community</a></div>
  <div><h4>StayScape</h4><a href="#">About</a><a href="#">Privacy</a><a href="#">Terms</a></div>
 </div><div class="copyright">© 2026 StayScape · Built as an original Airbnb-inspired student project.</div></div></footer>`;
}

function propertyCard(p){
 return `<article class="card"><a href="${link("pages/public/property-details.html?id="+encodeURIComponent(p.id))}">
  <div class="card-image"><img src="${p.image}" alt="${esc(p.title)}"><button class="heart" data-wishlist="${p.id}" onclick="event.preventDefault();toggleWishlist('${p.id}')">♡</button></div>
  <div class="card-body"><div class="card-title">${esc(p.title)}</div><div class="card-location">${esc(p.location)}</div><div class="card-meta"><span class="price">₹${p.price.toLocaleString()} night</span><span class="rating">★ ${p.rating}</span></div></div>
 </a></article>`;
}
function experienceCard(x){
 return `<article class="card"><a href="${link("pages/public/experience-details.html?id="+encodeURIComponent(x.id))}">
  <div class="card-image"><img src="${x.image}" alt="${esc(x.title)}"><button class="heart" data-wishlist="${x.id}" onclick="event.preventDefault();toggleWishlist('${x.id}')">♡</button></div>
  <div class="card-body"><div class="card-title">${esc(x.title)}</div><div class="card-location">${esc(x.location)}</div><div class="card-meta"><span class="price">₹${x.price.toLocaleString()} / person</span><span class="rating">★ ${x.rating}</span></div></div>
 </a></article>`;
}
function serviceCard(x){
 return `<article class="card"><a href="${link("pages/public/service-details.html?id="+encodeURIComponent(x.id))}">
  <div class="card-image"><img src="${x.image}" alt="${esc(x.title)}"><button class="heart" data-wishlist="${x.id}" onclick="event.preventDefault();toggleWishlist('${x.id}')">♡</button></div>
  <div class="card-body"><div class="card-title">${esc(x.title)}</div><div class="card-location">${esc(x.location)}</div><div class="card-meta"><span class="price">₹${x.price.toLocaleString()} / session</span><span class="rating">★ ${x.rating}</span></div></div>
 </a></article>`;
}
function searchBar(){
 return `<div class="search-wrap"><div class="search-bar">
 <div class="search-part" id="wherePart"><strong>Where</strong><span id="whereValue">Search destinations</span><div class="search-pop hidden" id="wherePop"><input id="whereInput" placeholder="Search destinations"><div class="suggest" data-place="Hyderabad">Hyderabad</div><div class="suggest" data-place="Goa">Goa</div><div class="suggest" data-place="Manali">Manali</div><div class="suggest" data-place="Jaipur">Jaipur</div></div></div>
 <div class="search-divider"></div>
 <div class="search-part" id="whenPart"><strong>When</strong><span id="whenValue">Add dates</span><div class="search-pop hidden" id="whenPop"><label>Check in</label><input type="date" id="checkIn"><label>Check out</label><input type="date" id="checkOut"></div></div>
 <div class="search-divider"></div>
 <div class="search-part" id="whoPart"><strong>Who</strong><span id="whoValue">Add guests</span><div class="search-pop right hidden" id="whoPop"><label>Guests</label><input type="number" min="1" value="1" id="guestCount"></div></div>
 <button class="search-submit" id="searchSubmit">⌕</button></div></div>`;
}

function initNavbar(){
 const b=document.getElementById("becomeHost");
 if(b)b.onclick=()=>openHostModal();
 const pm=document.getElementById("profileMenu");
 if(pm)pm.onclick=()=>document.getElementById("profileDropdown").classList.toggle("hidden");
 const lo=document.getElementById("logoutBtn");
 if(lo)lo.onclick=logout;
}
function openHostModal(){
 document.body.insertAdjacentHTML("beforeend",`<div class="modal-backdrop" id="hostModal"><div class="modal"><div class="modal-head"><h2>Start hosting on StayScape</h2><button class="modal-close" onclick="document.getElementById('hostModal').remove()">×</button></div><p class="muted" style="margin-top:8px">Choose what you want to offer.</p><div class="modal-options">
 <button class="modal-option" onclick="goHost('Home')"><b>🏠 Home</b><br><small class="muted">Host a place to stay</small></button>
 <button class="modal-option" onclick="goHost('Experience')"><b>🎯 Experience</b><br><small class="muted">Share an activity or local experience</small></button>
 <button class="modal-option" onclick="goHost('Service')"><b>🛎 Service</b><br><small class="muted">Offer a travel service</small></button>
 </div></div></div>`);
}
function goHost(){const u=currentUser(); if(!u){location.href=link("pages/auth/login.html?next=host");return} location.href=link("pages/host/create-listing.html")}
function toggleWishlist(id){
 const u=currentUser(); if(!u){location.href=link("pages/auth/login.html?next=wishlist");return}
 let a=JSON.parse(localStorage.getItem("ss_wishlist")||"[]"); a=a.includes(id)?a.filter(x=>x!==id):[...a,id]; localStorage.setItem("ss_wishlist",JSON.stringify(a));
 alert(a.includes(id)?"Saved to wishlist":"Removed from wishlist");
}
function initSearch(){
 const parts=[["wherePart","wherePop"],["whenPart","whenPop"],["whoPart","whoPop"]];
 parts.forEach(([a,b])=>{const x=document.getElementById(a),y=document.getElementById(b);if(x)x.onclick=e=>{e.stopPropagation();document.querySelectorAll(".search-pop").forEach(p=>p.classList.add("hidden"));y.classList.remove("hidden")}})
 document.querySelectorAll(".suggest").forEach(s=>s.onclick=e=>{e.stopPropagation();document.getElementById("whereValue").textContent=s.dataset.place;document.getElementById("wherePop").classList.add("hidden")});
 ["checkIn","checkOut"].forEach(id=>{const x=document.getElementById(id);if(x)x.onchange=()=>{const a=document.getElementById("checkIn").value,b=document.getElementById("checkOut").value;document.getElementById("whenValue").textContent=a&&b?`${a} → ${b}`:a||"Add dates"}});
 const g=document.getElementById("guestCount");if(g)g.oninput=()=>document.getElementById("whoValue").textContent=`${g.value} guest${g.value==1?"":"s"}`;
 const s=document.getElementById("searchSubmit");if(s)s.onclick=()=>{const q=document.getElementById("whereValue").textContent;location.href=link("pages/public/search-results.html")+(q&&q!=="Search destinations"?`?q=${encodeURIComponent(q)}`:"")};
 document.addEventListener("click",()=>document.querySelectorAll(".search-pop").forEach(p=>p.classList.add("hidden")),{once:false});
}


