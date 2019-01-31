import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import DocNuevo from '@components/jerarquia/jerarquia.vue'
import '../../assets/css/jerarquia.scss';

@Component({
   name: 'jerarquia',

})
export default class JerarquiaComponent extends Vue {

  constructor(){
    super()


  }
  data() {
    return {
      dialogVisible: false,
      data2: [{
        id: 1,
        label: 'juan perez',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1',
            children: [{
                id: 10,
                label: 'Level three 1-1-2'
              }]
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }]
    };
  }
 

    defaultProps: {
        children: 'children',
        label: 'label'
      }
      // filterText(val) {
      //   this.$refs.tree2.filter(val);
      // }
      // filterNode(value, data) {
      //   if (!value) return true;
      //   return data.label.indexOf(value) !== -1;
      // }
      
    

}
