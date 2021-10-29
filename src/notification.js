import { findNotificationById } from './github';

async function notifyUser(notifications) {
  notifications.map((n) => {
    chrome.notifications.create(
      n.id,
      {
        title: `${n.subject.type} ${n.repository.name}`,
        message: n.subject.title,
        type: "basic",
        iconUrl: n.repository.owner.avatar_url,
      }
    );
  });

  chrome.notifications.onClicked.addListener((id) => {
    const n = findNotificationById(notifications, id);
    chrome.tabs.create({ url: n.url });
  });
}
export {
    notifyUser
};