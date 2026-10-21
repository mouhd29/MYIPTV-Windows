(() => {
const translations = {
'Welcome to MY IPTV':'مرحباً بك في MY IPTV',
'Your entertainment, your playlist.':'ترفيهك، قائمتك الخاصة.',
'Home':'الرئيسية','Live TV':'البث المباشر','Movies':'الأفلام','Series':'المسلسلات','Favorites':'المفضلة',
'Playlists':'قوائم التشغيل','Settings':'الإعدادات','My Favorites':'مفضلتي','Manage Playlists':'إدارة قوائم التشغيل',
'Your channels':'قنواتك','Getting started':'ابدأ الآن','Browse Live TV':'تصفح البث المباشر',
'Add Playlist':'إضافة قائمة تشغيل','Add your playlist':'أضف قائمة التشغيل','Playlist name':'اسم القائمة',
'Playlist URL (M3U)':'رابط قائمة التشغيل (M3U)','Import URL':'استيراد الرابط','Import local M3U file':'استيراد ملف M3U',
'Saved playlists':'قوائم التشغيل المحفوظة','Open':'فتح','Delete':'حذف','Play':'تشغيل',
'Clear favorites':'مسح المفضلة','No playlist added yet.':'لم تتم إضافة قائمة تشغيل بعد.',
'No items here yet. Add a playlist or try another category.':'لا توجد عناصر هنا. أضف قائمة أو اختر تصنيفاً آخر.',
'All':'الكل','Close':'إغلاق','Playing':'جارٍ التشغيل','Search channels and titles…':'ابحث عن القنوات والعناوين…',
'My Playlist':'قائمتي','MY IPTV for Windows 11':'MY IPTV لنظام ويندوز 11',
'Your entertainment, your playlist':'ترفيهك، قائمتك الخاصة',
'Experience your playlists on Windows 11 with an elegant TV-inspired interface. Browse live channels, find favorites, and play supported streams.':'استمتع بقوائم التشغيل على ويندوز 11 بواجهة أنيقة. تصفح القنوات والمفضلة وشغّل البث المدعوم.',
'Paste an M3U playlist URL or import an M3U file. No streams or subscriptions are provided by MY IPTV.':'أدخل رابط قائمة M3U أو استورد ملفاً. التطبيق لا يوفر قنوات أو اشتراكات.',
'Player-only application. Bring your own legally authorized M3U playlists. No IPTV service, content, or subscription is included.':'هذا التطبيق مشغّل فقط. استخدم قوائم M3U المصرّح لك بها قانونياً. لا يتضمن خدمة أو محتوى أو اشتراكاً.',
'If playback fails, the stream may need unsupported codecs, authentication, or custom headers.':'إذا فشل التشغيل، فقد يحتاج البث إلى ترميزات أو مصادقة أو ترويسات غير مدعومة.'
};
const reverse=Object.fromEntries(Object.entries(translations).map(([a,b])=>[b,a]));
let lang=localStorage.getItem('myiptv_language')==='ar'?'ar':'en';
const button=document.createElement('button');button.className='nav';button.id='language-toggle';button.style.cssText='border:1px solid #44366b;margin-top:10px;cursor:pointer';
document.querySelector('.side').insertBefore(button,document.querySelector('.foot'));
let translating=false;
function localize(){
if(translating)return;translating=true;
button.textContent=lang==='ar'?'🌐 English':'🌐 العربية';
document.documentElement.lang=lang;
document.querySelector('.main').dir=lang==='ar'?'rtl':'ltr';
const root=document.querySelector('.app');
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
let n;while((n=walker.nextNode())){
 if(n.parentElement?.closest('#language-toggle,.tile .name,.tile .cat,.thumb,.brand'))continue;
 const raw=n.nodeValue, trimmed=raw.trim();
 const dict=lang==='ar'?translations:reverse;
 if(dict[trimmed])n.nodeValue=raw.replace(trimmed,dict[trimmed]);
}
document.querySelectorAll('input[placeholder]').forEach(i=>{
let value=i.getAttribute('placeholder'),dict=lang==='ar'?translations:reverse;
if(dict[value])i.setAttribute('placeholder',dict[value]);
});
translating=false;
}
button.addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';localStorage.setItem('myiptv_language',lang);localize()});
new MutationObserver(()=>localize()).observe(document.querySelector('.app'),{childList:true,subtree:true});
localize();
})();
