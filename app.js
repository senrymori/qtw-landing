// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Sticky nav border on scroll
const nav = document.getElementById("nav");
const onScroll = () => {
  if (window.scrollY > 4) nav.classList.add("scrolled"); else nav.classList.remove("scrolled");

  // Parallax (only inside hero stage)
  const phone = document.getElementById("heroPhone");
  if (phone) {
    const rect = phone.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const elements = phone.querySelectorAll("[data-parallax]");
      elements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        el.style.transform = `translateY(${window.scrollY * speed}px) ${el.classList.contains('phone-frame') ? 'rotate(-3deg)' : el.classList.contains('phone-floating') ? 'rotate(4deg)' : el.classList.contains('phone-floating-2') ? 'rotate(-5deg)' : ''}`;
      });
    }
  }
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
