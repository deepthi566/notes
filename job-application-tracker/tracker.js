// Select elements
const jobForm = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const totalApplications = document.getElementById("totalApplications");
const totalInterviews = document.getElementById("totalInterviews");
const totalRejections = document.getElementById("totalRejections");

// Load saved jobs from localStorage
let jobs = JSON.parse(localStorage.getItem("jobs")) || [];

// Function to display jobs
function displayJobs() {
    jobList.innerHTML = ""; // Clear previous list

    jobs.forEach((job, index) => {
        const jobItem = document.createElement("div");
        jobItem.classList.add("job");
        jobItem.innerHTML = `
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Role:</strong> ${job.role}</p>
            <p><strong>Status:</strong> ${job.status}</p>
            <p><strong>Date Applied:</strong> ${job.date}</p>
            <button onclick="deleteJob(${index})">Delete</button>
        `;

        jobList.appendChild(jobItem);
    });

    // Save jobs to localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Update stats
    updateStats();
}

// Function to update stats
function updateStats() {
    totalApplications.textContent = jobs.length;
    totalInterviews.textContent = jobs.filter(job => job.status === "Interview").length;
    totalRejections.textContent = jobs.filter(job => job.status === "Rejected").length;
}

// Function to filter jobs by status
function filterJobs(status) {
    let filteredJobs = (status === "All") ? jobs : jobs.filter(job => job.status === status);
    displayFilteredJobs(filteredJobs);
}

// Function to sort jobs by date
function sortJobs() {
    let sortBy = document.getElementById("sortBy").value;
    let sortedJobs = [...jobs];

    sortedJobs.sort((a, b) => {
        return (sortBy === "newest") ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    });

    displayFilteredJobs(sortedJobs);
}

// Function to display filtered/sorted jobs
function displayFilteredJobs(filteredJobs) {
    jobList.innerHTML = ""; // Clear previous list

    filteredJobs.forEach((job, index) => {
        const jobItem = document.createElement("div");
        jobItem.classList.add("job");
        jobItem.innerHTML = `
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Role:</strong> ${job.role}</p>
            <p><strong>Status:</strong> ${job.status}</p>
            <p><strong>Date Applied:</strong> ${job.date}</p>
            <button onclick="deleteJob(${index})">Delete</button>
        `;
        jobList.appendChild(jobItem);
    });
}

// Function to add a job
jobForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const job = {
        company: document.getElementById("company").value.trim(),
        role: document.getElementById("role").value.trim(),
        status: document.getElementById("status").value,
        date: document.getElementById("date").value
    };

    // Ensure no empty fields before saving
    if (!job.company || !job.role || !job.date) {
        alert("Please fill in all fields!");
        return;
    }

    jobs.push(job);
    
    // Save updated jobs list to localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobs();
    jobForm.reset();
});

// Function to delete a job
function deleteJob(index) {
    jobs.splice(index, 1);

    // Save updated jobs list to localStorage after deleting
    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobs();
}

// Function to match resume keywords with job roles
function matchResume() {
    const fileInput = document.getElementById("resumeUpload");
    const matchResults = document.getElementById("matchResults");

    if (fileInput.files.length === 0) {
        alert("Please upload a resume first!");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const resumeText = event.target.result.toLowerCase();

        let matchedJobs = jobs.filter(job => resumeText.includes(job.role.toLowerCase()));

        matchResults.innerHTML = matchedJobs.length
            ? matchedJobs.map(job => `<p>✅ Match Found: ${job.role} at ${job.company}</p>`).join("")
            : "<p>No matches found.</p>";
    };

    reader.readAsText(fileInput.files[0]);
}

// Display jobs on page load
displayJobs();



