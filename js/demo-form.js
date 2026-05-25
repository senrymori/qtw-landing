// ---------- Config ----------
const API_BASE_URL = 'https://api.quicktouchmenu.online';

// ---------- Locales ----------
const ALL_LOCALES = ['de', 'en', 'es', 'et', 'fr', 'hr', 'it', 'lt', 'lv', 'pl', 'ru', 'tr', 'uk'];
const LOCALE_NAMES = {
  de: 'Deutsch',
  en: 'English',
  es: 'Español',
  et: 'Eesti',
  fr: 'Français',
  hr: 'Hrvatski',
  it: 'Italiano',
  lt: 'Lietuvių',
  lv: 'Latviešu',
  pl: 'Polski',
  ru: 'Русский',
  tr: 'Türkçe',
  uk: 'Українська'
};

// ---------- Palettes ----------
const palettes = [
  {
    id: 'classic',
    name: 'Classic Warmth',
    tag: 'Cream · Orange',
    pageBg: '#FAFAF7', pageText: '#0E1620',
    btnBg: '#FF5E00', btnText: '#FFFFFF', catBg: '#F4F2EC'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    tag: 'Dark · Bold',
    pageBg: '#0E1620', pageText: '#F5F5F2',
    btnBg: '#FF5E00', btnText: '#FFFFFF', catBg: '#1A2330'
  },
  {
    id: 'tuscany',
    name: 'Tuscany',
    tag: 'Terracotta · Warm',
    pageBg: '#FFF6EC', pageText: '#4A2C1A',
    btnBg: '#C2410C', btnText: '#FFFFFF', catBg: '#F5E4CC'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    tag: 'Teal · Calm',
    pageBg: '#F0F7FA', pageText: '#0F2A3D',
    btnBg: '#0E7490', btnText: '#FFFFFF', catBg: '#D9E9F0'
  },
  {
    id: 'forest',
    name: 'Forest',
    tag: 'Green · Natural',
    pageBg: '#F5F7F0', pageText: '#1F2D1B',
    btnBg: '#4D7C0F', btnText: '#FFFFFF', catBg: '#E2EAD6'
  },
  {
    id: 'berry',
    name: 'Berry',
    tag: 'Pink · Playful',
    pageBg: '#FBF5F8', pageText: '#2A1320',
    btnBg: '#BE185D', btnText: '#FFFFFF', catBg: '#F1E0E8'
  }
];

const palettesEl = document.getElementById('dfPalettes');
const preview = document.getElementById('dfPreview');
const customToggle = document.getElementById('dfCustomToggle');
const customPanel = document.getElementById('dfCustomPanel');

// Track current colors (sourced from palette OR custom picker) for theme upload
const currentColors = {
  pageBg: '#FAFAF7',
  pageText: '#0E1620',
  btnBg: '#FF5E00',
  btnText: '#FFFFFF',
  catBg: '#F4F2EC'
};

function applyPalette(p) {
  preview.style.setProperty('--preview-bg', p.pageBg);
  preview.style.setProperty('--preview-text', p.pageText);
  preview.style.setProperty('--preview-btn-bg', p.btnBg);
  preview.style.setProperty('--preview-btn-text', p.btnText);
  preview.style.setProperty('--preview-cat-bg', p.catBg);
  document.getElementById('cPageBg').value = p.pageBg;
  document.getElementById('cPageText').value = p.pageText;
  document.getElementById('cBtnBg').value = p.btnBg;
  document.getElementById('cBtnText').value = p.btnText;
  document.getElementById('cCatBg').value = p.catBg;
  currentColors.pageBg = p.pageBg;
  currentColors.pageText = p.pageText;
  currentColors.btnBg = p.btnBg;
  currentColors.btnText = p.btnText;
  currentColors.catBg = p.catBg;
}

palettes.forEach((p, idx) => {
  const card = document.createElement('div');
  card.className = 'df-palette' + (idx === 0 ? ' selected' : '');
  card.dataset.id = p.id;
  card.innerHTML = `
    <div class="check-badge"><svg width="12" height="12" style="color:#fff"><use href="#i-check"></use></svg></div>
    <div class="df-palette-swatches">
      <span style="background:${p.pageBg}"></span>
      <span style="background:${p.pageText}"></span>
      <span style="background:${p.btnBg}"></span>
      <span style="background:${p.catBg}"></span>
    </div>
    <div class="df-palette-name">${p.name}</div>
    <div class="df-palette-tag">${p.tag}</div>
  `;
  card.addEventListener('click', () => {
    document.querySelectorAll('.df-palette').forEach(el => el.classList.remove('selected'));
    card.classList.add('selected');
    applyPalette(p);
    customPanel.classList.remove('open');
    customToggle.classList.remove('active');
  });
  palettesEl.appendChild(card);
});

applyPalette(palettes[0]);

customToggle.addEventListener('click', () => {
  const isOpen = customPanel.classList.toggle('open');
  customToggle.classList.toggle('active', isOpen);
});

const targetVar = {
  pageBg: '--preview-bg',
  pageText: '--preview-text',
  btnBg: '--preview-btn-bg',
  btnText: '--preview-btn-text',
  catBg: '--preview-cat-bg'
};
document.querySelectorAll('.df-custom input[type="color"]').forEach(input => {
  input.addEventListener('input', e => {
    const key = e.target.dataset.target;
    preview.style.setProperty(targetVar[key], e.target.value);
    currentColors[key] = e.target.value;
    document.querySelectorAll('.df-palette').forEach(el => el.classList.remove('selected'));
  });
});

// ---------- Live preview ----------
const nameInput = document.getElementById('dfName');
const cuisineInput = document.getElementById('dfCuisine');
const previewName = document.getElementById('dfPreviewName');
const previewCuisine = document.getElementById('dfPreviewCuisine');
const previewUrl = document.getElementById('dfPreviewUrl');

function slugify(s) {
  return s.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 32) || 'your-restaurant';
}

nameInput.addEventListener('input', e => {
  const v = e.target.value.trim();
  previewName.textContent = v || 'Your restaurant';
  previewUrl.textContent = slugify(v || 'your-restaurant') + '.quicktouchmenu.online';
});

cuisineInput.addEventListener('input', e => {
  const v = e.target.value.trim();
  previewCuisine.textContent = v ? '— ' + v : '— select a cuisine';
});

// ---------- Combobox ----------
const combo = document.getElementById('dfCuisineCombo');
const comboToggle = combo.querySelector('.df-combo-toggle');
const comboList = combo.querySelector('.df-combo-list');

function closeCombo() {
  combo.classList.remove('open');
  comboList.hidden = true;
}
function openCombo() {
  combo.classList.add('open');
  comboList.hidden = false;
}

comboToggle.addEventListener('click', () => {
  if (comboList.hidden) {
    openCombo();
    cuisineInput.focus();
  } else {
    closeCombo();
  }
});

comboList.addEventListener('mousedown', e => {
  const li = e.target.closest('li[role="option"]');
  if (!li) return;
  e.preventDefault();
  cuisineInput.value = li.textContent;
  cuisineInput.dispatchEvent(new Event('input', { bubbles: true }));
  closeCombo();
});

document.addEventListener('click', e => {
  if (!combo.contains(e.target)) closeCombo();
});

cuisineInput.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCombo();
});

// ---------- Language ----------
const languageSelect = document.getElementById('dfLanguage');

function populateLanguages(allowed) {
  const codes = (allowed && allowed.length) ? allowed.filter(c => ALL_LOCALES.includes(c)) : ALL_LOCALES;
  const prev = languageSelect.value;
  languageSelect.innerHTML = '';
  if (!codes.length) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.disabled = true;
    opt.selected = true;
    opt.textContent = 'No languages available';
    languageSelect.appendChild(opt);
    return;
  }
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.textContent = 'Select a language…';
  languageSelect.appendChild(placeholder);
  codes.forEach(code => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${LOCALE_NAMES[code] || code} (${code.toUpperCase()})`;
    languageSelect.appendChild(opt);
  });
  if (prev && codes.includes(prev)) {
    languageSelect.value = prev;
  } else {
    placeholder.selected = true;
  }
}

populateLanguages(null);

// ---------- Countries ----------
const countrySelect = document.getElementById('dfCountry');
const phoneInput = document.getElementById('dfPhone');
const countriesById = new Map();

fetch(`${API_BASE_URL}/api/v3/countries?locale=en`)
  .then(r => {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(countries => {
    const list = Array.isArray(countries) ? countries : (countries.data || []);
    list.sort((a, b) => a.name.localeCompare(b.name));

    countrySelect.innerHTML = '<option value="" disabled selected>Select a country…</option>';
    for (const c of list) {
      countriesById.set(String(c.id), c);
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      opt.dataset.phoneCode = c.phone_code || '';
      opt.dataset.abbr = c.abbr || '';
      countrySelect.appendChild(opt);
    }
  })
  .catch(err => {
    console.error('Failed to load countries:', err);
    countrySelect.innerHTML = '<option value="" disabled selected>Could not load countries</option>';
  });

countrySelect.addEventListener('change', e => {
  const opt = e.target.selectedOptions[0];
  const country = countriesById.get(String(opt.value));

  // Restrict language options to those supported by the country
  if (country && Array.isArray(country.locales)) {
    populateLanguages(country.locales);
    if (country.main_locale && country.locales.includes(country.main_locale)) {
      languageSelect.value = country.main_locale;
    }
  }

  // Prefill phone code
  const rawCode = opt && opt.dataset.phoneCode;
  if (rawCode) {
    const code = rawCode.startsWith('+') ? rawCode : '+' + rawCode;
    if (phoneInput.value === '' || phoneInput.value === '+') {
      phoneInput.value = code + ' ';
    }
    phoneInput.placeholder = code + ' ';
  }
});

// ---------- Phone: keep leading "+" ----------
function ensurePlus() {
  if (!phoneInput.value.startsWith('+')) {
    phoneInput.value = '+' + phoneInput.value.replace(/^\++/, '');
  }
}
phoneInput.addEventListener('input', ensurePlus);
phoneInput.addEventListener('blur', ensurePlus);
phoneInput.addEventListener('keydown', e => {
  const atStart = phoneInput.selectionStart === 0 && phoneInput.selectionEnd <= 1;
  if (atStart && (e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value.startsWith('+')) {
    e.preventDefault();
  }
});

// ---------- Submission flow ----------
const form = document.getElementById('dfForm');
const submitBtn = document.getElementById('dfSubmitBtn');
const layoutEl = document.getElementById('dfLayout');
const statusEl = document.getElementById('dfStatus');
const successEl = document.getElementById('dfSuccess');
const successLink = document.getElementById('dfSuccessLink');

const codeModal = document.getElementById('dfCodeModal');
const codeModalClose = document.getElementById('dfCodeClose');
const codeForm = document.getElementById('dfCodeForm');
const codeInput = document.getElementById('dfCodeInput');
const codePhoneEl = document.getElementById('dfCodePhone');
const codeErr = document.getElementById('dfCodeErr');
const codeSubmit = document.getElementById('dfCodeSubmit');

function openCodeModal(phone) {
  codePhoneEl.textContent = phone;
  codeInput.value = '';
  codeErr.textContent = '';
  codeModal.classList.add('open');
  setTimeout(() => codeInput.focus(), 100);
}
function closeCodeModal() {
  codeModal.classList.remove('open');
}
codeModalClose.addEventListener('click', closeCodeModal);
codeModal.addEventListener('click', e => {
  if (e.target === codeModal) closeCodeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && codeModal.classList.contains('open')) closeCodeModal();
});

// Restrict code input to digits
codeInput.addEventListener('input', e => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

function collectFormData() {
  return {
    name: nameInput.value.trim(),
    cuisine: cuisineInput.value.trim(),
    countryId: countrySelect.value,
    address: document.getElementById('dfAddress').value.trim(),
    locale: languageSelect.value,
    phone: phoneInput.value.trim(),
    email: document.getElementById('dfEmail').value.trim(),
    password: document.getElementById('dfPassword').value
  };
}

function validateForm(data) {
  if (!data.locale) return 'Please select a language.';
  if (!data.name) return 'Please enter a restaurant name.';
  if (!data.cuisine) return 'Please select or enter a cuisine type.';
  if (!data.countryId) return 'Please select a country.';
  if (!data.address) return 'Please enter an address.';
  if (!data.phone || data.phone.length < 5) return 'Please enter a valid phone number.';
  if (!data.email) return 'Please enter an e-mail address.';
  if (!data.password || data.password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const data = collectFormData();
  const err = validateForm(data);
  if (err) {
    alert(err);
    return;
  }

  submitBtn.disabled = true;
  const originalLabel = submitBtn.innerHTML;
  submitBtn.innerHTML = 'Sending code…';

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/phone_verification_codes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reason: 'restaurant_point_create',
        phone: data.phone
      })
    });
    if (res.status !== 200) {
      let detail = '';
      try { detail = (await res.json()).message || ''; } catch (_) {}
      throw new Error(detail || `Failed to send code (HTTP ${res.status})`);
    }
    openCodeModal(data.phone);
  } catch (e2) {
    alert(e2.message || 'Could not send verification code. Please try again.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalLabel;
  }
});

// ---------- Code verification + restaurant creation ----------
codeForm.addEventListener('submit', async e => {
  e.preventDefault();
  const code = codeInput.value.trim();
  if (!code) {
    codeErr.textContent = 'Please enter the code you received.';
    return;
  }
  codeErr.textContent = '';
  codeSubmit.disabled = true;
  const originalLabel = codeSubmit.innerHTML;
  codeSubmit.innerHTML = 'Verifying…';

  const data = collectFormData();

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/restaurant_points`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        restaurant_point: {
          name: data.name,
          country_id: Number(data.countryId),
          main_locale: data.locale,
          owner_attributes: {
            email: data.email,
            phone: data.phone,
            password: data.password
          },
          verification_code: code
        }
      })
    });

    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).message || ''; } catch (_) {}
      throw new Error(detail || `Registration failed (HTTP ${res.status})`);
    }

    const json = await res.json();
    const auth = json.auth || {};
    const authToken = auth.auth_token;
    const restaurantPointId = auth.restaurant_point_id;
    if (!authToken || !restaurantPointId) {
      throw new Error('Unexpected response from the server.');
    }

    closeCodeModal();
    showStatus();
    markStep('register', 'done');

    await finalizeSite({
      authToken,
      restaurantPointId,
      data
    });
  } catch (e2) {
    codeErr.textContent = e2.message || 'Verification failed. Please try again.';
  } finally {
    codeSubmit.disabled = false;
    codeSubmit.innerHTML = originalLabel;
  }
});

function showStatus() {
  layoutEl.hidden = true;
  document.querySelector('.df-head').hidden = true;
  statusEl.hidden = false;
}

function showSuccess(slug) {
  statusEl.hidden = true;
  const host = `${slug}.quicktouchmenu.online`;
  successLink.textContent = host;
  successLink.href = `https://${host}`;
  successEl.hidden = false;
}

function markStep(name, state) {
  const steps = document.querySelectorAll('#dfStatusSteps .df-status-step');
  steps.forEach(s => {
    if (s.dataset.step === name) {
      s.classList.remove('active', 'done');
      if (state) s.classList.add(state);
    }
  });
}
function setStepActive(name) {
  markStep(name, 'active');
}
function setStepDone(name) {
  markStep(name, 'done');
}

async function finalizeSite({ authToken, restaurantPointId, data }) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };
  const locale = data.locale;

  // 1. Coordinates — GET with `address` query (browser fetch can't send a body on GET)
  setStepActive('geo');
  let coords = [0, 0];
  try {
    const url = new URL(`${API_BASE_URL}/api/v1/admin/geo_codings/coordinates`);
    url.searchParams.set('restaurant_point_id', String(restaurantPointId));
    url.searchParams.set('locale', locale);
    url.searchParams.set('address', data.address);
    const geoRes = await fetch(url.toString(), {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (geoRes.ok) {
      const geoJson = await geoRes.json();
      if (Array.isArray(geoJson.coordinates) && geoJson.coordinates.length >= 2) {
        coords = geoJson.coordinates;
      }
    }
  } catch (_) { /* tolerate */ }
  setStepDone('geo');

  // 2. Update restaurant info (address + cuisine + geo_json)
  setStepActive('info');
  try {
    await fetch(`${API_BASE_URL}/api/v1/admin/restaurant_points/${restaurantPointId}?locale=${encodeURIComponent(locale)}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        address_translations: {
          [locale]: { type: 'manual', value: data.address }
        },
        cuisines_translations: {
          [locale]: { type: 'manual', value: data.cuisine }
        },
        address_geo_json: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [coords[1] ?? 0, coords[0] ?? 0]
          }
        }
      })
    });
  } catch (_) { /* tolerate */ }
  setStepDone('info');

  // 3. Update theme
  setStepActive('theme');
  const themeUrl = `${API_BASE_URL}/api/v1/admin/theme?restaurant_point_id=${restaurantPointId}&locale=${encodeURIComponent(locale)}`;
  try {
    await fetch(themeUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        background_primary_color: currentColors.pageBg,
        background_secondary_color: currentColors.btnBg,
        text_primary_color: currentColors.pageText,
        text_secondary_color: currentColors.catBg,
        text_button_color: currentColors.btnText
      })
    });
  } catch (_) { /* tolerate */ }

  // 3b. Upload theme images (logo, then desktop_screen_image) as multipart/form-data
  try {
    await uploadThemeImage(themeUrl, authToken, 'logo', 'images/demo/demo-logo.png');
    await uploadThemeImage(themeUrl, authToken, 'desktop_screen_image', 'images/demo/demo-preview.png');
  } catch (_) { /* tolerate */ }
  setStepDone('theme');

  // 4. Fetch slug
  setStepActive('finalize');
  let slug = slugify(data.name);
  try {
    const slugRes = await fetch(`${API_BASE_URL}/api/v1/admin/restaurant_points/${restaurantPointId}?locale=en`, {
      method: 'GET',
      headers
    });
    if (slugRes.ok) {
      const slugJson = await slugRes.json();
      const point = slugJson.restaurant_point || slugJson;
      if (point && point.slug) slug = point.slug;
    }
  } catch (_) { /* tolerate */ }
  setStepDone('finalize');

  showSuccess(slug);
  notifyTelegram({ phone: data.phone, email: data.email, slug });
}

async function uploadThemeImage(themeUrl, authToken, fieldName, assetPath) {
  const assetRes = await fetch(assetPath);
  if (!assetRes.ok) throw new Error(`Failed to load asset ${assetPath}`);
  const blob = await assetRes.blob();
  const filename = assetPath.split('/').pop();
  const fd = new FormData();
  fd.append(fieldName, blob, filename);
  await fetch(themeUrl, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${authToken}` },
    body: fd
  });
}

function notifyTelegram({ phone, email, slug }) {
  const url = 'https://script.google.com/macros/s/AKfycbwZCC-3Z-Xl-9zBjJIa-lfLFVY6oDRJuUIYkx3GpPGuZ6rauiqi-3irFoCMsDCbGNjA/exec';
  const payload = {
    client: { phone, email },
    restaurant_url: `https://${slug}.quicktouchmenu.online`
  };
  fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload)
  }).catch(() => { /* tolerate */ });
}
