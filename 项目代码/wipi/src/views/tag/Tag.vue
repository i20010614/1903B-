<template>
  <div class="tag">
    <div class="tagdetailone">
      <div class="recommend">
        <h2>文章标签</h2>
      </div>
      <ul>
        <li v-for="(item, index) in tagList" :key="index" @click="tagclick(item.id,item.value)" :class="ind===item.id?'active':''">
          <a> {{ item.value }} [{{ item.articleCount }}] </a>
        </li>
      </ul>
    </div>
    <div class="tagdetailtwo"><span>暂无数据</span></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import "./tag.css"
export default {
    data() {
        return {
            ind:this.$route.params.id,
        }
    },
  computed: {
    ...mapState({
      tagList: (state) => state.tag.tagList,
    }),
  },
  methods: {
    ...mapActions({
      getTagList: "tag/getTagList",
    }),
    tagclick(id,value){
      this.$router.push(`/tag/${value}`)
        this.ind = id;
    }
  },
  created() {
    this.getTagList();
  },
};
</script>

<style scoped>

</style>
