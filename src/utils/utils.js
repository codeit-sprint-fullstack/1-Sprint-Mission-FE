export function getPageLength(count){
  var page = count / 10;
  var btnList= [];
  if(!Number.isInteger(page)){
    page = Math.floor(page) + 1;
  }
  
  for(let i = 2; i <= page; i++){
    btnList.push(i);
  }

  return btnList;
} 
