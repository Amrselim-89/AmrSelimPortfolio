/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Dark / Light mode toggle
   */
  const themeToggleBtn = document.querySelector('#theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
    initPortfolioCharts();
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Init portfolio Chart.js charts
   */
  let _portfolioCharts = [];

  function initPortfolioCharts() {
    if (typeof Chart === 'undefined') return;

    // Destroy previous instances so theme re-init is clean
    _portfolioCharts.forEach(c => c.destroy());
    _portfolioCharts = [];

    const style     = getComputedStyle(document.documentElement);
    const accent    = style.getPropertyValue('--accent-color').trim()  || '#0f766e';
    const defColor  = style.getPropertyValue('--default-color').trim() || '#142033';
    const headColor = style.getPropertyValue('--heading-color').trim() || '#0c182c';
    const surface   = style.getPropertyValue('--surface-color').trim() || '#ffffff';
    const isDark    = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridColor = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
    const tickColor = isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.48)';
    const ttBg      = isDark ? 'rgba(11,28,51,0.96)'    : 'rgba(255,255,255,0.97)';
    const amber     = '#f59e0b';
    const blue      = '#3b82f6';
    const secondary = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(15,118,110,0.15)';

    Chart.defaults.color       = tickColor;
    Chart.defaults.font.family = style.getPropertyValue('--default-font').trim() || 'Manrope, sans-serif';
    Chart.defaults.font.size   = 11;

    // ── COMBO CHART — Revenue bars + Growth % line overlay ──────────────────
    const barCtx = document.getElementById('chart-bar');
    if (barCtx) {
      const ctx2d = barCtx.getContext('2d');
      const barGrad = ctx2d.createLinearGradient(0, 0, 0, 220);
      barGrad.addColorStop(0, accent);
      barGrad.addColorStop(1, accent + '77');

      _portfolioCharts.push(new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              type: 'bar',
              label: 'Revenue ($k)',
              data: [420, 510, 390, 630, 580, 710],
              backgroundColor: barGrad,
              borderRadius: { topLeft: 5, topRight: 5 },
              borderSkipped: false,
              yAxisID: 'y',
              order: 2
            },
            {
              type: 'bar',
              label: 'Target ($k)',
              data: [450, 480, 450, 600, 550, 680],
              backgroundColor: secondary,
              borderRadius: { topLeft: 5, topRight: 5 },
              borderSkipped: false,
              yAxisID: 'y',
              order: 3
            },
            {
              type: 'line',
              label: 'MoM Growth %',
              data: [null, 21.4, -23.5, 61.5, -7.9, 22.4],
              borderColor: amber,
              backgroundColor: 'transparent',
              tension: 0.45,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: amber,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2.5,
              yAxisID: 'y2',
              order: 1,
              spanGaps: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              enabled: true,
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: {
                label: ctx => ctx.datasetIndex === 2
                  ? ` Growth: ${ctx.raw}%`
                  : ` ${ctx.dataset.label}: $${ctx.raw}k`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, border: { display: false }, ticks: { color: tickColor } },
            y: {
              position: 'left',
              grid: { color: gridColor },
              border: { display: false, dash: [4, 4] },
              ticks: { color: tickColor, callback: v => '$' + v + 'k' }
            },
            y2: {
              position: 'right',
              grid: { display: false },
              border: { display: false },
              ticks: { color: amber, callback: v => v + '%' }
            }
          }
        }
      }));
    }

    // ── LINE CHART — This Year vs Last Year KPI comparison ──────────────────
    const lineCtx = document.getElementById('chart-line');
    if (lineCtx) {
      const ctx2d = lineCtx.getContext('2d');
      const grad1 = ctx2d.createLinearGradient(0, 0, 0, 210);
      grad1.addColorStop(0, accent + '55');
      grad1.addColorStop(1, accent + '00');
      const grad2 = ctx2d.createLinearGradient(0, 0, 0, 210);
      grad2.addColorStop(0, blue + '44');
      grad2.addColorStop(1, blue + '00');

      _portfolioCharts.push(new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'This Year',
              data: [68, 72, 75, 71, 82, 88],
              borderColor: accent,
              backgroundColor: grad1,
              tension: 0.45,
              fill: true,
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: accent,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2.5
            },
            {
              label: 'Last Year',
              data: [55, 60, 58, 65, 62, 70],
              borderColor: blue,
              backgroundColor: grad2,
              tension: 0.45,
              fill: true,
              borderDash: [5, 4],
              pointRadius: 5,
              pointHoverRadius: 7,
              pointBackgroundColor: blue,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              enabled: true,
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}%` }
            }
          },
          scales: {
            x: { grid: { display: false }, border: { display: false }, ticks: { color: tickColor } },
            y: {
              min: 40,
              max: 100,
              grid: { color: gridColor },
              border: { display: false, dash: [4, 4] },
              ticks: { color: tickColor, callback: v => v + '%' }
            }
          }
        }
      }));
    }

    // ── DOUGHNUT CHART — Department Coverage breakdown ───────────────────────
    const doughnutCtx = document.getElementById('chart-doughnut');

    if (doughnutCtx) {
      const doColors = [accent, blue, amber, '#ec4899', '#8b5cf6'];

      const centerTextPlugin = {
        id: 'centerText',
        afterDraw(chart) {
          const { ctx, chartArea: { width, height, top, left } } = chart;
          const cx = left + width / 2;
          const cy = top + height / 2;
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = headColor;
          ctx.font = `700 20px ${Chart.defaults.font.family}`;
          ctx.fillText('100%', cx, cy - 9);
          ctx.font = `400 11px ${Chart.defaults.font.family}`;
          ctx.fillStyle = tickColor;
          ctx.fillText('Coverage', cx, cy + 13);
          ctx.restore();
        }
      };

      _portfolioCharts.push(new Chart(doughnutCtx, {
        type: 'doughnut',
        plugins: [centerTextPlugin],
        data: {
          labels: ['Operations', 'Sales', 'Finance', 'Marketing', 'HR'],
          datasets: [{
            data: [34, 24, 18, 14, 10],
            backgroundColor: doColors,
            borderColor: surface,
            borderWidth: 3,
            hoverOffset: 10,
            hoverBorderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          animation: { animateRotate: true, duration: 900, easing: 'easeInOutQuart' },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 10,
                boxWidth: 10,
                usePointStyle: true,
                pointStyle: 'circle',
                color: tickColor,
                font: { size: 11 }
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` }
            }
          }
        }
      }));
    }

    // ── RADAR CHART — Team Skills Competency Analysis ────────────────────────
    const radarCtx = document.getElementById('chart-radar');
    if (radarCtx) {
      _portfolioCharts.push(new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: ['Technical', 'Communication', 'Problem Solving', 'Leadership', 'Analytics', 'Delivery'],
          datasets: [
            {
              label: 'Engineering',
              data: [92, 74, 88, 70, 85, 90],
              borderColor: accent,
              backgroundColor: accent + '33',
              pointBackgroundColor: accent,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2,
              pointRadius: 4
            },
            {
              label: 'Analytics',
              data: [75, 82, 80, 65, 96, 78],
              borderColor: blue,
              backgroundColor: blue + '22',
              pointBackgroundColor: blue,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2,
              pointRadius: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              min: 0,
              max: 100,
              ticks: { stepSize: 20, color: tickColor, backdropColor: 'transparent', font: { size: 10 } },
              grid: { color: gridColor },
              angleLines: { color: gridColor },
              pointLabels: { color: tickColor, font: { size: 10 } }
            }
          },
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.dataset.label}: ${ctx.raw}` }
            }
          }
        }
      }));
    }

    // ── BUBBLE CHART — Market Opportunity (Size vs Growth vs ROI) ───────────
    const bubbleCtx = document.getElementById('chart-bubble');
    if (bubbleCtx) {
      const bubbleColors = [accent, blue, amber, '#ec4899', '#8b5cf6'];
      const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
      _portfolioCharts.push(new Chart(bubbleCtx, {
        type: 'bubble',
        data: {
          datasets: products.map((name, i) => ({
            label: name,
            data: [{ x: [42, 68, 55, 80, 35][i], y: [18, 12, 24, 9, 30][i], r: [14, 20, 11, 17, 9][i] }],
            backgroundColor: bubbleColors[i] + '99',
            borderColor: bubbleColors[i],
            borderWidth: 1.5
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 12, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: {
                label: ctx => [
                  ` Market Size: $${ctx.raw.x}M`,
                  ` Growth Rate: ${ctx.raw.y}%`,
                  ` ROI Score: ${ctx.raw.r}`
                ]
              }
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Market Size ($M)', color: tickColor, font: { size: 11 } },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor }
            },
            y: {
              title: { display: true, text: 'Growth Rate (%)', color: tickColor, font: { size: 11 } },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => v + '%' }
            }
          }
        }
      }));
    }

    // ── STACKED BAR — Regional Sales Quarterly Breakdown ────────────────────
    const stackedCtx = document.getElementById('chart-stacked');
    if (stackedCtx) {
      _portfolioCharts.push(new Chart(stackedCtx, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'North',
              data: [320, 410, 390, 480],
              backgroundColor: accent + 'cc',
              borderRadius: { topLeft: 4, topRight: 4 },
              borderSkipped: false,
              stack: 'regions'
            },
            {
              label: 'South',
              data: [280, 350, 420, 390],
              backgroundColor: blue + 'cc',
              borderSkipped: false,
              stack: 'regions'
            },
            {
              label: 'East',
              data: [210, 270, 310, 350],
              backgroundColor: amber + 'cc',
              borderRadius: { bottomLeft: 4, bottomRight: 4 },
              borderSkipped: false,
              stack: 'regions'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.raw}k` }
            }
          },
          scales: {
            x: { stacked: true, grid: { display: false }, border: { display: false }, ticks: { color: tickColor } },
            y: { stacked: true, grid: { color: gridColor }, border: { display: false, dash: [4, 4] }, ticks: { color: tickColor, callback: v => '$' + v + 'k' } }
          }
        }
      }));
    }

    // ── HORIZONTAL BAR — Department Satisfaction Index ───────────────────────
    const hbarCtx = document.getElementById('chart-hbar');
    if (hbarCtx) {
      const hbarColors = [accent, blue, amber, '#ec4899', '#8b5cf6', '#10b981'];
      _portfolioCharts.push(new Chart(hbarCtx, {
        type: 'bar',
        data: {
          labels: ['Engineering', 'Sales', 'Finance', 'HR', 'Marketing', 'Operations'],
          datasets: [{
            label: 'Score',
            data: [88, 76, 82, 91, 79, 85],
            backgroundColor: hbarColors,
            borderRadius: 5,
            borderSkipped: false
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` Satisfaction: ${ctx.raw}/100` }
            }
          },
          scales: {
            x: { min: 0, max: 100, grid: { color: gridColor }, border: { display: false }, ticks: { color: tickColor, callback: v => v + '%' } },
            y: { grid: { display: false }, border: { display: false }, ticks: { color: tickColor } }
          }
        }
      }));
    }

    // ── POLAR AREA CHART — Budget Allocation by Category ─────────────────────
    const polarCtx = document.getElementById('chart-polar');
    if (polarCtx) {
      const polarColors = [accent, blue, amber, '#ec4899', '#8b5cf6', '#10b981'];
      _portfolioCharts.push(new Chart(polarCtx, {
        type: 'polarArea',
        data: {
          labels: ['Infrastructure', 'R&D', 'Marketing', 'HR', 'Operations', 'IT Support'],
          datasets: [{
            data: [28, 22, 16, 12, 14, 8],
            backgroundColor: polarColors.map(c => c + 'bb'),
            borderColor: polarColors,
            borderWidth: 1.5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              ticks: { stepSize: 10, color: tickColor, backdropColor: 'transparent', font: { size: 9 } },
              grid: { color: gridColor },
              angleLines: { color: gridColor }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { padding: 10, boxWidth: 10, usePointStyle: true, pointStyle: 'circle', color: tickColor, font: { size: 11 } }
            },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw}%` }
            }
          }
        }
      }));
    }

    // ── SCATTER CHART — Customer Satisfaction vs Retention Rate ──────────────
    const scatterCtx = document.getElementById('chart-scatter');
    if (scatterCtx) {
      _portfolioCharts.push(new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Enterprise',
              data: [
                { x: 82, y: 91 }, { x: 76, y: 85 }, { x: 90, y: 94 },
                { x: 68, y: 79 }, { x: 85, y: 88 }, { x: 72, y: 82 }
              ],
              backgroundColor: accent + 'cc',
              borderColor: accent,
              pointRadius: 7,
              pointHoverRadius: 9
            },
            {
              label: 'SMB',
              data: [
                { x: 65, y: 72 }, { x: 58, y: 68 }, { x: 74, y: 80 },
                { x: 61, y: 75 }, { x: 70, y: 77 }, { x: 55, y: 64 }
              ],
              backgroundColor: blue + 'cc',
              borderColor: blue,
              pointRadius: 7,
              pointHoverRadius: 9
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 14, usePointStyle: true, pointStyleWidth: 10, color: tickColor }
            },
            tooltip: {
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: { label: ctx => ` ${ctx.dataset.label} — Satisfaction: ${ctx.raw.x}  Retention: ${ctx.raw.y}%` }
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Satisfaction Score', color: tickColor, font: { size: 11 } },
              min: 50, max: 100,
              grid: { color: gridColor }, border: { display: false }, ticks: { color: tickColor }
            },
            y: {
              title: { display: true, text: 'Retention Rate (%)', color: tickColor, font: { size: 11 } },
              min: 55, max: 100,
              grid: { color: gridColor }, border: { display: false, dash: [4, 4] }, ticks: { color: tickColor, callback: v => v + '%' }
            }
          }
        }
      }));
    }
  }

  window.addEventListener('load', initPortfolioCharts);

})();