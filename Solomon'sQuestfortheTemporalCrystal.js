// Details: https://www.codewars.com/kata/59d7c910f703c460a2000034

function solomonsQuest(ar){
  let currentDilation = 0;
  let position = [0, 0];
  ar.forEach(([ dilation, direction, distance ]) =>{
    currentDilation += dilation;
   const realDistance = distance * (2**currentDilation);
    switch(direction){
        case 0:
        position[1] += realDistance;
        break
        case 2:
        position[1] -= realDistance;
        break
        case 1:
        position[0] += realDistance;
        break
        case 3:
        position[0] -= realDistance;
        break
    }
  })
  return position;
}
