(()=>{
const v=document.getElementById('video'),notice=document.getElementById('playnotice'),head=document.querySelector('.playerhead');
const diagnostic=document.createElement('div');diagnostic.style.cssText='padding:10px 20px;color:#d9e1f6;background:#121d30;font-size:12px;display:flex;gap:10px;flex-wrap:wrap;align-items:center';
diagnostic.innerHTML='<span id="stream-state" role="status">Ready / جاهز</span><button id="retry-stream" class="btn ghost" style="padding:6px 12px">↻ Retry / إعادة المحاولة</button><button id="copy-stream-error" class="btn ghost" style="padding:6px 12px">Copy error / نسخ الخطأ</button>';
head.after(diagnostic);
let lastUrl='',lastName='',lastError='',retries=0;
const original=window.play;
window.play=function(url,name){lastUrl=url;lastName=name;retries=0;setStatus('Connecting / جارٍ الاتصال');original(url,name)};
function setStatus(s){document.getElementById('stream-state').textContent=s}
const errors={1:'Playback was cancelled.',2:'Network error: check stream URL, network, or server.',3:'Decode error: codec may not be supported.',4:'Stream format is not supported or URL is inaccessible.'};
function fail(message){lastError=message;setStatus('Playback error / خطأ التشغيل');notice.textContent=message+' Check stream authorization, supported codecs, HTTPS/CORS, and any provider-required headers.'}
v.addEventListener('loadstart',()=>setStatus('Loading stream / تحميل البث'));
v.addEventListener('waiting',()=>setStatus('Buffering / جارٍ التخزين المؤقت'));
v.addEventListener('playing',()=>{setStatus('Playing / يعمل');lastError=''});
v.addEventListener('error',()=>{if(v.error)fail(errors[v.error.code]||v.error.message||'Unknown media error')});
document.getElementById('retry-stream').onclick=()=>{if(lastUrl&&retries++<4)original(lastUrl,lastName);else if(retries>=4)fail('Retry limit reached. Check source or provider.')};
document.getElementById('copy-stream-error').onclick=()=>navigator.clipboard?.writeText('MY IPTV playback error: '+lastError+'; codec support: '+(v.canPlayType('video/mp4')||'unknown')).catch(()=>{});
})();
