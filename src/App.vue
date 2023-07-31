<template>
  <div style="height: 600px;">
    <VirtualScrollList :source-data="accountData" :item-height="90" v-slot="slotProps">
      <template v-for="(item, index) in (slotProps.viewList as AccountDataItem[])" :key="item.id">
        <div class="list-itembox" :style="`height: ${slotProps.itemHeight}px`">
          <p class="action"
            :style="{ backgroundColor: index % 2 === 0 ? '#f2ddde' : '#dff1d8', color: index % 2 === 0 ? '#ae8286' : '#8ea189' }">
            <span class="date">
              {{ item.date }}
            </span>
            <button class="delete" @click="deleteItem(item.id)">删除</button>
          </p>
          <div class="info">
            <p class="nanoid">{{ item.id }}</p>
            <p class="detail">{{ item.detail }}</p>
            <p class="state"><span v-if="item.state">支出</span><span v-else>收入</span></p>
            <p class="money">{{ item.money }}元</p>
          </div>
        </div>
      </template>

    </VirtualScrollList>
  </div>
</template>
​
<script lang="ts" setup>
import { ref, reactive, onMounted, Ref, defineComponent } from 'vue'
import { nanoid } from 'nanoid'
import VirtualScrollList from 'vue3-virtual-scroll-list-component'
import 'vue3-virtual-scroll-list-component/css'

defineComponent({
  VirtualScrollList
})

interface AccountDataItem {
  date: string //日期
  state: number //收支状态 0为收入 1为支出
  detail: string //详情
  money: number //花费或收入
  id: string,
}
//原始数据
const accountData = ref<AccountDataItem[]>([])


//获取原始数据
const getData = (): Promise<AccountDataItem[]> => {
  const data: AccountDataItem[] = []
  return new Promise(resolve => {
    for (let i = 0; i < 10000; i++) {
      data.push(
        {
          date: `2023-03-28`,
          id: nanoid(),
          state: 0,
          detail: `ACG${i}`,
          money: 1800
        },
        {
          date: `2023-03-29`,
          id: nanoid(),
          state: 1,
          detail: `ACG${i}`,
          money: 2000
        })
    }
    resolve(data)
  })
}
const deleteItem = (targetId) => {
  accountData.value = accountData.value.filter(item => item.id !== targetId)

}
onMounted(async () => {
  accountData.value = await getData()
})
</script>
​
<style scoped lang='scss'>
p {
  margin: 0;
  padding: 0;
}

#main-bg {
  margin: 0 auto;
}


.list-itembox {
  margin: 10px 0;
  border: 1px #EEEEEE solid;
  border-radius: 8px;
  width: 70vw;

  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }

  .date {
    font-size: 14px;
    line-height: 14px;
    padding: 10px;
  }

  .delete {
    font-size: 12px;
    line-height: 18px;
    height: 18px;
    width: 38px;
    padding: 0 5px;
    color: white;
    background-color: red;

  }

  .info {
    display: grid;
    grid-template-columns: 80px auto auto auto;
    justify-content: space-between;
    font-size: 15px;
    line-height: 15px;
    text-align: left;
    padding: 10px 15px;

  }
}
</style>
​