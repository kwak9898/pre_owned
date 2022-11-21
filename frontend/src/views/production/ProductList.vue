<template>
  <diV class="product-list">
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
      <tr v-for="(row, id) in list" :key="id">
        <td>{{ row.id }}</td>
        <td><a v-on:click="fnView(`${row.idx}`)">{{row.title}}</a> </td>
        <td>{{ row.name }}</td>
        <td>{{ row.itemPrice }}</td>
        <td>{{ row.content }}</td>
        <td>{{ row.area }}</td>
        <td>{{ row.type }}</td>
        <td>{{ row.createdAt }}</td>
      </tr>
      </tbody>
    </table>
    <div class="pagination w3-bar w3-padding-16 w3-small" v-if="paging.total_list_cnt > 0">
      <span class="pg">
      <a href="javascript:;" @click="fnPage(1)" class="first w3-button w3-border">&lt;&lt;</a>
      <a href="javascript:;" v-if="paging.start_page > 10" @click="fnPage(`${paging.start_page-1}`)"
         class="prev w3-button w3-border">&lt;</a>
      <template v-for=" (n,index) in paginavigation()">
          <template v-if="paging.page==n">
              <strong class="w3-button w3-border w3-green" :key="index">{{ n }}</strong>
          </template>
          <template v-else>
              <a class="w3-button w3-border" href="javascript:;" @click="fnPage(`${n}`)" :key="index">{{ n }}</a>
          </template>
      </template>
      <a href="javascript:;" v-if="paging.total_page_cnt > paging.end_page"
         @click="fnPage(`${paging.end_page+1}`)" class="next w3-button w3-border">&gt;</a>
      <a href="javascript:;" @click="fnPage(`${paging.total_page_cnt}`)" class="last w3-button w3-border">&gt;&gt;</a>
      </span>
    </div>
  </diV>
</template>

<script>
export default {
  data() {
    return {
      requestBody: {},
      list: {},
      no: '',
      paging: {
        block: 0,
        end_page: 0,
        next_block: 0,
        page: 0,
        page_size: 0,
        prev_block: 0,
        start_index: 0,
        total_block_cnt: 0,
        total_list_cnt: 0,
        total_page_cht: 0,
      },
      page: this.$route.query.page ? this.$route.query.page : 1,
      size: this.$route.query.size ? this.$route.query.size : 10,
      keyword: this.$route.query.keyword,
      paginavigation: function () {
        let pageNumber = [];
        let start_page = this.paging.start_page;
        let end_page = this.paging.end_page;
        for (let i = start_page; i <= end_page; i++) pageNumber.push(i);
        return pageNumber;
      }
    }
  },
  mounted() {
    this.fnGetList();
  },
  methods: {
    fnGetList() {
      this.list = [
        {
          "id": 1,
          "title": "title",
          "name": "name",
          "itemPrice": "item",
          "content": "good",
          "area": "seoul city",
          "type": "pro",
          "createdAt": "2022-11-21",
        },
        {
          "id": 1,
          "title": "title",
          "name": "name",
          "itemPrice": "item",
          "content": "good",
          "area": "seoul city",
          "type": "pro",
          "createdAt": "2022-11-21",
        },
        {
          "id": 1,
          "title": "title",
          "name": "name",
          "itemPrice": "item",
          "content": "good",
          "area": "seoul city",
          "type": "pro",
          "createdAt": "2022-11-21",
        }
      ]
    }
  }
}
</script>
