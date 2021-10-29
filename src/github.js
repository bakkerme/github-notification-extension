import { Octokit } from "octokit";

async function getNewAuthenticatedOctokit() {
  const pat = await chrome.storage.local.get('PAT');
  if (!pat.PAT) {
    console.error("No Personal Access Token set");
    return;
  }

  const octokit = new Octokit({ auth: pat.PAT });
  await octokit.rest.users.getAuthenticated();

  return octokit;
}

async function getAllGithubNotifications(octokit) {
  const response = await octokit.rest.activity.listNotificationsForAuthenticatedUser()
  console.log(response);
  return response.data;
}

function findNotificationById(notifications, id) {
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].id === id) {
      return notifications[i];
    }
  }
}

async function getGithubNotificationsSinceLastChecked(octokit, timestamp) {
  const notifications = await getAllGithubNotifications(octokit);
  return filterNotificationsByLastCheckedTime(notifications, timestamp);
}

function filterNotificationsByLastCheckedTime(notifications, timestamp) {
  return notifications.filter((n) => {
    const updatedAt = new Date(n.updated_at).getTime();
    return updatedAt > timestamp;
  });
}

export {
  getNewAuthenticatedOctokit,
  getAllGithubNotifications,
  findNotificationById,
  getGithubNotificationsSinceLastChecked,
}