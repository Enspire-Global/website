/* Enspire Global — main.js */

// Mobile nav: close when a link is clicked
document.querySelectorAll('.mob-nav a').forEach(function(l) {
  l.addEventListener('click', function() {
    document.getElementById('mn').classList.remove('open');
  });
});

// Resource download gate: validate name + email, submit to Web3Forms, then trigger download
function handleDownload(formId, downloadUrl) {
  var name = document.getElementById(formId + '-name').value.trim();
  var email = document.getElementById(formId + '-email').value.trim();
  if (!name) {
    alert('Please enter your first name to download this resource.');
    return false;
  }
  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address to download this resource.');
    return false;
  }
  var accessKey = document.getElementById(formId).querySelector('[name="access_key"]').value;
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ access_key: accessKey, name: name, email: email, resource: downloadUrl })
  }).then(function() {
    window.location.href = downloadUrl;
  }).catch(function() {
    window.location.href = downloadUrl;
  });
  return false;
}

// Contact / What We Do forms: AJAX submit via Web3Forms, show inline success
function handleFormSubmit(formEl, successId) {
  var data = {};
  new FormData(formEl).forEach(function(val, key) { data[key] = val; });
  data['access_key'] = formEl.querySelector('[name="access_key"]').value;

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(function(r) { return r.json(); })
  .then(function(json) {
    if (json.success) {
      formEl.style.display = 'none';
      var el = document.getElementById(successId);
      if (el) el.style.display = 'block';
    } else {
      alert('Something went wrong. Please try again or email info@enspireglobal.org.');
    }
  })
  .catch(function() {
    alert('Something went wrong. Please try again or email info@enspireglobal.org.');
  });
}
