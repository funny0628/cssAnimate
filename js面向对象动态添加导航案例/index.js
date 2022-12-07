let that;
class Tab {
  constructor(id){
    //获取元素
    that = this;
    this.main = document.querySelector(id);
    this.ul = this.main.querySelector('ul');
    this.firstnav = this.main.querySelector('#firstnav');
    this.tabscon = this.main.querySelector('#tabscon');
    this.addBtn = this.main.querySelector('.tabadd').children[0]; 
    this.init();
  }
  /**
   * 更新li元素和section元素
   */
  updataNode(){
    this.lis= this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');
    this.liiners = this.main.querySelectorAll('.liiner');
    this.guanbis = this.main.querySelectorAll('.guanbi');
  }
  /**
   * 初始化操作,让相关的额元素绑定事件
   */
  init(){
    this.updataNode();
    this.addBtn.onclick = this.addTab;
    for (let i = 0; i < this.lis.length; i++) {
      const element = this.lis[i];
      element.index = i;
      element.onclick = this.toggleTab;
      this.liiners[i].ondblclick = this.editTab;
      this.sections[i].ondblclick = this.editTab;
      this.guanbis[i].onclick = this.removeTab;
    }

  }
  /**
   * 1.切换功能
   */
  toggleTab(){
    that.clearClass();//清空所有的类名
    //清空所有的类名,再给当前点击的元素添加上相应的类名(当前点击的这个元素添加liactive类,其他的兄弟li测移除lisctive类名)
    this.className = 'liactive';
    that.sections[this.index].className = 'conactive'
  }
  /**
   * 清空所有的类名
   */
  clearClass(){
    for (let i = 0; i < this.lis.length; i++) {
      const element = this.lis[i];
      element.className = ''; 
      this.sections[i].className = '';
    }
  }
  /**
   * 2.添加功能
   */
  addTab(){
    that.clearClass();
    let random = Math.random();
    let li = `<li class="liactive"> <span class="liiner">新选项卡</span>
                <i class="guanbi">X</i></li>`
    that.ul.insertAdjacentHTML('beforeend',li);
    let section = `<section class="conactive">${random}</section>`
    that.tabscon.insertAdjacentHTML('beforeend',section);
    that.init();
    /**
     *添加完元素后判断如果现有的firstnav元素的宽度是超过整个容器的宽度的时候是出现滚动条的
     *那么这个时候就控制滚动条出现在最靠右边的位置
     *这里需要注意,只有在回出现滚动条的元素overflow属性设置为auto的时候scrollLeft才会生效
     * */  
    that.firstnav.scrollLeft = 9999;
  }
  /**
   * 3.删除功能
   */
  removeTab(e){
    e.stopPropagation();
    if(Array.from(that.lis).length <= 1){
      return alert('最后一个元素不可以再删除了')
    };
    let index = this.parentNode.index;
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    index > 1 && index --;
    if(this.parentNode.className){
      that.lis[index].click();
    }
  }
  /**
   * 4.修改功能
   */
  editTab(){
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = `<input maxlength="6" type="text" value="${this.innerText}">`
    let input = this.children[0];
    input.select();
    let _that = this;
    input.onblur = function(){
      _that.innerHTML = `${input.value}`
    }
    input.onkeyup = function(e){
      if(e.code == 'Enter'){
        this.blur();
      }
    }
  }
}
new Tab('#tab')
