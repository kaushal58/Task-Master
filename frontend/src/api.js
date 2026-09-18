const API_URL = import.meta.env.VITE_API_URL || "/api/tasks";

async function request(url, options = {}) {
  const res = await fetch(url, options);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export function getTasks() {
  return request(API_URL);
}

export function createTask(task) {
  return request(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function updateTask(id, task) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export function deleteTask(id) {
  return request(`${API_URL}/${id}`, { method: "DELETE" });
}
