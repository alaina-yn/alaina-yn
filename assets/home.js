const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const actionButton = (label, href, primary = false) =>
  `<a class="button ${primary ? 'primary' : 'ghost'}" href="${escapeHtml(href)}">${escapeHtml(label)} <span aria-hidden="true">↗</span></a>`;

fetch('data/projects.json')
  .then((response) => {
    if (!response.ok) throw new Error('Unable to load project data.');
    return response.json();
  })
  .then((projects) => {
    const featured = projects.filter((p) => p.featured).slice(0, 3);
    const target = document.querySelector('[data-featured-projects]');
    if (!target) return;
    target.innerHTML = featured.map((project, index) => {
      const detailUrl = `https://alaina-yn-projects.pages.dev/project.html?id=${encodeURIComponent(project.id)}`;
      const classes = index === 0 ? 'project-card featured' : 'project-card compact';
      const tags = project.domains.slice(0, 3).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
      return `
        <article class="${classes}">
          <span class="card-kicker">${escapeHtml(project.type)} · ${escapeHtml(project.status)}</span>
          <h3>${escapeHtml(project.shortTitle)}</h3>
          <p>${escapeHtml(project.outcome)}</p>
          <div class="tags">${tags}</div>
          <div class="card-actions">${actionButton('Inspect work', detailUrl, true)}</div>
        </article>`;
    }).join('');
  })
  .catch((error) => {
    const target = document.querySelector('[data-featured-projects]');
    if (target) target.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  });
