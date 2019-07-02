//封装操作localstorage 本地存储的方法，模块化的文件



//简单理解就是讲localStorage 的基本操作 做了一层封装，外部需要使用localStorage 时比较方便
var storage={
  set(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  },
  get(key){
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key){
    localStorage.removeItem(key);
  }
}

export default storage   //将storage 暴露出去
