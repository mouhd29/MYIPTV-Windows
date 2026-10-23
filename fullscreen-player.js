(()=>{
const overlay=document.getElementById('player'),video=document.getElementById('video'),box=overlay?.querySelector('.playerbox');
if(!overlay||!video||!box)return;
const css=document.createElement('style');
css.textContent='.player{padding:0!important;background:#000!important}.playerbox{width:100vw!important;height:100vh!important;max-width:none!important;border:0!important;border-radius:0!important;display:flex;flex-direction:column}.player video{height:100%!important;width:100%!important;max-height:none!important;aspect-ratio:auto!important;object-fit:contain;flex:1;min-height:0}.playerhead{position:absolute;top:0;left:0;right:0;z-index:12;background:#0009;opacity:0}.player:hover .playerhead,.player:focus-within .playerhead{opacity:1}.player .notice{display:none}.player-options{position:absolute;bottom:35px;right:20px;z-index:15;display:flex;gap:8px;opacity:0}.player:hover .player-options,.player:focus-within .player-options{opacity:1}.player-options button{background:#172039;color:white;border:1px solid #556;border-radius:8px;padding:10px}';
document.head.append(css);
const opts=document.createElement('div');opts.className='player-options';
for(const [name,fit] of [['Fit / احتواء','contain'],['Fill / ملء','cover']]){const b=document.createElement('button');b.textContent=name;b.onclick=()=>video.style.objectFit=fit;opts.append(b)}
const full=document.createElement('button');full.textContent='Fullscreen / شاشة كاملة';full.onclick=()=>{if(!document.fullscreenElement)overlay.requestFullscreen?.().catch(()=>{});else document.exitFullscreen?.()};opts.append(full);box.append(opts);
new MutationObserver(()=>{if(overlay.classList.contains('show')&&!document.fullscreenElement)overlay.requestFullscreen?.().catch(()=>{});}).observe(overlay,{attributes:true,attributeFilter:['class']});
})();