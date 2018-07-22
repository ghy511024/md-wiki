<template>
    <ul @click="stop">
        <li v-for="(component,index) in navs"
            :class="{
            active:(map[component._id]).active==true,
            open:(map[component._id]).isopen==true,
            showadd:map[component._id].isadd==true,
            }"
            :_index="component._id"
        >
            <div v-if="component.children" class="my-icon" @click="liclick(component._id)">
                <Icon type="arrow-right-b"></Icon>
            </div>

            <span class="nav-title">
                <span @click="stop">
                    <a v-show="!map[component._id].edit_title" @click="jump(component._id)">{{component.name}}
                    </a>
                    <input v-show="map[component._id].edit_title" type="text" :value="component.name">
                </span>
                <span class="edit-btn" v-show="!map[component._id].edit_title">
                    <Icon type="edit" size="13" @click.native="show_title_edit(component._id,true)"></Icon>
                </span>
                <span class="add-btn" v-show="!map[component._id].edit_title">
                    <Icon type="android-add" size="14" @click.native="show_add(component._id)"></Icon>
                </span>
                <span class="title-save" v-show="map[component._id].edit_title">
                      <Icon type="checkmark-round" @click.native="save(component._id)"></Icon>
                </span>
                <span class="title-save-cancel" v-show="map[component._id].edit_title">
                     <Icon type="android-close" @click.native="show_title_edit(component._id,false)"></Icon>
                </span>
            </span>
            <div class="opwrap" @click="stop">
                <input type="text" v-model="map[component._id].value">
                <span>
                    <Icon type="checkmark-round" @click.native="save(component._id)"></Icon>
                </span>
                <span class="op-cancel">
                    <Icon type="android-remove"></Icon>
                </span>
            </div>
            <div v-if="component.children" :is="component.type"
                 :navs="component.children"
            >
            </div>
        </li>
    </ul>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                map: {}
            }
        },
        name: 'nav',
        label: '导航',
        computed: {},
        created: function () {
            for (var i = 0; i < this.navs.length; i++) {
                this.map[this.navs[i]._id] = Object.assign({
                    active: this.navs[i].active || false,
                    isopen: this.navs[i].isopen || false,
                    isadd: false,
                    edit_title: false,
                    value: "",
                }, this.navs[i]);
            }
        },
        mounted: function () {
            var _map = Object.assign({}, this.map);
            this.map = _map;
        },
        methods: {
            stop: function (e) {
                e.stopPropagation();
            },
            liclick: function (_id) {
                this.map[_id].isopen = !this.map[_id].isopen;
            },
            show_add: function (_id) {
                this.map[_id].isadd = !this.map[_id].isadd;
            },
            show_title_edit: function (_id,isedit) {
//                console.log("_id", _id);
                this.map[_id].edit_title = isedit;

            }
            , save: function (_id) {
                console.log(this.map[_id].value, "sdfsd")
                var value = this.map[_id].value;
                $.ajax({
                    url: "/page/create",
                    data: ({pid: _id, name: value}),
                    type: "POST",
                    error: function () {
                        alert("网络异常")
                    },
                    success: function (data) {
                        console.log(JSON.stringify(data));
                        window.location.search = "_id=" + data._id;
                    }
                })
            },
            jump(_id){
                window.location.search = "_id=" + _id;
            }
        },
        props: {
            index: String,
            navs: Array
        }
    };
</script>