// variables
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const game = $(".gameAria");
const scoreBoard = $(".score");
let score = 0;
let alive = true;
const gameMsg = $(".gameMsg");
const player = $(".player");
let speed = 3000;
let inter1, inter2, inter3, eventFly,inter4;
// eventListeners
game.addEventListener(
  "click",
  (e) => {
    gameMsg.classList.add("d-none");
    inter1 = setInterval(() => {
      fall();
    }, 100);
    inter2 = setInterval(() => {
      goForward();
    }, 100);
    inter3 = setInterval(() => {
      addPipe();
    }, speed);
    inter4 = setInterval(() => {
      if (speed > 1900) {
        speed = speed - 200;
      }
      clearInterval(inter3);
      inter3 = setInterval(() => {
        addPipe();
      }, speed);
    }, 10000);
    eventFly = (e) => {
      clearInterval(inter1);
      fly();
      inter1 = setInterval(() => {
        fall();
      }, 100);
    };
    game.addEventListener("click", eventFly);
  },
  { once: true }
);

// functions
function fall() {
  player.style.top =
    parseFloat(getComputedStyle(player).top.replace("px", "")) + 20 + "px";
  if (player.offsetTop > window.innerHeight - 80) {
    clearInterval(inter1);
    clearInterval(inter2);
    clearInterval(inter3);
    clearInterval(inter4);
    clearInterval(check);

    game.removeEventListener("click", eventFly);
    gameMsg.classList.remove("d-none");
    gameMsg.textContent = "Tap to replay";
    game.addEventListener(
      "click",
      () => {
        location.reload();
      },
      { once: true }
    );
  }
}

function fly() {
  player.style.top =
    parseFloat(getComputedStyle(player).top.replace("px", "")) - 200 + "px";
}
let check = setInterval(() => {
  const tp = $$(".topPipe");
  tp.forEach((i) => {
    if (
      player.offsetTop <
        parseFloat(getComputedStyle(i).height.replace("px", "")) &&
      i.offsetLeft < player.offsetLeft +( window.innerWidth * .065)
    ) {
      clearInterval(inter1);
      clearInterval(inter2);
      clearInterval(inter3);
    clearInterval(inter4);
      clearInterval(check);
      game.removeEventListener("click", eventFly);
      gameMsg.classList.remove("d-none");
      gameMsg.textContent = "Tap to replay";
      game.addEventListener(
        "click",
        () => {
          location.reload();
        },
        { once: true }
      );
    } else if (i.offsetLeft < player.offsetLeft) {
      i.remove();
      scoreBoard.textContent = ++score;
    }
  });
  const bp = $$(".bottomPipe");
  bp.forEach((i) => {
    if (
      window.innerHeight - player.offsetTop -40 <
        parseFloat(getComputedStyle(i).height.replace("px", "")) &&
      i.offsetLeft < player.offsetLeft +( window.innerWidth * .065)
    ) {
      clearInterval(inter1);
      clearInterval(inter2);
      clearInterval(inter3);
      clearInterval(inter4)
      clearInterval(check);
      game.removeEventListener("click", eventFly);
      gameMsg.classList.remove("d-none");
      gameMsg.textContent = "Tap to replay";
      game.addEventListener(
        "click",
        () => {
          location.reload();
        },
        { once: true }
      );
    } else if (i.offsetLeft < player.offsetLeft) {
      i.remove();
    }
  });
}, 10);
function goForward() {
  const tp = $$(".topPipe");
  tp.forEach((i) => {
    i.style.right =
      parseFloat(getComputedStyle(i).right.replace("px", "")) + 20 + "px";
  });

  const bp = $$(".bottomPipe");
  bp.forEach((i) => {
    i.style.right =
      parseFloat(getComputedStyle(i).right.replace("px", "")) + 20 + "px";
  });
}

function addPipe() {
  x = Math.random() * 60;
  const tp = document.createElement("div");
  tp.classList = "topPipe";
  tp.style.height = `${x}%`;
  const bp = document.createElement("div");
  bp.style.height = 100 - x - 35 + "%";
  bp.classList = "bottomPipe";
  game.appendChild(tp);
  game.appendChild(bp);
}
