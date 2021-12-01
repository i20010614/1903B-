<template>
  <div class="recom">
    <div
      :class="
        this.$router.history.current.name === 'Detail'
          ? 'DetailHtml'
          : 'recommendHtml'
      "
    >
      <p class="pone">{{ $t("message.recom") }}</p>
      <div class="ILwjOWV5UwcJFf9ezqGA0">
        <div
          class="recommendList"
          v-for="item in recommendList"
          :key="item.id"
          @click="godetail(item.id)"
        >
          <div class="header">
            <div class="headerTitle">
              {{ item.title }}
            </div>
            <div class="headerspan">
              <div class="ant-divider ant-divider-vertical"></div>
              <div class="_2Mkgs6voFLMQqzoODDiOee">15天前</div>
            </div>
          </div>
          <div class="main">
            <div class="_3PsE-Wu3HdzQ7gDzVt-Ym2">
              <div class="_1a1sLsWPcIiIOw3Zw2i3it"></div>
              <div class="KKzJyhKAimSvVUzx_qeZY">
                <span>
                  <span class="anticon anticon-heart"
                    ><i class="el-icon-star-off"></i
                  ></span>
                  <span class="_1lythm_jbjMURtN-zieAom">{{ item.likes }}</span>
                </span>
                <span class="ElyAw9QkgByDAuselHsq">·</span>
                <span
                  ><i class="el-icon-view"></i
                  ><span class="_1lythm_jbjMURtN-zieAom">{{
                    item.views
                  }}</span></span
                >
                <span class="ElyAw9QkgByDAuselHsq">·</span>
                <span @click.stop="shareArticle(item)"
                  ><i class="el-icon-share"></i
                  ><span class="_1lythm_jbjMURtN-zieAom">分享</span></span
                >
              </div>
            </div>
            <div class="_1pOcxenLy4i0bdMwF_z7Pp">
              <img :src="item.cover" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import share from "@/components/share/index";
export default {
  name: "Recommend",
  props: {
    recommendList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    shareArticle(item) {
      share(item);
    },
    godetail(id) {
      this.$router.push(`/detail/${id}`);
    },
  },
};
</script>

<style>
.recom{
  background-color: var(--bg-body)
}
</style>
