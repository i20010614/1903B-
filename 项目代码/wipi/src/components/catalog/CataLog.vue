<template>
  <div class="right">
    <div class="catalog">
      <dl>
        <dt><h3>目录</h3></dt>
        <dd>
          <ul>
             <li v-for="(item,index) in li" :key="index" :class="ind==index?'active':''" @click="setInd(index)">
                
                <a :href="title">{{item}}</a>
             </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailList: {
      type: Object,
    },
  },
  data(){
      return {
          li:["待办事宜-todo-列表","高亮一段代码code","绘制表格","嵌入网址"],
          ind: -1,
          title:''
      }
  },
  methods: {
    setInd(index){
        this.ind = index;
        this.title=`#${index+1}-${this.li[index]}`;
    }
  }
};
</script>

<style>
.catalog {
  position: sticky;
  top: 1rem;
  margin-bottom: 1rem;
}
.catalog ul{
    padding-left: 15px;
    margin-left: 15px;
}
.catalog ul li{
    list-style: disc;
}
.catalog ul li.active{
    color: #ff0064;
    background-color: #eee;
}
</style>
