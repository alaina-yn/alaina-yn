const escapeHtml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

let projects = [];
let activeFilter = 'All';

const render = () => {
  const grid = document.querySelector('[data-project-grid]');
  const count = document.querySelector('[data-project-count]');
  if (!grid) return;
  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((project) => project.domains.includes(activeFilter) || project.type === activeFilter);
  if (count) count.textContent = `${filtered.length} project${filtered.length === 1 ? '' : 's'} shown`;
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">No projects match this filter.</div>';
    return;
  }
  grid.innerHTML = filtered.map((project) => {
    const detailUrl = `https://alaina-yn-projects.pages.dev/project.html?id=${encodeURIComponent(project.id)}`;
    const tags = project.domains.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
    return `
      <article class="project-card">
        <span class="card-kicker">${escapeHtml(project.type)} · ${escapeHtml(project.status)}</span>
        <h3>${escapeHtml(project.shortTitle)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <div class="tags">${tags}</div>
        <div class="card-actions">
          <a class="button primary" href="${detailUrl}">Read case study <span aria-hidden="true">↗</span></a>
          <a class="button ghost" href="${escapeHtml(project.actions.repo)}">Repository <span aria-hidden="true">↗</span></a>
        </div>
      </article>`;
  }).join('');
};

fetch('../data/projects.json')
  .then((response) => {
    if (!response.ok) throw new Error('Unable to load project data.');
    return response.json();
  })
  .then((data) => {
    projects = data;
    const filterSet = new Set(['All']);
    data.forEach((project) => project.domains.forEach((domain) => filterSet.add(domain)));
    const filters = document.querySelector('[data-filters]');
    if (filters) {
      filters.innerHTML = [...filterSet].map((filter) =>
        `<button class="filter-button" type="button" aria-pressed="${filter === 'All'}" data-filter="${escapeHtml(filter)}">${escapeHtml(filter)}</button>`
      ).join('');
      filters.addEventListener('click', (event) => {
        const button = event.target.closest('[data-filter]');
        if (!button) return;
        activeFilter = button.dataset.filter;
        filters.querySelectorAll('[data-filter]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        render();
      });
    }
    render();
  })
  .catch((error) => {
    const grid = document.querySelector('[data-project-grid]');
    if (grid) grid.innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  });
