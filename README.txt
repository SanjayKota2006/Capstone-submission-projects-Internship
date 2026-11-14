JOBLY — PREMIUM JOB BOARD WEBSITE
=================================

FILES
-----
index.html   Main website structure
styles.css   Responsive premium startup styling
script.js    Search, filters, job cards, job posting and demo interactions

RUN LOCALLY
-----------
1. Download and extract jobly-job-board-website.zip.
2. Open the extracted folder.
3. Double-click index.html to open the website in Chrome, Safari, Firefox, or Edge.

OPTIONAL LOCAL SERVER
--------------------
If you have Python installed, open a terminal in this folder and run:

    python3 -m http.server 8000

Then visit:

    http://localhost:8000

FEATURES
--------
- Responsive premium startup landing page
- Job listings with keyword search
- Location and category filters
- Job detail dialog
- Save-job interaction (session only)
- Employer job-posting form
- Demo login form
- Mobile navigation

IMPORTANT DEMO LIMITATIONS
--------------------------
This is a front-end website built with HTML, CSS and JavaScript only.
Newly posted jobs and saved roles exist in browser memory while the page is open.
There is no real database, server, secure authentication, candidate account,
resume upload, or persistent application management. The login form is a UI demo.
The sample jobs and company names are illustrative. Replace hello@example.com
in the footer with your real contact email before publishing.

To make it production-ready, connect a backend and database, implement secure
authentication, validate employer accounts, store jobs and applications, and
add secure resume upload/storage.
