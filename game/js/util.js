const { Assets, Sprite } = PIXI
const sortSuit = (flag, arr) => {
    // 定义一个排序顺序的映射  
    let orderMap;
    if (flag == 'player1' || flag == 'player2') {
        orderMap = {
            '红桃': 1,
            '黑桃': 2,
            '梅花': 3,
            '方块': 4
        };
    } else {
        orderMap = {
            '红桃': 4,
            '黑桃': 3,
            '梅花': 2,
            '方块': 1
        };
    }

    // 使用 sort() 排序
    arr.sort((a, b) => {
        const aliasA = a.alias.slice(0, 2)
        const aliasB = b.alias.slice(0, 2)
        // 如果 a 和 b 的 alias 都不在映射中，则保持原位置  
        if (!(aliasA in orderMap) || !(aliasB in orderMap)) {
            return 0;
        }
        // 使用映射中的值进行比较  
        return orderMap[aliasA] - orderMap[aliasB];
    });

}

const createSprite = async (player, currentX, currentY, box, groupedPokers) => {
    let spritePicture

    for (const value in groupedPokers) {
        
        // 渲染每一组卡牌位置
        if (groupedPokers.hasOwnProperty(value)) {

            // 排序(红桃丶黑桃丶梅花丶方块)
            sortSuit(player, groupedPokers[value]);
            
            for (const poker of groupedPokers[value]) {
                const sprite = await Assets.load(poker.alias);
                spritePicture = new Sprite(sprite);
                spritePicture.name = poker.alias
                spritePicture.position.set(currentX, currentY);
                spritePicture.scale.set(0.6, 0.6);

                box.addChild(spritePicture);

                // 更新坐标以准备绘制下一张牌
                if (player === "player1") {
                    currentY += spritePicture.width;
                } else if (player === "player2") {
                    currentX += spritePicture.width;
                } else if (player === "player3") {
                    currentY -= spritePicture.width;
                } else {
                    currentX -= spritePicture.width;
                }
            }
            // 重置坐标以准备绘制下一组牌
            if (player === "player1") {
                currentX += spritePicture.width;
                currentY = 0;
            } else if (player === "player2") {
                currentX = 0;
                currentY += spritePicture.height;
            } else if (player === "player3") {
                currentX += spritePicture.width;
                currentY = 0;
            } else {
                currentX = 0;
                currentY += spritePicture.height;
            }
        }
    }
};


const loadBackground = async (item) => {
    Assets.add({ alias: item.alias, src: item.src });
    const sprite = await Assets.load(item.alias);
    const spriteBack = new Sprite(sprite);
    spriteBack.scale.set(0.6, 0.6);
    return spriteBack;
};


// 注:为使用pixi.js的渲染方式,扑克值的大小反过来使用
const pokers = [
    { alias: "方块2", number: "14", src: "../image/2-diamond.png" },
    { alias: "黑桃2", number: "14", src: "../image/2-spade.png" },
    { alias: "梅花3", number: "13", src: "../image/3-club.png" },
    { alias: "黑桃3", number: "13", src: "../image/3-spade.png" },
    { alias: "梅花5", number: "11", src: "../image/5-club.png" },
    { alias: "梅花A", number: "15", src: "../image/A-club.png" },
    { alias: "方块A", number: "15", src: "../image/A-diamond.png" },
    { alias: "红桃A", number: "15", src: "../image/A-heart.png" },
    { alias: "黑桃A", number: "15", src: "../image/A-spade.png" },
    { alias: "大王", number: "1", src: "../image/red-joker.png" },
    { alias: "大王", number: "1", src: "../image/red-joker.png" },
    { alias: "方块2", number: "14", src: "../image/2-diamond.png" },
    { alias: "黑桃2", number: "14", src: "../image/2-spade.png" },
    { alias: "梅花3", number: "13", src: "../image/3-club.png" },
    { alias: "黑桃3", number: "13", src: "../image/3-spade.png" },
  ];
  


// 备份未封装渲染玩家卡牌
// for (const value in groupedPokers) {
//   // 排序(红桃丶黑桃丶梅花丶方块)
//   sortSuit(true, groupedPokers[value]);

//   // 渲染每一组卡牌位置
//   if (groupedPokers.hasOwnProperty(value)) {
//     for (const poker of groupedPokers[value]) {
//       const sprite = await Assets.load(poker.alias);
//       const spritePicture = new Sprite(sprite);
//       spritePicture.position.set(currentX1, currentY1);
//       spritePicture.scale.set(0.6, 0.6);

//       box1.addChild(spritePicture);

//       // 更新坐标以准备绘制下一张牌
//       currentY1 += 16;
//     }
//     // 重置坐标以准备绘制下一组牌
//     currentX1 += cardWidth;
//     currentY1 = 0;
//   }
// }