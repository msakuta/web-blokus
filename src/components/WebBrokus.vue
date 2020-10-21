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
import { ref } from 'vue';
const boardSize = 20;
const shapes = [
  [[0,0]], // Monomino
  [[0,0], [0,1]], // Dominoes
  [[0,0], [1,0]],
  [[0,0], [0,1], [0,2]], // Trominos
  [[0,0], [0,1], [1,0]],
  [[0,0], [0,1], [1,1]],
  [[0,0], [0,1], [0,2], [0,3]], // Tetrominos
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

export default {
  name: 'WebBrokus',

  setup(){
    let board = ref(new Array(boardSize * boardSize));

    for(let y = 0; y < boardSize; y++){
      for(let x = 0; x < boardSize; x++){
        board.value[x + y * boardSize] = 0;
        for(let idx = 0; idx < shapes.length; idx++){
          const shape = shapes[idx];
          for(let scell of shape){
            const xi = (idx * 5) % boardSize;
            const yi = Math.floor((idx * 5) / boardSize) * 5;
            if(boardSize <= scell[0] + xi)
              continue;
            board.value[scell[0] + xi + (scell[1] + yi) * boardSize] = 1;
          }
        }
      }
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % 20 * 32}px; top: ${Math.floor(i / 20) * 32}px; background-color:${
          v ? "#ff7f7f" : "white"}`;
    }

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
