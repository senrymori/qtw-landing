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

// ---------- Language ----------
const languageSelect = document.getElementById('dfLanguage');

function populateLanguages() {
  languageSelect.innerHTML = '';
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = 'Select a language…';
  languageSelect.appendChild(placeholder);
  ALL_LOCALES.forEach(code => {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = `${LOCALE_NAMES[code] || code} (${code.toUpperCase()})`;
    languageSelect.appendChild(opt);
  });
}

populateLanguages();

// ---------- Countries ----------
const countrySelect = document.getElementById('dfCountry');
const phoneInput = document.getElementById('dfPhone');
const countriesById = new Map();
let selectedCountryLocale = null;

function countryLocaleFor(country) {
  if (!country) return null;
  const main = country.main_locale ? String(country.main_locale).toLowerCase() : '';
  if (main && ALL_LOCALES.includes(main)) return main;
  if (Array.isArray(country.locales)) {
    for (const loc of country.locales) {
      const v = String(loc || '').toLowerCase();
      if (ALL_LOCALES.includes(v)) return v;
    }
  }
  return null;
}

fetch(`${API_BASE_URL}/api/v3/countries?locale=en`)
  .then(r => {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.json();
  })
  .then(countries => {
    const rawList = Array.isArray(countries) ? countries : (countries.data || []);
    const excludedAbbrs = new Set(['US', 'UA']);
    const list = rawList.filter(c => !excludedAbbrs.has((c.abbr || '').toUpperCase()));
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

  // Prefill phone code
  const rawCode = opt && opt.dataset.phoneCode;
  if (rawCode) {
    const code = rawCode.startsWith('+') ? rawCode : '+' + rawCode;
    if (phoneInput.value === '' || phoneInput.value === '+') {
      phoneInput.value = code + ' ';
    }
    phoneInput.placeholder = code + ' ';
  }

  // Track country's primary locale for multi-locale payloads
  const country = countriesById.get(String(e.target.value));
  selectedCountryLocale = countryLocaleFor(country);
});

// ---------- Phone: normalize to single leading "+" ----------
function normalizePhoneDisplay(v) {
  // Strip every '+' from the raw string, then prepend exactly one.
  const cleaned = v.replace(/\+/g, '');
  return '+' + cleaned;
}

function phoneForApi(v) {
  // For the API we send digits only with a single '+' prefix.
  const digits = v.replace(/\D/g, '');
  return digits ? '+' + digits : '';
}

function normalizePhoneField() {
  const before = phoneInput.value;
  const after = normalizePhoneDisplay(before);
  if (after === before) return;
  const caret = phoneInput.selectionStart ?? after.length;
  // Adjust caret by the number of characters removed before it.
  const removed = before.length - after.length;
  const newCaret = Math.max(1, caret - removed);
  phoneInput.value = after;
  try { phoneInput.setSelectionRange(newCaret, newCaret); } catch (_) {}
}

phoneInput.addEventListener('input', normalizePhoneField);
phoneInput.addEventListener('blur', normalizePhoneField);
phoneInput.addEventListener('keydown', e => {
  const atStart = phoneInput.selectionStart === 0 && phoneInput.selectionEnd <= 1;
  if (atStart && (e.key === 'Backspace' || e.key === 'Delete') && phoneInput.value.startsWith('+')) {
    e.preventDefault();
  }
});

// ---------- Password show/hide ----------
const pwInput = document.getElementById('dfPassword');
const pwToggle = document.getElementById('dfPwToggle');
const pwIcon = document.getElementById('dfPwIcon');
pwToggle.addEventListener('click', () => {
  const isHidden = pwInput.type === 'password';
  pwInput.type = isHidden ? 'text' : 'password';
  pwToggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  pwIcon.setAttribute('href', isHidden ? '#i-eye-off' : '#i-eye');
});

// ---------- Menu file upload ----------
const MAX_MENU_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_MENU_MIME = new Set(['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']);
const ALLOWED_MENU_EXT = /\.(jpe?g|png|pdf)$/i;

const menuFileInput = document.getElementById('dfMenuFile');
const uploadZone = document.getElementById('dfUpload');
const uploadEmptyView = uploadZone.querySelector('.df-upload-empty');
const uploadFileView = uploadZone.querySelector('.df-upload-file');
const uploadFileName = uploadFileView.querySelector('.name');
const uploadFileSize = uploadFileView.querySelector('.size');
const uploadRemoveBtn = uploadFileView.querySelector('.remove');
const uploadErr = document.getElementById('dfUploadErr');

let selectedMenuFile = null;

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1024 / 1024).toFixed(1) + ' MB';
}

function validateMenuFile(file) {
  const okMime = ALLOWED_MENU_MIME.has(file.type);
  const okExt = ALLOWED_MENU_EXT.test(file.name);
  if (!okMime && !okExt) return 'Unsupported file type. Use JPG, PNG or PDF.';
  if (file.size > MAX_MENU_FILE_SIZE) return 'File is larger than 10 MB.';
  return null;
}

function setMenuFile(file) {
  uploadErr.textContent = '';
  if (!file) {
    selectedMenuFile = null;
    uploadEmptyView.hidden = false;
    uploadFileView.hidden = true;
    menuFileInput.value = '';
    return;
  }
  const err = validateMenuFile(file);
  if (err) {
    uploadErr.textContent = err;
    selectedMenuFile = null;
    uploadEmptyView.hidden = false;
    uploadFileView.hidden = true;
    menuFileInput.value = '';
    return;
  }
  selectedMenuFile = file;
  uploadFileName.textContent = file.name;
  uploadFileSize.textContent = formatBytes(file.size);
  uploadEmptyView.hidden = true;
  uploadFileView.hidden = false;
}

uploadEmptyView.addEventListener('click', () => menuFileInput.click());
menuFileInput.addEventListener('change', e => {
  const f = e.target.files && e.target.files[0];
  if (f) setMenuFile(f);
});
uploadRemoveBtn.addEventListener('click', e => {
  e.stopPropagation();
  setMenuFile(null);
});

['dragenter', 'dragover'].forEach(ev => {
  uploadZone.addEventListener(ev, e => {
    e.preventDefault();
    uploadZone.classList.add('dragging');
  });
});
['dragleave', 'dragend'].forEach(ev => {
  uploadZone.addEventListener(ev, () => uploadZone.classList.remove('dragging'));
});
uploadZone.addEventListener('drop', e => {
  e.preventDefault();
  uploadZone.classList.remove('dragging');
  const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) setMenuFile(f);
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
    countryLocale: selectedCountryLocale,
    address: document.getElementById('dfAddress').value.trim(),
    locale: languageSelect.value,
    phone: phoneForApi(phoneInput.value),
    email: document.getElementById('dfEmail').value.trim(),
    password: document.getElementById('dfPassword').value
  };
}

function buildTargetLocales(data) {
  const set = new Set();
  if (data.locale) set.add(data.locale);
  if (data.countryLocale) set.add(data.countryLocale);
  return Array.from(set);
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
  layoutEl.remove();
  document.querySelector('.df-head').remove();
  if (!selectedMenuFile) {
    const menuStep = statusEl.querySelector('[data-step="menu"]');
    if (menuStep) menuStep.remove();
  }
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

  // 4. Menu parsing + save (only if user uploaded a file)
  if (selectedMenuFile) {
    setStepActive('menu');
    try {
      const targetLocales = buildTargetLocales(data);
      const parsed = await parseMenu(authToken, targetLocales, selectedMenuFile);
      if (parsed && Array.isArray(parsed.categories) && parsed.categories.length) {
        const subdivisions = await fetchSubdivisions(authToken, restaurantPointId, locale);
        // Parser returns text only in `locale`. If country locale differs, translate
        // names/descriptions so every target locale has a real value (backend rejects
        // blank/fallback values when country locale ≠ main_locale).
        const extraLocales = targetLocales.filter(l => l && l !== locale);
        if (extraLocales.length) {
          await translateMenuTexts(authToken, parsed, locale, extraLocales);
        }
        await saveMenuToBackend(parsed, authToken, restaurantPointId, locale, targetLocales, subdivisions);
      }
    } catch (_) { /* tolerate */ }
    setStepDone('menu');
  }

  // 5. Fetch slug
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

// ---------- Menu parsing (AI) + save ----------
const MENU_POLL_INTERVAL_MS = 7000;
const MENU_POLL_MAX_ATTEMPTS = 60;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function parseMenu(authToken, locales, file) {
  const fd = new FormData();
  fd.append('file', file, file.name);
  const localeList = Array.isArray(locales) ? locales : [locales];
  for (const loc of localeList) {
    if (loc) fd.append('locales[]', loc);
  }

  const startRes = await fetch(`${API_BASE_URL}/api/v1/admin/ai_functions/parser`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${authToken}` },
    body: fd
  });
  if (!startRes.ok) throw new Error(`Failed to start parsing (HTTP ${startRes.status})`);
  const startJson = await startRes.json();
  const key = startJson && startJson.key;
  if (!key) throw new Error('Parser key missing in response');

  const resultUrl = `${API_BASE_URL}/api/v1/admin/ai_functions/parser/results/${encodeURIComponent(key)}`;
  for (let attempt = 0; attempt < MENU_POLL_MAX_ATTEMPTS; attempt++) {
    await sleep(MENU_POLL_INTERVAL_MS);
    const r = await fetch(resultUrl, {
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    if (r.status === 202) continue;
    if (!r.ok) throw new Error(`Parser poll failed (HTTP ${r.status})`);
    const json = await r.json();
    if (json && json.status === 'pending') continue;
    if (json && json.status === 'error') throw new Error('Parser returned error');
    // Result may be wrapped in { result: { categories } } or returned directly as { categories }.
    const result = (json && json.result) ? json.result : json;
    if (result && Array.isArray(result.categories)) return result;
    return { categories: [] };
  }
  throw new Error('Parser timed out');
}

async function translateMenuTexts(authToken, parsed, fromLocale, toLocales) {
  const texts = new Set();
  const collect = t => {
    if (t && typeof t[fromLocale] === 'string' && t[fromLocale].trim()) {
      texts.add(t[fromLocale]);
    }
  };
  for (const cat of parsed.categories || []) {
    collect(cat.name);
    for (const sub of cat.subcategories || []) {
      collect(sub.name);
      for (const dish of sub.dishes || []) {
        collect(dish.name);
        collect(dish.description);
      }
    }
    for (const dish of cat.dishes || []) {
      collect(dish.name);
      collect(dish.description);
    }
  }
  if (!texts.size) return;

  const textsArr = Array.from(texts);
  const body = {
    texts: textsArr.map(text => ({ text, from: fromLocale, to: toLocales }))
  };

  const translationMap = {};
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/admin/translate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) return;
    const json = await res.json();
    const list = Array.isArray(json) ? json : (json.data || json.translations || []);
    for (const item of list) {
      if (item && typeof item.text === 'string') {
        translationMap[item.text] = item.translations || {};
      }
    }
  } catch (_) {
    return;
  }

  const apply = t => {
    if (!t) return;
    const original = t[fromLocale];
    if (!original) return;
    const trans = translationMap[original];
    if (!trans) return;
    for (const loc of toLocales) {
      const translated = trans[loc];
      if (translated && !t[loc]) t[loc] = translated;
    }
  };
  for (const cat of parsed.categories || []) {
    apply(cat.name);
    for (const sub of cat.subcategories || []) {
      apply(sub.name);
      for (const dish of sub.dishes || []) {
        apply(dish.name);
        apply(dish.description);
      }
    }
    for (const dish of cat.dishes || []) {
      apply(dish.name);
      apply(dish.description);
    }
  }
}

async function fetchSubdivisions(authToken, restaurantPointId, locale) {
  const url = `${API_BASE_URL}/api/v1/admin/subdivisions?restaurant_point_id=${restaurantPointId}&locale=${encodeURIComponent(locale)}`;
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${authToken}` }
  });
  if (!res.ok) return [];
  const json = await res.json();
  if (Array.isArray(json)) return json;
  return json.data || json.subdivisions || [];
}

function formatTextForServer(translations, targetLocales, mainLocale) {
  if (!translations) return undefined;

  // Pick a non-empty fallback value (prefer main locale, then any non-empty entry).
  let fallback = '';
  if (mainLocale && translations[mainLocale]) {
    fallback = translations[mainLocale];
  }
  if (!fallback) {
    for (const k in translations) {
      if (translations[k]) { fallback = translations[k]; break; }
    }
  }

  const out = {};
  for (const k in translations) {
    out[k] = { type: 'manual', value: translations[k] || fallback };
  }
  // Ensure each required locale has a non-blank value — backend rejects blanks
  // when the restaurant point's country locale ≠ main_locale.
  for (const tl of (targetLocales || [])) {
    if (!tl) continue;
    if (!out[tl] || !out[tl].value) {
      out[tl] = { type: 'manual', value: fallback };
    }
  }
  return out;
}

function getSubdivisionId(type, subdivisions) {
  if (!subdivisions || !subdivisions.length) return undefined;
  return type === 'bar' ? (subdivisions[0] && subdivisions[0].id) : (subdivisions[1] && subdivisions[1].id);
}

async function apiCreateCategory(authToken, restaurantPointId, locale, body) {
  const url = `${API_BASE_URL}/api/v1/admin/categories?restaurant_point_id=${restaurantPointId}&locale=${encodeURIComponent(locale)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Create category failed (HTTP ${res.status})`);
  return res.json();
}

async function apiAddSubdivisionToCategory(authToken, categoryId, subdivisionId) {
  await fetch(`${API_BASE_URL}/api/v1/admin/categories/${categoryId}/add_subdivision/${subdivisionId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${authToken}` }
  }).catch(() => { /* tolerate */ });
}

async function apiCreateDish(authToken, restaurantPointId, locale, body) {
  const url = `${API_BASE_URL}/api/v1/admin/products?restaurant_point_id=${restaurantPointId}&locale=${encodeURIComponent(locale)}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`Create dish failed (HTTP ${res.status})`);
  return res.json();
}

async function apiPutDishOnShowcase(authToken, restaurantPointId, productId) {
  await fetch(`${API_BASE_URL}/api/v1/admin/products/${productId}/on_showcase?restaurant_point_id=${restaurantPointId}`, {
    method: 'PUT',
    headers: { 'Authorization': `Bearer ${authToken}` }
  }).catch(() => { /* tolerate */ });
}

async function createDishAndShowcase(authToken, restaurantPointId, locale, body) {
  const dish = await apiCreateDish(authToken, restaurantPointId, locale, body);
  if (dish && dish.id != null) {
    await apiPutDishOnShowcase(authToken, restaurantPointId, dish.id);
  }
  return dish;
}

function buildDishBody(categoryId, dish, targetLocales, mainLocale) {
  return {
    name: formatTextForServer(dish.name, targetLocales, mainLocale),
    description: formatTextForServer(dish.description, targetLocales, mainLocale),
    discount_value: null,
    discount_type: 'unset',
    category_id: categoryId,
    kkal: dish.kkal != null ? String(dish.kkal) : null,
    carbs: dish.carbs,
    proteins: dish.proteins,
    fats: dish.fats,
    weight: dish.weight != null ? String(dish.weight) : '0',
    price: dish.price != null ? String(dish.price) : '0',
    weight_type: dish.unit || 'gram'
  };
}

async function saveMenuToBackend(parsed, authToken, restaurantPointId, mainLocale, targetLocales, subdivisions) {
  await Promise.all((parsed.categories || []).map(async category => {
    let parentCategory;
    try {
      parentCategory = await apiCreateCategory(authToken, restaurantPointId, mainLocale, {
        name: formatTextForServer(category.name, targetLocales, mainLocale),
        is_menu: !!(category.subcategories && category.subcategories.length),
        is_limited: false,
        is_bonus: false
      });
    } catch (_) {
      return;
    }

    const divisionId = getSubdivisionId(category.type, subdivisions);
    const tasks = [];

    if (divisionId !== undefined) {
      tasks.push(apiAddSubdivisionToCategory(authToken, parentCategory.id, divisionId));
    }

    if (category.subcategories && category.subcategories.length) {
      tasks.push(...category.subcategories.map(async sub => {
        let subResp;
        try {
          subResp = await apiCreateCategory(authToken, restaurantPointId, mainLocale, {
            name: formatTextForServer(sub.name, targetLocales, mainLocale),
            is_menu: false,
            is_limited: false,
            is_bonus: false,
            parent_id: parentCategory.id
          });
        } catch (_) {
          return;
        }

        const subTasks = [];
        if (divisionId !== undefined) {
          subTasks.push(apiAddSubdivisionToCategory(authToken, subResp.id, divisionId));
        }
        subTasks.push(...(sub.dishes || []).map(dish =>
          createDishAndShowcase(authToken, restaurantPointId, mainLocale, buildDishBody(subResp.id, dish, targetLocales, mainLocale))
            .catch(() => { /* tolerate */ })
        ));
        await Promise.all(subTasks);
      }));
    } else if (category.dishes && category.dishes.length) {
      tasks.push(...category.dishes.map(dish =>
        createDishAndShowcase(authToken, restaurantPointId, mainLocale, buildDishBody(parentCategory.id, dish, targetLocales, mainLocale))
          .catch(() => { /* tolerate */ })
      ));
    }

    await Promise.all(tasks);
  }));
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
