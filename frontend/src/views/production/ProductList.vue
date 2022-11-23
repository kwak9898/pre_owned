<template>
  <main class="mt-5">
    <div class="container">
      <div v-if="itemList == 0" class="row">
        <h5 class="m-4">등록된 상품이 없습니다.</h5>
      </div>
      <div v-else class="row">
        <div
            class="col-xl-3 col-lg-4 col-md-6"
            :key="i"
            v-for="(item, i) in itemList"
        >
          <div class="card text-start" style="width: 18rem; border: 0px">
<!--            <a @click="goToDetail(item.id)" style="cursor: pointer"-->
<!--            ><img-->
<!--                :src="`/download/${item.id}/${item.path}`"-->
<!--                class="card-img-top"-->
<!--                alt="..."-->
<!--            /></a>-->
            <div class="card-body">
              <h5 class="card-title">{{ item.item_Name }}</h5>
              <p class="card-text">
                {{ item.item_price }}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      itemList: [],
      item_Name: '',
      item_price: '',
      pageNumber: 1
      }
    },
    // created() {
    // //   this.getProductList(); // created 단계에서 getProductList를 실행시켜 data 미리 호출
    // },
    created() {
    this.getList();
    },
  methods: {
    async getCurrencyFormat(value) {
      return this.$currencyFormat(value)
    },

    async getList() {
      this.itemList = await this.$api('/items?page=', "GET", {})
          .then((res) => {
            console.log("DATA : ", res.data)
          })
          .catch((error) => {
            if (error.message.indexOf('Network Error') > -1) {
              alert('네트워크가 원활하지 않습니다.\n잠시후 다시 시도해 주세요.');
            }
            console.log("왜~ : ", error)
          });
      },
    goToDetail(product_id) {
      // 제품 이미지 클릭시 product_id를 받아 제품 상세페이지로 router되도록 설정
      this.$router.push({ path: "/detail", query: { product_id: product_id } }); // path중 /detail이 들어가면 product_id를 파라미터로 받아 라우터 시킴
      },
    },
  }
</script>
