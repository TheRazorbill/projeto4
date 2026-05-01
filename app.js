const viewTitles = {
  dashboard: 'Dashboard Principal',
  requests: 'Abrir Solicitação',
  triage: 'Triagem (Gestor)',
  team: 'Equipe',
  settings: 'Configurações',
};

const views = Array.from(document.querySelectorAll('.view'));
const menuItems = Array.from(document.querySelectorAll('.menu__item'));
const pageTitle = document.getElementById('pageTitle');
const successState = document.getElementById('successState');
const delegateModal = document.getElementById('delegateModal');

function setActiveView(name) {
  views.forEach((view) => {
    view.classList.toggle('is-visible', view.id === `view-${name}`);
  });

  successState.classList.remove('is-visible');

  menuItems.forEach((item) => {
    item.classList.toggle('is-active', item.dataset.view === name);
  });

  pageTitle.textContent = viewTitles[name] || 'SGPD';
}

function showSuccess() {
  views.forEach((view) => view.classList.remove('is-visible'));
  successState.classList.add('is-visible');
  pageTitle.textContent = 'Solicitação enviada';
  menuItems.forEach((item) => item.classList.remove('is-active'));
}

menuItems.forEach((item) => {
  item.addEventListener('click', () => {
    setActiveView(item.dataset.view);
  });
});

document.querySelectorAll('[data-view-link]').forEach((button) => {
  button.addEventListener('click', () => setActiveView(button.dataset.viewLink));
});

document.querySelectorAll('[data-action="open-form"]').forEach((button) => {
  button.addEventListener('click', () => setActiveView('requests'));
});

document.querySelectorAll('[data-action="success"]').forEach((button) => {
  button.addEventListener('click', showSuccess);
});

document.querySelectorAll('.delegate-btn').forEach((button) => {
  button.addEventListener('click', () => {
    if (typeof delegateModal.showModal === 'function') {
      delegateModal.showModal();
    }
  });
});

setActiveView('dashboard');
