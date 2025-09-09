document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");

  const colors = ["#ff99cc", "#d63384", "#ff66b2", "#fff6e5"];
  const petals = ["🌸", "💖", "✨", "🌺"];

  // ===== Falling Petals =====
  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.top = "-50px"; // start above viewport
    petal.style.fontSize = 10 + Math.random() * 20 + "px";
    petal.style.color = colors[Math.floor(Math.random() * colors.length)];
    petal.style.animation = `fallPetal ${
      5 + Math.random() * 5
    }s linear forwards`;
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
  }
  setInterval(createPetal, 500);

  // ===== Cursor-Following Petals =====
  document.addEventListener("mousemove", (e) => {
    const trail = document.createElement("div");
    trail.className = "petal";
    trail.textContent = petals[Math.floor(Math.random() * petals.length)];
    trail.style.left = e.pageX + "px";
    trail.style.top = e.pageY + "px";
    trail.style.fontSize = 10 + Math.random() * 15 + "px";
    trail.style.color = colors[Math.floor(Math.random() * colors.length)];
    trail.style.animation = "floatUp 2s linear forwards";
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 2000);
  });

  // ===== No Button Run Away =====
  noBtn.addEventListener("mouseover", () => {
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;
    const maxX = window.innerWidth - btnWidth - 20;
    const maxY = window.innerHeight - btnHeight - 20;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
  });

  // ===== Yes Button Hearts Explosion =====
  yesBtn.addEventListener("click", () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 40; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";

      // Start from center
      heart.style.left = centerX + "px";
      heart.style.top = centerY + "px";
      heart.style.fontSize = 15 + Math.random() * 20 + "px";

      // Random explosion direction
      const angle = Math.random() * 2 * Math.PI;
      const distance = 100 + Math.random() * 150;
      const targetX = centerX + distance * Math.cos(angle);
      const targetY = centerY + distance * Math.sin(angle);

      // Animate using transform
      heart.style.transition = "transform 1s ease-out, opacity 1s ease-out";
      heart.style.position = "fixed";
      heart.style.transform = "translate(0,0)";
      document.body.appendChild(heart);

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        heart.style.transform = `translate(${targetX - centerX}px, ${
          targetY - centerY
        }px)`;
        heart.style.opacity = 0;
      });

      setTimeout(() => heart.remove(), 1200);
    }

    // Update proposal text
    document.querySelector(".proposal-text").textContent =
      "Yay! 💍 You said YES! ❤️ I love you forever!";
  });
});
