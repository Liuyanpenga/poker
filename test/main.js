// 初始化Pixi应用
const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xf0f0f0,
  antialias: true,
});
document.body.appendChild(app.view);

const cardsImg = [
  {
    name: "ahearts",
    src: "images/hearts-A.png",
  },
  {
    name: "spades3",
    cards: "images/spades-3.png",
  },
  {
    name: "clubs5",
    cards: "images/clubs-5.png",
  },
  {
    name: "diamonds2",
    cards: "images/diamonds-2.png",
  },
];

// 加载扑克牌图片资源
const loader = new PIXI.Loader();

for (let i = 1; i < cardsImg.length; i++) {
  console.log(cardsImg[i]);
  PIXI.Loader.shared.add(cardsImg[i].name, cardsImg[i].src);
}

// loader.add("cards", "path/to/your/cards.png"); // 替换为你的扑克牌图片路径
// loader.load(setup);

// 全局变量
let cards = [];
const cardWidth = 19.2;
const cardHeight = 21.8;

// 准备牌堆数据
const players = [
  { name: "Player1", hand: ["H2", "S4", "C6", "D8"] }, // 假设每位玩家手牌
  { name: "Player2", hand: ["H3", "S5", "C7", "D9"] },
  { name: "Player3", hand: ["H4", "S6", "C8", "D10"] },
  { name: "Player4", hand: ["H5", "S7", "C9", "D11"] },
];
const cardTextures = [];
PIXI.Loader.shared.load((loader, resources) => {
    console.log(resources)
  cardsImg.forEach((card) => {
    const name = card.name;
    const texture = resources[name].texture;
    // const sprite = new PIXI.Sprite(texture);

    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 4; j++) {
        const frame = new PIXI.Rectangle(
          i * cardWidth,
          j * cardHeight,
          cardWidth,
          cardHeight
        );
        cardTextures.push(new PIXI.Texture(texture, frame));
      }
    }
  });
  // 设置函数
  // function setup(x, y) {
  // const texture = PIXI.Texture.from(); // 载入牌堆纹理
  // const cardTextures = [];
  // for (let i = 0; i < 13; i++) {
  //   for (let j = 0; j < 4; j++) {
  //     const frame = new PIXI.Rectangle(
  //       i * cardWidth,
  //       j * cardHeight,
  //       cardWidth,
  //       cardHeight
  //     );
  //     cardTextures.push(new PIXI.Texture(texture, frame));
  //   }
  // }
});

// 创建和排列玩家手牌
for (let i = 0; i < players.length; i++) {
  const player = players[i];
  const hand = player.hand;
  const handSprites = [];

  for (let j = 0; j < hand.length; j++) {
    const card = hand[j];
    const cardSprite = new PIXI.Sprite(cardTextures[cardIndex(card)]);
    cardSprite.position.set(getXPosition(i, j), getYPosition(i, j));
    app.stage.addChild(cardSprite);
    handSprites.push(cardSprite);
  }

  cards.push(handSprites);
}

// 模拟玩家出牌
setTimeout(() => {
  const cardToRemove = cards[0][0]; // 例如移除第一个玩家的第一张牌
  animateCardRemoval(cardToRemove);
}, 2000);
// }

// 辅助函数
function cardIndex(card) {
  const suits = ["H", "S", "C", "D"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const suitIndex = suits.indexOf(card[0]);
  const valueIndex = values.indexOf(card.substring(1));
  return suitIndex * 13 + valueIndex;
}

function getXPosition(playerIndex, cardIndex) {
  if (playerIndex === 0 || playerIndex === 2) {
    // 竖向排列
    return playerIndex * (app.renderer.width / 3) + 50;
  } else {
    // 横向排列
    return (
      playerIndex * (app.renderer.width / 3) + cardIndex * (cardWidth + 10) + 50
    );
  }
}

function getYPosition(playerIndex, cardIndex) {
  if (playerIndex === 0) {
    // 竖向排列
    return cardIndex * (cardHeight + 10) + 50;
  } else if (playerIndex === 1) {
    // 横向排列
    return app.renderer.height - cardHeight - 50;
  } else if (playerIndex === 2) {
    // 竖向排列
    return (
      app.renderer.height - cardIndex * (cardHeight + 10) - cardHeight - 50
    );
  } else {
    // 横向排列
    return 50;
  }
}

function animateCardRemoval(cardSprite) {
  // 实现牌被移除的动画效果，这里只是一个简单示例，可以根据实际需求进行修改
  const animation = new TWEEN.Tween(cardSprite.scale)
    .to({ x: 0, y: 0 }, 500)
    .onComplete(() => {
      app.stage.removeChild(cardSprite);
    })
    .start();
}

// PixiJS Ticker
app.ticker.add(() => {
  TWEEN.update();
});
