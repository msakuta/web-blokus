<template>
  <div class="hello">
    <div class="outerFrame">
      <div v-for="(v, i) in board" :key="i">
        <div class="cell" :style="cellStyle(v, i)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  onMounted, reactive } from 'vue';
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

  setup(){
    let board = reactive(new Array(boardSize * boardSize));

    let blocks = reactive([]);

    for(let idx = 0; idx < shapes.length; idx++){
      const shape = shapes[idx];
      const xi = (idx * 5) % boardSize;
      const yi = Math.floor((idx * 5) / boardSize) * 5;
      blocks.push({
        origin: [xi, yi],
        shape: shift(shape, [xi, yi])
      });
    }

    function updateBoard() {
      for(let y = 0; y < boardSize; y++){
        for(let x = 0; x < boardSize; x++){
          board[x + y * boardSize] = Empty;
        }
      }

      for(let block of blocks){
        for(const [xi, yi] of block.shape){
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

    function rotate(block, center=[0,0]){
      return block.map(cell => [(cell[1] - center[1]) + center[0], -(cell[0] - center[0]) + center[1]]);
    }

    function shift(block, offset){
      return block.map(cell => [cell[0] + offset[0], cell[1] + offset[1]]);
    }

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
      setInterval(() => {
        blocks = blocks.map(block => ({
          origin: block.origin,
          shape: rotate(block.shape, block.origin)
        }));
        updateBoard();
      }, 200);
    })

    return {
      board,
      cellStyle,
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
