<template>
  <div class="about">
    <AccountList/>
  </div>
</template>
<script>
import AccountList from "@/components/AccountList.vue"
export default {
  data(){
    return {
      components:{
        AccountList
      }
    }
  }
}
</script>
