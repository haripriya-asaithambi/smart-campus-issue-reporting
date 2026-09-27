const KEY = "smartCampusIssues";

function getIssues() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
}

function saveIssues(issues) {
    localStorage.setItem(KEY, JSON.stringify(issues));
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

function renderIssues() {
    const issueList = document.getElementById("issueList");

    if (!issueList) return;

    const issues = getIssues();

    if (issues.length === 0) {
        issueList.innerHTML =
            '<div class="card" style="padding:25px">No issues reported yet. Submit the first report above.</div>';
        return;
    }

    issueList.innerHTML = issues.slice().reverse().map(function (issue) {
        return `
            <article class="issue">
                <div>
                    <h3>${escapeHtml(issue.category)} · ${escapeHtml(issue.location)}</h3>
                    <p>${escapeHtml(issue.description)}</p>
                    <div class="meta">
                        ${escapeHtml(issue.student)} ·
                        ${escapeHtml(issue.priority)} priority ·
                        ${escapeHtml(issue.date)}
                    </div>
                </div>

                <span class="badge">${escapeHtml(issue.status)}</span>
            </article>
        `;
    }).join("");
}


const issueForm = document.getElementById("issueForm");

issueForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const issue = {
        id: Date.now(),

        student: document.getElementById("studentName").value.trim(),

        category: document.getElementById("category").value,

        location: document.getElementById("location").value.trim(),

        priority: document.getElementById("priority").value,

        description: document.getElementById("description").value.trim(),

        status: "Pending",

        date: new Date().toLocaleDateString()
    };

    const issues = getIssues();

    issues.push(issue);

    saveIssues(issues);

    issueForm.reset();

    document.getElementById("message").textContent =
        "Issue submitted successfully!";

    renderIssues();
});


renderIssues();