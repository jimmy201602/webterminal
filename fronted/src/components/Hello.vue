<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        <form>
          <div class="input-group">
            <input type="search" v-model="q" :placeholder="$t('search')" class="form-control">
            <span class="input-group-addon"><button type="submit"><i class="fa fa-search"></i></button></span>
          </div>
        </form>
        <b-tree-view :data="treeData"></b-tree-view>
      </div>
      <div slot="right" class="demo-split-pane">
        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
          <TabPane label="标签一" v-if="tab0">标签一的内容</TabPane>
          <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
          <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
        </Tabs>
      </div>
    </Split>
  </div>
</template>

<script>
  import { bTreeView } from 'bootstrap-vue-treeview'
  export default {
  name: 'hello',
  data () {
    return {
      treeData: [
        {
          "id": 1,
          "name": "Users",
          "icon": "fa-users"
        },
        {
          "id": 2,
          "name": "Books",
          "icon": "fa-book",
          "children": [
            {
              "id": 3,
              "name": "Neptune",
              "icon": "fa-book"
            }
          ]
        },
        {
          "id": 5,
          "name": "Vehicles",
          "children": [
            {
              "id": 23,
              "name": "Cars",
              "icon": "fa-car"
            },
            {
              "id": 34,
              "name": "Trucks",
              "icon": "fa-truck",
              "children": [
                {
                  "id": 101,
                  "name": "Mars"
                }
              ]
            }
          ]
        }
        ],
      split1: 0.15,
      tab0: true,
      tab1: true,
      tab2: true,
      q:'',
    }
  },
  methods: {
    itemClick (node) {
      console.log(node.model.text + ' clicked !')
    },
    handleTabRemove (name) {
      this['tab' + name] = false;
    }
  },
  components:{
    bTreeView
  }
}
</script>

<style>
  .demo-split{
    height: 800px;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    padding: 10px;
  }
</style>
