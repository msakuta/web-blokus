<template>
  <div>
    <input type="button" @click="resetGame" value="Reset Game">
  </div>
  <div v-for="(player, playerIdx) in players" :key="playerIdx" :class="{playerFrame: true, inactive: playerIdx !== activePlayerIdx}">
    <span style="display: inline-block">Player {{playerIdx+1}}<br>
      <label><input type="checkbox" v-model="player.auto">Auto</label><br>
      Pieces:
    </span>
    <BlockPreview v-for="(block, idx) in player.blockOptions" :key="idx" :block="block"
      :selected="playerIdx === activePlayerIdx && player.selectedBlockOption === idx"
      :color="player.color"
      @click="previewClicked(player, idx)"/>
  </div>
  <div>
    <img src="../assets/rotateIcon.png" class="buttonIcon" @click="rotate" alt="Rotate" />
    <img src="../assets/flipIcon.png" class="buttonIcon" @click="flip" alt="Flip" />
    <img src="../assets/randomIcon.png" class="buttonIcon" @click="randomTry" alt="Random try" />
    <img src="../assets/passIcon.png" class="buttonIcon" @click="randomTry" alt="Pass" />
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
  [[0,0], [0,1]], // Domino
  [[0,0], [0,1], [0,2]], // Trominoes
  [[0,0], [0,1], [1,0]],
  [[0,0], [0,1], [0,2], [0,3]], // Tetrominoes
  [[0,0], [0,1], [0,2], [1,2]],
  [[0,0], [0,1], [0,2], [1,1]],
  [[0,0], [0,1], [1,1], [1,2]],
  [[0,0], [1,0], [0,1], [1,1]],
  [[0,0], [1,0], [2,0], [2,1], [3,0]], // Pentominoes
  [[0,0], [1,0], [2,0], [3,0], [4,0]], // l
  [[0,0], [1,0], [2,0], [2,1], [2,2]], // L
  [[0,0], [1,0], [2,0], [1,1], [1,2]], // T
  [[0,0], [1,0], [1,1], [1,2], [2,2]], // Z
  [[0,0], [1,0], [1,1], [2,1], [3,1]], // S
  [[0,0], [0,1], [1,0], [1,1], [0,2]], // 6
  [[0,0], [1,0], [1,1], [2,1], [2,2]], // W
  [[0,0], [1,0], [0,1], [0,2], [1,2]], // C
  [[0,0], [1,0], [1,1], [2,1], [1,2]],
  [[0,1], [1,0], [1,1], [1,2], [2,1]], // +
  [[0,0], [1,0], [2,0], [3,0], [1,1]], // 1
];

const Empty = 0;
const Occupied = 4;
const OccupiedMask = 0x3;
const Candidate = 8;
const Preview = 16;

function isOccupied(cell){
  return cell & Occupied;
}

/// Get the id of the player that placed a block to that cell
function getCellOccupiedPlayer(cell){
  if(!isOccupied(cell))
    throw "The cell must be occupied";
  return cell & OccupiedMask;
}

class Block{
  origin = [0, 0];
  rotation = 0;
  flipped = false;
  constructor(shape, origin, rotation, flipped){
    this.shape = shape;
    if(origin) this.origin = origin;
    if(rotation) this.rotation = rotation;
    if(flipped) this.flipped = flipped;
  }
}

class Player{
  blocks = [];
  blockOptions = reactive(shapes.map(shape => new Block(shape)));
  selectedBlockOption = ref(0);
  auto = false;
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
        shapes.forEach(shape => player.blockOptions.push(new Block(shape)));
        player.selectedBlockOption = 0;
      }
      activePlayerIdx.value = 0;
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
            [xi, yi] = shiftCell(flipCell(rotateCell([xi, yi], block.rotation), block.flipped), block.origin);
            if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
              continue;
            board[xi + yi * boardSize] = Occupied | playerIdx;
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

    function flipCell(cell, flipped){
      if(flipped)
        cell = [-cell[0], cell[1]];
      return cell;
    }

    let computedBoard = computed(() => {
      let ret = [...board];
      if(preview.value){
        for(const cell of preview.value.shape){
          const pos = shiftCell(flipCell(rotateCell(cell, preview.value.rotation), preview.value.flipped), preview.value.origin);
          if(!(ret[pos[0] + pos[1] * boardSize] & OccupiedMask))
            ret[pos[0] + pos[1] * boardSize] |= Preview;
        }
      }
      return ret;
    });

    function rotate(){
      const player = players[activePlayerIdx.value];
      if(0 <= player.selectedBlockOption){
        player.blockOptions[player.selectedBlockOption].rotation = (player.blockOptions[player.selectedBlockOption].rotation + 1) % 4;
        if(preview.value)
          preview.value.rotation = player.blockOptions[player.selectedBlockOption].rotation;
      }
    }

    function flip(){
      const player = players[activePlayerIdx.value];
      if(0 <= player.selectedBlockOption){
        player.blockOptions[player.selectedBlockOption].flipped =
          !player.blockOptions[player.selectedBlockOption].flipped;
        if(preview.value)
          preview.value.flipped = player.blockOptions[player.selectedBlockOption].flipped;
      }
    }

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
          if(isOccupied(cell)){
            if(deny[dx + 1 + (dy + 1) * 3] && getCellOccupiedPlayer(cell) === activePlayerIdx.value)
              return false;
            if(allow[dx + 1 + (dy + 1) * 3] && getCellOccupiedPlayer(cell) === activePlayerIdx.value)
              allowed++;
          }
        }
      }
      return !!allowed;
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % 20 * 32}px; top: ${Math.floor(i / 20) * 32}px; background-color:${
          isOccupied(v) ? players[getCellOccupiedPlayer(v)].color :
          `rgb(${!!(v & Preview) ^ !!(v & Candidate) ? 191 : 255}, ${
            v & Candidate ? 191 : 255}, ${
            v & Preview ? 191 : 255})`}`;
    }

    function cellClass(v) {
      return {ridge: isOccupied(v)};
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
      for(let cell of block.shape){
        const [xi, yi] = shiftCell(flipCell(rotateCell(cell, block.rotation), block.flipped), [x, y]);

        // If any of the cell consisting of the block is outside the board, it cannot be placed.
        if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi){
          return false;
        }
        if(isPlaceable([xi, yi]))
          anyPlaceable = true;
        if(isOccupied(board[xi + yi * boardSize])){
          console.log(`Cannot place there because it will be colliding to another player's block: ${xi},${yi}`);
          return false;
        }
        for(const neighbor of neighbors){
          const xj = xi + neighbor[0];
          const yj = yi + neighbor[1];
          if(xj < 0 || boardSize <= xj || yj < 0 || boardSize <= yj)
            continue;
          const cell = board[xj + yj * boardSize];
          if(isOccupied(cell) && getCellOccupiedPlayer(cell) === activePlayerIdx.value){
            console.log(`Cannot place there because it will be touching another block of yourself: ${xi},${yi} and ${xj},${yj}`);
            return false;
          }
        }
      }

      if(!anyPlaceable){
        console.log("Cannot place there because it will not be touching another block with a corner of yours");
        return false;
      }

      player.blocks.push(new Block(
        player.blockOptions[player.selectedBlockOption].shape,
        [x, y],
        player.blockOptions[player.selectedBlockOption].rotation,
        player.blockOptions[player.selectedBlockOption].flipped,
      ));
      player.blockOptions.splice(player.selectedBlockOption, 1);
      if(player.blockOptions.length <= player.selectedBlockOption)
        player.selectedBlockOption = player.blockOptions.length - 1;
      activePlayerIdx.value = (activePlayerIdx.value + 1) % 4;
      updateBoard();
      if(players[activePlayerIdx.value].auto){
        playerDone();
      }
      return true;
    }

    function previewPiece(i){
      const player = players[activePlayerIdx.value];
      if(player.selectedBlockOption < 0)
        preview.value = null;
      else{
        let [x, y] = [i % boardSize, Math.floor(i / boardSize)];
        preview.value = new Block(player.blockOptions[player.selectedBlockOption].shape,
          [x, y],
          player.blockOptions[player.selectedBlockOption].rotation,
          player.blockOptions[player.selectedBlockOption].flipped
        );
      }
    }

    function randomTry(){
      const player = players[activePlayerIdx.value];
      const candidates = board.map((v, i) => [v, i]).filter((item) => item[0] & Candidate);
      if(0 < candidates.length && 0 < player.blockOptions.length){
        for(let tryCount = 0; tryCount < 100; tryCount++){
          const choice = Math.floor(Math.random() * candidates.length);
          const chosenCell = candidates[choice][1];
          const [cx, cy] = [chosenCell % boardSize, Math.floor(chosenCell / boardSize)];
          const pieceChoice = Math.floor(Math.random() * player.blockOptions.length);
          const rotation = Math.floor(Math.random() * 4);
          player.selectedBlockOption = pieceChoice;
          const shape = player.blockOptions[pieceChoice].shape;
          for(let flipped = 0; flipped <= 1; flipped++){
            for(let cellIdx = 0; cellIdx < shape.length; cellIdx++){
              const cellOffset = flipCell(rotateCell(shape[cellIdx], rotation), !!flipped);
              if(tryPlace(cx - cellOffset[0] + (cy - cellOffset[1]) * boardSize))
                return true;
            }
          }
        }
      }
      return false;
    }

    function pass(){
      activePlayerIdx.value = (activePlayerIdx.value + 1) % 4;
      updateBoard();
      playerDone();
    }

    function playerDone(){
      if(players[activePlayerIdx.value].auto){
        (async function(){
          if(!randomTry()){
            pass();
          }
        })();
      }
    }

    updateBoard();

    return {
      board,
      computedBoard,
      rotate,
      flip,
      resetGame,
      randomTry,
      pass,
      cellStyle,
      cellClass,
      tryPlace,
      previewClicked: (player, idx) => player.selectedBlockOption = idx,
      players,
      activePlayerIdx,
      activePlayer: computed(() => players[activePlayerIdx.value]),
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
  position: relative;
  width: 640px;
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
.buttonIcon {
  border: outset 4px;
  border-radius: 4px;
  width: 48px;
  height: 48px;
}
</style>
