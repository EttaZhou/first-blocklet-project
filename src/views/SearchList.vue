<template>
  <div class="main-container">
    <el-input
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="blockHash"
      clearable
      @change="getDetail"
    ></el-input>
    <h1>Block {{ detail.block_index }}</h1>
    <p>
      This block was mined on December 22, 2020 at 3:09 PM GMT+8 by Poolin. It currently has 67,500 confirmations on the
      Bitcoin blockchain.
    </p>
    <p>
      The miner(s) of this block earned a total reward of 6.25000000 BTC ($282,577.69). The reward consisted of a base
      reward of 6.25000000 BTC ($282,577.69) with an additional 0.16583560 BTC ($7,497.83) reward paid as fees of the
      912 transactions which were included in the block. The Block rewards, also known as the Coinbase reward, were sent
      to this address.
    </p>
    <p>
      A total of 306.51676953 BTC ($13,856,050.72) were sent in the block with the average transaction being 0.33609295
      BTC ($15,193.04). Learn more about how blocks work.
    </p>
    <p class="list">
      <span>Hash</span>
      <span>{{ detail.hash }}</span>
    </p>
    <p class="list">
      <span>Time</span>
      <span>{{ detail.time | formatDate }}</span>
    </p>
    <p class="list">
      <span>Height</span>
      <span>{{ detail.height }}</span>
    </p>
    <h1>Block Transactions</h1>
    <div class="list-content" v-if="detail.tx">
      <el-card class="large-content" v-for="li in currentList" :key="li.hash">
        <el-row>
          <el-col :span="3">Fee</el-col>
          <el-col :span="9">{{ li.fee }}</el-col>
          <el-col :span="4" :offset="4">12</el-col>
          <el-col :span="4">21</el-col>
        </el-row>
        <el-row>
          <el-col :span="3">Hash</el-col>
          <el-col :span="9">{{ li.hash }}</el-col>
          <el-col :span="4">
            <svg
              enable-background="new 0 0 32 32"
              height="32px"
              id="svg2"
              version="1.1"
              viewBox="0 0 32 32"
              width="32px"
              class="hDAkGl"
            >
              <g id="background"><rect fill="none" height="32" width="32"></rect></g>
              <g id="arrow_x5F_full_x5F_right">
                <polygon points="16,2.001 16,10 2,10 2,22 16,22 16,30 30,16  "></polygon>
              </g>
            </svg>
          </el-col>
          <el-col :span="4"></el-col>
          <el-col :span="4">{{ li.time | formatDate }}</el-col>
        </el-row>
      </el-card>
      <el-card class="small-content" v-for="li in currentList" :key="li.hash + 'small'">
        <el-row>
          <el-col :span="6">Amount</el-col>
          <el-col :span="18">{{ li.weight }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">Fee</el-col>
          <el-col :span="18">{{ li.fee }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">Hash</el-col>
          <el-col :span="18">{{ li.hash }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">Date</el-col>
          <el-col :span="18">{{ li.time | formatDate }}</el-col>
        </el-row>
      </el-card>
      <el-pagination
        layout="prev, pager, next"
        :total="detail.tx.length"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { deepClone } from '../utils/deepClone';
export default {
  name: 'SearchList',
  data() {
    return {
      blockHash: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
      detail: {},
      list: [], // 存储tx所有数据
      currentList: [], // 存储当前展示的交易列表
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios.get(`https://blockchain.info/rawblock/${this.blockHash}`).then((response) => {
        if (response && response.data) {
          this.detail = deepClone(response.data);
          this.list = response.data.tx;
          this.currentList = response.data.tx ? response.data.tx.slice(0, 10) : [];
        }
      });
    },
    handleCurrentChange(val) {
      let start = (val - 1) * 10 + 1;
      this.currentList = this.list.slice((val - 1) * 10 + 1, start + 10);
    },
  },
};
</script>

<style scoped lang="scss">
.main-container {
  text-align: left;
  padding: 0.8rem;
  width: calc(100% - 1.6rem);
  height: calc(100% - 65px - 1.6rem);
  overflow: scroll;
  .el-input {
    text-align: right;
  }
  .list {
    width: 100%;
    display: flex;
    padding: 0.8rem 0;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;
    span {
      width: 50%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
    }
  }
  .el-col {
    height: 5rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .hDAkGl {
    width: 24px;
    height: 24px;
    fill: rgb(51, 159, 123);
  }
  .el-card {
    margin-bottom: 2rem;
  }
}
@media screen and (max-width: 770px) {
  .large-content {
    display: none;
  }
  .small-content {
    display: block;
  }
}
@media screen and (min-width: 770px) {
  .large-content {
    display: block;
  }
  .small-content {
    display: none;
  }
}
</style>
