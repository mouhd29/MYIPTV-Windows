(()=>{const $=id=>document.getElementById(id);let tsPlayer=null;
const originalPlay=window.play;
window.play=function(url,name){
 if(tsPlayer){try{tsPlayer.destroy()}catch(e){}tsPlayer=null}
 if(/\.ts(?:[?#]|$)/i.test(url)&&window.mpegts&&mpegts.isSupported()){
  $('playing').textContent=name;$('player').classList.add('show');
  const v=$('video');v.pause();v.removeAttribute('src');v.load();
  tsPlayer=mpegts.createPlayer({type:'mpegts',url,isLive:true},{enableWorker:false});
  tsPlayer.attachMediaElement(v);tsPlayer.load();tsPlayer.play().catch(()=>{});
  $('playnotice').textContent='MPEG-TS playback (beta). Availability depends on stream codecs and CORS.';
 }else originalPlay(url,name);
};
$('close').addEventListener('click',()=>{if(tsPlayer){try{tsPlayer.destroy()}catch(e){}tsPlayer=null}});
const saved=localStorage.getItem('myiptv_recent')||'[]';
let recent;try{recent=JSON.parse(saved)}catch(e){recent=[]}
const oldAdd=window.addPlaylist;
window.addPlaylist=function(name,entries){recent=entries.slice(-100).map(x=>x.id);localStorage.setItem('myiptv_recent',JSON.stringify(recent));return oldAdd(name,entries)};
const nav=document.createElement('button');nav.className='nav';nav.dataset.page='recent';nav.innerHTML='◷ <span class="word"> &nbsp; Recently Added / المضاف حديثاً</span>';
document.querySelector('[data-page="favorites"]').after(nav);
nav.onclick=()=>{document.querySelectorAll('.nav').forEach(b=>b.classList.toggle('active',b===nav));page='recent';category='All';query='';$('search').value='';renderRecent()};
function renderRecent(){
 $('heading').textContent=localStorage.getItem('myiptv_language')==='ar'?'المضاف حديثاً':'Recently Added';
 const entries=(current()?.entries||[]).filter(x=>recent.includes(x.id)).reverse();
 $('content').innerHTML='<div class="toolbar"><h2>'+entries.length+' recently imported entries</h2></div><div class="grid">'+entries.map((x,i)=>'<div class="tile"><div class="name">'+esc(x.name)+'</div><div class="cat">'+esc(x.category)+'</div><button class="btn" data-idx="'+i+'">▶ Play</button></div>').join('')+'</div>';
 $('content').querySelectorAll('[data-idx]').forEach(b=>b.onclick=()=>{const x=entries[Number(b.dataset.idx)];window.play(x.url,x.name)});
}
const originalRender=window.render;
window.render=function(){if(page==='recent')return renderRecent();return originalRender()};
const navPlaylists=document.querySelector('[data-page="playlists"]');
navPlaylists.addEventListener('click',()=>setTimeout(addXtreamPanel,0));
function addXtreamPanel(){
 if($('xtream-panel'))return;
 const panel=document.createElement('div');panel.className='panel';panel.id='xtream-panel';
 panel.innerHTML='<h2>Xtream Codes / إكستريم كودز</h2><p class="hint">Connect your own authorized provider account. Use HTTPS where possible. Browser CORS rules may restrict some servers.</p><input class="field" id="xt-server" placeholder="Server URL / رابط الخادم"><input class="field" id="xt-user" placeholder="Username / اسم المستخدم"><input class="field" id="xt-pass" type="password" placeholder="Password / كلمة المرور"><button class="btn" id="xt-connect">Connect / اتصال</button><div class="status" id="xt-status"></div>';
 $('content').prepend(panel);
 $('xt-connect').onclick=async()=>{
  const base=$('xt-server').value.trim().replace(/\/+$/,''),user=$('xt-user').value.trim(),pass=$('xt-pass').value;
  if(!/^https?:\/\//.test(base)||!user||!pass)return $('xt-status').textContent='Enter server, username and password.';
  $('xt-status').textContent='Connecting…';
  try{
   const cred='username='+encodeURIComponent(user)+'&password='+encodeURIComponent(pass);
   const req=async suffix=>{const r=await fetch(base+'/player_api.php?'+cred+suffix);if(!r.ok)throw Error('HTTP '+r.status);return r.json()};
   const auth=await req('');if(String(auth.user_info?.status||'').toLowerCase()!=='active')throw Error('Account not active');
   let all=[];for(const [action,type,segment] of [['get_live_streams','live','live'],['get_vod_streams','movies','movie']]){
    const arr=await req('&action='+action);
    if(!Array.isArray(arr))continue;
    all.push(...arr.filter(x=>x.stream_id).map(x=>{const ext=type==='live'?'ts':(x.container_extension||'mp4');const url=base+'/'+segment+'/'+encodeURIComponent(user)+'/'+encodeURIComponent(pass)+'/'+x.stream_id+'.'+ext;return {id:url,url,name:x.name||'Stream',category:String(x.category_id||'Uncategorized'),logo:x.stream_icon||'',type}}));
   }
   if(!all.length)throw Error('No streams returned');
   window.addPlaylist('Xtream: '+new URL(base).host,all);
  }catch(e){$('xt-status').textContent='Connection failed: '+e.message+'. Some providers block browser requests (CORS).'}
 };
}
})();
