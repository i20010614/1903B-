<template>
  <div class="frame">
    <p @click="$emit('setLike')" :class="{like:flag}">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        class="ate"
      >
        <path
          d="M859.8 191.2c-80.8-84.2-212-84.2-292.8 0L512 248.2l-55-57.2c-81-84.2-212-84.2-292.8 0-91 94.6-91 248.2 0 342.8L512 896l347.8-362C950.8 439.4 950.8 285.8 859.8 191.2z"
          fill="currentColor"
        ></path>
      </svg>
      <span>{{ detailList.likes }}</span>
    </p>
    <p>
      <a href="#pl"><svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        class="ate"
      >
        <path
          d="M988.8 512a348.8 348.8 0 0 1-144.96 278.72v208.32l-187.84-131.52a387.2 387.2 0 0 1-56 4.8A408.64 408.64 0 0 1 384 811.84l-36.8-23.04a493.76 493.76 0 0 0 52.8 3.2 493.44 493.44 0 0 0 51.2-2.88c221.44-23.04 394.24-192 394.24-400a365.12 365.12 0 0 0-4.16-51.84 373.44 373.44 0 0 0-48.96-138.56l18.88 11.2A353.6 353.6 0 0 1 988.8 512z m-198.72-128c0-192-169.6-349.76-378.24-349.76h-24C192 47.04 33.92 198.72 33.92 384a334.08 334.08 0 0 0 118.4 253.12v187.52l86.08-60.48 66.24-46.4a396.16 396.16 0 0 0 107.52 16C620.48 734.08 790.08 576 790.08 384z"
          fill="currentColor"
        ></path>
      </svg></a>
    </p>
    <p @click.stop="shareArticle">
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        class="ate"
      >
        <path
          d="M753.607 584.7c-48.519 0-91.596 23.298-118.66 59.315l-233.123-116.96c3.684-12.936 5.657-26.591 5.657-40.71 0-15.465-2.369-30.374-6.76-44.391l232.241-116.52c26.916 37.549 70.919 62.017 120.644 62.017 81.926 0 148.34-66.412 148.34-148.34 0-81.926-66.413-148.34-148.34-148.34-81.927 0-148.34 66.413-148.34 148.34 0 5.668 0.33 11.258 0.948 16.762l-244.945 122.892c-26.598-25.259-62.553-40.762-102.129-40.762-81.926 0-148.34 66.412-148.34 148.34s66.413 148.34 148.34 148.34c41.018 0 78.144-16.648 104.997-43.555l242.509 121.668c-0.904 6.621-1.382 13.374-1.382 20.242 0 81.927 66.412 148.34 148.34 148.34s148.34-66.413 148.34-148.34c-0.001-81.925-66.409-148.339-148.336-148.339l0 0z"
          fill="currentColor"
        ></path>
      </svg>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import share from "@/components/share/index";

export default {
  props: {
    detailList:{
      type:Object,
    },
    flag:{
      type:Boolean
    }
  },
  computed: {
    ...mapState({
      detailList: (state) => state.detail.detailList,
    }),
  },
  methods: {
    ...mapActions({
      getDetailList: "detail/getDetailList",
    }),
    shareArticle() {
      share(this.detailList);
    },
  },
  created() {
    let id = this.$route.params.id;
    this.getDetailList({ id });
  },
};
</script>

<style>
.frame {
  width: 40px;
  height: 130px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-around;
  position: fixed;
  top: 30vh;
  color: var(--disable-text-color);
}
@media (min-width: 1200px) {
  .frame {margin-left: -50px;}
    
}
@media (min-width: 1041px){
  .frame{
    margin-left: -50px;
  }
}
.frame > p {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--bg-second);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}
.frame p:first-child {
  position: relative;
}
.frame p:first-child span {
  position: absolute;
  top: -10px;
  left: 15px;
  font-size: 12px;
  padding: 0 12px;
  color: #fff;
  background-color: var(--primary-color);
  border-radius: 10px;
}
.like{
  color: red;
}
@media (max-width: 1040px) {
  main{
    position: relative;
  }
  .frame {
    position: fixed;
    z-index: 10;
    top: 100%;
    bottom: 0;
    left: 0;
    padding-right: 0;
    width: 100vw;
    height: 52px;
    background-color: var(--bg-second);
    border-top: 1px solid var(--border-color);
    transform: translate(0);
    transition: all 0.2s;
    display: flex;
    transform: translateY(-100%);
    flex-direction: row;
    align-items: center;
  }
}
</style>
