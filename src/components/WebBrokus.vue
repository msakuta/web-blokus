<template>
  <div>
    <input type="button" @click="resetGame" value="Reset Game">
  </div>
  <div v-for="(player, playerIdx) in players" :key="playerIdx" :class="{playerFrame: true, inactive: playerIdx !== activePlayerIdx}">
    Player {{playerIdx+1}} Pieces:
    <BlockPreview v-for="(block, idx) in player.blockOptions" :key="idx" :block="block"
      :selected="player.selectedBlockOption === idx" :color="player.color"
      @click="previewClicked(player, idx)"/>
  </div>
  <div>
    <input type="button" @click="rotate" value="Rotate">
  </div>
  <div class="hello">
    <div class="outerFrame">
      <div v-for="(v, i) in computedBoard" :key="i">
        <div :class="{cell: true, ...cellClass(v, i)}" :style="cellStyle(v, i)" @click="tryPlace(i)"
          @mouseenter="previewPiece(i)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive, computed } from 'vue';
import BlockPreview from './BlockPreview';
const boardSize = 20;
const shapes = [
  [[0,0]], // Monomino
  [[0,0], [0,1]], // Dominoes
  [[0,0], [1,0]],
  [[0,0], [0,1], [0,2]], // Trominoes
  [[0,0], [0,1], [1,0]],
  [[0,0], [0,1], [1,1]],
  [[0,0], [0,1], [0,2], [0,3]], // Tetrominoes
  [[0,0], [0,1], [0,2], [1,2]],
  [[0,0], [0,1], [0,2], [1,1]],
  [[0,0], [0,1], [1,1], [1,2]],
  [[0,0], [1,0], [1,1], [2,1]],
  [[0,0], [1,0], [0,1], [1,1]],
  [[0,0], [1,0], [2,0], [2,1], [3,0]], // Pentominoes
  [[0,0], [1,0], [2,0], [3,0], [4,0]],
  [[0,0], [1,0], [2,0], [3,0], [1,1]],
  [[0,0], [1,0], [0,1], [1,1], [2,1]],
];

const Empty = 0;
const Occupied0 = 1;
const Occupied3 = 4;
const Candidate = 5;
const Preview = 6;

class Player{
  blocks = [];
  blockOptions = reactive(shapes.map(shape => ({origin: [0, 0], rotation: 0, shape})));
  selectedBlockOption = ref(0);
  constructor(color){
    this.color = color;
  }
}

export default {
  name: 'WebBrokus',
  components: { BlockPreview },

  setup(){
    let board = reactive(new Array(boardSize * boardSize));
    let players = reactive(["#ff7f7f", "#ffff00", "#00ff00", "#7f7fff"].map(color => new Player(color)));
    let activePlayerIdx = ref(0);
    let preview = ref(null);

    // for(let idx = 0; idx < shapes.length; idx++){
    //   const shape = shapes[idx];
    //   const xi = (idx * 5) % boardSize;
    //   const yi = Math.floor((idx * 5) / boardSize) * 5;
    //   blocks.push({
    //     origin: [xi, yi],
    //     shape: shift(shape, [xi, yi])
    //   });
    // }

    function resetGame() {
      for(let player of players){
        player.blocks.length = 0;
        player.blockOptions.length = 0;
        shapes.forEach(shape => player.blockOptions.push({origin: [0, 0], rotation: 0, shape}));
        player.selectedBlockOption = 0;
      }
      updateBoard();
    }

    function updateBoard() {
      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          board[x + y * boardSize] = Empty;
        }
      }

      players.forEach((player, playerIdx) => {
        for(let block of player.blocks){
          for(let [xi, yi] of block.shape){
            [xi, yi] = shiftCell(rotateCell([xi, yi], block.rotation), block.origin);
            if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
              continue;
            board[xi + yi * boardSize] = Occupied0 + playerIdx;
          }
        }
        for(let y = 0; y < boardSize; y++){
          for(let x = 0; x < boardSize; x++){
            if(board[x + y * boardSize] === Empty && isPlaceable([x, y]))
              board[x + y * boardSize] = Candidate;
          }
        }
      });
    }

    function rotateCell(cell, rotation) {
      let [xi, yi] = cell;
      switch(rotation){
        case 0: break;
        case 1: [xi, yi] = [yi, -xi]; break;
        case 2: [xi, yi] = [-xi, -yi]; break;
        case 3: [xi, yi] = [-yi, xi]; break;
      }
      return [xi, yi];
    }

    function shiftCell(cell, offset){
      let [xi, yi] = cell;
      xi += offset[0];
      yi += offset[1];
      return [xi, yi];
    }

    let computedBoard = computed(() => {
      let ret = [...board];
      if(preview.value){
        for(const cell of preview.value.shape){
          const pos = shiftCell(rotateCell(cell, preview.value.rotation), preview.value.origin);
          if(ret[pos[0] + pos[1] * boardSize] === Empty)
            ret[pos[0] + pos[1] * boardSize] = Preview;
        }
      }
      return ret;
    });

    // function rotateBlock(block, center=[0,0]){
    //   return block.map(cell => [cell[1] + center[0], -cell[0] + center[1]]);
    // }

    function rotate(){
      const player = players[activePlayerIdx.value];
      if(0 <= player.selectedBlockOption){
        player.blockOptions[player.selectedBlockOption].rotation = (player.blockOptions[player.selectedBlockOption].rotation + 1) % 4;
        if(preview.value)
          preview.value.rotation = player.blockOptions[player.selectedBlockOption].rotation;
      }
      // rotateBlock(blockOptions[player.selectedBlockOption].shape, [2,2]);
    }

    // function shift(block, offset){
    //   return block.map(cell => [cell[0] + offset[0], cell[1] + offset[1]]);
    // }

    function isPlaceable(pos){
      const allow = [1, 0, 1,
        0, 0, 0,
        1, 0, 1];
      const deny = [0, 1, 0,
        1, 1, 1,
        0, 1, 0];
      let allowed = 0;
      if(activePlayerIdx.value === 0 && pos[0] === 0 && pos[1] === 0 ||
         activePlayerIdx.value === 1 && pos[0] === 0 && pos[1] === boardSize - 1 ||
         activePlayerIdx.value === 2 && pos[0] === boardSize - 1 && pos[1] === boardSize - 1 ||
         activePlayerIdx.value === 3 && pos[0] === boardSize - 1 && pos[1] === 0)
      {
        allowed++;
      }

      for(let dy = -1; dy <= 1; dy++){
        const yj = pos[1] + dy;
        if(yj < 0 || boardSize <= yj)
          continue;
        for(let dx = -1; dx <= 1; dx++){
          const xj = pos[0] + dx;
          if(xj < 0 || boardSize <= xj)
            continue;
          const cell = board[xj + yj * boardSize];
          if(Occupied0 <= cell && cell <= Occupied3){
            if(deny[dx + 1 + (dy + 1) * 3] && cell - Occupied0 === activePlayerIdx.value)
              return false;
            if(allow[dx + 1 + (dy + 1) * 3] && cell - Occupied0 === activePlayerIdx.value)
              allowed++;
          }
        }
      }
      return !!allowed;
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % 20 * 32}px; top: ${Math.floor(i / 20) * 32}px; background-color:${
          Occupied0 <= v && v <= Occupied3 ? players[v - Occupied0].color :
          v === Candidate ? "#7f7fff" : v === Preview ? "#7fff7f" : "white"}`;
    }

    function cellClass(v) {
      return {ridge: Occupied0 <= v && v <= Occupied3};
    }

    onMounted(() => {
    //   setInterval(() => {
    //     blocks = blocks.map(block => ({
    //       origin: block.origin,
    //       shape: rotate(block.shape, block.origin)
    //     }));
    //     updateBoard();
    //   }, 200);
    })

    function tryPlace(i) {
      const player = players[activePlayerIdx.value];
      if(player.selectedBlockOption < 0){
        console.log("Block is not selected!");
        return false;
      }
      let [x, y] = [i % boardSize, Math.floor(i / boardSize)];

      // Check no block will touch new block
      const neighbors = [[-1,0], [0,-1], [1,0], [0,1]];
      let block = player.blockOptions[player.selectedBlockOption];
      let anyPlaceable = false;
      for(let [xi, yi] of block.shape){
        [xi, yi] = shiftCell(rotateCell([xi, yi], block.rotation), [x, y]);

        // If any of the cell consisting of the block is outside the board, it cannot be placed.
        if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi){
          return false;
        }
        if(isPlaceable([xi, yi]))
          anyPlaceable = true;
        const cell = board[xi + yi * boardSize];
        if(Occupied0 <= cell && cell <= Occupied3){
          console.log(`Cannot place there because it will be colliding to another player's block: ${xi},${yi}`);
          return false;
        }
        for(const neighbor of neighbors){
          const xj = xi + neighbor[0];
          const yj = yi + neighbor[1];
          if(xj < 0 || boardSize <= xj || yj < 0 || boardSize <= yj)
            continue;
          const cell = board[xj + yj * boardSize];
          if(cell - Occupied0 === activePlayerIdx.value){
            console.log(`Cannot place there because it will be touching another block of yourself: ${xi},${yi} and ${xj},${yj}`);
            return false;
          }
        }
      }

      if(!anyPlaceable){
        console.log("Cannot place there because it will not be touching another block with a corner of yours");
        return false;
      }

      player.blocks.push({
        origin: [x, y],
        shape: player.blockOptions[player.selectedBlockOption].shape,
        rotation: player.blockOptions[player.selectedBlockOption].rotation,
      });
      player.blockOptions.splice(player.selectedBlockOption, 1);
      if(player.blockOptions.length <= player.selectedBlockOption)
        player.selectedBlockOption = player.blockOptions.length - 1;
      activePlayerIdx.value = (activePlayerIdx.value + 1) % 4;
      updateBoard();
      return true;
    }

    function previewPiece(i){
      const player = players[activePlayerIdx.value];
      if(player.selectedBlockOption < 0)
        preview.value = null;
      else{
        let [x, y] = [i % boardSize, Math.floor(i / boardSize)];
        preview.value = {origin: [x, y], shape: player.blockOptions[player.selectedBlockOption].shape,
          rotation: player.blockOptions[player.selectedBlockOption].rotation,
        };
      }
    }

    updateBoard();

    return {
      board,
      computedBoard,
      resetGame,
      cellStyle,
      cellClass,
      tryPlace,
      previewClicked: (player, idx) => player.selectedBlockOption = idx,
      players,
      activePlayerIdx,
      activePlayer: computed(() => players[activePlayerIdx.value]),
      rotate,
      previewPiece,
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.outerFrame {
  position: relative;
  left: 320px;
  margin-left: -320px;
  right: 0px;
  width: 640px;
  height: 640px;
  border: solid 1px red;
  background-color: white;
}
.playerFrame {
  border: 1px solid black;
}
.inactive {
  background-color: #afafaf;
}
.cell {
  border: solid 1px black;
  width: 32px;
  height: 32px;
}
.ridge {
  border: ridge 4px;
  border-radius: 4px;
  width: 24px;
  height: 24px;
}
</style>
