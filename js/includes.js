(function(){
  // Simple include loader: fetches partials/header.html and partials/footer.html
  async function loadInclude(name, url){
    try{
      const res = await fetch(url, {cache: 'no-store'});
      if(!res.ok) throw new Error('Failed to load '+url);
      const html = await res.text();
      const container = document.querySelector('[data-include="'+name+'"]');
      if(container) container.innerHTML = html;
    }catch(e){ console.error(e); }
  }

  async function init(){
    await Promise.all([
      loadInclude('header','/partials/header.html'),
      loadInclude('footer','/partials/footer.html')
    ]);

    // after includes inserted, dynamically load scripts that depend on header elements
    function loadScript(src){
      return new Promise((resolve,reject)=>{
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.onload = resolve;
        s.onerror = reject;
        document.body.appendChild(s);
      });
    }

    // load sidebar, theme, and navigation scripts (order matters)
    try{
      await loadScript('/js/sidebar.js');
      await loadScript('/js/theme.js');
      await loadScript('/js/navigation.js');
    }catch(e){ console.error('Failed loading dependent scripts', e); }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
