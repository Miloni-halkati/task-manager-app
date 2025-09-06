const API = 'http://localhost:5000/api';

const appEl = document.getElementById('app');
const tasksEl = document.getElementById('tasks');
const addBtn = document.getElementById('add-task');
const titleEl = document.getElementById('new-title');
const descEl = document.getElementById('new-desc');
const logoutBtn = document.getElementById('logout');
const filters = document.querySelectorAll('.filter');

function token() { return localStorage.getItem('token'); }

function setAuthUI() {
  if (token()) {
    document.getElementById('auth').classList.add('hidden');
    appEl.classList.remove('hidden');
    loadTasks();
  } else {
    document.getElementById('auth').classList.remove('hidden');
    appEl.classList.add('hidden');
  }
}

async function api(path, options = {}) {
  const headers = options.headers || {};
  if (token()) headers['Authorization'] = 'Bearer ' + token();
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

function taskItem(t) {
  const li = document.createElement('li');
  li.dataset.id = t._id;
  li.className = t.completed ? 'completed' : '';
  li.innerHTML = `
    <input type="checkbox" class="toggle" ${t.completed ? 'checked' : ''}>
    <span class="title">${t.title}</span>
    <span class="desc">${t.description || ''}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
  `;
  li.querySelector('.toggle').addEventListener('change', async (e) => {
    await api('/tasks/' + t._id, { method: 'PUT', body: JSON.stringify({ completed: e.target.checked }) });
    loadTasks();
  });
  li.querySelector('.delete').addEventListener('click', async () => {
    if (confirm('Delete this task?')) {
      await api('/tasks/' + t._id, { method: 'DELETE' });
      loadTasks();
    }
  });
  li.querySelector('.edit').addEventListener('click', async () => {
    const newTitle = prompt('New title:', t.title);
    if (newTitle === null) return;
    const newDesc = prompt('New description:', t.description || '');
    await api('/tasks/' + t._id, { method: 'PUT', body: JSON.stringify({ title: newTitle, description: newDesc }) });
    loadTasks();
  });
  return li;
}

async function loadTasks(filter = 'all') {
  let query = '';
  if (filter === 'active') query = '?completed=false';
  if (filter === 'completed') query = '?completed=true';
  const list = await api('/tasks' + query);
  tasksEl.innerHTML = '';
  list.forEach(t => tasksEl.appendChild(taskItem(t)));
}

addBtn.addEventListener('click', async () => {
  const title = titleEl.value.trim();
  const description = descEl.value.trim();
  if (!title) return alert('Title required');
  await api('/tasks', { method: 'POST', body: JSON.stringify({ title, description }) });
  titleEl.value = ''; descEl.value='';
  loadTasks();
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  setAuthUI();
});

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    loadTasks(filter);
  });
});

setAuthUI();
