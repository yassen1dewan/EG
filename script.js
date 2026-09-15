const grid=document.getElementById('dynastyGrid'), search=document.getElementById('search');
function render(q=''){grid.innerHTML=''; const s=q.trim().toLowerCase(); dynasties.filter(d=>(d.name+' '+d.kings+' '+d.n).toLowerCase().includes(s)).forEach(d=>{
 const el=document.createElement('article'); el.className='dyn'; el.innerHTML=`<div class="num">الأسرة ${d.n}</div><h3>${d.name}</h3><p>${d.dates}</p><p>${d.kings.slice(0,85)}${d.kings.length>85?'…':''}</p>`; el.onclick=()=>openDyn(d); grid.appendChild(el);
});}
function openDyn(d){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="modal-box"><div class="close">×</div><div class="num">الأسرة ${d.n}</div><h2>${d.name}</h2><p><b>التأريخ:</b> ${d.dates}</p><h3>أبرز الحكام</h3><div class="kings">${d.kings.split('،').map(x=>`<span class="tag">${x}</span>`).join('')}</div><p style="margin-top:22px;color:#776957;font-size:12px">ملاحظة: التواريخ والقوائم المختصرة تختلف أحيانًا بين المصادر، خصوصًا في الفترات الانتقالية.</p></div>`;document.body.appendChild(m);m.onclick=e=>{if(e.target===m||e.target.className==='close')m.remove()}}
search.oninput=e=>render(e.target.value);document.getElementById('all').onclick=()=>{search.value='';render()};render();

document.querySelectorAll('.artifact-card .photo-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('.artifact-card');
    const img=card.querySelector('img');
    document.getElementById('modalImage').src=img.src;
    document.getElementById('modalImage').alt=img.alt;
    document.getElementById('modalTitle').textContent=card.dataset.title;
    document.getElementById('modalDynasty').textContent=card.dataset.dynasty;
    document.getElementById('modalMuseum').textContent='المتحف / الموقع: '+card.dataset.museum;
    document.getElementById('modalDesc').textContent=card.dataset.desc;
    const mat=document.getElementById('modalMaterial'); if(mat) mat.textContent='الخامة: '+(card.dataset.material||'غير محددة');
    const modal=document.getElementById('imageModal');
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  });
});
function closeImageModal(){
 const modal=document.getElementById('imageModal');
 modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
 document.getElementById('modalImage').src='';
}
document.querySelector('.image-modal-close')?.addEventListener('click',closeImageModal);
document.querySelector('.image-modal-backdrop')?.addEventListener('click',closeImageModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeImageModal()});

document.querySelectorAll('.premium-card .premium-photo').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const card=btn.closest('.premium-card'), img=card.querySelector('img');
    const modal=document.getElementById('imageModal');
    if(!modal) return;
    document.getElementById('modalImage').src=img.src;
    document.getElementById('modalImage').alt=img.alt;
    document.getElementById('modalTitle').textContent=card.dataset.title;
    document.getElementById('modalDynasty').textContent=card.dataset.dynasty;
    document.getElementById('modalMuseum').textContent='المتحف / الموقع: '+card.dataset.museum+' — '+card.dataset.date;
    document.getElementById('modalDesc').textContent=card.dataset.desc;
    const mat=document.getElementById('modalMaterial'); if(mat) mat.textContent='الخامة: '+(card.dataset.material||'غير محددة');
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  });
});
