let side = document.getElementById('side');
let ulEle = document.getElementById('ul');
let btn = document.getElementById('btn');

let lilist = ulEle.children;

let btnImage = btn.children[0];

//需要用户进行手动点击,怎么解决呢

lilist[0].onclick = itemClick(lilist[0])

if (document.createEvent) {
  const event = document.createEvent('MouseEvents');
  event.initEvent('click', true, false);
  lilist[0].dispatchEvent(event);
} else if (document.createEventObject) {
  //兼容IE
  lilist[0].fireEvent('onclick');
}


//左上角的按钮切换
btn.onclick = function(){
  if(btnImage.src.indexOf('close') != -1){
    btnImage.src = './image/listIcon.png';
    side.style.width = 80 + 'px';
    for (let i = 0; i < lilist.length; i++) {
      const element = lilist[i];
      element.lastElementChild.style.display = 'none';
      if(element.className){
        element.style.left  = 30 + 'px';
      }else{
        element.style.left  = 0 + 'px';
      }
    }
  }else{
    btnImage.src = './image/close.png';
    side.style.width = 200 + 'px';
    for (let i = 0; i < lilist.length; i++) {
      const element = lilist[i];
      element.lastElementChild.style.display = 'block'
      if(element.className){
        element.style.left  = 10 + 'px';
      }else{
        element.style.left  = 0 + 'px';
      }
    }
  }
}

//li元素的点击事件
for (let i = 0; i < lilist.length; i++) {
  let element = lilist[i];
  element.onclick  = itemClick(element);
}

function itemClick(element){
  return function(){
    let attr = element.getAttribute('itemClick')
    for (let j = 0; j < lilist.length; j++) {
      let ele = lilist[j];
      let resetAttr = ele.getAttribute('itemClick')
      if(ele == this){
        element.className  = attr;
        element.children[0].children[0].src = `./image/${attr}_w.png`;
        //判断是不是打开的
        if(btnImage.src.indexOf('close') != -1){
          ele.style.left  = 10 + 'px';
        }else{
          ele.style.left  = 30 + 'px';
        }
      }else{
        ele.className  = '';
        ele.children[0].children[0].src = `./image/${resetAttr}_b.png`
        ele.style.left  = 0 + 'px';
      }
    }
  }
}

