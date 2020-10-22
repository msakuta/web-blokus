<template>
  <div>
    Pieces:
  <BlockPreview v-for="(block, idx) in blockOptions" :key="idx" :block="block"
    :selected="selectedBlockOption === idx" @click="previewClicked(idx)"/>
  <input type="button" @click="rotate" value="Rotate">
  </div>
  <div class="hello">
    <div class="outerFrame">
      <div v-for="(v, i) in board" :key="i">
        <div class="cell" :style="cellStyle(v, i)" @click="tryPlace(i)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
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
const Occupied = 1;
const Candidate = 2;

export default {
  name: 'WebBrokus',
  components: { BlockPreview },

  setup(){
    let board = reactive(new Array(boardSize * boardSize));
    let blockOptions = reactive(shapes.map(shape => ({origin: [0, 0], shape})));
    let selectedBlockOption = ref(0);
    let blocks = reactive([]);

    // for(let idx = 0; idx < shapes.length; idx++){
    //   const shape = shapes[idx];
    //   const xi = (idx * 5) % boardSize;
    //   const yi = Math.floor((idx * 5) / boardSize) * 5;
    //   blocks.push({
    //     origin: [xi, yi],
    //     shape: shift(shape, [xi, yi])
    //   });
    // }

    function updateBoard() {
      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          board[x + y * boardSize] = Empty;
        }
      }

      for(let block of blocks){
        for(let [xi, yi] of block.shape){
          xi += block.origin[0];
          yi += block.origin[1];
          if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
            continue;
          board[xi + yi * boardSize] = Occupied;
        }
      }
      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          if(isPlaceable([x, y]))
            board[x + y * boardSize] = Candidate;
        }
      }
    }

    function rotateBlock(block, center=[0,0]){
      return block.map(cell => [(cell[1] - center[1]) + center[0], -(cell[0] - center[0]) + center[1]]);
    }

    function rotate(){
      blockOptions[selectedBlockOption.value].shape = rotateBlock(blockOptions[selectedBlockOption.value].shape, [2,2]);
      blockOptions[selectedBlockOption.value] = blockOptions[selectedBlockOption.value];
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
      if(pos[0] === 0 || pos[0] === boardSize - 1){
        return pos[1] === 0 || pos[1] === boardSize - 1;
      }
      else if(pos[1] === 0 || pos[1] === boardSize - 1){
        return false;
      }
      let allowed = 0;
      for(let dx = -1; dx <= 1; dx++){
        for(let dy = -1; dy <= 1; dy++){
          if(board[pos[0] + dx + (pos[1] + dy) * boardSize] === Occupied){
            if(deny[dx + 1 + (dy + 1) * 3])
              return false;
            if(allow[dx + 1 + (dy + 1) * 3])
              allowed++;
          }
        }
      }
      return !!allowed;
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % 20 * 32}px; top: ${Math.floor(i / 20) * 32}px; background-color:${
          v === 1 ? "#ff7f7f" : v === 2 ? "#7f7fff" : "white"}`;
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
      let [x, y] = [i % boardSize, Math.floor(i / boardSize)];
      if(!isPlaceable([x, y])){
        console.log("Cannot place there because it will not touching another block with a corner");
        return;
      }

      // Check no block will touch new block
      const neighbors = [[-1,0], [0,-1], [1,0], [0,1]];
      let block = blockOptions[selectedBlockOption.value];
      for(let [xi, yi] of block.shape){
        xi += x;
        yi += y;
        if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
          continue;
        for(const neighbor of neighbors){
          const xj = xi + neighbor[0];
          const yj = yi + neighbor[1];
          if(xj < 0 || boardSize <= xj || yj < 0 || boardSize <= yj)
            continue;
          if(board[xj + yj * boardSize] === Occupied){
            console.log(`Cannot place there because it will be touching another block: ${xi},${yi} and ${xj},${yj}`);
            return;
          }
        }
      }

      blocks.push({
        origin: [x, y],
        shape: blockOptions[selectedBlockOption.value].shape,
      });
      updateBoard();
    }

    updateBoard();

    return {
      board,
      cellStyle,
      tryPlace,
      blocks,
      blockOptions,
      selectedBlockOption,
      previewClicked: idx => selectedBlockOption.value = idx,
      rotate,
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
.cell {
  border: solid 1px black;
  width: 32px;
  height: 32px;
}
</style>
