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
    color: String,
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

      for(let [xi, yi] of props.block.shape){
        switch(props.block.rotation){
          case 0: break;
          case 1: [xi, yi] = [yi, boardSize - xi - 1]; break;
          case 2: [xi, yi] = [boardSize - xi - 1, boardSize - yi - 1]; break;
          case 3: [xi, yi] = [boardSize - yi - 1, xi]; break;
        }
        if(props.block.flipped)
          xi = boardSize - xi - 1;
        if(xi < 0 || boardSize <= xi || yi < 0 || boardSize <= yi)
          continue;
        board[xi + yi * boardSize] = Occupied;
      }
    }

    function cellStyle(v, i) {
      return `position: absolute; left: ${
          i % boardSize * 6}px; top: ${Math.floor(i / boardSize) * 6}px; background-color:${
          v === 1 ? props.color : v === 2 ? "#7f7fff" : "white"}`;
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
.outerFramePreview {
  position: relative;
  display: inline-block;
  right: 0px;
  width: 30px;
  height: 30px;
  border: solid 1px red;
  padding: 1px;
  margin: 2px;
  background-color: white;
}
.selected {
  border: solid 2px blue;
}
.cell {
  border: solid 1px #7f7f7f;
  width: 6px;
  height: 6px;
}
</style>
