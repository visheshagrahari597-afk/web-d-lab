// ===== Edit your details here =====
const CONFIG = {
  email: "",      // e.g. "vishesh@example.com" — the Email button hides until this is filled
  linkedin: ""    // e.g. "https://www.linkedin.com/in/your-profile" — hides until filled
};

const PROJECTS = [
  {
    name: "UNIFIX",
    kind: "Campus infrastructure platform",
    role: "Team lead, team of four",
    text: "One place for students and staff to report hostel, lab, water and electrical problems. AI sorts each complaint by type and routes it to the right department, and role-based access keeps employee and admin tools separate.",
    tags: ["Flask", "PostgreSQL", "PWA", "AI classification"],
    link: ""
  },
  {
    name: "NEVO",
    kind: "Civic voice platform",
    text: "Citizens report local problems by text, voice or WhatsApp in any language. AI groups similar reports into shared demands and ranks them for MPs and officials, with fund tracking and outcome timelines.",
    tags: ["Python", "Embeddings", "WhatsApp", "Multilingual"],
    link: ""
  },
  {
    name: "AreaPulse",
    kind: "Neighbourhood issue tracker",
    text: "A civic reporting app with WhatsApp intake, dashboards for NGOs and service deadlines that automatically escalate issues left unresolved.",
    tags: ["WhatsApp intake", "Dashboards", "SLA tracking"],
    link: ""
  },
  {
    name: "UniPulse",
    kind: "Campus grievance system",
    text: "A full grievance workflow for colleges: every case has a history, deadline alerts warn before complaints go stale, and logins are secured per role.",
    tags: ["Case workflow", "Audit history", "Secure auth"],
    link: ""
  },
  {
    name: "SmartPoli",
    kind: "Medicine companion app",
    text: "Reads prescriptions, sends dose reminders, warns about unsafe drug combinations, speaks Hindi and keeps caregivers and doctors in the loop.",
    tags: ["OCR", "Hindi voice", "Reminders"],
    link: ""
  }
];
// ==================================

document.documentElement.classList.add("js");

// Contact links
const email = document.getElementById("email-link");
const linkedin = document.getElementById("linkedin-link");
if (CONFIG.email) email.href = "mailto:" + CONFIG.email; else email.parentElement.remove();
if (CONFIG.linkedin) linkedin.href = CONFIG.linkedin; else linkedin.parentElement.remove();
document.getElementById("year").textContent = new Date().getFullYear();

// Build the project reel
const reel = document.getElementById("reel");

PROJECTS.forEach((p, i) => {
  const li = document.createElement("li");
  li.className = "reveal";
  const id = "project-" + i;

  li.innerHTML = `
    <button type="button" aria-expanded="false" aria-controls="${id}">
      <span class="name">${p.name}</span>
      <span class="kind">${p.kind}</span>
    </button>
    <div class="detail" id="${id}">
      <div class="detail-inner">
        <div class="detail-body">
          <div>
            ${p.role ? `<p class="role">${p.role}</p>` : ""}
            <p>${p.text}</p>
            ${p.link ? `<p><a href="${p.link}" target="_blank" rel="noopener">View project</a></p>` : ""}
          </div>
          <ul class="tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>
      </div>
    </div>`;

  const btn = li.querySelector("button");
  btn.addEventListener("click", () => {
    const open = li.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  reel.appendChild(li);
});

// Open the first project so the reel shows what it holds
reel.firstElementChild.classList.add("open");
reel.firstElementChild.querySelector("button").setAttribute("aria-expanded", "true");

// Scroll reveal
document.querySelectorAll(".scene-title, .lede, .facts, .group, .timeline li, .fin")
  .forEach(el => el.classList.add("reveal"));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));
