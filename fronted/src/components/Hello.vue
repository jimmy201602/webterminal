<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
          <div class="input-group">
            <input type="text" v-model="searchText" :placeholder="$t('search')" class="form-control" @keyup="inputKeyUp">
            <span class="input-group-addon"><button type="submit" @click="inputKeyUp"><i class="fa fa-search"></i></button></span>
          </div>
        <v-jstree :data="data"
                  :item-events="itemEvents"
                  :show-checkbox="false"
                  multiple
                  allow-batch
                  whole-row
                  draggable
                  :contextmenu="contextmenu"
                  @item-click="itemClick"
                  @item-drag-start="itemDragStart"
                  @item-drag-end="itemDragEnd"
                  @item-drop-before = "itemDropBefore"
                  ref="tree"
                  @item-drop="itemDrop">
        </v-jstree>
      </div>
      <div slot="right" class="demo-split-pane">
        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
          <TabPane label="标签一" v-if="tab0">
            <div :id="termid" v-contextmenu:termcontextmenu></div>
            <div>
              <div class="toolsbar">
                <!--
                  <Button type="primary" size="large" shape="circle" icon="wrench"></Button>
                -->
                <Button-group vertical>
                  <i-button type="primary" size="large" :title="$t('refresh')" icon="md-refresh"></i-button>
                  <i-button type="primary" size="large" :title="$t('file transfer')" icon="md-swap"></i-button>
                  <i-button type="primary" size="large" :title="$t('fullscreen')" icon="md-expand"></i-button>
                  <i-button type="primary" size="large" :title="$t('settings')" icon="md-settings"></i-button>
                </Button-group>
              </div>
            </div>
          </TabPane>
          <TabPane label="标签二" v-if="tab1">标签二的内容</TabPane>
          <TabPane label="标签三" v-if="tab2">标签三的内容</TabPane>
        </Tabs>
      </div>
    </Split>
    <v-contextmenu ref="contextmenu">
      <v-contextmenu-item @click="clickmenu(1)">菜单1</v-contextmenu-item>
      <v-contextmenu-item @click="clickmenu(2)">菜单2</v-contextmenu-item>
      <v-contextmenu-item @click="clickmenu(3)">菜单3</v-contextmenu-item>
    </v-contextmenu>
    <v-contextmenu ref="termcontextmenu">
      <v-contextmenu-item>{{ $t('copy') }}</v-contextmenu-item>
      <v-contextmenu-item>{{ $t('paste') }}</v-contextmenu-item>
      <v-contextmenu-item>{{ $t('fullscreen') }}</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>

<script>
  import VJstree from  '../jstree/tree'
  import 'xterm/dist/xterm.css'
  import { Terminal } from 'xterm';
  import * as fit from 'xterm/lib/addons/fit/fit';
  import 'xterm/dist/addons/fullscreen/fullscreen.css'
  import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
  Terminal.applyAddon(fullscreen);
  Terminal.applyAddon(fit);

  export default {
  name: 'hello',
  data () {
    return {
      termid:'test1',
      split1: 0.15,
      tab0: true,
      tab1: true,
      tab2: true,
      searchText: '',
      itemEvents: {
        // mouseover: function () {
        //   console.log('mouseover')
        // },
        contextmenu: function () {
          arguments[2].preventDefault()
          arguments[0].contextmenu(arguments[1],arguments[2])
        }
      },
      data: [
        {
          "text": "Same but with checkboxes",
          "children": [
            {
              "text": "initially selected",
              "selected": true
            },
            {
              "text": "custom icon",
              "icon": "fa fa-warning icon-state-danger"
            },
            {
              "text": "initially open",
              "icon": "fa fa-folder icon-state-default",
              "opened": true,
              "children": [
                {
                  "text": "Another node"
                }
              ]
            },
            {
              "text": "custom icon",
              "icon": "fa fa-warning icon-state-warning"
            },
            {
              "text": "disabled node",
              "icon": "fa fa-check icon-state-success",
              "disabled": true
            }
          ]
        },
        {
          "text": "Same but with checkboxes",
          "opened": true,
          "children": [
            {
              "text": "initially selected",
              "selected": true
            },
            {
              "text": "custom icon",
              "icon": "fa fa-warning icon-state-danger"
            },
            {
              "text": "initially open",
              "icon": "fa fa-folder icon-state-default",
              "opened": true,
              "children": [
                {
                  "text": "Another node"
                }
              ]
            },
            {
              "text": "custom icon",
              "icon": "fa fa-warning icon-state-warning"
            },
            {
              "text": "disabled node",
              "icon": "fa fa-check icon-state-success",
              "disabled": true
            }
          ]
        },
        {
          "text": "And wholerow selection"
        },
        {
          "text": "drag disabled",
          "icon": "fa fa-warning icon-state-danger",
          "dragDisabled": true
        },
        {
          "text": "drop disabled",
          "icon": "fa fa-warning icon-state-danger",
          "dropDisabled": true
        }
      ],
    };
  },
  methods: {
    handleTabRemove (name) {
      this['tab' + name] = false;
    },
    clickmenu(data){
      console.log(data)
    },
    contextmenu(data,mouseevent){
      // this.showContext = true;
      // this.MouseEvent = data
      // console.log(this.showContext,this.MouseEvent)
      // console.log(33333333333,data)
      //console.log(data)
      const postition = {
        top: mouseevent.clientY,
        left: mouseevent.clientX,
      }
      this.$refs.contextmenu.show(postition)
    },
    itemClick (node) {
      this.editingNode = node
      this.editingItem = node.model
      const id =  node.model.id
      this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, function (node) {
        if (node.model !== undefined) {
          if (id == node.data.id) {
            if (node.$el.querySelector('.tree-anchor').style.color == 'blue'){
              node.$el.querySelector('.tree-anchor').style.color = '#000'
            }else{
              node.$el.querySelector('.tree-anchor').style.color = 'blue'
            }
          }
        }
      })
      console.log(node.model.text + ' clicked !')
    },
    itemDragStart (node) {
      console.log(node.model.text + ' drag start !')
    },
    itemDragEnd (node) {
      console.log(node.model.text + ' drag end !')
    },
    itemDropBefore (node, item, draggedItem , e) {
      if (!draggedItem) {
        item.addChild({
          text: "newNode",
          value: "newNode"
        })
      }
    },
    itemDrop (node, item) {
      var sortBy = function(attr,rev) {
        if (rev == undefined) {
          rev = 1;
        } else {
          rev = (rev) ? 1 : -1;
        }
        return function (a, b) {
          a = a[attr];
          b = b[attr];
          if (a < b) {
            return rev * -1;
          }
          if (a > b) {
            return rev * 1;
          }
          return 0;
        }
      }
      item.children.sort(sortBy('text', true))
      console.log(node.model.text + ' drop !')
    },
    inputKeyUp: function () {
      var text = this.searchText
      const patt = new RegExp(text);
      this.$refs.tree.handleRecursionNodeChilds(this.$refs.tree, function (node) {
        if (text !== '' && node.model !== undefined) {
          const str = node.model.text
          if (patt.test(str)) {
            node.$el.querySelector('.tree-anchor').style.color = 'red'
          } else {
            node.$el.querySelector('.tree-anchor').style.color = '#000'
          } // or other operations
        } else {
          node.$el.querySelector('.tree-anchor').style.color = '#000'
        }
      })
    },
    addChildNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addChild({
          text: "newNode"
        })
      }
    },
    removeNode: function () {
      if (this.editingItem.id !== undefined) {
        var index = this.editingNode.parentItem.indexOf(this.editingItem)
        this.editingNode.parentItem.splice(index, 1)
      }
    },
    addBeforeNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addBefore({
          text: this.editingItem.text + " before"
        }, this.editingNode)
      }
    },
    addAfterNode: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.addAfter({
          text: this.editingItem.text + " after"
        }, this.editingNode)
      }
    },
    openChildren: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.openChildren()
      }
    },
    closeChildren: function () {
      if (this.editingItem.id !== undefined) {
        this.editingItem.closeChildren()
      }
    },
    refreshNode: function () {
      this.asyncData = [
        this.$refs.tree2.initializeLoading()
      ]
      this.$refs.tree2.handleAsyncLoad(this.asyncData, this.$refs.tree2)
    },
    customItemClick: function (node ,item, e) {
      e.stopPropagation()
      var index = node.parentItem.indexOf(item)
      node.parentItem.splice(index, 1)
    },
    customItemClickWithCtrl: function () {
      console.log('click + ctrl')
    },
    fillData: function () {
      if (this.editingItem.id !== undefined) {
        for (var i = 0; i < this.filesToAdd; i++) {
          this.filesToAddIndex++
          this.editingItem.addChild({
            text: "File" + this.filesToAddIndex,
            icon: "fa fa-file icon-state-danger"
          })
        }
      }
    }
  },
  components:{
    VJstree
  },
  mounted() {
    var that = this
    let terminalContainer = document.getElementById('test1')
    let term = new Terminal({
        // cols: 92,
        rows: 40,
        cursorBlink: true, // 光标闪烁
        cursorStyle: "underline", // 光标样式  null | 'block' | 'underline' | 'bar'
        scrollback: 800, //回滚
        tabStopWidth: 8, //制表宽度
        screenKeys: true//
      })
      term.open(terminalContainer)
      term.fit()
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.writeln('111111111111111111111111111111111111111111111111111111111111111111')
      term.on("selection", function() {
        if (term.hasSelection()) {
          const copy = term.getSelection();
          console.log(copy)
          that.$copyText(copy).then(function (e) {
            console.log('Copied')
            console.log(e)
          }, function (e) {
            console.log('Can not copy')
            console.log(e)
          })
          console.log(window.clipboardData)
        }
      });
    let height = document.body.clientHeight -214;
    let rows = height/18;
    term.on("data", function(data) {
      console.log("data", data);
      // websocket.send(new TextEncoder().encode("\x00" + data));
      term.write(data)
    });
    term.attachCustomKeyEventHandler(function(ev,data) {
      //ctrl+v
      if (ev.keyCode == 86 && ev.ctrlKey) {
        console.log('ctrl + v')
        term.writeln('ctrl + v')
      }
    })
    term.resize(term.cols,parseInt(rows))
      // window.onresize = function() {
      // term.fit();
      // term.scrollToBottom();
      // };
    window.addEventListener('resize',function() {
      term.fit();
      term.scrollToBottom();
    })
  }
}
</script>

<style>
  .demo-split{
    height: 750px;
    border: 1px solid #dcdee2;
  }
  .demo-split-pane{
    padding: 10px;
  }
  .icon-state-default {
    color: gray;
  }
  .icon-state-danger {
    color: red;
  }
  .icon-state-warning {
    color: yellow;
  }
  .icon-state-success {
    color: green;
  }
  .toolsbar {
    position: absolute;
    right: 10px;
    top: 160px;
    z-index: 10;
  }
</style>
