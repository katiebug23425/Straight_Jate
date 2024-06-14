const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event)
  event.preventDefault();
window.deferredPrompt = event;
butInstall.removeAttribute('hidden');
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    return;
  }
  promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;
  console.log(`User response to the install prompt: ${outcome}`);
  window.deferredPrompt = null;
  butInstall.setAttribute('hidden', '');
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event)
  window.deferredPrompt = null;
});
