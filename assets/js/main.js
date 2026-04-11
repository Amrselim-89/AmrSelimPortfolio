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

    // ── RADAR CHART — Skills Competency assessment ───────────────────────────
    const radarCtx = document.getElementById('chart-radar');
    if (radarCtx) {
      _portfolioCharts.push(new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: ['Data Analysis', 'Visualization', 'ETL', 'SQL', 'Python', 'Power BI'],
          datasets: [
            {
              label: 'Current Level',
              data: [92, 88, 85, 90, 78, 95],
              borderColor: accent,
              backgroundColor: accent + '33',
              pointBackgroundColor: accent,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2.5
            },
            {
              label: 'Target Level',
              data: [95, 90, 90, 95, 85, 95],
              borderColor: blue,
              backgroundColor: blue + '22',
              pointBackgroundColor: blue,
              pointBorderColor: surface,
              pointBorderWidth: 2,
              borderWidth: 2,
              borderDash: [5, 4]
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
            r: {
              min: 60,
              max: 100,
              grid: { color: gridColor },
              angleLines: { color: gridColor },
              ticks: { color: tickColor, backdropColor: 'transparent', stepSize: 10 },
              pointLabels: { color: tickColor, font: { size: 10 } }
            }
          }
        }
      }));
    }

    // ── SCATTER CHART — Marketing Spend vs Sales Revenue ────────────────────
    const scatterCtx = document.getElementById('chart-scatter');
    if (scatterCtx) {
      _portfolioCharts.push(new Chart(scatterCtx, {
        type: 'scatter',
        data: {
          datasets: [
            {
              label: 'Products',
              data: [
                { x: 12, y: 145 }, { x: 18, y: 210 }, { x: 8, y: 98 },
                { x: 22, y: 285 }, { x: 15, y: 175 }, { x: 30, y: 340 },
                { x: 25, y: 295 }, { x: 10, y: 120 }
              ],
              backgroundColor: accent + 'bb',
              borderColor: accent,
              borderWidth: 1.5,
              pointRadius: 6,
              pointHoverRadius: 8
            },
            {
              label: 'Services',
              data: [
                { x: 5, y: 85 }, { x: 14, y: 165 }, { x: 20, y: 240 },
                { x: 28, y: 310 }, { x: 9, y: 110 }, { x: 17, y: 190 },
                { x: 23, y: 265 }, { x: 35, y: 390 }
              ],
              backgroundColor: blue + 'bb',
              borderColor: blue,
              borderWidth: 1.5,
              pointRadius: 6,
              pointHoverRadius: 8,
              pointStyle: 'triangle'
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
              enabled: true,
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: Spend $${ctx.raw.x}k → Sales $${ctx.raw.y}k`
              }
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Marketing Spend ($k)', color: tickColor },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => '$' + v + 'k' }
            },
            y: {
              title: { display: true, text: 'Sales Revenue ($k)', color: tickColor },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => '$' + v + 'k' }
            }
          }
        }
      }));
    }

    // ── BUBBLE CHART — Market Size vs Growth vs Share ────────────────────────
    const bubbleCtx = document.getElementById('chart-bubble');
    if (bubbleCtx) {
      _portfolioCharts.push(new Chart(bubbleCtx, {
        type: 'bubble',
        data: {
          datasets: [
            {
              label: 'MENA',
              data: [
                { x: 4.2, y: 18, r: 14 }, { x: 2.8, y: 12, r: 10 }, { x: 6.1, y: 25, r: 18 }
              ],
              backgroundColor: accent + '99',
              borderColor: accent,
              borderWidth: 2
            },
            {
              label: 'Europe',
              data: [
                { x: 1.5, y: 8, r: 8 }, { x: 3.5, y: 22, r: 16 }, { x: 5.8, y: 30, r: 22 }
              ],
              backgroundColor: blue + '99',
              borderColor: blue,
              borderWidth: 2
            },
            {
              label: 'Americas',
              data: [
                { x: 2.1, y: 15, r: 12 }, { x: 4.8, y: 28, r: 20 }, { x: 7.2, y: 35, r: 26 }
              ],
              backgroundColor: amber + '99',
              borderColor: amber,
              borderWidth: 2
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
              enabled: true,
              backgroundColor: ttBg,
              titleColor: headColor,
              bodyColor: defColor,
              borderColor: accent + '55',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 6,
              callbacks: {
                label: ctx =>
                  ` ${ctx.dataset.label}: Growth ${ctx.raw.y}%, Share ${ctx.raw.r}%`
              }
            }
          },
          scales: {
            x: {
              title: { display: true, text: 'Market Size ($B)', color: tickColor },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => '$' + v + 'B' }
            },
            y: {
              title: { display: true, text: 'Growth Rate (%)', color: tickColor },
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => v + '%' }
            }
          }
        }
      }));
    }

    // ── POLAR AREA CHART — Resource Allocation by Department ─────────────────
    const polarCtx = document.getElementById('chart-polar');
    if (polarCtx) {
      const polColors = [accent, blue, amber, '#ec4899', '#8b5cf6', '#10b981'];
      _portfolioCharts.push(new Chart(polarCtx, {
        type: 'polarArea',
        data: {
          labels: ['Engineering', 'Marketing', 'Operations', 'Sales', 'R&D', 'Support'],
          datasets: [{
            data: [35, 18, 22, 15, 28, 12],
            backgroundColor: polColors.map(c => c + '99'),
            borderColor: polColors,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                padding: 10,
                boxWidth: 10,
                usePointStyle: true,
                pointStyle: 'circle',
                color: tickColor,
                font: { size: 10 }
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
              callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} FTEs` }
            }
          },
          scales: {
            r: {
              grid: { color: gridColor },
              ticks: { color: tickColor, backdropColor: 'transparent' }
            }
          }
        }
      }));
    }

    // ── HORIZONTAL BAR CHART — Department Performance vs Benchmark ───────────
    const hbarCtx = document.getElementById('chart-hbar');
    if (hbarCtx) {
      _portfolioCharts.push(new Chart(hbarCtx, {
        type: 'bar',
        data: {
          labels: ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance'],
          datasets: [
            {
              label: 'Q4 Score',
              data: [88, 76, 82, 71, 65, 79],
              backgroundColor: accent + 'cc',
              borderRadius: { topRight: 5, bottomRight: 5 },
              borderSkipped: false
            },
            {
              label: 'Benchmark',
              data: [80, 80, 80, 80, 80, 80],
              backgroundColor: amber + '66',
              borderRadius: { topRight: 5, bottomRight: 5 },
              borderSkipped: false
            }
          ]
        },
        options: {
          indexAxis: 'y',
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
              cornerRadius: 6
            }
          },
          scales: {
            x: {
              min: 50,
              max: 100,
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor }
            },
            y: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: tickColor }
            }
          }
        }
      }));
    }

    // ── STACKED BAR CHART — Quarterly Revenue by Product Line ────────────────
    const stackedCtx = document.getElementById('chart-stacked');
    if (stackedCtx) {
      _portfolioCharts.push(new Chart(stackedCtx, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: 'BI Solutions',
              data: [210, 250, 285, 320],
              backgroundColor: accent,
              stack: 'revenue'
            },
            {
              label: 'Data Pipelines',
              data: [140, 175, 195, 230],
              backgroundColor: blue,
              stack: 'revenue'
            },
            {
              label: 'Consulting',
              data: [85, 110, 125, 155],
              backgroundColor: amber,
              borderRadius: { topLeft: 5, topRight: 5 },
              stack: 'revenue'
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
              callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.raw}k` }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: tickColor },
              stacked: true
            },
            y: {
              grid: { color: gridColor },
              border: { display: false },
              ticks: { color: tickColor, callback: v => '$' + v + 'k' },
              stacked: true
            }
          }
        }
      }));
    }

    // ── DETAIL PAGE CHARTS (full-size versions for chart detail pages) ────────
    _initDetailChart_Bar(accent, blue, amber, surface, gridColor, tickColor, ttBg, defColor, headColor, secondary);
    _initDetailChart_Line(accent, blue, surface, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Doughnut(accent, blue, amber, surface, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Radar(accent, blue, surface, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Scatter(accent, blue, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Bubble(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Polar(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Hbar(accent, amber, gridColor, tickColor, ttBg, defColor, headColor);
    _initDetailChart_Stacked(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor);
  }

  // ── DETAIL PAGE chart initializers ──────────────────────────────────────────
  function _initDetailChart_Bar(accent, blue, amber, surface, gridColor, tickColor, ttBg, defColor, headColor, secondary) {
    const el = document.getElementById('chart-bar-detail');
    if (!el) return;
    const ctx2d = el.getContext('2d');
    const barGrad = ctx2d.createLinearGradient(0, 0, 0, 360);
    barGrad.addColorStop(0, accent);
    barGrad.addColorStop(1, accent + '77');
    _portfolioCharts.push(new Chart(el, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            type: 'bar',
            label: 'Revenue ($k)',
            data: [420, 510, 390, 630, 580, 710, 660, 720, 690, 780, 820, 950],
            backgroundColor: barGrad,
            borderRadius: { topLeft: 5, topRight: 5 },
            borderSkipped: false,
            yAxisID: 'y',
            order: 2
          },
          {
            type: 'bar',
            label: 'Target ($k)',
            data: [450, 480, 450, 600, 550, 680, 640, 700, 670, 760, 800, 920],
            backgroundColor: secondary || 'rgba(15,118,110,0.15)',
            borderRadius: { topLeft: 5, topRight: 5 },
            borderSkipped: false,
            yAxisID: 'y',
            order: 3
          },
          {
            type: 'line',
            label: 'MoM Growth %',
            data: [null, 21.4, -23.5, 61.5, -7.9, 22.4, -7.0, 9.1, -4.2, 13.0, 5.1, 15.9],
            borderColor: amber,
            backgroundColor: 'transparent',
            tension: 0.45,
            pointRadius: 4,
            pointHoverRadius: 6,
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

  function _initDetailChart_Line(accent, blue, surface, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-line-detail');
    if (!el) return;
    const ctx2d = el.getContext('2d');
    const grad1 = ctx2d.createLinearGradient(0, 0, 0, 360);
    grad1.addColorStop(0, accent + '55');
    grad1.addColorStop(1, accent + '00');
    const grad2 = ctx2d.createLinearGradient(0, 0, 0, 360);
    grad2.addColorStop(0, blue + '44');
    grad2.addColorStop(1, blue + '00');
    _portfolioCharts.push(new Chart(el, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'This Year',
            data: [68, 72, 75, 71, 82, 88, 85, 90, 87, 93, 95, 98],
            borderColor: accent,
            backgroundColor: grad1,
            tension: 0.45,
            fill: true,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBackgroundColor: accent,
            pointBorderColor: surface,
            pointBorderWidth: 2,
            borderWidth: 2.5
          },
          {
            label: 'Last Year',
            data: [55, 60, 58, 65, 62, 70, 68, 74, 72, 78, 80, 83],
            borderColor: blue,
            backgroundColor: grad2,
            tension: 0.45,
            fill: true,
            borderDash: [5, 4],
            pointRadius: 4,
            pointHoverRadius: 6,
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

  function _initDetailChart_Doughnut(accent, blue, amber, surface, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-doughnut-detail');
    if (!el) return;
    const doColors = [accent, blue, amber, '#ec4899', '#8b5cf6', '#10b981', '#f97316'];
    const centerText = {
      id: 'centerText',
      afterDraw(chart) {
        const { ctx, chartArea: { width, height, top, left } } = chart;
        const cx = left + width / 2;
        const cy = top + height / 2;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = headColor;
        ctx.font = `700 22px ${Chart.defaults.font.family}`;
        ctx.fillText('100%', cx, cy - 10);
        ctx.font = `400 12px ${Chart.defaults.font.family}`;
        ctx.fillStyle = tickColor;
        ctx.fillText('Coverage', cx, cy + 14);
        ctx.restore();
      }
    };
    _portfolioCharts.push(new Chart(el, {
      type: 'doughnut',
      plugins: [centerText],
      data: {
        labels: ['Operations', 'Sales', 'Finance', 'Marketing', 'HR', 'IT', 'Legal'],
        datasets: [{
          data: [28, 20, 16, 13, 9, 9, 5],
          backgroundColor: doColors,
          borderColor: surface,
          borderWidth: 3,
          hoverOffset: 12,
          hoverBorderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        animation: { animateRotate: true, duration: 900, easing: 'easeInOutQuart' },
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 14,
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              color: tickColor,
              font: { size: 12 }
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

  function _initDetailChart_Radar(accent, blue, surface, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-radar-detail');
    if (!el) return;
    _portfolioCharts.push(new Chart(el, {
      type: 'radar',
      data: {
        labels: ['Data Analysis', 'Visualization', 'ETL / SSIS', 'SQL / T-SQL', 'Python', 'Power BI', 'SSAS / OLAP', 'Reporting'],
        datasets: [
          {
            label: 'Current Level',
            data: [92, 88, 85, 90, 78, 95, 82, 87],
            borderColor: accent,
            backgroundColor: accent + '33',
            pointBackgroundColor: accent,
            pointBorderColor: surface,
            pointBorderWidth: 2,
            borderWidth: 2.5
          },
          {
            label: 'Target Level',
            data: [95, 92, 90, 95, 88, 95, 90, 92],
            borderColor: blue,
            backgroundColor: blue + '22',
            pointBackgroundColor: blue,
            pointBorderColor: surface,
            pointBorderWidth: 2,
            borderWidth: 2,
            borderDash: [5, 4]
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
          r: {
            min: 60,
            max: 100,
            grid: { color: gridColor },
            angleLines: { color: gridColor },
            ticks: { color: tickColor, backdropColor: 'transparent', stepSize: 10 },
            pointLabels: { color: tickColor, font: { size: 11 } }
          }
        }
      }
    }));
  }

  function _initDetailChart_Scatter(accent, blue, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-scatter-detail');
    if (!el) return;
    _portfolioCharts.push(new Chart(el, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Products',
            data: [
              { x: 12, y: 145 }, { x: 18, y: 210 }, { x: 8, y: 98 },
              { x: 22, y: 285 }, { x: 15, y: 175 }, { x: 30, y: 340 },
              { x: 25, y: 295 }, { x: 10, y: 120 }, { x: 35, y: 410 }, { x: 5, y: 60 }
            ],
            backgroundColor: accent + 'bb',
            borderColor: accent,
            borderWidth: 1.5,
            pointRadius: 7,
            pointHoverRadius: 9
          },
          {
            label: 'Services',
            data: [
              { x: 5, y: 85 }, { x: 14, y: 165 }, { x: 20, y: 240 },
              { x: 28, y: 310 }, { x: 9, y: 110 }, { x: 17, y: 190 },
              { x: 23, y: 265 }, { x: 35, y: 390 }, { x: 40, y: 450 }, { x: 7, y: 100 }
            ],
            backgroundColor: blue + 'bb',
            borderColor: blue,
            borderWidth: 1.5,
            pointRadius: 7,
            pointHoverRadius: 9,
            pointStyle: 'triangle'
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
            enabled: true,
            backgroundColor: ttBg,
            titleColor: headColor,
            bodyColor: defColor,
            borderColor: accent + '55',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx => ` ${ctx.dataset.label}: Spend $${ctx.raw.x}k → Sales $${ctx.raw.y}k`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Marketing Spend ($k)', color: tickColor },
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, callback: v => '$' + v + 'k' }
          },
          y: {
            title: { display: true, text: 'Sales Revenue ($k)', color: tickColor },
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, callback: v => '$' + v + 'k' }
          }
        }
      }
    }));
  }

  function _initDetailChart_Bubble(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-bubble-detail');
    if (!el) return;
    _portfolioCharts.push(new Chart(el, {
      type: 'bubble',
      data: {
        datasets: [
          {
            label: 'MENA',
            data: [
              { x: 4.2, y: 18, r: 14 }, { x: 2.8, y: 12, r: 10 },
              { x: 6.1, y: 25, r: 18 }, { x: 8.0, y: 30, r: 22 }
            ],
            backgroundColor: accent + '99',
            borderColor: accent,
            borderWidth: 2
          },
          {
            label: 'Europe',
            data: [
              { x: 1.5, y: 8, r: 8 }, { x: 3.5, y: 22, r: 16 },
              { x: 5.8, y: 30, r: 22 }, { x: 9.2, y: 38, r: 28 }
            ],
            backgroundColor: blue + '99',
            borderColor: blue,
            borderWidth: 2
          },
          {
            label: 'Americas',
            data: [
              { x: 2.1, y: 15, r: 12 }, { x: 4.8, y: 28, r: 20 },
              { x: 7.2, y: 35, r: 26 }, { x: 11.0, y: 42, r: 32 }
            ],
            backgroundColor: amber + '99',
            borderColor: amber,
            borderWidth: 2
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
            enabled: true,
            backgroundColor: ttBg,
            titleColor: headColor,
            bodyColor: defColor,
            borderColor: accent + '55',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 6,
            callbacks: {
              label: ctx =>
                ` ${ctx.dataset.label}: Growth ${ctx.raw.y}%, Share ${ctx.raw.r}%`
            }
          }
        },
        scales: {
          x: {
            title: { display: true, text: 'Market Size ($B)', color: tickColor },
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, callback: v => '$' + v + 'B' }
          },
          y: {
            title: { display: true, text: 'Growth Rate (%)', color: tickColor },
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, callback: v => v + '%' }
          }
        }
      }
    }));
  }

  function _initDetailChart_Polar(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-polar-detail');
    if (!el) return;
    const polColors = [accent, blue, amber, '#ec4899', '#8b5cf6', '#10b981'];
    _portfolioCharts.push(new Chart(el, {
      type: 'polarArea',
      data: {
        labels: ['Engineering', 'Marketing', 'Operations', 'Sales', 'R&D', 'Support'],
        datasets: [{
          data: [35, 18, 22, 15, 28, 12],
          backgroundColor: polColors.map(c => c + '99'),
          borderColor: polColors,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              padding: 14,
              boxWidth: 12,
              usePointStyle: true,
              pointStyle: 'circle',
              color: tickColor,
              font: { size: 12 }
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
            callbacks: { label: ctx => ` ${ctx.label}: ${ctx.raw} FTEs` }
          }
        },
        scales: {
          r: {
            grid: { color: gridColor },
            ticks: { color: tickColor, backdropColor: 'transparent' }
          }
        }
      }
    }));
  }

  function _initDetailChart_Hbar(accent, amber, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-hbar-detail');
    if (!el) return;
    _portfolioCharts.push(new Chart(el, {
      type: 'bar',
      data: {
        labels: ['Engineering', 'Sales', 'Marketing', 'Operations', 'HR', 'Finance', 'IT', 'Legal'],
        datasets: [
          {
            label: 'Q4 Score',
            data: [88, 76, 82, 71, 65, 79, 84, 70],
            backgroundColor: accent + 'cc',
            borderRadius: { topRight: 5, bottomRight: 5 },
            borderSkipped: false
          },
          {
            label: 'Benchmark',
            data: [80, 80, 80, 80, 80, 80, 80, 80],
            backgroundColor: amber + '66',
            borderRadius: { topRight: 5, bottomRight: 5 },
            borderSkipped: false
          }
        ]
      },
      options: {
        indexAxis: 'y',
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
            cornerRadius: 6
          }
        },
        scales: {
          x: {
            min: 50,
            max: 100,
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor }
          },
          y: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: tickColor }
          }
        }
      }
    }));
  }

  function _initDetailChart_Stacked(accent, blue, amber, gridColor, tickColor, ttBg, defColor, headColor) {
    const el = document.getElementById('chart-stacked-detail');
    if (!el) return;
    _portfolioCharts.push(new Chart(el, {
      type: 'bar',
      data: {
        labels: ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        datasets: [
          {
            label: 'BI Solutions',
            data: [180, 210, 240, 270, 310, 350, 385, 430],
            backgroundColor: accent,
            stack: 'revenue'
          },
          {
            label: 'Data Pipelines',
            data: [120, 145, 160, 185, 210, 240, 265, 295],
            backgroundColor: blue,
            stack: 'revenue'
          },
          {
            label: 'Consulting',
            data: [70, 90, 100, 120, 145, 170, 190, 215],
            backgroundColor: amber,
            borderRadius: { topLeft: 5, topRight: 5 },
            stack: 'revenue'
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
            callbacks: { label: ctx => ` ${ctx.dataset.label}: $${ctx.raw}k` }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { color: tickColor },
            stacked: true
          },
          y: {
            grid: { color: gridColor },
            border: { display: false },
            ticks: { color: tickColor, callback: v => '$' + v + 'k' },
            stacked: true
          }
        }
      }
    }));
  }

  window.addEventListener('load', initPortfolioCharts);

})();