<template>
    <ul @click="stop">
        <li v-for="(component,index) in navs"
            :class="{active:(map[component._id]).active==true,
            showadd:map[component._id].isadd==true
            }"
            :_index="index"
            @click="liclick(component._id)"
        >
            <span class="nav-title">{{component._id}}
                <span class="add-btn" @click="stop">
                    <Icon type="android-add" size="14" @click.native="show_add(component._id)"></Icon>
                </span>
            </span>
            <div class="opwrap" @click="stop">
                <input type="text" v-model="map[component._id].value">
                <span><Icon type="checkmark-round" @click.native="save(component._id)"></Icon></span>
            </div>
            <div v-if="component.children" :is="component.name"
                 :navs="component.children"
                 :_index="component._id">
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
            console.log(this.navs == null, "ssssssss")
            for (var i = 0; i < this.navs.length; i++) {
                this.map[this.navs[i]._id] = Object.assign({
                    active: false,
                    isadd: false,
                }, this.navs[i]);
            }
        },
        mounted: function () {
            var _map = Object.assign({}, this.map);
//            _map[_id].active = !_map[_id].active;
            this.map = _map;
        },
        methods: {
            stop: function (e) {
                e.stopPropagation();
            },
            liclick: function (_id) {
                this.map[_id].active = !this.map[_id].active;
            },
            show_add: function (_id) {

                this.map[_id].isadd = !this.map[_id].isadd;
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
                        alert(JSON.stringify(data));
                        console.log(JSON.stringify(data));
                    }
                })
            }
        },
        props: {
            index: String,
            navs: Array
        }
    };
</script>