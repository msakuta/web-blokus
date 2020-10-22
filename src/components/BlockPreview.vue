<template>
  <div :class="{outerFramePreview: true, selected}" @click="$emit('click')">
    <div v-for="(v, i) in board" :key="i"
      class="cell" :style="cellStyle(v, i)">
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect } from 'vue';
const boardSize = 5;

const Empty = 0;
const Occupied = 1;
// const Candidate = 2;

export default {
  name: 'BlockPreview',
  props: {
    block: Object,
    selected: Boolean,
  },

  setup(props){
    let board = reactive(new Array(boardSize * boardSize));

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

      for(const [xi, yi] of props.block.shape){
          if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
          continue;
          board[xi + yi * boardSize] = Occupied;
      }
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % boardSize * 8}px; top: ${Math.floor(i / boardSize) * 8}px; background-color:${
          v === 1 ? "#ff7f7f" : v === 2 ? "#7f7fff" : "white"}`;
    }

    watchEffect(updateBoard);

    return {
      board,
      cellStyle,
      // onClick: () => this.$emit("click"),
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
.outerFramePreview {
  position: relative;
  display: inline-block;
  right: 0px;
  width: 40px;
  height: 40px;
  border: solid 1px red;
  padding: 1px;
  margin: 4px;
  background-color: white;
}
.selected {
  border: solid 2px blue;
}
.cell {
  border: solid 1px black;
  width: 8px;
  height: 8px;
}
</style>
