$(document).ready(function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Update copyright year
    $('#year').text(new Date().getFullYear());
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 70
        }, 500);
    });
    
    // Add active class to nav links based on current page
    const currentPage = window.location.pathname;
    $('.nav-links a').each(function() {
        if ($(this).attr('href') === currentPage) {
            $(this).addClass('active');
        }
    });
    
    // Animate elements on scroll
    $(window).scroll(function() {
        $('.timeline-item, .project-card, .daily-card, .skill-card').each(function() {
            const elementTop = $(this).offset().top;
            const viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom - 100) {
                $(this).css('opacity', '1');
                $(this).css('transform', 'translateY(0)');
            }
        });
    });
    $('a[href^="#"]').on("click", function (e) {
        e.preventDefault();
        var target = $(this).attr("href"); 
        // Smooth scroll to the target section or top if it's '#'
        $("html, body").animate(
          {
            scrollTop: target === "#" ? 0 : $(target).offset().top,
          },
          "smooth"
        );
      });
      $.getJSON("dist/assets/about_me.json", function (data) {
        $("#hero-name").text(`Hi, I'm ${data.name}`);
        $("#hero-bio").text(data.bio);
        $("#github-link").attr("href", data.github);
        $("#linkedin-link").attr("href", data.linkedin);
        $("#email-link").attr("href", `mailto:${data.email}`);

        // Skills Section
        data.skills.frontend.forEach(function (skill) {
          $("#frontend-skills").append(`<span>${skill}</span>`);
        });
        data.skills.backend.forEach(function (skill) {
          $("#backend-skills").append(`<span>${skill}</span>`);
        });
        data.skills.databases.forEach(function (skill) {
          $("#databases-skills").append(`<span>${skill}</span>`);
        });
        data.skills.cloud_devops.forEach(function (skill) {
          $("#cloud_devops-skills").append(`<span>${skill}</span>`);
        });
        data.skills.tools.forEach(function (skill) {
          $("#tools-skills").append(`<span>${skill}</span>`);
        });

        // Experience Section
        data.experience.forEach(function (experience) {
            let highlightsHTML = '';
            if (experience.highlights) {
                experience.highlights.forEach(function (highlight) {
                    highlightsHTML += `<li>${highlight}</li>`;
                });
            }
          $("#experience-list").append(`
                    <div class="timeline-item">
                        <div class="timeline-dot">
                            <i data-lucide="briefcase"></i>
                        </div>
                        <div class="timeline-content">
                            <h3>${experience.title}</h3>
                            <p class="company">${experience.company}</p>
                            <p class="period">${experience.period}</p>
                            <p>${highlightsHTML}</p>
                        </div>
                    </div>
                `);
        });
        // Projects Section
        data.projects.forEach(function (project) {
          var projectHTML = `
                    <div class="project-card">
                        <img src="${project.image}" alt="${project.name}">
                        <div class="project-content">
                            <h3>${project.name}</h3>
                            <p>${project.description}</p>
                            <div class="tags">
                                ${project.highlights
                                  .map(function (highlight) {
                                    return `<span>${highlight}</span>`;
                                  })
                                  .join("")}
                            </div>
                              <div class="project-links">
                                    ${
                                      project.is_company_project
                                        ? ""
                                        : `<a href="${project.github}">
                                        <i data-lucide="github"></i> Code
                                    </a>`
                                    }
                                    ${
                                      project.live_demo
                                        ? `<a href="${project.live_demo}">
                                        <i data-lucide="external-link"></i> Live Demo
                                    </a>`
                                        : ""
                                    }
                                </div>
                        </div>
                    </div>
                `;
          // Append the generated project HTML to the projects grid
          $("#projects-grid").append(projectHTML);
        });
        data.daily_projects.forEach(function(project) {
            var projectHTML = `
                <div class="daily-card">
                    <div class="daily-header">
                        <span class="day">${project.day}</span>
                        <span class="date">${project.date}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        <a href="${project.github_link}">
                            <i data-lucide="github"></i> View Code
                        </a>
                    </div>
                </div>
            `;
            // Append the generated project HTML to the daily projects grid
            $('#daily-projects-grid').append(projectHTML);
        });

        // Footer Section
        $("#header").load("/portfolio-project/header.html");
        $("#footer-name").text(data.name);
        $("#year").text(new Date().getFullYear());
        $("#logo").text(data.name);
      });
});

// Initialize elements with animation properties
$('.timeline-item, .project-card, .daily-card, .skill-card').css({
    'opacity': '0',
    'transform': 'translateY(20px)',
    'transition': 'all 0.6s ease-out'
});