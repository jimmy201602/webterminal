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
        <v-treeview v-model="treeData" :treeTypes="treeTypes" @selected="selected" :openAll="openAll" :contextItems="contextItems" :contextSelected="contextSelected"></v-treeview>
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
  import VTreeview from "v-treeview"

export default {
  name: 'hello',
  data () {
    return {
      split1: 0.15,
      tab0: true,
      tab1: true,
      tab2: true,
      q:'',
      openAll: true,
      treeTypes: [
        {
          type: "#",
          max_children: 6,
          max_depth: 4,
          valid_children: [
            "FMM_EMPLOYEE",
            "FMM_SPOUSE",
            "FMM_CHILD",
            "FMM_SIBLING",
            "FMM_PARENT",
            "FMM_PARENT_IN_LAW"
          ]
        },
        {
          type: "FMM_EMPLOYEE",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_SPOUSE",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_CHILD",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_SIBLING",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_PARENT",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "FMM_PARENT_IN_LAW",
          icon: "far fa-user",
          valid_children: ["Basic", "Top-up"]
        },
        {
          type: "Basic",
          icon: "far fa-hospital",
          valid_children: ["Top-up"]
        },
        {
          type: "Top-up",
          icon: "far fa-plus-square",
          valid_children: []
        }
      ],
      treeData: [
        {
          id: 100767.0, text: "Employee", type: "FMM_EMPLOYEE", count: 0,
          children: [
            {
              id: 100811.0, text: "Basic plan", type: "Basic", count: 0,
              children: [
                {
                  id: 101161.0, text: "Top-up", type: "Top-up", count: 152, children: []
                }
              ]
            },
            {
              id: 100812.0, text: "Basic plan", type: "Basic", count: 0, children: []
            },
            {
              id: 101162.0, text: "This Top-up can be at level 2", type: "Top-up", count: 152, children: []
            }
          ]
        },
        {
          id: 100768.0, text: "Spouse", type: "FMM_SPOUSE", count: 0,
          children: [
            {
              id: 100813.0, text: "Basic plan", type: "Basic", count: 0, children: [
                {
                  id: 101163.0, text: "Top-up", type: "Top-up", count: 152, children: []
                }
              ]
            },
            {
              id: 100814.0, text: "Basic plan", type: "Basic", count: 0, children: [
                {
                  id: 101164.0, text: "Top-up", type: "Top-up", count: 152, children: []
                }
              ]
            }
          ]
        },
        {
          id: 100769.0, text: "Child", type: "FMM_CHILD", count: 0, children: [
            {
              id: 100815.0, text: "Basic plan", type: "Basic", count: 0, children: [
                {
                  id: 101165.0, text: "Top-up", type: "Top-up", count: 152, children: []
                }
              ]
            },
            {
              id: 100816.0, text: "Basic plan", type: "Basic", count: 0, children: [
                {
                  id: 101166.0, text: "Top-up", type: "Top-up", count: 0, children: []
                }
              ]
            }
          ]
        },
        {
          id: 100770.0, text: "Parents", type: "FMM_PARENT", count: 0, children: [
            {
              id: 100817.0, text: "Basic plan", type: "Basic", count: 0, children: [
                {
                  id: 101167.0, text: "Top-up", type: "Top-up", count: 124, children: []
                }
              ]
            }
          ]
        }
      ],
      contextItems: [],
      selectedNode: null
    };
  },
  methods: {
    itemClick (node) {
      console.log(node.model.text + ' clicked !')
    },
    handleTabRemove (name) {
      this['tab' + name] = false;
    },
    getTypeRule(type) {
      var typeRule = this.treeTypes.filter(t => t.type == type)[0];
      return typeRule;
    },
    contextSelected(command) {
      console.log(1111111111,command)
      switch (command) {
        case "Create Basic":
          var node = {
            text: "New Basic Plan",
            type: "Basic",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Create Top-up":
          var node = {
            text: "New Top-up",
            type: "Top-up",
            children: []
          };
          this.selectedNode.addNode(node);
          break;
        case "Rename":
          this.selectedNode.editName();
          break;
        case "Remove":
          break;
      }
    },
    selected(node) {
      this.selectedNode = node;
      this.contextItems = [];
      var typeRule = this.getTypeRule(this.selectedNode.model.type);
      typeRule.valid_children.map(function(type, key) {
        var childType = this.getTypeRule(type);
        var item = {
          title: "Create " + type,
          icon: childType.icon,
          type: childType
        };
        this.contextItems.push(item);
      }, this);

      this.contextItems.push({ title: "Rename", icon: "far fa-edit" });
      this.contextItems.push({ title: "Remove", icon: "far fa-trash-alt" });
    },
  },
  components:{
    VTreeview
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
