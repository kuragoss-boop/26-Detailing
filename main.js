
document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const menuBtn=document.querySelector(".menu-toggle");
  const nav=document.querySelector(".nav-links");
  const topBtn=document.querySelector(".scroll-top");

  const onScroll=()=>{
    header?.classList.toggle("scrolled",window.scrollY>30);
    topBtn?.classList.toggle("show",window.scrollY>500);
  };
  onScroll();window.addEventListener("scroll",onScroll,{passive:true});

  menuBtn?.addEventListener("click",()=>{
    const open=nav.classList.toggle("open");
    document.body.classList.toggle("menu-open",open);
    menuBtn.setAttribute("aria-expanded",String(open));
    menuBtn.textContent=open?"✕":"☰";
  });
  nav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
    nav.classList.remove("open");document.body.classList.remove("menu-open");
    menuBtn?.setAttribute("aria-expanded","false");if(menuBtn)menuBtn.textContent="☰";
  }));
  topBtn?.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}})
  },{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  document.querySelectorAll(".ba-slider").forEach(slider=>{
    const range=slider.querySelector(".ba-range");
    const update=()=>slider.style.setProperty("--pos",range.value+"%");
    range.addEventListener("input",update);update();
  });

  const lightbox=document.querySelector(".lightbox");
  const lightboxImg=lightbox?.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach(btn=>{
    btn.addEventListener("click",()=>{
      lightboxImg.src=btn.dataset.lightbox;
      lightboxImg.alt=btn.querySelector("img")?.alt||"Galeriebild";
      lightbox.classList.add("open");
    });
  });
  lightbox?.addEventListener("click",e=>{if(e.target===lightbox||e.target.matches("button"))lightbox.classList.remove("open")});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")lightbox?.classList.remove("open")});

  const cookie=document.querySelector(".cookie");
  if(cookie && !localStorage.getItem("cookieChoice")) cookie.classList.add("show");
  document.querySelectorAll("[data-cookie]").forEach(btn=>btn.addEventListener("click",()=>{
    localStorage.setItem("cookieChoice",btn.dataset.cookie);cookie?.classList.remove("show");
  }));

  document.querySelectorAll("[data-count]").forEach(el=>{
    const target=Number(el.dataset.count||0);let current=0;
    const step=Math.max(1,Math.ceil(target/50));
    const timer=setInterval(()=>{current=Math.min(target,current+step);el.textContent=current+"+";if(current>=target)clearInterval(timer)},30);
  });
});
