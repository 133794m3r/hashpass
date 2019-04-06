/*
* Awesome Password Generator aka HashPass
* Copyright (c) Macarthur Inbody 2011-2017
* https://github.com/133794m3r/hashpass
* AGPLv3
*/
"use strict"
function permute(arr) {
  var N = arr.length;
  var directions = [
  ];
  var indices = [
  ];
  directions.push(0);
  indices.push(0);
  for (var i = 1; i < N; i += 1) {
    directions.push( - 1);
    indices.push(i);
  }
  function swap(i, j) {
    var tmp = indices[i];
    indices[i] = indices[j];
    indices[j] = tmp;
    tmp = directions[i];
    directions[i] = directions[j];
    directions[j] = tmp;
  }
  function result() {
    var res = [
    ];
    for (var i = 0; i < N; i += 1) {
      res.push(arr[indices[i]]);
    }
    return res;
  }
  var makeresult = typeof arr !== 'string' ? result : function () {
    return result().join('');
  };

    var i,
    max_index,
    move_to;
    for (i = 0; i < N; i += 1) {
      if (directions[i] !== 0) {
        max_index = i;
        break;
      }
    }
    if (max_index === undefined) {
      return undefined;
    }
    for (i = max_index + 1; i < N; i += 1) {
      if (directions[i] !== 0 && indices[i] > indices[max_index]) {
        max_index = i;
      }
    }
    move_to = max_index + directions[max_index];
    swap(max_index, move_to);
    if (move_to === 0 || move_to === N - 1 || indices[move_to + directions[move_to]] > indices[move_to]) {
      directions[move_to] = 0;
    }
    for (i = 0; i < N; i += 1) {
      if (indices[i] > indices[move_to]) {
        if (i < move_to) {
          directions[i] = 1;
        } else {
          directions[i] = - 1;
        }
      }
    }
    return make_result();

}

function select_by_id(element_id){
var element=document.getElementById(element_id);
return element;
}
