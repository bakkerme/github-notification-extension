document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const pat = e.target.querySelector("input[name='pat']").value;

  try {
    await chrome.storage.local.set({ PAT: pat });
    const successIcon = document.getElementById("icon");
    successIcon.classList.add('show');
  } catch (e) {
    alert(e)
  }
})

document.querySelector('input[name="pat"]').addEventListener("change", (e) => {
  const successIcon = document.getElementById("icon");
  successIcon.classList.remove('show');

  const submit = document.querySelector('input[type="submit"]');
  if (!submit.attributes.getNamedItem('disabled'))
    return;

  submit.classList.remove('disabled');
  submit.attributes.removeNamedItem('disabled');
})

async function start() {
  const pat = await chrome.storage.local.get('PAT');
  if (!pat)
    return;

  document.querySelector("input[name='pat']").value = censorPAT(pat.PAT);
}

function censorPAT(pat) {
  if(!pat)
    return;
  return "X".repeat(pat.length - 4) + pat.substring(pat.length - 4)
}

start().then().catch(e => { throw e; })
