<template>
  <div class="board-list">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" v-on:click="fnWrite">등록</button>
    </div>
    <table class="w3-table-all">
      <thead>
      <tr>
        <th>No.</th>
        <th>title</th>
        <th>name</th>
        <th>price</th>
        <th>content</th>
        <th>area</th>
        <th>type</th>
        <th>created</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, i) in list" :key="i">
        <td>{{ item.itemId }}</td>
        <td><a v-on:click="fnView(`${item.itemId}`)">{{item.title}}</a> </td>
        <td>{{item.itemName}}</td>
        <td>{{ item.item }}</td>
        <td>{{ item.itemPrice }}</td>
        <td>{{item.itemContent}}</td>
        <td>{{ item.area }}</td>
        <td>{{ item.type }}</td>
      </tr>
      </tbody>
    </table>
<!--    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0">-->
<!--      <span class="pg">-->
<!--      <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-bar-item w3-border">&lt;&lt;</a>-->
<!--      <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"-->
<!--         class="prev w3-button w3-bar-item w3-border">&lt;</a>-->
<!--      <template v-for=" (n,index) in pagination()">-->
<!--          <template v-if="paging.page===n">-->
<!--              <strong class="w3-button w3-bar-item w3-border w3-green" :key="index">{{ n }}</strong>-->
<!--          </template>-->
<!--          <template v-else>-->
<!--              <a class="w3-button w3-bar-item w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>-->
<!--          </template>-->
<!--      </template>-->
<!--      <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"-->
<!--         @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-bar-item w3-border">&gt;</a>-->
<!--      <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-bar-item w3-border">&gt;&gt;</a>-->
<!--      </span>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      requestBody: {},
      list: [],
      no: '',
      pageNum: 1,
    }
  },
  mounted() {
    this.fnGetList()
  },
  methods: {
    fnGetList(pageNum) {
      this.requestBody = { // 데이터 전송
        keyword: this.keyword,
        page: this.page,
        size: this.size
      }

      this.$axios
          .get(this.$serverUrl + "/items?limit=", + pageNum)
          .then((res) => {
            const a = this.list = res.data
            console.log("ㅁ : ", a)
          })
          .catch((err) => {
            console.log("error: ", err)
            if (err.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시 후 다시 시도해주세요.')
            }
      })
    }
  }
}
</script>
