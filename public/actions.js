const button = document.getElementById('submitButton');
const openUrlButton = document.getElementById('openUrl');

window.addEventListener('pageshow', function (event) {
  var historyTraversal =
    event.persisted ||
    (typeof window.performance != 'undefined' &&
      window.performance.navigation.type === 2);
  if (historyTraversal) {
    // Handle page restore.
    window.location.reload();
  }
});

const baseURL = 'https://short.wtf/';

button.addEventListener('click', async () => {
  const input = document.getElementById('shortUrl');
  const shortUrl = await axios.post(`${baseURL}/url-shortner`, {
    url: input.value,
  });

  const {
    data: { newUrl },
  } = shortUrl;

  input.value = newUrl;
  /* Select the text field */
  input.select();
  input.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(input.value);
  button.type = 'hidden';
  input.disabled = true;
  document.getElementById('openUrl').type = 'button';

  document.getElementById(
    'urlmessage',
  ).value = `URL ${newUrl} copiada com sucesso`;
});

openUrlButton.addEventListener('click', () => {
  window.location.href = document.getElementById('shortUrl').value;
});

axios.get(`${baseURL}/metrics/new-page-acess`);
