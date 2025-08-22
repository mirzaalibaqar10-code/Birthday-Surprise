    // Update recipient name across pages
    const nameInput = document.getElementById('nameInput');
    const nameSpans = () => document.querySelectorAll('.nameSpan');
    nameInput.addEventListener('input', () => {
      nameSpans().forEach(s => s.textContent = nameInput.value || 'Bestie');
    });

    // Gift reveal logic
    const revealBtn = document.getElementById('revealBtn');
    const revealBox = document.getElementById('revealBox');
    revealBtn?.addEventListener('click', () => {
      revealBox.classList.toggle('open');
      revealBox.setAttribute('aria-hidden', !revealBox.classList.contains('open'));
    });

    // Draggable stickers (simple drag-n-drop)
    let dragging = null, offsetX = 0, offsetY = 0;
    const stickies = document.querySelectorAll('.sticker');
    stickies.forEach(el => {
      el.addEventListener('mousedown', e => {
        dragging = el; el.style.cursor='grabbing';
        const r = el.getBoundingClientRect();
        offsetX = e.clientX - r.left; offsetY = e.clientY - r.top;
      });
      el.addEventListener('touchstart', e => {
        dragging = el; const t = e.touches[0];
        const r = el.getBoundingClientRect();
        offsetX = t.clientX - r.left; offsetY = t.clientY - r.top;
      }, {passive:true});
    });
    window.addEventListener('mousemove', e => {
      if(!dragging) return; const p = dragging.parentElement.getBoundingClientRect();
      dragging.style.left = (e.clientX - p.left - offsetX) + 'px';
      dragging.style.top  = (e.clientY - p.top  - offsetY) + 'px';
    });
    window.addEventListener('touchmove', e => {
      if(!dragging) return; const t = e.touches[0]; const p = dragging.parentElement.getBoundingClientRect();
      dragging.style.left = (t.clientX - p.left - offsetX) + 'px';
      dragging.style.top  = (t.clientY - p.top  - offsetY) + 'px';
    }, {passive:true});
    window.addEventListener('mouseup', () => dragging && (dragging.style.cursor='grab', dragging=null));
    window.addEventListener('touchend', () => dragging=null);

    // Reset stickers to original positions
    const resetStickers = document.getElementById('resetStickers');
    const initialPos = new Map();
    document.querySelectorAll('.sticker').forEach(s=>{
      initialPos.set(s, {left:s.style.left, top:s.style.top, right:s.style.right});
    });
    resetStickers?.addEventListener('click', ()=>{
      initialPos.forEach((pos, s)=>{s.style.left = pos.left; s.style.top = pos.top; if(pos.right) s.style.right = pos.right;});
    });

    // Balloons spawner
    const spawnBalloonsBtn = document.getElementById('spawnBalloons');
    function spawnBalloon(){
      const b = document.createElement('div');
      b.className='balloon';
      b.textContent = ['🎈','🎉','💖','⭐','🎊'][Math.floor(Math.random()*5)];
      b.style.left = Math.random()*90 + 5 + 'vw';
      b.style.setProperty('--dur', (8+Math.random()*7)+'s');
      b.style.setProperty('--dx', (Math.random()*120-60)+'px');
      document.body.appendChild(b);
      setTimeout(()=>b.remove(), 16000);
    }
    spawnBalloonsBtn?.addEventListener('click', ()=>{
      for(let i=0;i<15;i++) setTimeout(spawnBalloon, i*150);
    });

    // Confetti (very lightweight emojis)
    const confettiBtn = document.getElementById('confettiBtn');
    confettiBtn?.addEventListener('click', ()=>{
      for(let i=0;i<28;i++) setTimeout(spawnBalloon, i*120);
    });