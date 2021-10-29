import { notifyUser } from './notification';
import { getNewAuthenticatedOctokit, getGithubNotificationsSinceLastChecked } from './github';
import { getLastCheckedTimestamp, setLastCheckedTimestamp } from './timestamp'

async function handleStorageChange(changes, area) {
  if (area === 'local' && changes.PAT?.newValue) {
    await startChecker();
  }
}

async function startChecker() {
  const octokit = await getNewAuthenticatedOctokit();
  if (!octokit) {
    return;
  }

  const lastCheckedTimestamp = await getLastCheckedTimestamp();
  const notifications = await getGithubNotificationsSinceLastChecked(octokit, lastCheckedTimestamp);
  await setLastCheckedTimestamp();
  await notifyUser(notifications);
}

async function startCheckTimer() {
  await startChecker(); // Run on start
  chrome.alarms.create({ periodInMinutes: 5 });
}
startCheckTimer().then().catch(e => { throw e; });

chrome.alarms.onAlarm.addListener(startChecker);
chrome.storage.onChanged.addListener(handleStorageChange); // When storage has changed, run the handler again