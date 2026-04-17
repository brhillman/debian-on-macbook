/******************************************************************************
 * Firefox low-RAM profile for a 2 GB Debian/Openbox machine
 * Tweaked from the Betterfox idea: keep the useful trim-down approach,
 * but prioritize low memory over maximum responsiveness.
 ******************************************************************************/

/*** PROCESS / MEMORY ***/

// Keep content process count low.
user_pref("dom.ipc.processCount", 1);

// Keep site-isolation overhead down.
user_pref("dom.ipc.processCount.webIsolated", 1);

// Trim extension/file process counts too.
user_pref("dom.ipc.processCount.extension", 1);
user_pref("dom.ipc.processCount.file", 1);

// Aggressive: disable remote tabs (old-school single-process style).
// This saves RAM, but may reduce stability/security isolation on some sites.
user_pref("browser.tabs.remote.autostart", false);
user_pref("browser.tabs.remote.autostart.2", false);

// Let Firefox discard tabs under memory pressure.
user_pref("browser.tabs.unloadOnLowMemory", true);

// Keep tab/session history smaller.
user_pref("browser.sessionhistory.max_entries", 5);
user_pref("browser.sessionstore.interval", 60000);
user_pref("browser.sessionstore.resume_from_crash", false);

// Limit bfcache to reduce memory retained by back/forward navigation.
user_pref("browser.sessionhistory.max_total_viewers", 1);


/*** CACHE / DISK / PREFETCH ***/

// Disable disk cache; keep a modest memory cache.
user_pref("browser.cache.disk.enable", false);
user_pref("browser.cache.memory.enable", true);
user_pref("browser.cache.memory.capacity", 65536); // ~64 MB

// Disable speculative fetching.
user_pref("network.prefetch-next", false);
user_pref("network.dns.disablePrefetch", true);

// Reduce speculative connections.
user_pref("network.http.speculative-parallel-limit", 0);


/*** STARTUP / NEW TAB / UI ***/

// Keep startup as blank/light as possible.
user_pref("browser.startup.page", 0);
user_pref("browser.startup.homepage", "about:blank");
user_pref("browser.newtabpage.enabled", false);

// Fewer cosmetic effects.
user_pref("toolkit.cosmeticAnimations.enabled", false);
user_pref("browser.fullscreen.animate", false);
user_pref("browser.download.animateNotifications", false);

// Reduce image animation overhead.
user_pref("image.animation_mode", "once");


/*** TELEMETRY / BACKGROUND FEATURES ***/

// Cut background chatter and extra services.
user_pref("toolkit.telemetry.enabled", false);
user_pref("datareporting.healthreport.uploadEnabled", false);
user_pref("browser.ping-centre.telemetry", false);
user_pref("app.normandy.enabled", false);
user_pref("app.shield.optoutstudies.enabled", false);

// Disable Pocket and sponsored/extra homepage bits.
user_pref("extensions.pocket.enabled", false);
user_pref("browser.newtabpage.activity-stream.feeds.section.topstories", false);
user_pref("browser.newtabpage.activity-stream.feeds.system.topstories", false);
user_pref("browser.newtabpage.activity-stream.section.highlights.includePocket", false);

// Disable built-in recommendation/extra fluff where present.
user_pref("browser.discovery.enabled", false);


/*** RENDERING / OLD HARDWARE STABILITY ***/

// On very old hardware/drivers, disabling acceleration can be more stable.
// If video playback or rendering gets worse, flip this back to false.
user_pref("layers.acceleration.disabled", true);

// Keep smooth scrolling off to reduce work.
user_pref("general.smoothScroll", false);


/*** DOWNLOAD / PDF / MEDIA ***/

// Avoid built-in PDF viewer overhead if you prefer downloading files.
user_pref("pdfjs.disabled", true);

// Don’t autoplay media.
user_pref("media.autoplay.default", 5);


/*** SEARCH / URL BAR ***/

// Trim address bar suggestions.
user_pref("browser.urlbar.suggest.topsites", false);
user_pref("browser.urlbar.suggest.quicksuggest", false);
user_pref("browser.urlbar.suggest.engines", false);
user_pref("browser.urlbar.suggest.bookmark", true);
user_pref("browser.urlbar.suggest.history", true);
user_pref("browser.urlbar.suggest.openpage", false);


/*** OPTIONAL HARD TRIM ***/
// Uncomment these only if you want to strip more features and can tolerate breakage.

// user_pref("javascript.options.wasm", false); // saves some complexity, may break sites
// user_pref("media.hardware-video-decoding.enabled", false); // sometimes helps, sometimes hurts
// user_pref("dom.webnotifications.enabled", false); // fewer nags, fewer background prompts
