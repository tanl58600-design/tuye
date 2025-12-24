const book = document.getElementById('book');
const pages = [];
const sound = document.getElementById("sound");
sound.currentTime = 18;

function createSnowflakes() {
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = '❄';
    snowflake.style.left = Math.random() * 100 + '%';

    snowflake.style.animationDuration = (Math.random() * 8 + 5) + 's';
    snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
    snowflake.style.animationDelay = Math.random() * 10 + 's';
    const wind = Math.random() > 0.5 ? 'left' : 'right';
    snowflake.dataset.wind = wind;

    document.body.appendChild(snowflake);
  }
}
createSnowflakes();


document.addEventListener("click", () => {
  if (sound.paused) {
    sound.play().catch(() => {});
  }
}, { once: true });

const introPage = document.createElement('div');
introPage.className = 'page';
introPage.dataset.originalZ = 100;
introPage.style.zIndex = 100;

introPage.innerHTML = `
  <div class="front">
    <div class="intro-content">
      <h1 style="margin-top: 40px;">Christmas Memory 🎄Card🎄</h1>
      <div style="font-size: 14px;">Merry Christmas!</div>
        <img src="https://i.pinimg.com/originals/bd/2b/bc/bd2bbc0feb4aa80db3ebf6e3db200c8a.gif" class="santa-icon" alt="">
    </div>
  </div>
  <div class="back"></div>
`;

book.appendChild(introPage);
pages.push(introPage);

/* IMAGE PAGES */
const images = [];
for (let i = 1; i <= 10; i++) {
  images.push(`./style/image/Anh (${i}).jpg`);
}

const wishes = [
  "Merry Christmas! Chúc bạn và gia đình một mùa lễ ấm áp, an lành 🎄",
  "Chúc bạn một Giáng Sinh thật vui vẻ và ngập tràn hạnh phúc ❤️",
  "Mong mọi điều tốt lành nhất sẽ đến với bạn trong mùa lễ hội này ☃️",
  "Gửi bạn ngàn điều tốt đẹp ✨",
  "Chúc bạn ăn không lo tăng cân, ngủ không deadline! 🎁",
  "Hy vọng bạn luôn mỉm cười mỗi ngày 💕",
  "Chúc bạn mùa lễ tràn ngập yêu thương",
  "Chúc mọi người một Giáng sinh thật nhiều niềm vui, nhiều tình yêu, nhiều tiền tiêu và ngày càng ít liêu xiêu đi 🎄",
  "Chúc bạn ngày càng học giỏi 🎁",
  "Chúc bạn thành công trên con đường mình chọn ❤️",
];

for (let i = 0; i < images.length; i += 2) {
  const page = document.createElement('div');
  page.className = 'page';
  const z = 99 - i;
  page.dataset.originalZ = z;
  page.style.zIndex = z;

  /* FRONT */
  const front = document.createElement('div');
  front.className = 'front';
  front.innerHTML = `
    <img src="${images[i]}">
    <div class="wish-box">${wishes[i] || ""}</div>
  `;

  /* BACK */
  const back = document.createElement('div');
  back.className = 'back';
  if (images[i + 1]) {
    back.innerHTML = `
      <img src="${images[i + 1]}">
      <div class="wish-box">${wishes[i + 1] || ""}</div>
    `;
  }

  page.appendChild(front);
  page.appendChild(back);
  book.appendChild(page);
  pages.push(page);
}

/* END PAGE */
const endPage = document.createElement('div');
endPage.className = 'page';
endPage.dataset.originalZ = 0;
endPage.style.zIndex = 0;

endPage.innerHTML = `
  <div class="front">
    <div class="end-content">
      <h2>🎄 Merry Christmas 🎄</h2>
      <span id="ending-text"></span>
    </div>
  </div>
  <div class="back" style="background:#fff;"></div>
`;

book.appendChild(endPage);
pages.push(endPage);

/* Typewriter effect */
function typewriterEffect(text, element, speed = 40) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text[i] === '\n' ? '<br>' : text[i];
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

let currentTopZ = 200;
let typed = false;

/* PAGE INTERACTION */
pages.forEach((page) => {
  let startX = 0;

  const front = page.querySelector('.front');
  const back = page.querySelector('.back');

  const flipForward = () => {
    if (!page.classList.contains('flipped')) {
      page.classList.add('flipped');

      if (page === pages[pages.length - 2] && !typed) {
        const endText = document.getElementById('ending-text');
        const content = `Chúc các bạn nữ của chúng mình Giáng sinh này không còn than ế, quà cáp đầy tay, đồ ăn đầy bụng và lúc nào cũng xinh lung linh! ❤️❤️❤️\n\n🎄 Merry Christmas! 🎄`;
        setTimeout(() => typewriterEffect(content, endText), 800);
        typed = true;
      }

      setTimeout(() => {
        page.style.zIndex = 0;
      }, 1000);
    }
  };

  const flipBackward = () => {
    if (page.classList.contains('flipped')) {
      page.classList.remove('flipped');
      currentTopZ++;
      page.style.zIndex = currentTopZ;
    }
  };

  front.addEventListener('click', flipForward);
  back.addEventListener('click', flipBackward);

  page.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  page.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -30) flipForward();
    else if (diff > 30) flipBackward();
  });
});

function checkOrientation() {
  const warn = document.querySelector(".rotate-warning");
  if (window.innerHeight > window.innerWidth) {
    warn.style.display = "flex"; 
  } else {
    warn.style.display = "none";  
  }
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
checkOrientation();

const starField = document.querySelector('.star-field');

for (let i = 0; i < 200; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;

    star.style.left = x + 'vw';
    star.style.top = y + 'vh';
    star.style.animationDelay = delay + 's';
    star.style.animationDuration = duration + 's';

    starField.appendChild(star);
}


