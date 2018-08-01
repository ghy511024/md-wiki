<template>
    <ul @click="stop">
        <li v-for="(component,index) in navs"
            :class="{
            active:(map[component._id]).active==true,
            open:(map[component._id]).isopen==true,
            }"
            :_index="component._id"
        >
            <span :class="'nav-title t'+nav_deep">
                <div v-if="component.children" class="open-icon" @click="liclick(component._id)">
                    <Icon type="arrow-right-b"></Icon>
                </div>
                <span @click="stop" class="title">
                    <span v-show="!map[component._id].edit_title" @click="jump(component._id)">{{map[component._id].name}}
                    </span>
                    <input v-show="map[component._id].edit_title" type="text"
                           v-model="map[component._id].name"
                           @blur="handle_blur(component._id,'rename')"
                    >
                </span>
                <span class="edit-btn" v-show="!map[component._id].edit_title">
                    <Icon type="edit" size="13" @click.native="show_title_edit(component._id,true)"></Icon>
                </span>
                <span class="add-btn" v-show="!map[component._id].edit_title">
                    <Icon type="android-add" size="14" @click.native="show_add(component._id)"></Icon>
                </span>
                <span class="title-save" v-show="map[component._id].edit_title">
                      <Icon type="checkmark-round" @click.native="update_name(component._id)"></Icon>
                </span>
                <span class="title-save-cancel" v-show="map[component._id].edit_title">
                     <Icon type="android-close" @click.native="show_title_edit(component._id,false)"></Icon>
                </span>
            </span>
            <div v-show="map[component._id].isadd==true" :class="'nav-title nav-operate t'+nav_deep" @click="stop">
                <input type="text" v-model="map[component._id].value"
                >
                <span class="title-save">
                    <Icon type="checkmark-round" @click.native="create(component._id)"></Icon>
                </span>
                <span class="title-save-cancel">
                     <Icon type="android-close" @click.native="show_add(component._id,false)"></Icon>
                </span>
            </div>
            <div v-if="component.children" :is="component.type"
                 :navs="component.children"
                 :nav_deep="nav_deep+1"
                 :active_id="active_id"
            >
            </div>
        </li>
    </ul>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                map: {},
                lock: false,
            }
        },
        name: 'nav',
        label: '导航',
        computed: {},
        created: function () {
            for (var i = 0; i < this.navs.length; i++) {
                this.map[this.navs[i]._id] = this.navs[i];
            }
        },
        mounted: function () {
        },
        methods: {
            stop: function (e) {
                e.stopPropagation();
            },
            liclick: function (_id) {
                this.map[_id].isopen = !this.map[_id].isopen;
            },
            show_add: function (_id, isshow) {
                this.map[_id].isadd = isshow ? isshow : !this.map[_id].isadd;
            },
            show_title_edit: function (_id, isedit) {
                this.map[_id].edit_title = isedit;
            },
            // 失去焦点保存,或者更名
            handle_blur(_id, type){
                if (!this.lock) {
                    this.lock = true;
                    if (type == "save") {
                        this.create(_id);
                    } else if (type == "rename") {
                        this.update(_id);
                    }
                }
            },
            create: function (_id) {
                var value = this.map[_id].value;
                var _this = this;
                $.ajax({
                    url: "create",
                    data: ({pid: _id, name: value, space_id: window.space._id}),
                    type: "POST",
                    error: function () {
                        alert("网络异常");
                        _this.lock = false;
                    },
                    success: function (data) {
                        _this.lock = false;
                        if (data.code == 0) {
                            window.location.href = window.location.href.replace(/_id=.*/gi, "_id=" + data._id);
                            window.location.reload();
                        } else {
                            alert(data.desc)
                        }

                    }
                })
            },
            update: function (_id) {
                var _this = this;
                var name = this.map[_id].name;
                $.ajax({
                    url: "update",
                    data: ({_id: _id, name: name}),
                    type: "POST",
                    error: function () {
                        alert("网络异常")
                    },
                    success: function (data) {
                        if (data.code == 0) {
                            _this.$Message.success('修改成功');
                            _this.map[_id].edit_title = false;
                        }
                        else {
                            _this.$Message.error("修改失败,code:" + data.code);
                            _this.map[_id].edit_title = false;
                        }
                        _this.lock = false;
                    }
                })
            },
            jump(_id){
                window.location.hash = "_id=" + _id;
            }
        },
        props: {
            index: String,
            navs: Array,
            nav_deep: Number,
            active_id: String
        }
    };
</script>