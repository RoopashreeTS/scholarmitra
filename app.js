// ==========================================================================
// ScholarMitra - Core Application & Intelligent Matching Engine
// ==========================================================================

// Global Application State
const AppState = {
  profile: {
    course: "BCA",
    year: "1st Year",
    state: "Karnataka",
    percentage: 78,
    category: "OBC",
    income: 200000,
    gender: "Female"
  },
  filters: {
    query: "",
    course: "all",
    state: "all",
    category: "all",
    income: "all",
    deadline: "all",
    verified: "all",
    sortBy: "best-match"
  },
  bookmarks: new Set(JSON.parse(localStorage.getItem("scholarmitra_bookmarks") || "[]")),
  checklist: JSON.parse(localStorage.getItem("scholarmitra_checklist") || "{}"),
  selectedScholarship: null
};

// ==========================================================================
// Explainable Smart Match Engine
// ==========================================================================

function calculateScholarshipMatch(scholarship, profile) {
  let score = 0;
  const satisfiedCriteria = [];
  const verificationNeeded = [];

  // 1. Course Match (Weight: 25%)
  const courseMatch = scholarship.eligibleCourses.some(c => 
    c.toLowerCase().includes(profile.course.toLowerCase()) || 
    profile.course.toLowerCase().includes(c.toLowerCase()) ||
    c === "All Streams" || c === "Undergraduate"
  );

  if (courseMatch) {
    score += 25;
    satisfiedCriteria.push(`Course eligible (${profile.course})`);
  } else {
    verificationNeeded.push(`Check specific department eligibility for ${profile.course}`);
  }

  // 2. State Eligibility (Weight: 20%)
  const isPanIndia = scholarship.eligibleStates.includes("All India");
  const stateMatch = isPanIndia || scholarship.eligibleStates.includes(profile.state);

  if (stateMatch) {
    score += 20;
    if (isPanIndia) {
      satisfiedCriteria.push(`Open to all Indian residents (Domicile: ${profile.state})`);
    } else {
      satisfiedCriteria.push(`State quota match (${profile.state} domicile)`);
    }
  } else {
    verificationNeeded.push(`Scheme primarily targets ${scholarship.eligibleStates.join(", ")}`);
  }

  // 3. Academic Score / Percentage (Weight: 20%)
  if (profile.percentage >= scholarship.minPercentage) {
    score += 20;
    satisfiedCriteria.push(`Academic score satisfied (${profile.percentage}% ≥ min ${scholarship.minPercentage}%)`);
  } else {
    const diff = scholarship.minPercentage - profile.percentage;
    if (diff <= 5) {
      score += 10;
      verificationNeeded.push(`Score is ${profile.percentage}% (Requires min ${scholarship.minPercentage}%; concession may apply)`);
    } else {
      verificationNeeded.push(`Requires minimum ${scholarship.minPercentage}% marks`);
    }
  }

  // 4. Category & Gender (Weight: 20%)
  let catMatch = false;
  if (scholarship.category.includes("General") || scholarship.category.includes(profile.category) || scholarship.category.includes("All")) {
    catMatch = true;
  }

  let genderMatch = true;
  if (scholarship.gender === "Female" && profile.gender !== "Female") {
    genderMatch = false;
  }

  if (catMatch && genderMatch) {
    score += 20;
    satisfiedCriteria.push(`Category criteria met (${profile.category}${scholarship.gender === 'Female' ? ' • Female' : ''})`);
  } else if (!genderMatch) {
    verificationNeeded.push(`Dedicated exclusively for female applicants`);
  } else {
    verificationNeeded.push(`Category criteria: targets ${scholarship.category.join(", ")}`);
  }

  // 5. Family Income Criteria (Weight: 15%)
  if (scholarship.maxIncome === null) {
    score += 15;
    satisfiedCriteria.push("Merit scheme (No income ceiling)");
  } else if (profile.income <= scholarship.maxIncome) {
    score += 15;
    satisfiedCriteria.push(`Income requirement met (₹${(profile.income/100000).toFixed(1)}L ≤ max ₹${(scholarship.maxIncome/100000).toFixed(1)}L)`);
  } else {
    verificationNeeded.push(`Family income ceiling is ₹${(scholarship.maxIncome/100000).toFixed(1)}L / year`);
  }

  // Bound score realistically between 35% and 98% (never static 100%)
  score = Math.min(Math.max(score, 35), 98);

  return {
    score,
    satisfiedCriteria,
    verificationNeeded
  };
}

// Calculate remaining days relative to current date
function getDaysRemaining(deadlineStr) {
  const today = new Date("2026-08-28");
  const deadline = new Date(deadlineStr);
  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

// Format currency
function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

// ==========================================================================
// DOM Rendering & Cards
// ==========================================================================

function renderScholarshipCard(scholarship) {
  const matchData = calculateScholarshipMatch(scholarship, AppState.profile);
  const daysLeft = getDaysRemaining(scholarship.deadline);
  const isBookmarked = AppState.bookmarks.has(scholarship.id);

  const isClosingSoon = daysLeft <= 18 && daysLeft >= 0;

  return `
    <article class="scholarship-card" data-id="${scholarship.id}">
      <div class="card-top">
        <div class="badges-group">
          ${scholarship.verified ? 
            `<span class="badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Portal</span>` : 
            `<span class="badge-unverified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> Verification In Progress</span>`
          }
          ${isClosingSoon ? 
            `<span class="badge-closing"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Closing Soon (${daysLeft} days)</span>` : 
            ""
          }
        </div>
        <div class="match-score-pill" title="Calculated based on your profile inputs">
          <div class="match-percent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${matchData.score}%
          </div>
          <span class="match-sub">Match Score</span>
        </div>
      </div>

      <h3 class="card-title">${scholarship.title}</h3>
      <p class="card-provider">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 7v14M21 7v14M6 7V3h12v4M10 11v2M14 11v2"/></svg>
        ${scholarship.provider}
      </p>

      <div class="card-meta-grid">
        <div class="meta-box">
          <span class="meta-lbl">Scholarship Amount</span>
          <span class="meta-val amount">${scholarship.amountDisplay}</span>
        </div>
        <div class="meta-box">
          <span class="meta-lbl">Deadline</span>
          <span class="meta-val">${new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <div class="meta-box">
          <span class="meta-lbl">Eligible Courses</span>
          <span class="meta-val">${scholarship.eligibleCourses.slice(0, 2).join(", ")}${scholarship.eligibleCourses.length > 2 ? ' +' + (scholarship.eligibleCourses.length - 2) : ''}</span>
        </div>
        <div class="meta-box">
          <span class="meta-lbl">Income Ceiling</span>
          <span class="meta-val">${scholarship.maxIncomeDisplay}</span>
        </div>
      </div>

      <div class="match-reasons-box">
        <div style="font-weight: 700; color: var(--text-main); margin-bottom: 6px; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.04em;">
          Why this matches you:
        </div>
        ${matchData.satisfiedCriteria.slice(0, 2).map(r => `
          <div class="match-reason-item pass">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            <span>${r}</span>
          </div>
        `).join("")}
        ${matchData.verificationNeeded.length > 0 ? `
          <div class="match-reason-item warning">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span>${matchData.verificationNeeded[0]}</span>
          </div>
        ` : ""}
      </div>

      <div class="card-footer-actions">
        <button class="btn-details" onclick="openDetailsModal('${scholarship.id}')">
          View Details & Criteria →
        </button>
        <button class="btn-bookmark ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${scholarship.id}')" title="${isBookmarked ? 'Remove from saved' : 'Save for later'}" aria-label="Bookmark scholarship">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
        </button>
      </div>
    </article>
  `;
}

// Filter and Sort Scholarships
function getFilteredScholarships() {
  const { query, course, state, category, income, deadline, verified, sortBy } = AppState.filters;

  return SCHOLARSHIPS_DATA.filter(item => {
    // 1. Text Search Query
    if (query) {
      const q = query.toLowerCase();
      const matchText = (
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.overview.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q)) ||
        item.eligibleCourses.some(c => c.toLowerCase().includes(q))
      );
      if (!matchText) return false;
    }

    // 2. Course Filter
    if (course !== "all") {
      const cMatch = item.eligibleCourses.some(c => c.toLowerCase().includes(course.toLowerCase()) || c === "All Streams" || c === "Undergraduate");
      if (!cMatch) return false;
    }

    // 3. State Filter
    if (state !== "all") {
      const sMatch = item.eligibleStates.includes("All India") || item.eligibleStates.includes(state);
      if (!sMatch) return false;
    }

    // 4. Category Filter
    if (category !== "all") {
      const catMatch = item.category.includes("General") || item.category.includes(category) || (category === "Female" && item.gender === "Female");
      if (!catMatch) return false;
    }

    // 5. Income Filter
    if (income !== "all") {
      const maxInc = parseInt(income, 10);
      if (item.maxIncome !== null && item.maxIncome < maxInc) return false;
    }

    // 6. Deadline Filter
    if (deadline !== "all") {
      const days = getDaysRemaining(item.deadline);
      if (deadline === "closing-soon" && (days > 18 || days < 0)) return false;
      if (deadline === "this-month" && (days > 35 || days < 0)) return false;
    }

    // 7. Verified Filter
    if (verified === "verified-only" && !item.verified) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "best-match") {
      const scoreA = calculateScholarshipMatch(a, AppState.profile).score;
      const scoreB = calculateScholarshipMatch(b, AppState.profile).score;
      return scoreB - scoreA;
    }
    if (sortBy === "deadline-soon") {
      return getDaysRemaining(a.deadline) - getDaysRemaining(b.deadline);
    }
    if (sortBy === "highest-amount") {
      return b.amount - a.amount;
    }
    return 0;
  });
}

function renderScholarshipsList() {
  const container = document.getElementById("scholarshipsGrid");
  const countEl = document.getElementById("resultsCount");
  if (!container) return;

  const results = getFilteredScholarships();
  
  if (countEl) {
    countEl.innerHTML = `Showing <span>${results.length}</span> scholarships matching your criteria`;
  }

  if (results.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px dashed var(--border);">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
        <h4 style="font-size: 1.2rem; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">No matching scholarships found</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 16px;">Try adjusting your search terms or relaxing some filter options.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(s => renderScholarshipCard(s)).join("");
}

// ==========================================================================
// Details & Apply Redirect Modals
// ==========================================================================

function openDetailsModal(scholarshipId) {
  const scholarship = SCHOLARSHIPS_DATA.find(s => s.id === scholarshipId);
  if (!scholarship) return;

  AppState.selectedScholarship = scholarship;
  const modalBackdrop = document.getElementById("detailsModal");
  const modalContent = document.getElementById("detailsModalContent");
  if (!modalBackdrop || !modalContent) return;

  const matchData = calculateScholarshipMatch(scholarship, AppState.profile);
  const daysLeft = getDaysRemaining(scholarship.deadline);

  modalContent.innerHTML = `
    <div class="modal-header">
      <div class="badges-group" style="margin-bottom: 10px;">
        ${scholarship.verified ? 
          `<span class="badge-verified"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Verified Portal</span>` : 
          `<span class="badge-unverified">Under Verification</span>`
        }
        <span class="badge-closing" style="${daysLeft <= 18 ? '' : 'background: var(--blue-light); color: var(--blue); border-color: rgba(59,130,246,0.2);'}">
          ${daysLeft} days remaining (${new Date(scholarship.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})
        </span>
      </div>
      <h2 style="font-size: 1.45rem; font-weight: 800; color: var(--text-main); line-height: 1.25; margin-bottom: 6px;">
        ${scholarship.title}
      </h2>
      <p style="font-size: 0.9rem; font-weight: 600; color: var(--text-muted);">
        Offered by: <strong style="color: var(--text-main);">${scholarship.provider}</strong> (${scholarship.providerType})
      </p>
    </div>

    <div class="modal-body">
      <!-- Why This Matches You Banner -->
      <div style="background: var(--primary-50); border: 1px solid var(--primary-light); border-radius: var(--radius-lg); padding: 16px 20px; margin-bottom: 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="font-size: 0.95rem; font-weight: 800; color: var(--primary-dark); display: flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Why This Matches You (${matchData.score}% Score)
          </h4>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--primary); color: #FFFFFF; padding: 2px 8px; border-radius: var(--radius-full);">
            Profile Match
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${matchData.satisfiedCriteria.map(c => `
            <div style="display: flex; align-items: center; gap: 6px; font-size: 0.84rem; color: #065F46;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${c}</span>
            </div>
          `).join("")}
          ${matchData.verificationNeeded.map(v => `
            <div style="display: flex; align-items: center; gap: 6px; font-size: 0.84rem; color: #92400E;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span>${v}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Description -->
      <div style="margin-bottom: 24px;">
        <h4 class="modal-section-title">Scheme Overview</h4>
        <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.6;">${scholarship.overview}</p>
      </div>

      <!-- Key Criteria Grid -->
      <div style="margin-bottom: 24px;">
        <h4 class="modal-section-title">Eligibility Criteria</h4>
        <div class="detail-pills-list">
          <div class="detail-pill"><strong>Award:</strong> ${scholarship.amountDisplay}</div>
          <div class="detail-pill"><strong>Min Marks:</strong> ${scholarship.minPercentage}%</div>
          <div class="detail-pill"><strong>Max Income:</strong> ${scholarship.maxIncomeDisplay}</div>
          <div class="detail-pill"><strong>Eligible States:</strong> ${scholarship.eligibleStates.join(", ")}</div>
          <div class="detail-pill"><strong>Eligible Categories:</strong> ${scholarship.category.join(", ")}</div>
          <div class="detail-pill"><strong>Gender:</strong> ${scholarship.gender === 'Female' ? 'Female Students Only' : 'Open to All'}</div>
        </div>
      </div>

      <!-- Eligible Courses -->
      <div style="margin-bottom: 24px;">
        <h4 class="modal-section-title">Eligible Courses / Streams</h4>
        <div style="display: flex; flex-wrap: wrap; gap: 6px;">
          ${scholarship.eligibleCourses.map(c => `
            <span style="background: var(--blue-light); color: var(--blue); font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: var(--radius-full);">
              ${c}
            </span>
          `).join("")}
        </div>
      </div>

      <!-- Required Documents -->
      <div style="margin-bottom: 12px;">
        <h4 class="modal-section-title">Mandatory Documents Required</h4>
        <ul class="docs-list-styled">
          ${scholarship.requiredDocs.map(doc => `
            <li>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>${doc}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>

    <div class="modal-footer">
      <div style="display: flex; flex-direction: column;">
        <span style="font-size: 0.72rem; font-weight: 600; color: var(--text-muted);">Application Portal:</span>
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-main);">${scholarship.portalName}</span>
      </div>
      <button class="btn-primary" onclick="openRedirectConfirmation('${scholarship.id}')">
        Apply on Official Portal ↗
      </button>
    </div>
  `;

  modalBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDetailsModal() {
  const modalBackdrop = document.getElementById("detailsModal");
  if (modalBackdrop) {
    modalBackdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Redirect Confirmation Safety Modal
function openRedirectConfirmation(scholarshipId) {
  const scholarship = SCHOLARSHIPS_DATA.find(s => s.id === scholarshipId);
  if (!scholarship) return;

  const redirectModal = document.getElementById("redirectModal");
  const content = document.getElementById("redirectModalContent");
  if (!redirectModal || !content) return;

  content.innerHTML = `
    <div class="redirect-box">
      <div class="redirect-icon-box">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-main); margin-bottom: 8px;">
        Redirecting to Official Portal
      </h3>
      <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 18px;">
        You are navigating away from ScholarMitra to the official authorized application website:
      </p>

      <div style="background: var(--bg-main); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 12px; margin-bottom: 20px; font-weight: 700; color: var(--primary-dark); font-size: 0.95rem;">
        ${scholarship.portalName}
        <div style="font-size: 0.78rem; font-weight: 500; color: var(--text-muted); word-break: break-all; margin-top: 2px;">
          ${scholarship.officialUrl}
        </div>
      </div>

      <div style="background: var(--orange-light); border: 1px solid rgba(245,158,11,0.25); border-radius: var(--radius-md); padding: 12px 14px; text-align: left; font-size: 0.8rem; color: #92400E; margin-bottom: 24px;">
        <strong>Safety Note:</strong> ScholarMitra never charges application fees or asks for bank OTPs. Official registration is completely free.
      </div>

      <div style="display: flex; gap: 12px; justify-content: center;">
        <button class="btn-outline" onclick="closeRedirectModal()">Cancel</button>
        <a href="${scholarship.officialUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" onclick="closeRedirectModal()">
          Continue to ${scholarship.portalName} ↗
        </a>
      </div>
    </div>
  `;

  redirectModal.classList.add("active");
}

function closeRedirectModal() {
  const redirectModal = document.getElementById("redirectModal");
  if (redirectModal) {
    redirectModal.classList.remove("active");
  }
}

// ==========================================================================
// Interactive Document Checklist
// ==========================================================================

function initDocumentChecklist() {
  const grid = document.getElementById("checklistGrid");
  if (!grid) return;

  grid.innerHTML = REQUIRED_DOCUMENTS_MASTER.map(doc => {
    const isChecked = !!AppState.checklist[doc.id];
    return `
      <div class="check-item ${isChecked ? 'completed' : ''}" onclick="toggleDocCheck('${doc.id}')" role="checkbox" aria-checked="${isChecked}" tabindex="0">
        <div class="custom-checkbox">
          ${isChecked ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
        </div>
        <div class="check-content">
          <div class="check-title">${doc.name}</div>
          <div class="check-desc">${doc.description}</div>
          <span class="check-tag">Tip: ${doc.tips}</span>
        </div>
      </div>
    `;
  }).join("");

  updateChecklistProgress();
}

function toggleDocCheck(docId) {
  AppState.checklist[docId] = !AppState.checklist[docId];
  localStorage.setItem("scholarmitra_checklist", JSON.stringify(AppState.checklist));
  initDocumentChecklist();
  
  const docObj = REQUIRED_DOCUMENTS_MASTER.find(d => d.id === docId);
  const status = AppState.checklist[docId] ? "marked ready" : "unmarked";
  showToast(`${docObj ? docObj.name : 'Document'} ${status}!`);
}

function updateChecklistProgress() {
  const total = REQUIRED_DOCUMENTS_MASTER.length;
  const completed = Object.values(AppState.checklist).filter(Boolean).length;
  const percent = Math.round((completed / total) * 100);

  const fillEl = document.getElementById("checklistProgressFill");
  const labelEl = document.getElementById("checklistPercentLabel");
  const countEl = document.getElementById("checklistCompletedCount");

  if (fillEl) fillEl.style.width = `${percent}%`;
  if (labelEl) labelEl.innerText = `${percent}% Ready`;
  if (countEl) countEl.innerText = `${completed} of ${total} documents ready`;
}

// ==========================================================================
// Interactive AI Scholarship Assistant
// ==========================================================================

function initAssistantChat() {
  const messagesContainer = document.getElementById("chatMessages");
  if (!messagesContainer) return;

  messagesContainer.innerHTML = `
    <div class="chat-msg bot">
      <div class="chat-avatar">AI</div>
      <div class="chat-bubble">
        Hello! I'm your <strong>ScholarMitra Assistant</strong>. How can I help you today?
        <br><br>
        Ask me about eligibility for your course, document requirements, Karnataka SSP portal, or upcoming deadlines!
      </div>
    </div>
  `;
}

function sendAssistantQuery(customText) {
  const input = document.getElementById("assistantInput");
  const query = customText || (input ? input.value.trim() : "");
  if (!query) return;

  if (input && !customText) input.value = "";

  const container = document.getElementById("chatMessages");
  if (!container) return;

  // Add User Message
  const userDiv = document.createElement("div");
  userDiv.className = "chat-msg user";
  userDiv.innerHTML = `
    <div class="chat-avatar">You</div>
    <div class="chat-bubble">${escapeHTML(query)}</div>
  `;
  container.appendChild(userDiv);
  container.scrollTop = container.scrollHeight;

  // Simulate AI Thinking
  setTimeout(() => {
    const responseData = generateAssistantResponse(query);
    const botDiv = document.createElement("div");
    botDiv.className = "chat-msg bot";
    botDiv.innerHTML = `
      <div class="chat-avatar">AI</div>
      <div class="chat-bubble">
        ${responseData}
      </div>
    `;
    container.appendChild(botDiv);
    container.scrollTop = container.scrollHeight;
  }, 400);
}

function generateAssistantResponse(query) {
  const q = query.toLowerCase();

  // Check matching knowledge base
  for (const item of ASSISTANT_KNOWLEDGE_BASE) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return item.response.replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    }
  }

  // Search scholarships dataset
  const matches = SCHOLARSHIPS_DATA.filter(s => 
    s.title.toLowerCase().includes(q) || 
    s.provider.toLowerCase().includes(q) || 
    s.eligibleCourses.some(c => c.toLowerCase().includes(q))
  );

  if (matches.length > 0) {
    const topMatches = matches.slice(0, 3);
    return `
      Here are the top scholarship matches for "<strong>${escapeHTML(query)}</strong>":<br><br>
      ${topMatches.map(m => `
        • <strong>${m.title}</strong> (${m.amountDisplay}) — Deadline: ${m.deadline}<br>
      `).join("")}
      <br>
      You can filter by this course or open any card in the <strong>Explorer</strong> section for full details!
    `;
  }

  return `
    I searched our verified database for "<strong>${escapeHTML(query)}</strong>". 
    <br><br>
    Try selecting one of the suggested quick queries on the left, or use the <strong>Find My Scholarships</strong> profile form above to calculate your exact percentage match score!
  `;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// ==========================================================================
// Insights & Visual Statistics
// ==========================================================================

function initInsights() {
  const total = SCHOLARSHIPS_DATA.length;
  const verifiedCount = SCHOLARSHIPS_DATA.filter(s => s.verified).length;
  const avgAmount = Math.round(SCHOLARSHIPS_DATA.reduce((acc, s) => acc + s.amount, 0) / total);

  const avgEl = document.getElementById("statAvgAmount");
  if (avgEl) avgEl.innerText = formatINR(avgAmount);

  // Category counts
  const categoryCounts = {
    "Merit & Means": 0,
    "Technical / STEM": 0,
    "Female / Girls in Tech": 0,
    "State / Domicile Schemes": 0,
    "Reserved (SC/ST/OBC/EWS)": 0
  };

  SCHOLARSHIPS_DATA.forEach(s => {
    if (s.gender === "Female") categoryCounts["Female / Girls in Tech"]++;
    if (s.eligibleCourses.some(c => c.includes("Tech") || c.includes("BCA"))) categoryCounts["Technical / STEM"]++;
    if (s.eligibleStates.length === 1 && s.eligibleStates[0] !== "All India") categoryCounts["State / Domicile Schemes"]++;
    if (s.category.includes("SC") || s.category.includes("ST") || s.category.includes("OBC")) categoryCounts["Reserved (SC/ST/OBC/EWS)"]++;
    if (s.minPercentage >= 65) categoryCounts["Merit & Means"]++;
  });

  const categoryBarContainer = document.getElementById("categoryBars");
  if (categoryBarContainer) {
    const colors = ["purple", "blue", "pink", "green", "orange"];
    let idx = 0;
    categoryBarContainer.innerHTML = Object.entries(categoryCounts).map(([cat, count]) => {
      const pct = Math.round((count / total) * 100);
      const color = colors[idx++ % colors.length];
      return `
        <div class="bar-row">
          <div class="bar-header">
            <span>${cat}</span>
            <span>${count} Schemes (${pct}%)</span>
          </div>
          <div class="bar-track">
            <div class="bar-fill ${color}" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join("");
  }
}

// ==========================================================================
// Bookmarks & Toast System
// ==========================================================================

function toggleBookmark(id) {
  if (AppState.bookmarks.has(id)) {
    AppState.bookmarks.delete(id);
    showToast("Removed scholarship from saved list");
  } else {
    AppState.bookmarks.add(id);
    showToast("Saved scholarship to bookmarks!");
  }
  localStorage.setItem("scholarmitra_bookmarks", JSON.stringify([...AppState.bookmarks]));
  renderScholarshipsList();
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ==========================================================================
// Profile Form Submission & Event Listeners
// ==========================================================================

function handleProfileSubmit(e) {
  if (e) e.preventDefault();

  const course = document.getElementById("profileCourse").value;
  const year = document.getElementById("profileYear").value;
  const state = document.getElementById("profileState").value;
  const percentage = parseFloat(document.getElementById("profilePercentage").value) || 75;
  const category = document.getElementById("profileCategory").value;
  const income = parseInt(document.getElementById("profileIncome").value, 10);
  const gender = document.getElementById("profileGender").value;

  AppState.profile = { course, year, state, percentage, category, income, gender };

  // Sync with filters
  AppState.filters.course = course;
  AppState.filters.state = state;
  AppState.filters.category = category;

  updateActiveProfileDisplay();
  renderScholarshipsList();
  showToast("Profile matched! Strongest scholarship matches updated.");

  // Smooth scroll to results
  const explorer = document.getElementById("explorerSection");
  if (explorer) {
    explorer.scrollIntoView({ behavior: "smooth" });
  }
}

function updateActiveProfileDisplay() {
  const summaryEl = document.getElementById("activeProfileSummary");
  if (!summaryEl) return;

  summaryEl.innerHTML = `
    <span>Active Profile:</span>
    <span class="profile-tag">${AppState.profile.course} (${AppState.profile.year})</span>
    <span class="profile-tag">${AppState.profile.state}</span>
    <span class="profile-tag">${AppState.profile.percentage}% Score</span>
    <span class="profile-tag">${AppState.profile.category}</span>
    <span class="profile-tag">Income < ₹${(AppState.profile.income/100000).toFixed(1)}L</span>
  `;
}

function resetFilters() {
  AppState.filters = {
    query: "",
    course: "all",
    state: "all",
    category: "all",
    income: "all",
    deadline: "all",
    verified: "all",
    sortBy: "best-match"
  };

  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";

  const selects = document.querySelectorAll(".filter-select");
  selects.forEach(sel => sel.value = "all");

  const sortSelect = document.getElementById("sortBySelect");
  if (sortSelect) sortSelect.value = "best-match";

  renderScholarshipsList();
  showToast("All filters have been reset");
}

// Mobile Menu Toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById("mobileNav");
  if (mobileNav) {
    mobileNav.classList.toggle("open");
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initial Renders
  updateActiveProfileDisplay();
  renderScholarshipsList();
  initDocumentChecklist();
  initAssistantChat();
  initInsights();

  // 2. Profile Form Listener
  const profileForm = document.getElementById("profileForm");
  if (profileForm) {
    profileForm.addEventListener("submit", handleProfileSubmit);
  }

  // 3. Search Input Listener
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      AppState.filters.query = e.target.value.trim();
      renderScholarshipsList();
    });
  }

  // 4. Filter Selects Listeners
  const filterCourse = document.getElementById("filterCourse");
  if (filterCourse) {
    filterCourse.addEventListener("change", (e) => {
      AppState.filters.course = e.target.value;
      renderScholarshipsList();
    });
  }

  const filterState = document.getElementById("filterState");
  if (filterState) {
    filterState.addEventListener("change", (e) => {
      AppState.filters.state = e.target.value;
      renderScholarshipsList();
    });
  }

  const filterCategory = document.getElementById("filterCategory");
  if (filterCategory) {
    filterCategory.addEventListener("change", (e) => {
      AppState.filters.category = e.target.value;
      renderScholarshipsList();
    });
  }

  const filterIncome = document.getElementById("filterIncome");
  if (filterIncome) {
    filterIncome.addEventListener("change", (e) => {
      AppState.filters.income = e.target.value;
      renderScholarshipsList();
    });
  }

  const filterDeadline = document.getElementById("filterDeadline");
  if (filterDeadline) {
    filterDeadline.addEventListener("change", (e) => {
      AppState.filters.deadline = e.target.value;
      renderScholarshipsList();
    });
  }

  const filterVerified = document.getElementById("filterVerified");
  if (filterVerified) {
    filterVerified.addEventListener("change", (e) => {
      AppState.filters.verified = e.target.value;
      renderScholarshipsList();
    });
  }

  const sortBySelect = document.getElementById("sortBySelect");
  if (sortBySelect) {
    sortBySelect.addEventListener("change", (e) => {
      AppState.filters.sortBy = e.target.value;
      renderScholarshipsList();
    });
  }

  // 5. Assistant Chat Input (Enter key)
  const assistantInput = document.getElementById("assistantInput");
  if (assistantInput) {
    assistantInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        sendAssistantQuery();
      }
    });
  }

  // 6. Close Modals on ESC Key or Backdrop Click
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDetailsModal();
      closeRedirectModal();
    }
  });

  const detailsModal = document.getElementById("detailsModal");
  if (detailsModal) {
    detailsModal.addEventListener("click", (e) => {
      if (e.target === detailsModal) closeDetailsModal();
    });
  }

  const redirectModal = document.getElementById("redirectModal");
  if (redirectModal) {
    redirectModal.addEventListener("click", (e) => {
      if (e.target === redirectModal) closeRedirectModal();
    });
  }
});