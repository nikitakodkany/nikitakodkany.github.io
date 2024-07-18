document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const aboutItems = document.querySelectorAll(".about-item");
    const projectBoxes = document.querySelectorAll("[data-project-box]");
    const projectTitles = document.querySelectorAll("[data-project-title]");
    const closeButtons = document.querySelectorAll("[data-project-close-btn]");
  
    // Set initial active page and make corresponding section visible
    navLinks.forEach(link => {
      if (link.classList.contains("active")) {
        const activePage = link.getAttribute("data-nav-link");
        pages.forEach(page => {
          if (page.getAttribute("data-page") === activePage) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });
      }
    });
  
    navLinks.forEach(link => {
      link.addEventListener("click", function() {
        const targetPage = this.getAttribute("data-nav-link");
  
        navLinks.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
  
        pages.forEach(page => {
          if (page.getAttribute("data-page") === targetPage) {
            page.classList.add("active");
          } else {
            page.classList.remove("active");
          }
        });
  
        // Re-observe timeline items if 'resume' page is activated
        if (targetPage === "resume") {
          timelineItems.forEach(item => observer.observe(item));
        } else {
          timelineItems.forEach(item => observer.unobserve(item));
        }
  
        // Re-observe about items if 'about' page is activated
        if (targetPage === "about") {
          aboutItems.forEach(item => observer.observe(item));
        } else {
          aboutItems.forEach(item => observer.unobserve(item));
        }
      });
    });
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    }, {
      threshold: 0.1
    });
  
    // Observe timeline items on the 'resume' page
    if (document.querySelector(".navbar-link.active").getAttribute("data-nav-link") === "resume") {
      timelineItems.forEach(item => observer.observe(item));
    }
  
    // Observe about items on the 'about' page
    if (document.querySelector(".navbar-link.active").getAttribute("data-nav-link") === "about") {
      aboutItems.forEach(item => observer.observe(item));
    }
  
    projectTitles.forEach(title => {
      title.addEventListener("click", function() {
        const projectBox = this.closest('.proj-projects-box');
        const skillsSection = projectBox.querySelector('.proj-skills-section');
  
        // Toggle the display of the skills section
        if (skillsSection.style.display === 'none' || skillsSection.style.display === '') {
          skillsSection.style.display = 'block';
        } else {
          skillsSection.style.display = 'none';
        }
      });
    });
  
    closeButtons.forEach(button => {
      button.addEventListener("click", function() {
        const projectBox = this.closest('.proj-projects-box');
        const skillsSection = projectBox.querySelector('.proj-skills-section');
  
        skillsSection.style.display = 'none'; // Collapse to original state
      });
    });
  
    // Function to make the project boxes visible with a delay for pop-in effect
    function makeProjectsVisible() {
      setTimeout(() => {
        projectBoxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add('visible');
          }, index * 100); // Staggered appearance
        });
      }, 500); // Initial delay to allow for page setup
    }
  
    // Initial call to make projects visible
    makeProjectsVisible();
  
    // Add hover effect to project boxes
    projectBoxes.forEach(box => {
      box.addEventListener('mouseenter', () => {
        box.style.backgroundColor = '#333'; // Slightly lighter background on hover
        box.style.transform = 'scale(1.02)'; // Slightly larger on hover
      });
      box.addEventListener('mouseleave', () => {
        box.style.backgroundColor = '#222'; // Original background color
        box.style.transform = 'scale(1)'; // Original size
      });
    });
  });  